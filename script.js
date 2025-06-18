const {
  Engine,
  Render,
  Runner,
  Bodies,
  World,
  Events,
  Mouse,
  MouseConstraint,
} = Matter;

const hautBalance = "./img/hautbalance.svg";
const basBalance = "./img/basBalance.svg";

let btnSelect = "red";
const canvas = document.getElementById("world");
const container = document.querySelector(".relative");

const balanceText = document.querySelector(".balanceText");

let width = container.offsetWidth;
const height = container.offsetHeight;

// Set REAL pixel size for canvas (important pour la netteté)

// Scale canvas display

const pastilleButtons = document.querySelectorAll(".button-pastille");

const buttons = document.querySelectorAll(".button-pastille");

buttons.forEach((button) => {
  const color = button.getAttribute("data-color");

  button.style.color = color;

  button.addEventListener("click", () => {
    // Tout remettre à blanc
    buttons.forEach((btn) => {
      btn.classList.remove("selected");
    });

    // Sélectionner l'élément cliqué
    button.classList.add("selected");
    button.style.color = color;
  });
});

window.decomp = decomp;
const listCloth = {
  hat: [
    {
      name: "casquette",
      img: "./img/hat/bob/canvasbob-red.svg",
      htmlimg: "./img/hat/bob/bob-red.svg",
      pastille: "red",
      kg: 0.15, // 150g
      size: 100,
      part: "hat",
      vetement: "bob"
    },
    {
      name: "casquette",
      img: "./img/hat/bob/canvasbob-blue.svg",
      htmlimg: "./img/hat/bob/bob-blue.svg",
      pastille: "blue",
      kg: 0.15,
      size: 100,
      part: "hat",
      vetement: "bob"
    },
    {
      name: "casquette",
      img: "./img/hat/bob/canvasbob-orange.svg",
      htmlimg: "./img/hat/bob/bob-orange.svg",
      pastille: "orange",
      kg: 0.15,
      size: 100,
      part: "hat",
      vetement: "bob"
    },
    {
      name: "casquette",
      img: "./img/hat/bob/canvasbob-green.svg",
      htmlimg: "./img/hat/bob/bob-green.svg",
      pastille: "vert",
      kg: 0.15,
      size: 100,
      part: "hat",
      vetement: "bob"
    },
    {
      name: "chapeau",
      img: "./img/hat/chapeau/canvaschapeau-green.svg",
      htmlimg: "./img/hat/chapeau/chapeau-green.svg",
      pastille: "vert",
      kg: 0.25, // 250g
      size: 120,
      part: "hat",
      vetement: "chapeau"
    },
    {
      name: "chapeau",
      img: "./img/hat/chapeau/canvaschapeau-orange.svg",
      htmlimg: "./img/hat/chapeau/chapeau-orange.svg",
      pastille: "orange",
      kg: 0.25,
      size: 120,
      part: "hat",
      vetement: "chapeau"
    },
    {
      name: "chapeau",
      img: "./img/hat/chapeau/canvaschapeau-blue.svg",
      htmlimg: "./img/hat/chapeau/chapeau-blue.svg",
      pastille: "blue",
      kg: 0.25,
      size: 120,
      part: "hat",
      vetement: "chapeau"
    },
    {
      name: "chapeau",
      img: "./img/hat/chapeau/canvaschapeau-red.svg",
      htmlimg: "./img/hat/chapeau/chapeau-red.svg",
      pastille: "red",
      kg: 0.25,
      size: 120,
      part: "hat",
      vetement: "chapeau"
    }
  ],
  tshirt: [
    {
      name: "tshirt",
      img: "./img/upperBody/canvastshirt-orange.svg",
      htmlimg: "./img/upperBody/tshirt-orange.svg",
      pastille: "orange",
      kg: 0.18, // 180g
      size: 200,
      part: "upperbody",
      vetement: "tshirt"
    },
    {
      name: "tshirt",
      img: "./img/upperBody/canvastshirt-green.svg",
      htmlimg: "./img/upperBody/tshirt-green.svg",
      pastille: "vert",
      kg: 0.18,
      size: 200,
      part: "upperbody",
      vetement: "tshirt"
    },
    {
      name: "tshirt",
      img: "./img/upperBody/canvastshirt-blue.svg",
      htmlimg: "./img/upperBody/tshirt-blue.svg",
      pastille: "blue",
      kg: 0.18,
      size: 200,
      part: "upperbody",
      vetement: "tshirt"
    },
    {
      name: "tshirt",
      img: "./img/upperBody/canvastshirt-red.svg",
      htmlimg: "./img/upperBody/tshirt-red.svg",
      pastille: "red",
      kg: 0.18,
      size: 200,
      part: "upperbody",
      vetement: "tshirt"
    }
  ],
  pull: [
    {
      name: "pull",
      img: "./img/upperBody/pull/canvaspull-orange.svg",
      htmlimg: "./img/upperBody/pull/pull-orange.svg",
      pastille: "orange",
      kg: 0.45, // 450g
      size: 280,
      part: "upperbody",
      vetement: "pull"
    },
    {
      name: "pull",
      img: "./img/upperBody/pull/canvaspull-red.svg",
      htmlimg: "./img/upperBody/pull/pull-red.svg",
      pastille: "red",
      kg: 0.45,
      size: 280,
      part: "upperbody",
      vetement: "pull"
    },
    {
      name: "pull",
      img: "./img/upperBody/pull/canvaspull-blue.svg",
      htmlimg: "./img/upperBody/pull/pull-blue.svg",
      pastille: "blue",
      kg: 0.45,
      size: 280,
      part: "upperbody",
      vetement: "pull"
    },
    {
      name: "pull",
      img: "./img/upperBody/pull/canvaspull-green.svg",
      htmlimg: "./img/upperBody/pull/pull-green.svg",
      pastille: "vert",
      kg: 0.45,
      size: 280,
      part: "upperbody",
      vetement: "pull"
    }
  ],
  veste: [
    {
      name: "veste",
      img: "./img/upperBody/veste/canvasveste-orange.svg",
      htmlimg: "./img/upperBody/veste/veste-orange.svg",
      pastille: "orange",
      kg: 0.65, // 650g
      size: 280,
      part: "upperbody",
      vetement: "veste"
    },
    {
      name: "veste",
      img: "./img/upperBody/veste/canvasveste-red.svg",
      htmlimg: "./img/upperBody/veste/veste-red.svg",
      pastille: "red",
      kg: 0.65,
      size: 280,
      part: "upperbody",
      vetement: "veste"
    },
    {
      name: "veste",
      img: "./img/upperBody/veste/canvasveste-blue.svg",
      htmlimg: "./img/upperBody/veste/veste-blue.svg",
      pastille: "blue",
      kg: 0.65,
      size: 280,
      part: "upperbody",
      vetement: "veste"
    },
    {
      name: "veste",
      img: "./img/upperBody/veste/canvasveste-green.svg",
      htmlimg: "./img/upperBody/veste/veste-green.svg",
      pastille: "vert",
      kg: 0.65,
      size: 280,
      part: "upperbody",
      vetement: "veste"
    }
  ],
  pantalon: [
    {
      name: "short",
      img: "./img/lowerBody/short/canvasshort-green.svg",
      htmlimg: "./img/lowerBody/short/short-green.svg",
      pastille: "vert",
      kg: 0.25, // 250g
      size: 140,
      part: "lowerbody",
      vetement: "short"
    },
    {
      name: "short",
      img: "./img/lowerBody/short/canvasshort-red.svg",
      htmlimg: "./img/lowerBody/short/short-red.svg",
      pastille: "red",
      kg: 0.25,
      size: 140,
      part: "lowerbody",
      vetement: "short"
    },
    {
      name: "short",
      img: "./img/lowerBody/short/canvasshort-orange.svg",
      htmlimg: "./img/lowerBody/short/short-orange.svg",
      pastille: "orange",
      kg: 0.25,
      size: 140,
      part: "lowerbody",
      vetement: "short"
    },
    {
      name: "short",
      img: "./img/lowerBody/short/canvasshort-blue.svg",
      htmlimg: "./img/lowerBody/short/short-blue.svg",
      pastille: "blue",
      kg: 0.25,
      size: 140,
      part: "lowerbody",
      vetement: "short"
    },
    {
      name: "jean",
      img: "./img/lowerBody/canvasjean-blue.svg",
      htmlimg: "./img/lowerBody/jean-blue.svg",
      pastille: "blue",
      kg: 0.8, // 800g
      size: 180,
      part: "lowerbody",
      vetement: "jean"
    },
    {
      name: "jean",
      img: "./img/lowerBody/canvasjean-green.svg",
      htmlimg: "./img/lowerBody/jean-green.svg",
      pastille: "vert",
      kg: 0.8,
      size: 180,
      part: "lowerbody",
      vetement: "jean"
    },
    {
      name: "jean",
      img: "./img/lowerBody/canvasjean-red.svg",
      htmlimg: "./img/lowerBody/jean-red.svg",
      pastille: "red",
      kg: 0.8,
      size: 180,
      part: "lowerbody",
      vetement: "jean"
    },
    {
      name: "jean",
      img: "./img/lowerBody/canvasjean-orange.svg",
      htmlimg: "./img/lowerBody/jean-orange.svg",
      pastille: "orange",
      kg: 0.8,
      size: 180,
      part: "lowerbody",
      vetement: "jean"
    },
    {
      name: "jupe",
      img: "./img/lowerBody/jupe/canvasjupe-blue.svg",
      htmlimg: "./img/lowerBody/jupe/jupe-blue.svg",
      pastille: "blue",
      kg: 0.4, // 400g
      size: 180,
      part: "lowerbody",
      vetement: "jupe"
    },
    {
      name: "jupe",
      img: "./img/lowerBody/jupe/canvasjupe-green.svg",
      htmlimg: "./img/lowerBody/jupe/jupe-green.svg",
      pastille: "vert",
      kg: 0.4,
      size: 180,
      part: "lowerbody",
      vetement: "jupe"
    },
    {
      name: "jupe",
      img: "./img/lowerBody/jupe/canvasjupe-red.svg",
      htmlimg: "./img/lowerBody/jupe/jupe-red.svg",
      pastille: "red",
      kg: 0.4,
      size: 180,
      part: "lowerbody",
      vetement: "jupe"
    },
    {
      name: "jupe",
      img: "./img/lowerBody/jupe/canvasjupe-orange.svg",
      htmlimg: "./img/lowerBody/jupe/jupe-orange.svg",
      pastille: "orange",
      kg: 0.4,
      size: 180,
      part: "lowerbody",
      vetement: "jupe"
    }
  ],
  shoes: [
    {
      name: "chaussures",
      img: "./img/shoes/canvasshoes-red.svg",
      htmlimg: "./img/shoes/shoes-red.svg",
      pastille: "red",
      kg: 0.6, // 600g la paire
      size: 150,
      part: "shoes",
      vetement: "shoes"
    },
    {
      name: "chaussures",
      img: "./img/shoes/canvasshoes-blue.svg",
      htmlimg: "./img/shoes/shoes-blue.svg",
      pastille: "blue",
      kg: 0.6,
      size: 150,
      part: "shoes",
      vetement: "shoes"
    },
    {
      name: "chaussures",
      img: "./img/shoes/canvasshoes-green.svg",
      htmlimg: "./img/shoes/shoes-green.svg",
      pastille: "vert",
      kg: 0.6,
      size: 150,
      part: "shoes",
      vetement: "shoes"
    },
    {
      name: "chaussures",
      img: "./img/shoes/canvasshoes-orange.svg",
      htmlimg: "./img/shoes/shoes-orange.svg",
      pastille: "orange",
      kg: 0.6,
      size: 150,
      part: "shoes",
      vetement: "shoes"
    }
  ]
};
// Initialisation de Matter
const engine = Engine.create();
const world = engine.world;
const render = Matter.Render.create({
  canvas: canvas,
  engine: engine,
  options: {
    width: width,
    height: 600,
    background: "transparent",
    wireframes: false,
  },
});

