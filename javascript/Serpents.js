// // const a = "hola";
// // a = "mundo";

// // let a = "hola";
// // a = "mundo";
// // console.log(a);

// const num = 1;
// const string = "hola";
// const bool = true;

// const arr = [1, "2", bool];
// console.log(num, string, bool, arr);

// const obj = {
//   key1: "value1",
//   key2: "value2",
//   key3: "value3",
//   key4: 5,
//   key5: [1, 2, 3],
//   key6: {
//     nestedKey1: "nestedValue1",
//     nestedKey2: "nestedValue2",
//   },
// };
// console.log(obj);

// const searchKey = "key2";

// console.log(obj.key6.nestedKey1);
// console.log(obj[searchKey]);

// function sum(a, b) {
//   return a + b;
// }

// console.log(sum(521237846843, 3));

// function factorial(n) {
//   let fact = 1;
//   for (let i = n; i > 1; i--) {
//     fact = i * fact;
//   }
//   return fact;
// }

// console.log(factorial(3));
// console.log(factorial(8));

// let i = 0;
// while (i < 10) {
//   console.log("perico de los palotes", i);
//   i++;
// }

// const logo = document.querySelector("img[alt='Logo']");

// logo.addEventListener("click", function () {
//   const mobileDrawer = document.querySelector(".mobile-drawer");
//   const openValue = mobileDrawer.getAttribute("open");
//   console.log(openValue !== null);
// });

const menuData = {
  product: {
    sections: [
      {
        title: 'PRODUCTS',
        layout: 'grid', 
        items: [
          {
            title: 'Database',
            text: 'Fully portable Postgres database',
            to: 'Product.html#database'
          },
          {
            title: 'Authentication',
            text: 'User management out of the box',
            to: 'Product.html#auth'
          },
          {
            title: 'Storage',
            text: 'Serverless storage for any media',
            to: 'Product.html#storage'
          },
          {
            title: 'Edge Functions',
            text: 'Deploy code globally on the edge',
            to: 'Product.html#edge'
          },
          {
            title: 'Realtime',
            text: 'Synchronize and broadcast events',
            to: 'Product.html#realtime'
          }
        ]
      },
      {
        title: 'MODULES',
        layout: 'grid',
        items: [
          { title: 'Vector', text: 'AI embeddings toolkit', to: 'Product.html#vector' },
          { title: 'Cron', text: 'Schedule recurring jobs', to: 'Product.html#cron' },
          { title: 'Queues', text: 'Durable message queues', to: 'Product.html#queues' },
          { title: 'Features', text: 'Explore everything you can do', to: 'Product.html#features' }
        ]
      },
      {
        title: 'CUSTOMER STORIES',
        layout: 'single', 
        items: [
          {
            title: 'Hyper',
            text: 'Hyper builds AI marketing agents on Serpents',
            to: '#customer-stories'
          }
        ]
      },
      {
        title: 'COMPARE SERPENTS',
        layout: 'links',
        items: [
          { title: 'Serpents vs Firebase', to: '#vs-firebase' },
          { title: 'Serpents vs Heroku Postgres', to: '#vs-heroku' },
          { title: 'Serpents vs Auth', to: '#vs-aut0' }
        ]
      }
    ]
  },

  developers: {
    sections: [
      {
        title: 'DEVELOPERS',
        layout: 'grid',
        items: [
          { title: 'Docs', text: 'Learn the API step by step', to: 'Developers.html#docs' },
          { title: 'Examples', text: 'Starter kits and templates', to: 'Developers.html#examples' },
          { title: 'CLI', text: 'Manage projects from the terminal', to: 'Developers.html#cli' },
          { title: 'Community', text: 'Join the Discord & GitHub', to: 'Developers.html#community' }
        ]
      }
    ]
  },
  solutions: {
    sections: [
        {
            title: 'SOLUTIONS',
            layout: 'grid',
            items: [
                { title: 'AI Builders', text: 'animal fiero', to: 'Solutions.html#aibuilders'},
                { title: 'No Code', text: 'fierce pussy', to: 'Solutions.html#nocode'},
                { title: 'Beginners', text: 'fierce pussy', to: 'Solutions.html#beginners'},
                { title: 'Developers', text: 'fierce pussy', to: 'Solutions.html#developers'},
                { title: 'Postgres Devs', text: 'fierce pussy', to: 'Solutions.html#postgres'},
                { title: 'Vibe Coders', text: 'fierce pussy', to: 'Solutions.html#vibes'}
            ]
        }
    ]
  },
  pricing: {
    sections: [
        {
            title: 'PRICING',
            layout: 'grid',
            items: [
                { title: 'B2b SaaS', text: 'animal fiero', to: 'Pricing.html#b2bsaas'},
                { title: 'FinServ', text: 'fierce pussy', to: 'Pricing.html#finserv'},
                 { title: 'Healthcare', text: 'fierce pussy', to: 'Pricing.html#healthcare'},
                  { title: 'Agents', text: 'fierce pussy', to: 'Pricing.html#agents'}
            ]
        }
    ]
  },
  docs: {
    sections: [
        {
            title: 'DOCS',
            layout: 'grid',
            items: [
                { title: 'Switch from Firebaset', text: 'animal fiero', to: 'Docs.html#switch'},
                { title: 'Switch from Neon', text: 'fierce pussy', to: 'Docs.html#neon'}
            ]
        }
    ]
  },
  blog: {
    sections: [
        {
            title: 'BLOG',
            layout: 'grid',
            items: [
                { title: 'Hackton Contestan', text: 'animal fiero', to: 'Blog.html#hackton'},
                { title: 'Startups', text: 'fierce pussy', to: 'Blog.html#startups'},
                { title: 'Agencies', text: 'fierce pussy', to: 'Blog.html#agencies'},
                { title: 'Enterprise', text: 'fierce pussy', to: 'Blog.html#enterprise'},
                { title: 'Innovation Teams', text: 'fierce pussy', to: 'Blog.html#innovation'}
            ]
        }
    ]
  },
};


