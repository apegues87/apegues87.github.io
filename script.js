"use strict";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function track(name) {
  if (window.goatcounter?.count) {
    window.goatcounter.count({ path: name, title: name, event: true });
  }
}

function sleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function setupReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach((element) => observer.observe(element));
}

function setupPatternCards() {
  document.querySelectorAll(".pattern-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    });

    card.addEventListener("toggle", () => {
      if (card.open) {
        track(`expanded: ${card.dataset.card}`);
      }
    });
  });
}

const routes = {
  recruiting: {
    message: "TL;DR: 20 years experience, differentiated experiences, HR builder",
    spotlight: ["calib"],
    target: "#history"
  },
  "people-leader": {
    message: "Routed → <span class=\"path\">the patterns</span>. These are samples of key project deliverables.",
    spotlight: ["diag", "calib", "gtm", "agentic"],
    target: "#patterns"
  },
  engineer: {
    message: "Start with <span class=\"path\">People OS</span>. Choose a workflow node and run the synthetic demo to see the operating-model concept in motion.",
    spotlight: ["agentic"],
    target: "#peopleos"
  }
};

function setupRouter() {
  const container = document.getElementById("routerBtns");
  const output = document.getElementById("routerOut");
  if (!container || !output) return;

  container.addEventListener("click", (event) => {
    const button = event.target.closest(".router-button");
    if (!button) return;

    container.querySelectorAll(".router-button").forEach((item) => {
      item.setAttribute("aria-pressed", String(item === button));
    });

    const route = routes[button.dataset.route];
    if (!route) return;

    track(`visitor-type: ${button.dataset.route}`);
    output.innerHTML = route.message;

    document.querySelectorAll(".pattern-card").forEach((card) => {
      const isSpotlighted = route.spotlight.includes(card.dataset.card);
      card.classList.toggle("spot", isSpotlighted);
      card.classList.toggle("dimmed", route.spotlight.length > 0 && !isSpotlighted);
    });

    window.setTimeout(() => {
      document.querySelector(route.target)?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start"
      });
    }, reducedMotion ? 0 : 260);
  });
}

