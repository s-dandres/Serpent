const menuData = {
  product: [
    {
      title: "Database",
      text: "Postgres portable y listo para usar.",
      to: "#/product",
    },
    {
      title: "Authentication",
      text: "Login y permisos.",
      to: "#/product",
    },
    {
      title: "Storage",
      text: "Archivos, imagenes y media.",
      to: "#/product",
    },
  ],
  developers: [
    {
      title: "Docs",
      text: "Guias.",
      to: "#/docs",
    },
    {
      title: "Examples",
      text: "Vistas pequenas.",
      to: "#/developers",
    },
    {
      title: "CLI",
      text: "Ideas para crecer.",
      to: "#/developers",
    },
  ],
  solutions: [
    {
      title: "AI Builders",
      text: "Base comun para ideas de producto distintas.",
      to: "#/solutions",
    },
    {
      title: "No Code",
      text: "Una interfaz simple.",
      to: "#/solutions",
    },
    {
      title: "Beginners",
      text: "Rutas simples.",
      to: "#/solutions",
    },
  ],
  pricing: [
    {
      title: "Starter",
      text: "Lo minimo.",
      to: "#/pricing",
    },
    {
      title: "Growth",
      text: "Mas recursos.",
      to: "#/pricing",
    },
    {
      title: "Enterprise",
      text: "Control, seguridad y soporte.",
      to: "#/pricing",
    },
  ],
  docs: [
    {
      title: "Getting Started",
      text: "Como funciona.",
      to: "#/docs",
    },
    {
      title: "Routing",
      text: "ouououo.",
      to: "#/docs",
    },
    {
      title: "Styling",
      text: "Viste a la moda",
      to: "#/docs",
    },
  ],
  blog: [
    {
      title: "Build Notes",
      text: "Para que crees",
      to: "#/blog",
    },
    {
      title: "Design Notes",
      text: "Para que las diseñes",
      to: "#/blog",
    },
    {
      title: "Next Steps",
      text: "Ideas para pensar.",
      to: "#/blog",
    },
  ],
};

let siteChromeInitialized = false;

function createCard(title, text, to) {
  const card = document.createElement("div");
  const heading = document.createElement("h3");
  const copy = document.createElement("p");

  card.className = "card";
  heading.className = "card-title resaltado";
  heading.textContent = title;
  copy.className = "card-content";
  copy.textContent = text;

  card.append(heading, copy);
  card.addEventListener("click", () => {
    window.location.hash = to;
  });

  return card;
}

window.initSiteChrome = function initSiteChrome() {
  if (siteChromeInitialized) {
    return;
  }

  const drawer = document.querySelector(".mobile-drawer");
  const closeButton = document.querySelector(".drawer-close");
  const overlay = document.querySelector(".drawer-overlay");
  const navItems = document.querySelectorAll(".nav-item");
  const cardContainer = document.querySelector(".card-container");
  const siteHeader = document.querySelector(".site-header");

  if (closeButton && drawer) {
    closeButton.addEventListener("click", () => {
      drawer.removeAttribute("open");
    });
  }

  if (overlay && drawer) {
    overlay.addEventListener("click", () => {
      drawer.removeAttribute("open");
    });
  }

  document.querySelectorAll(".drawer-nav a, .drawer-actions a").forEach((link) => {
    link.addEventListener("click", () => {
      drawer?.removeAttribute("open");
    });
  });

  navItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const menu = menuData[item.dataset.menu.toLowerCase()];

      if (!menu || !cardContainer) {
        return;
      }

      cardContainer.innerHTML = "";
      menu.forEach((entry) => {
        cardContainer.append(createCard(entry.title, entry.text, entry.to));
      });
      cardContainer.classList.add("card-container_visible");
    });
  });

  if (siteHeader && cardContainer) {
    siteHeader.addEventListener("mouseleave", () => {
      cardContainer.classList.remove("card-container_visible");
      cardContainer.innerHTML = "";
    });
  }

  siteChromeInitialized = true;
};

window.initSerpentsPage = function initSerpentsPage() {
  const cards = document.querySelectorAll(".feature-card");
  const video = document.getElementById("introVideo");
  const soundButton = document.getElementById("soundBtn");
  const observers = [];
  let soundHandler = null;

  if (cards.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 },
    );

    cards.forEach((card) => {
      card.classList.add("hidden");
      observer.observe(card);
    });

    observers.push(observer);
  }

  if (video && soundButton) {
    video.muted = true;
    video.volume = 0;
    soundButton.textContent = "Activar sonido";

    soundHandler = () => {
      const nextMutedState = !video.muted;
      video.muted = nextMutedState;
      video.volume = nextMutedState ? 0 : 1;
      soundButton.textContent = nextMutedState ? "Activar sonido" : "Silenciar";
    };

    soundButton.addEventListener("click", soundHandler);
  }

  return () => {
    observers.forEach((observer) => observer.disconnect());

    if (soundButton && soundHandler) {
      soundButton.removeEventListener("click", soundHandler);
    }
  };
};
