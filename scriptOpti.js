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

// Configuration initiale
const config = {
  images: {
    hautBalance: "./img/hautbalance.svg",
    basBalance: "./img/basBalance.svg"
  },
  prixParKg: { blue: 40, red: 20, orange: 60, vert: 30 },
  pastilles: ["blue", "red", "orange", "vert"],
  maxPoids: 10,
  balance: {
    angle: { min: -30, max: 45 }
  }
};

// Éléments DOM
const domElements = {
  canvas: document.getElementById("world"),
  container: document.querySelector(".relative"),
  balanceText: document.querySelector(".balanceText"),
  pastilleButtons: document.querySelectorAll(".button-pastille"),
  poid: document.querySelector("#poid"),
  prix: document.querySelector("#prix"),
  needle: document.querySelector("#needle"),
  sectionBalance: document.querySelector(".balance"),
  validerTenue: document.getElementById("validerTenue"),
  supprimerVetements: document.getElementById("supprimerVetements"),
  blueExemple: document.querySelector(".blue-exemple")
};

// Variables d'état
let state = {
  btnSelect: "red",
  isLoading: false,
  isDragging: false,
  hasValidatedOnScroll: false,
  isValidationInProgress: false
};

// Initialisation de Matter
const engine = Engine.create();
const world = engine.world;
const render = Matter.Render.create({
  canvas: domElements.canvas,
  engine: engine,
  options: {
    width: domElements.container.offsetWidth,
    height: 600,
    background: "transparent",
    wireframes: false
  }
});

Render.run(render);
Runner.run(Runner.create(), engine);

// Corps physiques
const physicsBodies = {
  sacBase: Bodies.rectangle(
    domElements.container.offsetWidth / 2, 
    490, 
    domElements.balanceText.getBoundingClientRect().width, 
    26, 
    { isStatic: true, render: { visible: false } }
  ),
  balanceGround: Bodies.rectangle(
    domElements.container.offsetWidth / 1.5, 
    440, 
    300, 
    25, 
    { isStatic: true, render: { fillStyle: "#82BC43" } }
  ),
  balance: Bodies.rectangle(
    domElements.container.offsetWidth / 1.5, 
    465, 
    90, 
    25, 
    { isStatic: true, render: { fillStyle: "#FBBB28" } }
  ),
  balanceSensor: Bodies.rectangle(
    domElements.container.offsetWidth / 1.5, 
    388, 
    300, 
    80, 
    { isStatic: true, isSensor: true, render: { visible: true, fillStyle: "#0000001c" } }
  )
};

World.add(world, [
  physicsBodies.sacBase, 
  physicsBodies.balanceGround, 
  physicsBodies.balance,
  physicsBodies.balanceSensor
]);

// Configuration des vêtements
const listCloth = {
  hat: [
    { name: "casquette", img: "./img/hat/casquette.svg", pastille: "red", kg: 0.18 },
    { name: "casquette", img: "./img/hat/casquetterouge.svg", pastille: "blue", kg: 0.18 },
    { name: "casquette", img: "./img/hat/casquettebleu.svg", pastille: "red", kg: 0.18 },
    { name: "casquette", img: "./img/hat/casquettejaune.svg", pastille: "red", kg: 0.18 },
    { name: "casquette", img: "./img/hat/casquetterose.svg", pastille: "red", kg: 0.18 },
    { name: "casquette", img: "./img/hat/casquetteviolet.svg", pastille: "red", kg: 0.18 },
    { name: "Chapeau", img: "./img/hat/casquettevert.svg", pastille: "red", kg: 0.18 }
  ],
  tshirt: [
    { name: "Tshirt Rouge", img: "./img/upperBody/tshirt.svg", pastille: "red", kg: 0.15 },
    { name: "jaune", img: "./img/upperBody/tshirtjaune.svg", pastille: "blue", kg: 0.15 },
    { name: "vert", img: "./img/upperBody/tshirtvert.svg", pastille: "red", kg: 0.15 },
    { name: "Veste", img: "./img/veste.svg", pastille: "red", kg: 0.8 }
  ],
  pantalon: [
    { name: "rose", img: "./img/lowerBody/pantalonbleu.svg", pastille: "red", kg: 0.8 },
    { name: "jaune", img: "./img/lowerBody/pantalonjaune.svg", pastille: "blue", kg: 0.8 },
    { name: "vert", img: "./img/lowerBody/pantalonrouge.svg", pastille: "vert", kg: 0.8 },
    { name: "vert", img: "./img/lowerBody/pantalonvert.svg", pastille: "vert", kg: 0.8 }
  ],
  shoes: [
    { name: "Chaussere", img: "./img/shoes/chaussure.svg", pastille: "orange", kg: 0.560 },
    { name: "Chaussere", img: "./img/shoes/chaussureBleu.svg", pastille: "vert", kg: 0.560 },
    { name: "Chaussere", img: "./img/shoes/chaussureRouge.svg", pastille: "rouge", kg: 0.560 }
  ]
};