Render.run(render);
Runner.run(Runner.create(), engine);

// Sol et structure
// const ground = Matter.Bodies.rectangle(0, 590, 4000, 30, { isStatic: true });
let sacBase = Matter.Bodies.rectangle(
  width / 3,
  490,
  balanceText.getBoundingClientRect().width,
  26,
  {
    isStatic: true,
    render: { visible: false },
  }
);
let balanceGround = Matter.Bodies.rectangle(width / 1.5, 440, 280, 26, {
  isStatic: true,
  render: { fillStyle: "#0059F7" },
});
let balance = Matter.Bodies.rectangle(width / 1.5, 465, 90, 25, {
  isStatic: true,
  render: { fillStyle: "#0059F7" },
});
function updateCanvasSize() {
  const width = container.offsetWidth;
  // canvas.width = width * window.devicePixelRatio;
  // // canvas.height = height * window.devicePixelRatio;
  canvas.width = width;

  // render.canvas.width = canvas.width;
  // render.options.width = canvas.width;
}

// 🎮 Drag souris
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: { visible: false },
  },
});
World.add(world, mouseConstraint);

render.mouse = mouse;
engine.gravity.y = 4;

World.add(world, [sacBase, balanceGround, balance]);

render.canvas.addEventListener(
  "wheel",
  function (e) {
    e.stopPropagation(); // Empêche Matter.js d’intercepter
    // NE PAS mettre e.preventDefault(); ici
  },
  { passive: true }
); // passive = on autorise le scroll
// Capteur de balance
const balanceSensor = Matter.Bodies.rectangle(width / 1.5, 388, 280, 80, {
  isStatic: true,
  isSensor: true,
  render: { visible: true, fillStyle: "#0000001c" },
});
World.add(world, balanceSensor);
function repositionElements() {
  const width = container.offsetWidth;
  const isSmall = width <= 730;
  const centerX = width / 2;
  const balanceX = isSmall ? centerX : width / 1.5;
  const rect = balanceText.getBoundingClientRect();

  Matter.Body.setPosition(sacBase, { x: centerX, y: 490 });

  Matter.Body.setVertices(
    sacBase,
    Matter.Vertices.fromPath(`0 0 ${rect.width} 0 ${rect.width} 25 0 25`)
  );

  Matter.Body.setPosition(balanceGround, { x: balanceX, y: 440 });
  Matter.Body.setPosition(balance, { x: balanceX, y: 465 });
  Matter.Body.setPosition(balanceSensor, { x: balanceX, y: 388 });
}