const models = {
  "monday-brief": {
    name: "Monday brief",
    cadence: "runs every Monday, 7am",
    description: "A weekly operating brief that assembles calendar pressure, open commitments, aging follow-ups, and decision deadlines before the first meeting begins.",
    steps: [
      ["Step 1", "Gather", "Sweeping the calendar and open items across every workstream."],
      ["Step 2", "Prioritize", "Ranking what is owed versus what is aging. Flagging anomalies."],
      ["Step 3", "Deliver", "One page. Three priorities. Zero surprises by 7:04am."]
    ],
    output: `<strong>Monday, 7:04am: top three</strong>
      <ol>
        <li>Close calibration follow-ups: 2 owed to a VP, aging 6 days</li>
        <li>Review Platform spans: 3 managers now above 11 reports</li>
        <li>Approve Staff backfill offer before Wednesday expiry</li>
      </ol>
      <div class="note">4 lower-priority items deferred to Thursday. Full list attached.</div>`
  },
  "deep-search": {
    name: "Deep search",
    cadence: "runs on demand",
    description: "Institutional memory on tap: answers who owns an issue, where the source lives, and what leaders previously decided across clean-room organizational documents.",
    steps: [
      ["Step 1", "Understand", "Resolving the question: owners, teams, and decision artifacts."],
      ["Step 2", "Search", "Scanning org charters, decision logs, and talent documents."],
      ["Step 3", "Answer", "Owner found, with the decision trail attached."]
    ],
    output: `<div class="artifact-question">Q: “Who owns the leveling rubric for Design?”</div>
      <div style="margin-top:6px;">Maya Chen, Head of Design Ops, per the Design Career Framework v3, ratified March 2025.</div>
      <div class="note">Decision trail: 2 source documents, 1 review thread. Confidence: high.</div>`
  },
  "calibration-prep": {
    name: "Calibration prep",
    cadence: "runs before each review cycle",
    description: "Builds evidence-first calibration pre-reads from performance history, scope changes, and organizational signals so leaders arrive ready to decide.",
    steps: [
      ["Step 1", "Pull signals", "Aggregating ratings history, scope changes, and peer signals."],
      ["Step 2", "Check fairness", "Reviewing distributions across managers and teams."],
      ["Step 3", "Brief", "Per-leader pre-read generated. Evidence first, every time."]
    ],
    output: `<table class="artifact-table">
        <tr><td><strong>Platform</strong></td><td>trend ▲ improving</td><td>no flags</td></tr>
        <tr><td><strong>Growth</strong></td><td>trend ▬ stable</td><td>1 flight risk</td></tr>
        <tr><td><strong>Infra</strong></td><td>trend ▼ slipping</td><td>review spans</td></tr>
      </table>
      <div class="note">Pre-reads generated for 3 leaders. Distribution check: within range.</div>`
  },
  "org-dashboard": {
    name: "Org dashboard",
    cadence: "always refreshing",
    description: "A predictive organizational-health view combining attrition risk, span drift, and succession depth so leaders can intervene before patterns harden.",
    steps: [
      ["Step 1", "Listen", "Streaming HRIS changes, survey pulses, and exit signals."],
      ["Step 2", "Project", "Spotting hotspots two quarters out, not two quarters late."],
      ["Step 3", "Alert", "Two teams trending toward overloaded spans. Routed to owners."]
    ],
    output: `<div class="artifact-tiles">
        <div class="artifact-tile"><strong>4.2%</strong><span>attrition risk<br><i class="positive">▼ 0.8 vs Q2</i></span></div>
        <div class="artifact-tile"><strong>7.3</strong><span>average span<br><i class="warning">2 teams &gt; 11</i></span></div>
        <div class="artifact-tile"><strong>71%</strong><span>succession<br>depth covered</span></div>
      </div>
      <div class="note">Alerts routed to 2 team owners. Next refresh: continuous.</div>`
  },
  "agentic-ea": {
    name: "Agentic EA",
    cadence: "always on",
    description: "An agentic executive assistant for people-operations queues: triage, drafting, scheduling, and follow-through without losing the human decision-maker.",
    steps: [
      ["Step 1", "Triage", "Classifying inbound: urgent, owed, delegate, or decline."],
      ["Step 2", "Draft + route", "Drafting responses, holding time, and looping in owners."],
      ["Step 3", "Follow up", "Three threads aging past their window. Nudges sent."]
    ],
    output: `<div class="artifact-item"><span class="artifact-tag urgent">urgent</span> ER intake routed to the partner on call</div>
      <div class="artifact-item"><span class="artifact-tag owed">owed</span> Comp exception reply, day 3, draft ready for review</div>
      <div class="artifact-item"><span class="artifact-tag routed">routed</span> Onboarding question sent to People Ops</div>
      <div class="artifact-item"><span class="artifact-tag">declined</span> Vendor demo request, polite pass sent</div>`
  },
  "docs-decks": {
    name: "Docs + decks",
    cadence: "runs on demand",
    description: "The translation layer between thinking and persuading: turns raw notes and fragmented threads into executive-ready narratives and decision materials.",
    steps: [
      ["Step 1", "Ingest", "Parsing meeting notes, threads, and half-finished outlines."],
      ["Step 2", "Structure", "Extracting the argument. Moving the punchline to page one."],
      ["Step 3", "Render", "Document and deck generated in house style. Ready for the room."]
    ],
    output: `<strong>Generated: “Platform Org Review, Q3” · document + 6-slide deck</strong>
      <div style="margin-top:6px;">Page-one punchline: consolidate three pods into two; redeploy 4 headcount to agent infrastructure.</div>
      <div class="note">Structure: context → options → recommendation → risks. House style applied.</div>`
  },
  "promo-eval": {
    name: "Promotion evaluation",
    cadence: "runs each promotion cycle",
    description: "Maps promotion evidence against leveling dimensions to make the bar consistent, the gaps visible, and the final judgment explicitly human-owned.",
    steps: [
      ["Step 1", "Map evidence", "Mapping accomplishments to each rubric dimension."],
      ["Step 2", "Find gaps", "Scope: exceeds. Influence: meets. Craft: strong signal."],
      ["Step 3", "Draft", "Assessment written with citations to real work. Calibrated."]
    ],
    output: `<strong>Candidate L6-042: readiness scorecard</strong>
      <table class="artifact-table" style="margin-top:6px;">
        <tr><td>Scope</td><td>▰▰▰▰▱</td><td>exceeds</td></tr>
        <tr><td>Influence</td><td>▰▰▰▱▱</td><td>meets</td></tr>
        <tr><td>Craft</td><td>▰▰▰▰▱</td><td>strong</td></tr>
      </table>
      <div class="note">Recommendation: ready, with one evidence gap to document: cross-organizational influence.</div>`
  }
};

