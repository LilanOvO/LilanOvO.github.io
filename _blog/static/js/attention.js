(function () {
  'use strict';

  // Fixed educational scores, not attention measurements from a real model.
  const TOKENS = ['The', 'curious', 'cat', 'sat', 'down'];
  const SCORES = [
    [2.6, 0.7, 0.4, 0.2, -0.3],
    [0.8, 2.1, 2.5, 0.5, -0.1],
    [0.9, 2.2, 2.9, 1.3, 0.1],
    [0.5, 0.6, 3.1, 2.0, 1.2],
    [0.2, 0.4, 1.5, 2.7, 2.3]
  ];

  function probabilities(row, rowIndex, temperature, causal) {
    const allowed = row.map((score, index) => causal && index > rowIndex ? -Infinity : score / temperature);
    const maximum = Math.max.apply(null, allowed);
    const weights = allowed.map(score => score === -Infinity ? 0 : Math.exp(score - maximum));
    const total = weights.reduce((sum, weight) => sum + weight, 0);
    return weights.map(weight => weight / total);
  }

  function initialize(root) {
    if (root.dataset.attentionReady) return;
    root.dataset.attentionReady = 'true';
    let query = 2;
    const temperature = root.querySelector('[data-temperature]');
    const causal = root.querySelector('[data-causal]');
    const buttons = Array.from(root.querySelectorAll('[data-query]'));
    const barContainer = root.querySelector('[data-bars]');
    const matrix = root.querySelector('[data-matrix]');

    const bars = TOKENS.map(token => {
      const row = document.createElement('div');
      row.className = 'attention-demo__bar-row';
      const label = document.createElement('span');
      label.className = 'attention-demo__bar-label';
      label.textContent = token;
      const track = document.createElement('div');
      track.className = 'attention-demo__bar-track';
      const fill = document.createElement('span');
      fill.className = 'attention-demo__bar-fill';
      track.appendChild(fill);
      const value = document.createElement('span');
      value.className = 'attention-demo__bar-value';
      row.append(label, track, value);
      barContainer.appendChild(row);
      return { row, fill, value };
    });

    const matrixRows = TOKENS.map(token => {
      const row = document.createElement('tr');
      const label = document.createElement('th');
      label.scope = 'row';
      label.textContent = token;
      row.appendChild(label);
      const cells = TOKENS.map(() => {
        const cell = document.createElement('td');
        const value = document.createElement('span');
        value.className = 'attention-demo__sr-only';
        cell.appendChild(value);
        row.appendChild(cell);
        return { cell, value };
      });
      matrix.appendChild(row);
      return { row, cells };
    });

    function update() {
      const currentTemperature = Number(temperature.value);
      const isCausal = causal.checked;
      const distributions = SCORES.map((row, index) => probabilities(row, index, currentTemperature, isCausal));
      const selected = distributions[query];
      const entropy = selected.reduce((sum, probability) => probability > 0 ? sum - probability * Math.log2(probability) : sum, 0);
      const largest = Math.max.apply(null, selected);
      const largestIndex = selected.indexOf(largest);
      root.querySelector('[data-temperature-output]').textContent = currentTemperature.toFixed(2);
      temperature.setAttribute('aria-valuetext', currentTemperature.toFixed(2));
      root.querySelector('[data-query-name]').textContent = TOKENS[query];
      buttons.forEach((button, index) => button.setAttribute('aria-pressed', String(index === query)));

      bars.forEach((bar, index) => {
        const masked = isCausal && index > query;
        bar.fill.style.width = (selected[index] * 100) + '%';
        bar.value.textContent = masked ? '—' : (selected[index] * 100).toFixed(1) + '%';
        bar.row.classList.toggle('is-masked', masked);
        bar.row.classList.toggle('is-query', index === query);
        bar.row.setAttribute('aria-label', TOKENS[index] + ': ' + (masked ? 'masked' : (selected[index] * 100).toFixed(1) + ' percent'));
      });

      matrixRows.forEach((entry, rowIndex) => {
        entry.row.classList.toggle('is-selected', rowIndex === query);
        entry.cells.forEach(({ cell, value }, columnIndex) => {
          const masked = isCausal && columnIndex > rowIndex;
          const probability = distributions[rowIndex][columnIndex];
          cell.classList.toggle('is-masked', masked);
          cell.style.setProperty('--attention-strength', (0.07 + probability * 0.93).toFixed(4));
          const description = masked ? 'Masked' : (probability * 100).toFixed(1) + '%';
          cell.title = TOKENS[rowIndex] + ' → ' + TOKENS[columnIndex] + ': ' + description;
          value.textContent = description;
        });
      });

      const scope = isCausal ? query + 1 : TOKENS.length;
      root.querySelector('[data-summary]').textContent = '“' + TOKENS[query] + '” places ' + (largest * 100).toFixed(1) + '% of its attention on “' + TOKENS[largestIndex] + '”. ' + scope + ' token' + (scope === 1 ? ' is' : 's are') + ' available.';
      root.querySelector('[data-entropy]').textContent = (Math.abs(entropy) < 0.0005 ? 0 : entropy).toFixed(2);
    }

    buttons.forEach(button => button.addEventListener('click', () => {
      query = Number(button.dataset.query);
      update();
    }));
    temperature.addEventListener('input', update);
    causal.addEventListener('change', update);
    update();
  }

  function start() {
    document.querySelectorAll('[data-attention-demo]').forEach(initialize);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