const navItems = document.querySelectorAll('.nav-item');
const cardHeader = document.querySelector('.card-container');

navItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const menuName = item.dataset.menu.toLowerCase();
    const menu = menuData[menuName];

    if (!menu) return;

    cardHeader.innerHTML = '';

    menu.sections.forEach(section => {
      section.items.forEach(card => {
        const cardElement = createCard(card.title, card.text || '', card.to);
        cardHeader.append(cardElement);
      });
    });

    cardHeader.classList.add('card-container_visible');
  });
});

const header = document.querySelector(".header");

header.addEventListener("mouseleave", () => {
  cardHeader.classList.remove("card-container_visible");
  cardHeader.innerHTML = "";
});

function getCardContainer() {
  return document.querySelector(".card-container");
}

function createCard(title, text, to) {
  const card = document.createElement("div");
  card.className = "card";
  const h3 = document.createElement("h3");
  h3.className = "card-title resaltado";
  h3.innerText = title;
  card.append(h3);
  const p = document.createElement("p");
  p.className = "card-content";
  p.innerText = text;
  card.append(p);

  card.addEventListener("click", () => location.assign(to));

  return card;
}
const btnSignin = document.getElementById('btn-signin');

btnSignin.addEventListener('click', () => {
  window.location.href = 'signin.html';
});






document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll('.feature-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.2
  });

  cards.forEach(card => {
    observer.observe(card);
  });
});


window.addEventListener("load", () => {
  const videoSection = document.getElementById("videoHero");
  const video = document.getElementById("introVideo");

  const soundBtn = document.getElementById("soundBtn");

  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      video.muted = false;
      video.volume = 1;
      soundBtn.style.opacity = "0";
      setTimeout(() => {
        soundBtn.style.display = "none";
      }, 300);
    });
  }

  video.addEventListener("ended", () => {
    videoSection.style.transition = "opacity 1s ease";
    videoSection.style.opacity = "0";

    setTimeout(() => {
      videoSection.style.display = "none";
    }, 1000);
  });

 
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    videoSection.style.opacity = 1 - scrollY / 600;
    videoSection.style.transform = `scale(${1 + scrollY / 3000})`;
  });
});



const drawer = document.querySelector(".mobile-drawer");
const closeBtn = document.querySelector(".drawer-close");
const overlay = document.querySelector(".drawer-overlay");

if (closeBtn && drawer) {
  closeBtn.addEventListener("click", () => {
    drawer.removeAttribute("open");
  });
}

if (overlay && drawer) {
  overlay.addEventListener("click", () => {
    drawer.removeAttribute("open");
  });
}