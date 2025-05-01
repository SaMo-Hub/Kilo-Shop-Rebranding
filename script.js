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
const width = container.offsetWidth;
const height = container.offsetHeight;

// Set REAL pixel size for canvas (important pour la netteté)
canvas.width = width * window.devicePixelRatio;

// Scale canvas display
canvas.style.width = width + "px";


const pastilleButtons = document.querySelectorAll(".button-pastille");

pastilleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    btnSelect = button.dataset.color;

    pastilleButtons.forEach((btn) => btn.classList.remove("selected"));
    button.classList.add("selected");
  });
});

window.decomp = decomp;
const listCloth = {
  hat: [
    {
      name: "casquette",
      img: "./img/hat/casquette.svg",
      pastille: "red",
      kg: 0.18,
    },
    {
      name: "casquette",
      img: "./img/hat/casquetterouge.svg",
      pastille: "blue",
      kg: 0.18,
    },
    {
      name: "casquette",
      img: "./img/hat/casquettebleu.svg",
      pastille: "red",
      kg: 0.18,
    },
    {
      name: "casquette",
      img: "./img/hat/casquettejaune.svg",
      pastille: "red",
      kg: 0.18,
    },
    {
      name: "casquette",
      img: "./img/hat/casquetterose.svg",
      pastille: "red",
      kg: 0.18,
    },
    {
      name: "casquette",
      img: "./img/hat/casquetteviolet.svg",
      pastille: "red",
      kg: 0.18,
    },
    {
      name: "Chapeau",
      img: "./img/hat/casquettevert.svg",
      pastille: "red",
      kg: 0.18,
    },
  ],
  tshirt: [
    {
      name: "Tshirt Rouge",
      img: "./img/upperBody/tshirt.svg",
      pastille: "red",
      kg: 0.15,
    },
    {
      name: "jaune",
      img: "./img/upperBody/tshirtjaune.svg",
      pastille: "blue",
      kg: 0.15,
    },
    {
      name: "vert",
      img: "./img/upperBody/tshirtvert.svg",
      pastille: "red",
      kg: 0.15,
    },
    {
      name: "Veste",
      img: "./img/veste.svg",
      pastille: "red",
      kg: 0.8,
    },
  ],
  pantalon: [
    {
      name: "rose",
      img: "./img/lowerBody/pantalonbleu.svg",
      pastille: "red",
      kg: 0.8,
    },
    {
      name: "jaune",
      img: "./img/lowerBody/pantalonjaune.svg",
      pastille: "blue",
      kg: 0.8,
    },
    {
      name: "vert",
      img: "./img/lowerBody/pantalonrouge.svg",
      pastille: "vert",
      kg: 0.8,
    },
    {
      name: "vert",
      img: "./img/lowerBody/pantalonvert.svg",
      pastille: "vert",
      kg: 0.8,
    },
  ],
  shoes:[
    {name:"Chaussere", img:"./img/shoes/chaussure.svg", pastille:"orange", kg:0.560},
    {name:"Chaussere", img:"./img/shoes/chaussureBleu.svg", pastille:"vert", kg:0.560},
    {name:"Chaussere", img:"./img/shoes/chaussureRouge.svg", pastille:"rouge", kg:0.560},
  ]
};
// Initialisation de Matter
const engine = Engine.create();
const world = engine.world;
const render = Matter.Render.create({
  canvas: canvas,
  engine: engine,
  options: {
    width: canvas.width,
    height: 600,
    pixelRatio: window.devicePixelRatio,
    background: "transparent",
    wireframes: false
  }
});

Render.run(render);
Runner.run(Runner.create(), engine);