// Lier les deux ensemble
function handleResize() {
  updateCanvasSize();
  repositionElements();
}

window.addEventListener("resize", handleResize);

// Appel initial
handleResize();
// 🔁 Fonction pour transformer un path SVG en vertices
function parsePathToVertices(path, sampleLength = 2) {
  const svgNS = "http://www.w3.org/2000/svg";
  const tempPath = document.createElementNS(svgNS, "path");
  tempPath.setAttribute("d", path);
  document.body.appendChild(tempPath); // requis pour getTotalLength()

  const totalLength = tempPath.getTotalLength();
  const vertices = [];

  for (let i = 0; i <= totalLength; i += sampleLength) {
    const point = tempPath.getPointAtLength(i);
    vertices.push({ x: point.x, y: point.y });
  }

  tempPath.remove(); // clean-up
  return vertices;
}

// Path simplifié du t-shirt (sans les courbes complexes)

function createImage(
  x,
  y,
  targetWidth,
  targetHeight,
  imagePath,
  kg,
  pastille,
  options = {}
) {
  // Charger l'image pour obtenir ses dimensions réelles
  const img = new Image();
  img.src = imagePath;

  // Attendre que l'image soit chargée
  return new Promise((resolve) => {
    img.onload = () => {
      // Calculer le ratio d'aspect original
      const originalAspectRatio = img.width / img.height;
      const targetAspectRatio = targetWidth / targetHeight;

      let finalWidth, finalHeight;

      // Ajuster les dimensions pour conserver les proportions
      if (originalAspectRatio > targetAspectRatio) {
        // L'image est plus large que la cible - ajuster la hauteur
        finalWidth = targetWidth;
        finalHeight = targetWidth / originalAspectRatio;
      } else {
        // L'image est plus haute que la cible - ajuster la largeur
        finalHeight = targetHeight;

        finalWidth = targetHeight * originalAspectRatio;
      }

      // Créer le corps physique avec les dimensions ajustées
      const body = Bodies.rectangle(x, y, finalWidth, finalHeight, {
        render: {
          sprite: {
            texture: imagePath,
            xScale: finalWidth / img.width,
            yScale: finalHeight / img.height,
          },
          lineWidth: 6,
        },
        kg,
        pastille,
        objectId: "obj_" + Date.now() + Math.random().toString(36).substr(2, 9),
        isMainObject: true,
      });

      World.add(world, body);
      resolve(body);
    };
  });
}