// Gestion des vêtements sélectionnés
const selectedCloth = [
  { img: listCloth.hat[0].img, pastille: listCloth.hat[0].pastille, kg: listCloth.hat[0].kg },
  { img: listCloth.tshirt[0].img, kg: listCloth.tshirt[0].kg, pastille: listCloth.tshirt[0].pastille },
  { img: listCloth.pantalon[0].img, kg: listCloth.pantalon[0].kg, pastille: listCloth.pantalon[0].pastille },
  { img: listCloth.shoes[0].img, kg: listCloth.shoes[0].kg, pastille: listCloth.shoes[0].pastille }
];

// Configuration des parties de vêtements
const clothingParts = {
  hat: {
    list: listCloth.hat,
    imageEl: document.getElementById("hatImage"),
    textEl: document.getElementById("hatTexte"),
    nextBtn: document.getElementById("nextHat"),
    prevBtn: document.getElementById("prevHat"),
    index: 0,
    clothIndex: 0
  },
  tshirt: {
    list: listCloth.tshirt,
    imageEl: document.getElementById("upperBodyImage"),
    textEl: document.getElementById("upperBodyText"),
    nextBtn: document.getElementById("nextTshirt"),
    prevBtn: document.getElementById("prevTshirt"),
    index: 0,
    clothIndex: 1
  },
  pantalon: {
    list: listCloth.pantalon,
    imageEl: document.getElementById("lowerBodyImage"),
    textEl: document.getElementById("lowerBodyText"),
    nextBtn: document.getElementById("nextLower"),
    prevBtn: document.getElementById("prevLower"),
    index: 0,
    clothIndex: 2
  },
  shoes: {
    list: listCloth.shoes,
    imageEl: document.getElementById("shoesImage"),
    textEl: document.getElementById("shoesText"),
    nextBtn: document.getElementById("nextShoes"),
    prevBtn: document.getElementById("prevShoes"),
    index: 0,
    clothIndex: 3
  }
};

// Track objects in balance
const objetsDansBalance = new Map();

// Initialisation des événements
function initEvents() {
  // Boutons de pastilles
  domElements.pastilleButtons.forEach(button => {
    button.addEventListener("click", () => {
      state.btnSelect = button.dataset.color;
      domElements.pastilleButtons.forEach(btn => btn.classList.remove("selected"));
      button.classList.add("selected");
    });
  });

  // Contrôle souris
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
  engine.gravity.y = 1;

  // Empêche le scroll de Matter.js
  render.canvas.addEventListener('wheel', e => e.stopPropagation(), { passive: true });

  // Gestion des collisions
  Events.on(engine, "collisionStart", handleCollisionStart);
  Events.on(engine, "collisionEnd", handleCollisionEnd);

  // Gestion du clic pour ajouter des vêtements
  render.canvas.addEventListener("mousedown", () => state.isDragging = false);
  render.canvas.addEventListener("mousemove", () => state.isDragging = true);
  render.canvas.addEventListener("mouseup", handleCanvasClick);

  // Boutons de navigation des vêtements
  Object.keys(clothingParts).forEach(setupClothingNavigation);

  // Boutons d'action
  domElements.validerTenue.addEventListener("click", handleValidateOutfit);
  domElements.supprimerVetements.addEventListener("click", supprimerTousLesVetements);
  domElements.blueExemple.addEventListener("click", addBlueClothesExample);

  // Redimensionnement
  window.addEventListener("resize", handleResize);
}

// Fonctions utilitaires
function updateCanvasSize() {
  const width = domElements.container.offsetWidth;
  domElements.canvas.width = width;
}

function repositionElements() {
  const width = domElements.container.offsetWidth;
  const isSmall = width <= 730;
  const centerX = width / 2;
  const balanceX = isSmall ? centerX : width / 1.5;
  const rect = domElements.balanceText.getBoundingClientRect();

  Matter.Body.setPosition(physicsBodies.sacBase, { x: centerX, y: 490 });
  Matter.Body.setVertices(physicsBodies.sacBase, Matter.Vertices.fromPath(`0 0 ${rect.width} 0 ${rect.width} 20 0 20`));
  Matter.Body.setPosition(physicsBodies.balanceGround, { x: balanceX, y: 440 });
  Matter.Body.setPosition(physicsBodies.balance, { x: balanceX, y: 465 });
  Matter.Body.setPosition(physicsBodies.balanceSensor, { x: balanceX, y: 388 });
}

function handleResize() {
  updateCanvasSize();
  repositionElements();
}

async function createImage(x, y, imagePath, kg, pastille, options = {}) {
  const { scale = 0.25, pathData } = options;
  
  try {
    const res = await fetch(imagePath);
    const svgText = await res.text();
    const pathMatch = pathData || svgText.match(/<path[^>]*d="([^"]+)"/i)?.[1];
    if (!pathMatch) throw new Error("Pas de path trouvé dans le SVG !");

    const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathEl.setAttribute("d", pathMatch);
    document.body.appendChild(pathEl);

    const totalLength = pathEl.getTotalLength();
    const rawVertices = [];

    for (let i = 0; i <= totalLength; i += 1) {
      const pt = pathEl.getPointAtLength(i);
      rawVertices.push({ x: pt.x * scale, y: pt.y * scale });
    }

    document.body.removeChild(pathEl);

    const uniqueId = "obj_" + Date.now() + Math.random().toString(36).substr(2, 9);
    const body = Bodies.fromVertices(
      x, y, [rawVertices],
      {
        render: { texture: imagePath },
        kg,
        pastille,
        objectId: uniqueId,
        isMainObject: true
      },
      true
    );

    body.render.sprite = { xScale: scale, yScale: scale };
    World.add(world, body);
    return body;
  } catch (err) {
    console.error("Erreur lors de la création de l'image :", err);
  }
}

