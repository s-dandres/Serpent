const dvdArea = document.querySelector('.logo-area');

const LOGO_COUNT = 5; 

const logos = [];

for (let i = 0; i < LOGO_COUNT; i++) {

  const img = document.createElement('img');
  img.src = "../img/favicon.png";
  img.className = "logo-logo";

  dvdArea.appendChild(img);

  logos.push({
    el: img,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() * 2 + 1) * (Math.random() < 0.5 ? -1 : 1),
    vy: (Math.random() * 2 + 1) * (Math.random() < 0.5 ? -1 : 1)
  });
}

function changeColor(el){
  const hue = Math.random() * 360;
  el.style.filter = `hue-rotate(${hue}deg)`;
}

function moveLogos(){

  const areaWidth = dvdArea.clientWidth;
  const areaHeight = dvdArea.clientHeight;

  logos.forEach(logo => {

    const rect = logo.el.getBoundingClientRect();

    logo.x += logo.vx;
    logo.y += logo.vy;

    if (logo.x + rect.width >= areaWidth || logo.x <= 0){
      logo.vx *= -1;
      changeColor(logo.el);
    }

    if (logo.y + rect.height >= areaHeight || logo.y <= 0){
      logo.vy *= -1;
      changeColor(logo.el);
    }

    logo.el.style.transform = `translate(${logo.x}px, ${logo.y}px)`;
  });

  requestAnimationFrame(moveLogos);
}

moveLogos();