// 🎯 Gestion des collisions
const objetsDansBalance = new Map(); // Changé de Set à Map

Events.on(engine, "collisionStart", function (event) {
  event.pairs.forEach(({ bodyA, bodyB }) => {
    if (bodyA === balanceSensor && bodyB.isMainObject) {
      objetsDansBalance.set(bodyB.objectId, bodyB);
    } else if (bodyB === balanceSensor && bodyA.isMainObject) {
      objetsDansBalance.set(bodyA.objectId, bodyA);
    }
  });
});

Events.on(engine, "collisionEnd", function (event) {
  event.pairs.forEach(({ bodyA, bodyB }) => {
    if (
      bodyA === balanceSensor &&
      bodyB.objectId &&
      objetsDansBalance.has(bodyB.objectId)
    ) {
      objetsDansBalance.delete(bodyB.objectId);
    } else if (
      bodyB === balanceSensor &&
      bodyA.objectId &&
      objetsDansBalance.has(bodyA.objectId)
    ) {
      objetsDansBalance.delete(bodyA.objectId);
    }
  });
});

// 👆 Clic sur canvas pour ajouter un t-shirt
let isDragging = false;
let isLoading = false; // 🔒 nouveau flag

render.canvas.addEventListener("mousedown", () => {
  isDragging = false;
});
render.canvas.addEventListener("mousemove", () => {
  isDragging = true;
});

