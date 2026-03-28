const routes = {
  "/": {
    template: "./src/pages/Serpents.html",
    title: "Serpents",
    stylesheet: "./css/Serpents.css",
    bodyClass: "",
    chrome: "default",
    init: () => window.initSerpentsPage?.(),
  },
  "/product": {
    template: "./src/pages/Product.html",
    title: "Product - Serpents",
    stylesheet: "./css/Page.css",
    bodyClass: "",
    chrome: "default",
  },
  "/developers": {
    template: "./src/pages/Developers.html",
    title: "Developers - Serpents",
    stylesheet: "./css/Page.css",
    bodyClass: "",
    chrome: "default",
  },
  "/solutions": {
    template: "./src/pages/Solutions.html",
    title: "Solutions - Serpents",
    stylesheet: "./css/Page.css",
    bodyClass: "",
    chrome: "default",
  },
  "/pricing": {
    template: "./src/pages/Pricing.html",
    title: "Pricing - Serpents",
    stylesheet: "./css/Page.css",
    bodyClass: "",
    chrome: "default",
  },
  "/docs": {
    template: "./src/pages/Docs.html",
    title: "Docs - Serpents",
    stylesheet: "./css/Page.css",
    bodyClass: "",
    chrome: "default",
  },
  "/blog": {
    template: "./src/pages/Blog.html",
    title: "Blog - Serpents",
    stylesheet: "./css/Page.css",
    bodyClass: "",
    chrome: "default",
  },
  "/about": {
    template: "./src/pages/About.html",
    title: "About - Serpents",
    stylesheet: "./css/Page.css",
    bodyClass: "",
    chrome: "default",
  },
  "/signin": {
    template: "./src/pages/SignIn.html",
    title: "Sign in - Serpents",
    stylesheet: "./css/SignIn.css",
    bodyClass: "auth-body",
    chrome: "minimal",
    init: () => window.initSignInPage?.(),
  },
  "/terms": {
    template: "./src/pages/Terms.html",
    title: "Terms - Serpents",
    stylesheet: "./css/Terms.css",
    bodyClass: "terms-body",
    chrome: "minimal",
  },
};

const app = document.getElementById("app");
const siteHeader = document.getElementById("site-header");
const siteFooter = document.getElementById("site-footer");
const routeStylesheet = document.getElementById("route-stylesheet");

let cleanupCurrentPage = null;

function getCurrentRoute() {
  const rawHash = window.location.hash.replace(/^#/, "");

  if (!rawHash) {
    return "/";
  }

  return rawHash.startsWith("/") ? rawHash : `/${rawHash}`;
}

function setChromeVisibility(mode) {
  const hidden = mode === "minimal";
  siteHeader.hidden = hidden;
  siteFooter.hidden = hidden;
}

function setActiveNavigation(routePath) {
  document.querySelectorAll(".header-navigation a, .drawer-nav a").forEach((link) => {
    const href = link.getAttribute("href");
    link.classList.toggle("is-active", href === `#${routePath}`);
  });
}

async function loadTemplate(route) {
  const response = await fetch(route.template);

  if (!response.ok) {
    throw new Error(`No se pudo cargar ${route.template}`);
  }

  return response.text();
}

async function renderRoute() {
  const routePath = getCurrentRoute();
  const route = routes[routePath] || routes["/"];

  if (cleanupCurrentPage) {
    cleanupCurrentPage();
    cleanupCurrentPage = null;
  }

  setChromeVisibility(route.chrome);
  setActiveNavigation(routePath);
  document.title = route.title;
  document.body.className = route.bodyClass;
  routeStylesheet.setAttribute("href", route.stylesheet);

  try {
    const template = await loadTemplate(route);
    app.innerHTML = template;
  } catch (error) {
    app.innerHTML = `
      <section class="simple-page">
        <div class="page-hero container">
          <p class="page-kicker">Error</p>
          <h1>No pude cargar la vista.</h1>
          <p class="page-copy">${error.message}</p>
          <div class="page-actions">
            <a href="#/" data-link class="button-primary">Volver al inicio</a>
          </div>
        </div>
      </section>
    `;
  }

  window.scrollTo({ top: 0, left: 0, behavior: "auto" });

  if (typeof route.init === "function") {
    cleanupCurrentPage = route.init() || null;
  }
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-link]");

  if (!link) {
    return;
  }

  const href = link.getAttribute("href");

  if (!href || !href.startsWith("#/")) {
    return;
  }

  event.preventDefault();

  if (window.location.hash === href) {
    renderRoute();
    return;
  }

  window.location.hash = href;
});

window.addEventListener("hashchange", renderRoute);

window.addEventListener("DOMContentLoaded", () => {
  window.initSiteChrome?.();
  renderRoute();
});
