---
permalink: /cv/
title: "个人简历"
excerpt: ""
author_profile: false
---

{% assign cv = site.data.cv %}
{% assign resume = cv.online_resume %}

<div class="resume-page">
  <header class="resume-header">
    <img class="resume-photo" src="/{{ resume.photo }}" alt="{{ cv.basics.name }}">
    <h1>个人简历<span>——{{ cv.basics.name_zh }}</span></h1>
    <div class="resume-contact">
      <a href="mailto:{{ cv.basics.email }}"><i class="fas fa-envelope" aria-hidden="true"></i> {{ cv.basics.email }}</a>
      <a href="{{ cv.basics.github }}"><i class="fab fa-github" aria-hidden="true"></i> LilanOvO</a>
    </div>
  </header>

  <section class="resume-section">
    <h2><i class="fas fa-graduation-cap" aria-hidden="true"></i> 教育背景</h2>
    <div class="resume-rule"></div>
    {% for item in resume.education %}
    <p class="resume-fact"><strong>{{ item.label }}：</strong>{{ item.content }}</p>
    {% endfor %}
    <p class="resume-fact"><strong>专业课程：</strong>{{ resume.coursework }}</p>
  </section>

  <section class="resume-section">
    <h2><i class="fas fa-microscope" aria-hidden="true"></i> 科研经历</h2>
    <div class="resume-rule"></div>
    {% for item in resume.research %}
    <article class="resume-experience">
      <div class="resume-experience-heading">
        <h3>{{ item.title }}</h3>
        <p>{{ item.venue }}</p>
      </div>
      <p class="resume-description">{{ item.detail }}</p>
    </article>
    {% endfor %}
  </section>

  <section class="resume-section">
    <h2><i class="fas fa-laptop" aria-hidden="true"></i> 项目经历</h2>
    <div class="resume-rule"></div>
    <article class="resume-experience">
      <div class="resume-experience-heading">
        <h3>{{ resume.project.title }}</h3>
        <p>{{ resume.project.meta }}</p>
      </div>
      <p class="resume-description">{{ resume.project.detail }}</p>
    </article>
  </section>

  <section class="resume-section">
    <h2><i class="fas fa-trophy" aria-hidden="true"></i> 竞赛奖项</h2>
    <div class="resume-rule"></div>
    <div class="resume-awards">
      {% for item in resume.competitions %}
      <div class="resume-award-row">
        <strong>{{ item.title }}</strong>
        <span>{{ item.meta }}</span>
      </div>
      {% endfor %}
    </div>
  </section>

  <section class="resume-section">
    <h2><i class="fas fa-award" aria-hidden="true"></i> 荣誉奖项</h2>
    <div class="resume-rule"></div>
    <ul class="resume-honors">
      {% for item in resume.honors %}
      <li>{{ item }}</li>
      {% endfor %}
    </ul>
  </section>

</div>
