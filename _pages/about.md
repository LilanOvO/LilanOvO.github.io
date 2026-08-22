---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% assign cv = site.data.cv %}

<span class='anchor' id='about-me'></span>

I am **Weiwei Qi (齐巍巍)**, a second-year PhD student in Cyberspace Security at Zhejiang University, advised by
[**Tianhang Zheng**](https://scholar.google.com/citations?user=Docv-hkAAAAJ&hl=en),
[**Zhan Qin**](https://scholar.google.com/citations?user=5fa4lOQAAAAJ&hl=en),
and [**Kui Ren**](https://scholar.google.com/citations?user=uuQA_rcAAAAJ&hl=en).
I study how to make large language models safer and more reliable.
My research includes both attack and defense, including jailbreak attacks, safety alignment, and efficient post-training for LLMs and agents.
My goal is to help build safer, more reliable, and more trustworthy intelligent systems.

<div class="research-tags">
  <span class="research-tag">LLM Safety</span>
  <span class="research-tag">Safety Alignment</span>
  <span class="research-tag">Reinforcement Learning</span>
  <span class="research-tag">Agent Safety</span>
  <span class="research-tag">Jailbreak Red-Teaming</span>
</div>

<div class="section-note">
  <a href="/cv/">CV</a> |
  <a href="https://scholar.google.com/citations?user=KacN-IMAAAAJ&hl=en">Google Scholar</a>
</div>

<span class='anchor' id='news'></span>
# 🔥 News
- 🎉 **2026.08.21**: **DataShield: Uncovering Risky Fine-Tuning Data Across LLMs Through Consensus Subspace Alignment** was accepted to EMNLP 2026.
- **2026.07.22**: Our paper **DARWIN: Evolving Jailbreak Adversary and Guardrail for LLM Safety Evaluation and Protection** is available on arXiv.
- **2026.05.29**: Our paper **TRACE: Task-Aware Adaptive Self-Evolving Agentic Jailbreaking** is available on arXiv.
- 🎉 **2026.04.06**: **Towards Identification and Intervention of Safety-Critical Parameters in Large Language Models** was accepted to ACL 2026 Findings.
- 🥳 **2025.11.08**: **MAJIC: Markovian Adaptive Jailbreaking via Iterative Composition of Diverse Innovative Strategies** was accepted to AAAI 2026.

<span class='anchor' id='publications'></span>
# 📝 Publications
## Accepted & Published
{% assign accepted_publications = site.data.cv.publications | where: "status", "accepted" %}
{% for publication in accepted_publications %}
<div class="pub-item">
  <div class="pub-title"><a href="{{ publication.paper_url }}">{{ publication.title }}</a></div>
  <div class="pub-authors">{{ publication.authors }}</div>
  <div class="pub-meta">{{ publication.venue }}</div>
  <div class="pub-links">
    {% for resource in publication.resources %}
    <a href="{{ resource.url }}"><img src="{{ resource.badge }}" alt="{{ resource.label }}"></a>
    {% endfor %}
  </div>
</div>
{% endfor %}

## Preprints
{% assign preprints = site.data.cv.publications | where: "status", "preprint" %}
{% for publication in preprints %}
<div class="pub-item">
  <div class="pub-title"><a href="{{ publication.paper_url }}">{{ publication.title }}</a></div>
  <div class="pub-authors">{{ publication.authors }}</div>
  <div class="pub-meta">{{ publication.venue }}</div>
  <div class="pub-links">
    {% for resource in publication.resources %}
    <a href="{{ resource.url }}"><img src="{{ resource.badge }}" alt="{{ resource.label }}"></a>
    {% endfor %}
  </div>
</div>
{% endfor %}

<span class='anchor' id='education'></span>
# 🎓 Education
{% for item in cv.education %}
- **{{ item.institution }}**: {{ item.degree }} ({{ item.detail }}).
{% endfor %}

<span class='anchor' id='projects'></span>
# 🛠️ Projects
{% for project in cv.projects %}
<div class="project-entry">
  <strong>{{ project.period }}</strong>: <strong>{{ project.title }}</strong> is {{ project.homepage_detail }}
  <span class="project-links"><a href="{{ project.url }}"><img src="https://img.shields.io/badge/Code-GitHub-black.svg?logo=github" alt="Code"></a>{% if project.stars_url %}<a href="{{ project.stars_url }}"><img src="https://img.shields.io/github/stars/{{ project.stars_url | remove: 'https://github.com/' }}?style=social" alt="GitHub stars"></a>{% endif %}</span>
</div>
{% endfor %}

<span class='anchor' id='awards'></span>
# 🏆 Awards
{% for honor in cv.honors %}
- **{{ honor.year }}**: {{ honor.title }}.
{% endfor %}