function setupPeopleOS() {
  const log = document.getElementById("log");
  const modelName = document.getElementById("modelName");
  const modelCadence = document.getElementById("modelCadence");
  const modelDescription = document.getElementById("modelDesc");
  const executeButton = document.getElementById("execBtn");
  const artifact = document.getElementById("artifact");
  const runStatus = document.getElementById("runStatus");
  const orbit = document.getElementById("orbit");

  if (!log || !modelName || !modelCadence || !modelDescription || !executeButton || !artifact || !runStatus || !orbit) return;

  let activeModel = "monday-brief";
  let runToken = 0;

  function setActiveState(key) {
    document.querySelectorAll("[data-model]").forEach((control) => {
      control.setAttribute("aria-pressed", String(control.dataset.model === key));
    });
  }

  function loadModel(key) {
    const model = models[key];
    if (!model) return;

    activeModel = key;
    runToken += 1;
    modelName.textContent = model.name;
    modelCadence.textContent = model.cadence;
    modelDescription.textContent = model.description;
    log.innerHTML = '<div class="meta">Press run to see the workflow. Every name and data point is synthetic.</div>';
    artifact.classList.remove("show");
    artifact.replaceChildren();
    executeButton.disabled = false;
    executeButton.innerHTML = 'Run clean-room demo <span aria-hidden="true">▶</span>';
    runStatus.textContent = `${model.name} loaded.`;
    setActiveState(key);
  }

  function appendLine(html) {
    const line = document.createElement("div");
    line.innerHTML = html;
    log.appendChild(line);
    log.scrollTop = log.scrollHeight;
  }

  async function typeLine(html, speed = 13) {
    if (reducedMotion) {
      appendLine(html);
      return;
    }

    const line = document.createElement("div");
    const temporary = document.createElement("div");
    temporary.innerHTML = html;
    const text = temporary.textContent ?? "";
    log.appendChild(line);

    for (let index = 0; index <= text.length; index += 1) {
      line.textContent = text.slice(0, index);
      log.scrollTop = log.scrollHeight;
      await sleep(speed);
    }

    line.innerHTML = html;
  }

  orbit.addEventListener("click", (event) => {
    const control = event.target.closest("[data-model]");
    if (!control) return;
    loadModel(control.dataset.model);
  });

  executeButton.addEventListener("click", async () => {
    const token = ++runToken;
    const model = models[activeModel];
    if (!model) return;

    track(`demo-run: ${activeModel}`);
    executeButton.disabled = true;
    executeButton.textContent = "Running…";
    runStatus.textContent = `${model.name} demo running.`;
    log.replaceChildren();
    artifact.classList.remove("show");

    for (const [step, title, body] of model.steps) {
      if (token !== runToken) return;
      await typeLine(`<span class="step">[${step}]</span> <span class="body">${title}</span>`);
      if (token !== runToken) return;
      await typeLine(`<span class="meta">→</span> <span class="body">${body}</span>`, 7);
      await sleep(reducedMotion ? 0 : 210);
    }

    if (token !== runToken) return;
    await typeLine('<span class="ok">✓ Run complete</span> <span class="meta">(synthetic output below)</span>', 7);
    artifact.innerHTML = `<div class="artifact-head"><strong>Output</strong><span>synthetic · Northwind Robotics</span></div><div class="artifact-body">${model.output}</div>`;
    window.requestAnimationFrame(() => artifact.classList.add("show"));
    executeButton.disabled = false;
    executeButton.innerHTML = 'Run clean-room demo <span aria-hidden="true">▶</span>';
    runStatus.textContent = `${model.name} demo complete. Synthetic output is now visible.`;
  });

  function fitOrbit() {
    const pane = orbit.parentElement;
    if (!pane) return;
    const availableWidth = pane.clientWidth - 16;
    const scale = Math.max(0.56, Math.min(1, availableWidth / 405));
    orbit.style.transform = `scale(${scale})`;
    const shrink = 190 * (1 - scale);
    orbit.style.marginTop = `${-shrink}px`;
    orbit.style.marginBottom = `${-shrink}px`;
  }

  if ("ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver(() => window.requestAnimationFrame(fitOrbit));
    resizeObserver.observe(orbit.parentElement);
  } else {
    window.addEventListener("resize", fitOrbit);
  }

  fitOrbit();
  loadModel(activeModel);
}

function setupStickyRouter() {
  const nav = document.getElementById("routerNav");
  const sentinel = document.getElementById("navSentinel");
  if (!nav || !sentinel || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(([entry]) => {
    nav.classList.toggle("stuck", !entry.isIntersecting);
  });
  observer.observe(sentinel);
}

function setupResumeFallback() {
  const resumeLink = document.querySelector("[data-resume]");
  if (!resumeLink || window.location.protocol === "file:") return;

  fetch(resumeLink.href, { method: "HEAD", cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error("Resume file is not present.");
    })
    .catch(() => {
      resumeLink.href = "mailto:amanda.pegues@gmail.com?subject=Resume%20request";
      resumeLink.removeAttribute("download");
      resumeLink.innerHTML = 'Request résumé <span aria-hidden="true">↗</span>';
    });
}

function setupTracking() {
  document.querySelectorAll("[data-track]").forEach((link) => {
    link.addEventListener("click", () => track(link.dataset.track));
  });
}

function setupYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
}

setupReveal();
setupPatternCards();
setupRouter();
setupPeopleOS();
setupStickyRouter();
setupResumeFallback();
setupTracking();
setupYear();