// 📊 Mise à jour UI
const poid = document.querySelector("#poid");
const prix = document.querySelector("#prix");

// const nombreRed = document.querySelector("#nombreRed");
// const poidRed = document.querySelector("#poidRed");
// const prixRed = document.querySelector("#prixRed");

// const nombreBlue = document.querySelector("#nombreBlue");
// const poidBlue = document.querySelector("#poidBlue");
// const prixBlue = document.querySelector("#prixBlue");

// const slider = document.querySelector('#balanceSlider');
// const sliderOutput = document.querySelector('#sliderOutput');

function updateUI() {
  const objetsUniques = Array.from(objetsDansBalance.values());

  const pastilles = ["blue", "red", "orange", "vert"];
  const prixParKg = { blue: 40, red: 20, orange: 60, vert: 30 };

  const poidsParCouleur = Object.fromEntries(
    pastilles.map((couleur) => {
      const poids = objetsUniques
        .filter((item) => item.pastille === couleur)
        .reduce((sum, item) => sum + (item.kg || 0), 0);
      return [couleur, poids];
    })
  );

  const totalPoids = pastilles.reduce(
    (sum, couleur) => sum + poidsParCouleur[couleur],
    0
  );
  const totalPrix = pastilles.reduce(
    (sum, couleur) => sum + poidsParCouleur[couleur] * prixParKg[couleur],
    0
  );

  poid.textContent = totalPoids.toFixed(2);
  prix.textContent = totalPrix.toFixed(2);

  // if (totalPoids >= 10) {
  //   alert("Poids maximum atteint ! Redirection...");
  //   setTimeout(() => {
  //     window.location.href = "./error404.html";
  //   }, 1000);
  // }
  // nombreBlue.textContent = `Nombre d'objets : ${objetsBleus.length}`;
  // poidBlue.textContent = `Poids total : ${objetsBleus.reduce((sum, obj) => sum + (obj.kg || 0), 0)} kg`;

  // nombreRed.textContent = `Nombre d'objets : ${objetsRouges.length}`;
  // poidRed.textContent = `Poids total : ${objetsRouges.reduce((sum, obj) => sum + (obj.kg || 0), 0)} kg`;
  // prixRed.textContent = `Prix total : ${objetsRouges.reduce((sum, obj) => sum + (obj.kg || 0), 0)*20} €`;

  const maxPoids = 10;
  // slider.value = totalPoids;
  // sliderOutput.textContent = `${totalPoids} kg / 100 kg`;

  const needle = document.querySelector("#needle");
  const minAngle = -30;
  const maxAngle = 45;
  const angle = Math.min(
    maxAngle,
    minAngle + (totalPoids / maxPoids) * (maxAngle - minAngle)
  );
  needle.style.transform = `rotate(${angle}deg)`;
}

