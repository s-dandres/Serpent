window.initSignInPage = function initSignInPage() {
  const dvdArea = document.querySelector(".logo-area");
  const form = document.querySelector(".auth-form");

  if (!dvdArea) {
    return null;
  }

  const logos = [];
  const logoCount = 5;
  let rafId = 0;
  let submitHandler = null;

  dvdArea.innerHTML = "";

  for (let index = 0; index < logoCount; index += 1) {
    const image = document.createElement("img");

    image.src = "./img/favicon.png";
    image.className = "logo-logo";
    dvdArea.appendChild(image);

    logos.push({
      el: image,
      x: Math.random() * Math.max(dvdArea.clientWidth - 80, 0),
      y: Math.random() * Math.max(dvdArea.clientHeight - 80, 0),
      vx: (Math.random() * 2 + 1) * (Math.random() < 0.5 ? -1 : 1),
      vy: (Math.random() * 2 + 1) * (Math.random() < 0.5 ? -1 : 1),
    });
  }

  function changeColor(element) {
    const hue = Math.random() * 360;
    element.style.filter = `hue-rotate(${hue}deg)`;
  }

  function moveLogos() {
    const areaWidth = dvdArea.clientWidth;
    const areaHeight = dvdArea.clientHeight;

    logos.forEach((logo) => {
      const rect = logo.el.getBoundingClientRect();

      logo.x += logo.vx;
      logo.y += logo.vy;

      if (logo.x + rect.width >= areaWidth || logo.x <= 0) {
        logo.vx *= -1;
        changeColor(logo.el);
      }

      if (logo.y + rect.height >= areaHeight || logo.y <= 0) {
        logo.vy *= -1;
        changeColor(logo.el);
      }

      logo.el.style.transform = `translate(${logo.x}px, ${logo.y}px)`;
    });

    rafId = window.requestAnimationFrame(moveLogos);
  }

  moveLogos();

  if (form) {
    submitHandler = (event) => {
      const button = form.querySelector(".auth-button");

      event.preventDefault();

      if (button) {
        button.textContent = "Demo only";
      }
    };

    form.addEventListener("submit", submitHandler);
  }

  return () => {
    window.cancelAnimationFrame(rafId);

    if (form && submitHandler) {
      form.removeEventListener("submit", submitHandler);
    }
  };
};