// Sol et structure
// const ground = Matter.Bodies.rectangle(0, 590, 4000, 30, { isStatic: true });
let sacBase = Matter.Bodies.rectangle(width / 2, 490, width * 0.8, 26, {
  isStatic: true,
  render: { visible: true },
});
let balanceGround = Matter.Bodies.rectangle(width / 1.5, 440, 300, 25, {
  isStatic: true,
  render: { fillStyle: "#82BC43" },
});
let balance = Matter.Bodies.rectangle(width / 1.5, 465, 90, 25, {
  isStatic: true,
  render: { fillStyle: "#FBBB28" },
});
function updateCanvasSize() {
  const width = container.offsetWidth;
  console.log(width);
  
  canvas.width = width * window.devicePixelRatio;
  // canvas.height = height * window.devicePixelRatio;
  canvas.style.width = width + "px";

  render.canvas.width = canvas.width;
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
engine.gravity.y = 1;

World.add(world, [sacBase, balanceGround, balance]);


// Capteur de balance
const balanceSensor = Matter.Bodies.rectangle(width / 1.5, 388, 300, 80, {
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

  Matter.Body.setPosition(sacBase, { x: centerX, y: 490 });
  Matter.Body.setVertices(sacBase, Matter.Vertices.fromPath(`0 0 ${width * 0.8} 0 ${width * 0.8} 26 0 26`));

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
// handleResize();
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

function createImage(x, y, imagePath, kg, pastille, options = {}) {
  
  const { scale = 0.25, pathData } = options;
  return fetch(imagePath)
    .then((res) => res.text())
    .then((svgText) => {
      const pathMatch =
        pathData || svgText.match(/<path[^>]*d="([^"]+)"/i)?.[1];
      if (!pathMatch) throw new Error("Pas de path trouvé dans le SVG !");

      const pathEl = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );

      pathEl.setAttribute("d", pathMatch);
      document.body.appendChild(pathEl);

      const totalLength = pathEl.getTotalLength();
      const rawVertices = [];

      for (let i = 0; i <= totalLength; i += 1) {
        const pt = pathEl.getPointAtLength(i);
        rawVertices.push({ x: pt.x * scale, y: pt.y * scale });
      }

      document.body.removeChild(pathEl);

      // Créer un ID unique pour cet objet
      const uniqueId =
        "obj_" + Date.now() + Math.random().toString(36).substr(2, 9);

      const body = Bodies.fromVertices(
        x,
        y,
        [rawVertices],
        {
          render: {
            texture: imagePath,
          },

          kg,
          pastille,
          objectId: uniqueId,
          isMainObject: true,
        },
        true
      );

      body.render.sprite = {
        xScale: scale,
        yScale: scale,
      };
      World.add(world, body);

      return body;
    })
    .catch((err) => {
      console.error("Erreur lors de la création de l'image :", err);
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
  pastilles.map(couleur => {
    const poids = objetsUniques
      .filter((item) => item.pastille === couleur)
      .reduce((sum, item) => sum + (item.kg || 0), 0);
    return [couleur, poids];
  })
);

const totalPoids = pastilles.reduce((sum, couleur) => sum + poidsParCouleur[couleur], 0);
const totalPrix = pastilles.reduce((sum, couleur) => sum + poidsParCouleur[couleur] * prixParKg[couleur], 0);

poid.textContent = totalPoids.toFixed(2);
prix.textContent = totalPrix.toFixed(2);


if (totalPoids >= 10) {
  alert("Poids maximum atteint ! Redirection...");
  setTimeout(() => {
    window.location.href = "./error404.html";
  }, 1000);
}
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

  const rect = render.canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  if (btnSelect === "red") {
    const redItems = Object.values(listCloth)
      .flat()
      .filter((item) => item.pastille === "red");

    const item = redItems[Math.floor(Math.random() * redItems.length)];
    await createImage(x, y, item.img, item.kg, "red"); // ✅ attendre la fin
  } 
   if (btnSelect === "blue") {
    const blueItems = Object.values(listCloth)
      .flat()
      .filter((item) => item.pastille === "blue");
    
    const item = blueItems[Math.floor(Math.random() * blueItems.length)];
    await createImage(x, y, item.img, item.kg, "blue");
  }
   if (btnSelect === "orange") {
    const blueItems = Object.values(listCloth)
      .flat()
      .filter((item) => item.pastille === "orange");
    
    const item = blueItems[Math.floor(Math.random() * blueItems.length)];
    await createImage(x, y, item.img, item.kg, "orange");
  }
   if (btnSelect === "vert") {
    const blueItems = Object.values(listCloth)
      .flat()
      .filter((item) => item.pastille === "vert");
    console.log(blueItems);
    
    const item = blueItems[Math.floor(Math.random() * blueItems.length)];
    await createImage(x, y, item.img, item.kg, "vert");
  }

  isLoading = false; // 🔓 prêt pour un nouveau clic
});

setInterval(updateUI, 100);

// 🎨 Boutons rouge / bleu
document.querySelector("#red").addEventListener("click", () => (btnSelect = "red"));
document
  .querySelector("#blue")
  .addEventListener("click", () => (btnSelect = "blue"));
document
  .querySelector("#blue")
  .addEventListener("click", () => (btnSelect = "blue"));
document
  .querySelector("#vert")
  .addEventListener("click", () => (btnSelect = "vert"));

const sectionBalance = document.querySelector(".balance");




const selectedCloth = [
  {
    img: "listCloth.hat[0].img" ,
    pastille: listCloth.hat[0].pastille,
    kg: listCloth.hat[0].kg,
  },

  {
    img: "listCloth.tshirt[0].img",
    kg: listCloth.tshirt[0].kg,
    pastille: listCloth.tshirt[0].pastille
  },
  {
    img: listCloth.pantalon[0].img,
    kg: listCloth.pantalon[0].kg,
    pastille: listCloth.pantalon[0].pastille
  },
  {
    img: listCloth.shoes[0].img,
    kg: listCloth.shoes[0].kg,
    pastille: listCloth.shoes[0].pastille
  },
];

const validerTenue = document.getElementById("validerTenue");
const hatImage = document.getElementById("hatImage");
const upperBodyImage = document.getElementById("upperBodyImage");
const lowerBodyImage = document.getElementById("upperBodyImage");
const shoesImage = document.getElementById("upperBodyImage");

const hatTexte = document.getElementById("hatTexte");
const upperBodyText = document.getElementById("upperBodyText");
const lowerBodyText = document.getElementById("lowerBodyText");
const shoesText = document.getElementById("shoesText");

const nextHat = document.getElementById("nextHat");
const nextTshirt = document.getElementById("nextTshirt");
const nextLower = document.getElementById("nextLower");
const nextShoes = document.getElementById("nextShoes");

const prevHat = document.getElementById("prevHat");
const prevTshirt = document.getElementById("prevTshirt");
const prevLower = document.getElementById("prevLower");
const prevShoes = document.getElementById("prevShoes");
// Liste des chemins vers les images des chapeaux
let currentIndex = 0;

let hasValidatedOnScroll = false;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasValidatedOnScroll) {
        validerTenue.click();
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

validerTenue.addEventListener("click", async () => {
  if (isValidationInProgress) return;
  isValidationInProgress = true;

  try {
    for (const item of selectedCloth) {
      console.log(item,"dgffg");
      
      await createImage(520, 20, item.img, item.kg, item.pastille);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  } finally {
    isValidationInProgress = false;
  }
});
const clothingParts = {
  hat: {
    list: listCloth.hat,
    imageEl: document.getElementById("hatImage"),
    textEl: document.getElementById("hatTexte"),
    nextBtn: document.getElementById("nextHat"),
    prevBtn: document.getElementById("prevHat"),
    index: 0,
    selectedIndex: 0,
    clothIndex: 0 // index dans selectedCloth
  },
  tshirt: {
    list: listCloth.tshirt,
    imageEl: document.getElementById("upperBodyImage"),
    textEl: document.getElementById("upperBodyText"),
    nextBtn: document.getElementById("nextTshirt"),
    prevBtn: document.getElementById("prevTshirt"),
    index: 0,
    selectedIndex: 0,
    clothIndex: 1
  },
  pantalon: {
    list: listCloth.pantalon,
    imageEl: document.getElementById("lowerBodyImage"),
    textEl: document.getElementById("lowerBodyText"),
    nextBtn: document.getElementById("nextLower"),
    prevBtn: document.getElementById("prevLower"),
    index: 0,
    selectedIndex: 0,
    clothIndex: 2
  },
  shoes: {
    list: listCloth.shoes, // à remplir plus tard si besoin
    imageEl: document.getElementById("shoesImage"),
    textEl: document.getElementById("shoesText"),
    nextBtn: document.getElementById("nextShoes"),
    prevBtn: document.getElementById("prevShoes"),
    index: 0,
    selectedIndex: 0,
    clothIndex: 3
  }
};


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
      pastille:item.pastille
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

  updateUI(); // Initialisation
}

Object.keys(clothingParts).forEach(setupClothingNavigation);

// Fonction pour supprimer tous les vêtements
// Fonction corrigée pour supprimer tous les vêtements
function supprimerTousLesVetements() {
  // Récupérer tous les corps dans le monde avec la bonne méthode
  const allBodies = world.bodies; // Utilisez world.bodies au lieu de World.allBodies()
  
  // Filtrer pour ne garder que les vêtements (objets avec isMainObject)
  const vetements = allBodies.filter(body => body.isMainObject);
  
  // Supprimer chaque vêtement du monde
  World.remove(world, vetements);
  
  // Vider la map des objets dans la balance
  objetsDansBalance.clear();
  
  // Mettre à jour l'UI
  updateUI();
}

// Ajouter l'événement au bouton
document.getElementById('supprimerVetements').addEventListener('click', supprimerTousLesVetements);

