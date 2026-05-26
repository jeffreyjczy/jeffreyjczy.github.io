const app = document.querySelector("#app");
let projects = [];

const escapeHtml = (value = "") =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const normalizeRoute = () => window.location.hash.replace(/^#\/?/, "") || "";

const projectRoute = (slug) => `#/projects/${encodeURIComponent(slug)}`;

const tagMarkup = (tags = []) =>
  tags.map((tag) => `<span class="badge">${escapeHtml(tag)}</span>`).join("");

function renderHome() {
  app.innerHTML = `
    <section class="hero">
      <div>
        <h1>University work, cleaned up and easy to revisit.</h1>
        <p>
          A simple project portfolio for coursework, experiments, and React builds.
          Add a new entry to <strong>projects.json</strong>, place the project folder in
          this repository, and it will appear here automatically.
        </p>
      </div>
    </section>

    <section aria-labelledby="projects-heading">
      <div class="toolbar">
        <h2 id="projects-heading">Projects</h2>
        <input class="search" type="search" placeholder="Search projects" aria-label="Search projects">
      </div>
      <div class="project-grid" id="projectGrid"></div>
    </section>
  `;

  const input = app.querySelector(".search");
  input.addEventListener("input", () => renderProjectCards(input.value));
  renderProjectCards("");
}

function renderProjectCards(query) {
  const grid = app.querySelector("#projectGrid");
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = projects.filter((project) => {
    const haystack = [
      project.title,
      project.summary,
      project.category,
      ...(project.tags || [])
    ].join(" ").toLowerCase();
    return haystack.includes(normalizedQuery);
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty">No projects match that search.</div>`;
    return;
  }

  grid.innerHTML = filtered.map((project) => `
    <a class="project-card" href="${projectRoute(project.slug)}">
      <div>
        <span class="category">${escapeHtml(project.category)}</span>
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.summary)}</p>
      </div>
      <div>
        <div class="badge-row">${tagMarkup(project.tags)}</div>
        <p class="card-link">Open project</p>
      </div>
    </a>
  `).join("");
}

function renderProject(slug) {
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    app.innerHTML = `
      <section class="project-detail">
        <p><a class="button" href="#/">Back to projects</a></p>
        <div class="empty">Project not found.</div>
      </section>
    `;
    return;
  }

  const sourceButton = project.sourceUrl
    ? `<a class="button" href="${escapeHtml(project.sourceUrl)}">Source code</a>`
    : "";

  app.innerHTML = `
    <section class="project-detail">
      <div class="detail-head">
        <div>
          <p><a class="button" href="#/">Back to projects</a></p>
          <span class="category">${escapeHtml(project.category)}</span>
          <h1>${escapeHtml(project.title)}</h1>
          <p>${escapeHtml(project.summary)}</p>
          <div class="badge-row">${tagMarkup(project.tags)}</div>
        </div>
        <div class="actions">
          <a class="button primary" href="${escapeHtml(project.path)}">Open full page</a>
          ${sourceButton}
        </div>
      </div>
      <iframe class="preview-frame" title="${escapeHtml(project.title)} preview" src="${escapeHtml(project.path)}"></iframe>
    </section>
  `;
}

function route() {
  const current = normalizeRoute();
  const match = current.match(/^projects\/([^/]+)$/);

  if (match) {
    renderProject(decodeURIComponent(match[1]));
    return;
  }

  renderHome();
}

fetch("projects.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Unable to load projects.json");
    }
    return response.json();
  })
  .then((data) => {
    projects = data;
    route();
  })
  .catch((error) => {
    app.innerHTML = `<div class="empty">${escapeHtml(error.message)}</div>`;
  });

window.addEventListener("hashchange", route);