render.canvas.addEventListener("mouseup", async (event) => {
  if (isDragging || isLoading) return; // ⛔️ si drag ou en cours, on ignore

  isLoading = true; // 🔒 on bloque les nouveaux clics
  let vetement;
  let width;
  const rect = render.canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;


    const redItems = Object.values(listCloth)
      .flat()
      .filter((item) => item.pastille === btnSelect);

    const item = redItems[Math.floor(Math.random() * redItems.length)];
    if (item.vetement == "jean") {
      (vetement = 255), (width = 145);
    }
    if (item.vetement == "tshirt") (vetement = 220), (width = 120);
    if (item.vetement == "hat") (vetement = 120), (width = 60);
    if (item.vetement == "shoes") (vetement = 120), (width = 60);
    await createImage(
      x,
      y,
      item.size,
      item.size,
      item.img,
      item.kg,
      item.pastille,
      vetement
    );
  
  

  isLoading = false; // 🔓 prêt pour un nouveau clic
});

setInterval(updateUI, 100);

// 🎨 Boutons rouge / bleu
document
  .querySelector("#red")
  .addEventListener("click", () => (btnSelect = "red"));
document
  .querySelector("#blue")
  .addEventListener("click", () => (btnSelect = "blue"));
document
  .querySelector("#orange")
  .addEventListener("click", () => (btnSelect = "orange"));
document
  .querySelector("#vert")
  .addEventListener("click", () => (btnSelect = "vert"));

const sectionBalance = document.querySelector(".balance");

const selectedCloth = [
  {
    img: listCloth.pantalon[0].img,
    htmlimg: listCloth.pantalon[0].htmlimg,
    kg: listCloth.pantalon[0].kg,
    width: listCloth.pantalon[0].width,
    height: listCloth.pantalon[0].height,
    size: listCloth.pantalon[0].size,
    pastille: listCloth.pantalon[0].pastille,
    vetement: "jean",
    part: "lowerbody",
  },

  {
    img: listCloth.tshirt[0].img,
    htmlimg: listCloth.tshirt[0].htmlimg,
    kg: listCloth.tshirt[0].kg,
    pastille: listCloth.tshirt[0].pastille,
    vetement: "tshirt",
    part: "upperbody",

    size: listCloth.tshirt[0].size,
    width: listCloth.tshirt[0].width,
    height: listCloth.tshirt[0].height,
  },
  {
    img: listCloth.hat[0].img,
    htmlimg: listCloth.hat[0].htmlimg,
    pastille: listCloth.hat[0].pastille,
    kg: listCloth.hat[0].kg,
    vetement: "hat",
    part: "hat",

    size: listCloth.hat[0].size,
    width: listCloth.hat[0].width,
    height: listCloth.hat[0].height,
  },
  {
    part: "shoes",

    img: listCloth.pantalon[0].img,
    htmlimg: listCloth.pantalon[0].htmlimg,
    pastille: listCloth.shoes[0].pastille,
    kg: listCloth.shoes[0].kg,
    size: listCloth.shoes[0].size,
    vetement: "shoes",
    width: listCloth.shoes[0].width,
    height: listCloth.shoes[0].height,
  },
];

// const validerTenue = document.getElementById("validerTenue");
const hatImage = document.getElementById("hatImage");
const upperBodyImage = document.getElementById("upperBodyImage");
const lowerBodyImage = document.getElementById("upperBodyImage");
const shoesImage = document.getElementById("upperBodyImage");

const hatTexte = document.getElementById("hatTexte");
const upperBodyText = document.getElementById("upperBodyText");
const lowerBodyText = document.getElementById("lowerBodyText");
const shoesText = document.getElementById("shoesText");

let currentIndex = 0;

let hasValidatedOnScroll = false;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasValidatedOnScroll) {
        validerTenue();
        hasValidatedOnScroll = true;
        observer.unobserve(entry.target); // Arrête d'observer après déclenchement
      }
    });
  },
  { threshold: 0.8 }
); // Se déclenche quand 80% de l'élément est visible

observer.observe(document.querySelector(".balance"));

// Modifiez votre fonction de validation pour éviter les déclenchements multiples
let isValidationInProgress = false;