function handleCollisionStart(event) {
  event.pairs.forEach(({ bodyA, bodyB }) => {
    if (bodyA === physicsBodies.balanceSensor && bodyB.isMainObject) {
      objetsDansBalance.set(bodyB.objectId, bodyB);
    } else if (bodyB === physicsBodies.balanceSensor && bodyA.isMainObject) {
      objetsDansBalance.set(bodyA.objectId, bodyA);
    }
  });
}

function handleCollisionEnd(event) {
  event.pairs.forEach(({ bodyA, bodyB }) => {
    if (bodyA === physicsBodies.balanceSensor && bodyB.objectId) {
      objetsDansBalance.delete(bodyB.objectId);
    } else if (bodyB === physicsBodies.balanceSensor && bodyA.objectId) {
      objetsDansBalance.delete(bodyA.objectId);
    }
  });
}

function updateUI() {
  const objetsUniques = Array.from(objetsDansBalance.values());
  
  const poidsParCouleur = Object.fromEntries(
    config.pastilles.map(couleur => {
      const poids = objetsUniques
        .filter(item => item.pastille === couleur)
        .reduce((sum, item) => sum + (item.kg || 0), 0);
      return [couleur, poids];
    })
  );

  const totalPoids = config.pastilles.reduce((sum, couleur) => sum + poidsParCouleur[couleur], 0);
  const totalPrix = config.pastilles.reduce(
    (sum, couleur) => sum + poidsParCouleur[couleur] * config.prixParKg[couleur], 0
  );

  domElements.poid.textContent = totalPoids.toFixed(2);
  domElements.prix.textContent = totalPrix.toFixed(2);

  if (totalPoids >= config.maxPoids) {
    alert("Poids maximum atteint ! Redirection...");
    setTimeout(() => window.location.href = "./error404.html", 1000);
  }

  const angle = Math.min(
    config.balance.angle.max,
    config.balance.angle.min + (totalPoids / config.maxPoids) * 
      (config.balance.angle.max - config.balance.angle.min)
  );
  domElements.needle.style.transform = `rotate(${angle}deg)`;
}

async function handleCanvasClick(event) {
  if (state.isDragging || state.isLoading) return;
  state.isLoading = true;

  const rect = render.canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const items = Object.values(listCloth)
    .flat()
    .filter(item => item.pastille === state.btnSelect);

  if (items.length > 0) {
    const item = items[Math.floor(Math.random() * items.length)];
    await createImage(x, y, item.img, item.kg, state.btnSelect);
  }

  state.isLoading = false;
}

function setupClothingNavigation(partName) {
  const part = clothingParts[partName];

  const updateUI = () => {
    const item = part.list[part.index];
    if (!item) return;
    part.imageEl.src = item.img;
    part.textEl.textContent = `pastille : ${item.pastille}`;
    selectedCloth[part.clothIndex] = {
      img: item.img,
      kg: parseFloat(item.kg || 0),
      pastille: item.pastille
    };
  };

  part.nextBtn.addEventListener("click", () => {
    part.index = (part.index + 1) % part.list.length;
    updateUI();
  });

  part.prevBtn.addEventListener("click", () => {
    part.index = (part.index - 1 + part.list.length) % part.list.length;
    updateUI();
  });

  updateUI();
}

function supprimerTousLesVetements() {
  const vetements = world.bodies.filter(body => body.isMainObject);
  World.remove(world, vetements);
  objetsDansBalance.clear();
  updateUI();
}

async function handleValidateOutfit() {
  if (state.isValidationInProgress) return;
  state.isValidationInProgress = true;

  try {
    for (const item of selectedCloth) {
      await createImage(520, 20, item.img, item.kg, item.pastille);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  } finally {
    state.isValidationInProgress = false;
  }
}

async function addBlueClothesExample() {
  supprimerTousLesVetements();
  const blueItems = Object.values(listCloth)
    .flat()
    .filter(item => item.pastille === "blue");

  for (let i = 0; i < 3; i++) {
    const item = blueItems[Math.floor(Math.random() * blueItems.length)];
    await createImage(500, 0, item.img, item.kg, "blue");
  }
  updateUI();
}

// Initialisation de l'observateur d'intersection
function initIntersectionObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !state.hasValidatedOnScroll) {
          domElements.validerTenue.click();
          state.hasValidatedOnScroll = true;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.8 }
  );

  observer.observe(document.querySelector(".balance"));
}

// Initialisation de l'application
function init() {
  updateCanvasSize();
  initEvents();
  initIntersectionObserver();
  setInterval(updateUI, 100);
}

// Lancement de l'application
init();