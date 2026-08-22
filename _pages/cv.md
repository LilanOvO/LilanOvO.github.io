---
permalink: /cv/
title: "Curriculum Vitae"
excerpt: ""
---

{% assign cv = site.data.cv %}
{% assign accepted_publications = cv.publications | where: "status", "accepted" %}
{% assign preprints = cv.publications | where: "status", "preprint" %}

<div class="cv-page">
  <header class="cv-header">
    <div>
      <h1>{{ cv.basics.name }} <span>{{ cv.basics.name_zh }}</span></h1>
      <p class="cv-headline">{{ cv.basics.headline }} at {{ cv.basics.affiliation }}</p>
    </div>
    <button class="cv-print" type="button" onclick="window.print()">
      <i class="fas fa-print" aria-hidden="true"></i> Print / Save PDF
    </button>
  </header>

  <div class="cv-contact" aria-label="Contact links">
    <a href="mailto:{{ cv.basics.email }}"><i class="fas fa-envelope" aria-hidden="true"></i> {{ cv.basics.email }}</a>
    <span><i class="fas fa-map-marker-alt" aria-hidden="true"></i> {{ cv.basics.location }}</span>
    <a href="{{ cv.basics.github }}"><i class="fab fa-github" aria-hidden="true"></i> GitHub</a>
    <a href="{{ cv.basics.scholar }}"><i class="fas fa-graduation-cap" aria-hidden="true"></i> Google Scholar</a>
  </div>

  <p class="cv-summary">{{ cv.basics.summary }}</p>

  <section class="cv-section">
    <h2>Research Interests</h2>
    <div class="research-tags">
      {% for interest in cv.interests %}
      <span class="research-tag">{{ interest }}</span>
      {% endfor %}
    </div>
  </section>

  <section class="cv-section">
    <h2>Education</h2>
    {% for item in cv.education %}
    <div class="cv-entry">
      <div>
        <h3>{{ item.degree }}</h3>
        <p>{{ item.institution }}</p>
      </div>
      <p class="cv-entry-detail">{{ item.detail }}</p>
    </div>
    {% endfor %}
  </section>

  <section class="cv-section">
    <h2>Research Experience</h2>
    {% for item in cv.research_experience %}
    <div class="cv-entry">
      <div>
        <h3>{{ item.title }}</h3>
        <p>{{ item.organization }}</p>
      </div>
      <p class="cv-entry-detail">{{ item.detail }}</p>
    </div>
    {% endfor %}
  </section>

  <section class="cv-section">
    <h2>Publications</h2>
    <h3 class="cv-subheading">Accepted &amp; Published</h3>
    <ol class="cv-publications">
      {% for publication in accepted_publications %}
      <li>
        <a href="{{ publication.paper_url }}">{{ publication.title }}</a>
        <div>{{ publication.authors }}</div>
        <em>{{ publication.venue }}</em>
      </li>
      {% endfor %}
    </ol>
    <h3 class="cv-subheading">Preprints</h3>
    <ol class="cv-publications">
      {% for publication in preprints %}
      <li>
        <a href="{{ publication.paper_url }}">{{ publication.title }}</a>
        <div>{{ publication.authors }}</div>
        <em>{{ publication.venue }}</em>
      </li>
      {% endfor %}
    </ol>
  </section>

  <section class="cv-section">
    <h2>Selected Projects</h2>
    {% for item in cv.projects %}
    <div class="cv-entry">
      <div>
        <h3><a href="{{ item.url }}">{{ item.title }}</a></h3>
        <p>{{ item.period }}</p>
      </div>
      <p class="cv-entry-detail">{{ item.detail }}</p>
    </div>
    {% endfor %}
  </section>

  <section class="cv-section">
    <h2>Honors &amp; Awards</h2>
    <ul class="cv-honors">
      {% for honor in cv.honors %}
      <li>{{ honor.title }}, {{ honor.year }}</li>
      {% endfor %}
    </ul>
  </section>

  <p class="cv-updated">Last updated: {{ cv.basics.updated }}</p>
</div>