async function validerTenue() {
  const isSmall = width <= 730;
  const centerX = width / 2;
  const balanceX = isSmall ? centerX : width / 1.5;
  const creationDelay = 200; // ms entre chaque création

  if (isValidationInProgress) return;
  isValidationInProgress = true;

  try {
    // Définir l'ordre et les paramètres pour chaque type de vêtement
    const clothingOrder = [
      // { type: 'shoes', size: 145, vetement: 255 },
      { type: "shoes" },
      { type: "lowerbody" },
      { type: "upperbody" },
      { type: "hat" },
    ];
    console.log(selectedCloth);

    for (const clothing of clothingOrder) {
      const item = selectedCloth.find((i) => i.part === clothing.type);

      if (item) {
        await createImage(
          balanceX,
          20,

          item.size,
          item.size,
          item.img,
          item.kg,
          item.pastille,
          item.vetement
        );

        await new Promise((resolve) => setTimeout(resolve, creationDelay));
      }
    }
  } catch (error) {
    console.error("Erreur lors de la création de la tenue:", error);
  } finally {
    isValidationInProgress = false;
  }
}
const clothingParts = {
  hat: {
    list: listCloth.hat,
    imageEl: document.getElementById("hatImage"),
    textEl: document.getElementById("hatTexte"),
    index: 0,
    selectedIndex: 0,
    clothIndex: 0, // index dans selectedCloth
  },
  tshirt: {
    list: listCloth.tshirt,
    imageEl: document.getElementById("upperBodyImage"),
    textEl: document.getElementById("upperBodyText"),
    nextBtn: document.getElementById("nextTshirt"),
    prevBtn: document.getElementById("prevTshirt"),
    index: 0,
    selectedIndex: 0,
    clothIndex: 1,
  },
  pantalon: {
    list: listCloth.pantalon,
    imageEl: document.getElementById("lowerBodyImage"),
    textEl: document.getElementById("lowerBodyText"),
    index: 0,
    selectedIndex: 0,
    clothIndex: 2,
  },
  shoes: {
    list: listCloth.shoes, // à remplir plus tard si besoin
    imageEl: document.getElementById("shoesImage"),
    textEl: document.getElementById("shoesText"),
    index: 0,
    selectedIndex: 0,
    clothIndex: 3,
  },
};
let upperBody
function setupClothingNavigation(partName) {
  const part = clothingParts[partName];
console.log(upperBody);

const updateUI = () => {
    const item = part.list[part.index];
    if (!item) return;
    part.imageEl.className = "";

    // Mettre à jour l'image dans l'UI
    part.imageEl.src = item.htmlimg;

    if (item.vetement) {
            if (item.part === 'upperbody'){
              upperBody=item.vetement
            }
      if (item.part === 'lowerbody'){
        console.log(upperBody);
        part.imageEl.classList.toggle(`${upperBody}img`);
        
      }
      part.imageEl.classList.add(item.vetement);
      // console.log("Classe ajoutée :", item.vetement);
    }
    // Mettre à jour l'objet sélectionné
    selectedCloth[part.clothIndex] = {
      img: item.img, // Image pour Matter.js
      htmlimg: item.htmlimg, // Image pour l'affichage HTML
      kg: item.kg,
      pastille: item.pastille,
      vetement: item.vetement,
      part: item.part,
      size: item.size || 100, // Valeur par défaut si size n'existe pas
      width: item.width || item.size || 100,
      height: item.height || item.size || 100,
    };
  };

  // Initialisation
  updateUI();

  // Retourner la fonction de navigation
  return () => {
    part.index = (part.index + 1) % part.list.length;
    updateUI();
  };
}
Object.keys(clothingParts).forEach(setupClothingNavigation);
const navigateHat = setupClothingNavigation("hat");
const navigateTshirt = setupClothingNavigation("tshirt");
const navigatePantalon = setupClothingNavigation("pantalon");
const navigateShoes = setupClothingNavigation("shoes");
function scrollNextClothing() {
  const partName = clothingOrder[scrollStep];

  switch (partName) {
    case "hat":
      navigateHat();
      break;
    case "tshirt":
      navigateTshirt();
      break;
    case "pantalon":
      navigatePantalon();
      break;
    case "shoes":
      navigateShoes();
      break;
  }

  // Prépare l'étape suivante
  scrollStep = (scrollStep + 1) % clothingOrder.length;
}

// Fonction pour supprimer tous les vêtements
// Fonction corrigée pour supprimer tous les vêtements
function supprimerTousLesVetements() {
  // Récupérer tous les corps dans le monde avec la bonne méthode
  const allBodies = world.bodies; // Utilisez world.bodies au lieu de World.allBodies()

  // Filtrer pour ne garder que les vêtements (objets avec isMainObject)
  const vetements = allBodies.filter((body) => body.isMainObject);

  // Supprimer chaque vêtement du monde
  World.remove(world, vetements);

  // Vider la map des objets dans la balance
  objetsDansBalance.clear();

  // Mettre à jour l'UI
  updateUI();
}

// Ajouter l'événement au bouton
// document.getElementById('supprimerVetements').addEventListener('click', supprimerTousLesVetements);

// Ordre de scroll : hat -> tshirt -> pantalon -> shoes
const clothingOrder = ["hat", "tshirt", "pantalon", "shoes"];
let scrollStep = 0; // index dans l'ordre
let isScrolling = false;
let touchStartY = 0;

// Événement tactile pour mobile
document.querySelector(".section1").addEventListener("touchstart", (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

document.querySelector(".section1").addEventListener("touchend", (e) => {
  const touchEndY = e.changedTouches[0].clientY;
  const deltaY = touchStartY - touchEndY;

  const section = document.querySelector(".section1");
  const rect = section.getBoundingClientRect();
  const isInView = rect.top < window.innerHeight && rect.bottom > 0;

  if (!isInView || isScrolling || deltaY <= 30) return; // Doit swiper vers le haut (> 30px)

  isScrolling = true;
  scrollNextClothing();

  setTimeout(() => {
    isScrolling = false;
  }, 300); // un peu plus long pour éviter les swipes involontaires
}, { passive: true });

// L’événement wheel reste utile pour desktop
document.querySelector(".section1").addEventListener("wheel", (e) => {
  const section = document.querySelector(".section1");
  const rect = section.getBoundingClientRect();
  const isInView = rect.top < window.innerHeight && rect.bottom > 0;

  if (!isInView || isScrolling || e.deltaY <= 0) return;

  isScrolling = true;
  scrollNextClothing();

  setTimeout(() => {
    isScrolling = false;
  }, 50);
}, { passive: true });


// const cursor = document.getElementById("custom-cursor");

// document.addEventListener("mousemove", (e) => {
//   cursor.style.top = `${e.clientY}px`;
//   cursor.style.left = `${e.clientX}px`;
// });

const pastilleData = [
  {
    color: "red",
    title: "Rouge",
    price: "20",
  },
  {
    color: "green",
    title: "Vert",
    price: "30",
  },
  {
    color: "blue",
    title: "Bleu",
    price: "40",
  },
  {
    color: "orange",
    title: "Orange",
    price: "60",
  },
];

// Sélectionne le container
const pastilleExplicationGrid = document.querySelector(
  ".pastille-explication-grid"
);

// Crée les éléments dynamiquement
pastilleData.forEach(({ color, title, price, hasButton }) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("pastille-explication");

  const img = document.createElement("img");
  img.src = `./img/pastille/pastille-${color}.svg`;
  img.alt = `pastille-${color}`;
console.log(color);

  const bg = document.createElement("div");
  bg.classList.add("pastille-bg");

  const h4 = document.createElement("h4");
  h4.textContent = title;
  h4.setAttribute("data-i18n", `pastille_${color}_title`);  // <-- ici on ajoute l'attribut


  // const button = document.createElement("button");
  // button.classList.add("exemple");
  // button.textContent = "Exemple";

  const colorDiv = document.createElement("div");
  colorDiv.classList.add("colorDiv");
  colorDiv.style.backgroundColor = `var(--pastille-${color})`; // la classe dynamique

  const p = document.createElement("p");
  p.textContent = `${price}€ par kilo`;
  p.classList.add("p-pastille");
    p.setAttribute("data-i18n", `pastille_${color}_text`);  // <-- ici on ajoute l'attribut

  // Ajout des éléments dans la structure
  bg.appendChild(h4);
  // bg.appendChild(button);

  bg.appendChild(colorDiv);
  bg.appendChild(p);

  wrapper.appendChild(img);
  wrapper.appendChild(bg);
  pastilleExplicationGrid.appendChild(wrapper);
});

document.querySelector(".blue-exemple").addEventListener("click", async () => {
  // Supprimer les vêtements existants
  supprimerTousLesVetements();
  // Ajouter 3 vêtements bleus
  const itemCloth = Object.values(listCloth)
    .flat()
    .filter((item) => item.pastille === "blue");

  for (let i = 0; i < 3; i++) {
    const item = itemCloth[Math.floor(Math.random() * itemCloth.length)];
    const x = 100 + i * 100; // espacement horizontal
    const y = 100; // hauteur fixe
    await createImage(500, 0, item.img, item.kg, "blue");
  }

  updateUI(); // mettre à jour le poids/prix
});
