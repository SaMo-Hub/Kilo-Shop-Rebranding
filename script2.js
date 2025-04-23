const { Engine, Render, Runner, Bodies, World, Events, Mouse, MouseConstraint } = Matter;

const listPastilleRed = [ 
  {img:"./img/veste.svg", kg:10},
  {img:"./img/tshirt.svg", kg:5},
  // {img:"./img/pantalon.svg",kg:15},
  // {img:"./img/chemise.svg",kg:20},
  // {img:"./img/chaussure.svg",kg:12},
  // {img:"./img/sweatshirt.svg",kg:18},
];
let btnSelect = "red";

// Initialisation de Matter
const engine = Engine.create();
const world = engine.world;

const render = Render.create({
  element: document.body,
  engine: engine,
  canvas: document.getElementById("world"),
  options: {
    width: 800,
    height: 600,
    wireframes: false,
    background: "#f8f8f8",
  },
});

Render.run(render);
Runner.run(Runner.create(), engine);

// Sol et structure
const ground = Bodies.rectangle(400, 590, 810, 20, { isStatic: true });
const sacBase = Bodies.rectangle(350, 500, 500, 20, { isStatic: true });
const sacLeft = Bodies.rectangle(100, 410, 20, 200, { isStatic: true });
const sacRight = Bodies.rectangle(600, 410, 20, 200, { isStatic: true });
World.add(world, [ground, sacBase, sacLeft, sacRight]);

// Capteur de balance
const balanceSensor = Bodies.rectangle(350, 410, 500, 200, {
  isStatic: true,
  isSensor: true,
  render: { visible: true, fillStyle:"#0000001c" },
});
World.add(world, balanceSensor);

async function createImage(x, y, imagePath, kg, pastille, options = {}) {
  const { scale = 0.15 } = options;

  try {
    // Charger le SVG pour extraire le path
    const response = await fetch(imagePath);
    const svgText = await response.text();
    const pathMatch = svgText.match(/<path[^>]*d="([^"]+)"/i)?.[1];
    if (!pathMatch) throw new Error("Pas de path trouvé dans le SVG !");

    // Créer un élément path temporaire pour calculer les vertices
    const svgNS = "http://www.w3.org/2000/svg";
    const pathEl = document.createElementNS(svgNS, "path");
    pathEl.setAttribute("d", pathMatch);
    document.body.appendChild(pathEl);

    const totalLength = pathEl.getPointAtLength(0) && pathEl.getTotalLength();
    const rawVertices = [];

    if (totalLength) {
      for (let i = 0; i <= totalLength; i += 2) {
        const pt = pathEl.getPointAtLength(i);
        rawVertices.push({ x: pt.x * scale, y: pt.y * scale });
      }
    }

    document.body.removeChild(pathEl);

    // Créer un ID unique pour cet objet
    const uniqueId = 'obj_' + Date.now() + Math.random().toString(36).substr(2, 9);

    // Créer le corps physique avec la hitbox précise
    const body = Bodies.fromVertices(x, y, [rawVertices], {
      render: {
        visible: false, // On cache le rendu de la hitbox
      },
      chamfer: { radius: 1 },
      kg,
      pastille,
      objectId: uniqueId,
      isMainObject: true
    }, true);

    // Créer un élément image pour le rendu visuel
    const img = new Image();
    img.src = imagePath;
    await new Promise((resolve) => { img.onload = resolve; });

    // Ajouter un render personnalisé pour afficher seulement l'image
    body.renderCustom = function(ctx) {
      ctx.save();
      ctx.translate(body.position.x, body.position.y);
      ctx.rotate(body.angle);
      ctx.drawImage(
        img, 
        -img.width * scale / 2, 
        -img.height * scale / 2, 
        img.width * scale, 
        img.height * scale
      );
      ctx.restore();
    };

    World.add(world, body);
    return body;
  } catch (err) {
    console.error("Erreur lors de la création de l'image :", err);
  }
}

// Modifier le rendu pour afficher nos éléments custom
const originalRender = render.options.render;
render.options.render = {
  ...originalRender,
  customRenderers: [function(render) {
    const bodies = World.allBodies(engine.world);
    for (const body of bodies) {
      if (body.renderCustom) {
        render.context.save();
        body.renderCustom(render.context);
        render.context.restore();
      }
    }
  }]
};

// 🎯 Gestion des collisions (identique à votre version originale)
const objetsDansBalance = new Map();

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
    if (bodyA === balanceSensor && bodyB.objectId && objetsDansBalance.has(bodyB.objectId)) {
      objetsDansBalance.delete(bodyB.objectId);
    } else if (bodyB === balanceSensor && bodyA.objectId && objetsDansBalance.has(bodyA.objectId)) {
      objetsDansBalance.delete(bodyA.objectId);
    }
  });
});

// 📊 Mise à jour UI (identique à votre version originale)
const nombre = document.querySelector("#nombre");
const poid = document.querySelector("#poid");
const prix = document.querySelector("#prix");

const nombreRed = document.querySelector("#nombreRed");
const poidRed = document.querySelector("#poidRed");
const prixRed = document.querySelector("#prixRed");

const nombreBlue = document.querySelector("#nombreBlue");
const poidBlue = document.querySelector("#poidBlue");
const prixBlue = document.querySelector("#prixBlue");

const slider = document.querySelector('#balanceSlider');
const sliderOutput = document.querySelector('#sliderOutput');

function updateUI() {
  const objetsUniques = Array.from(objetsDansBalance.values());
  const objetsBleus = objetsUniques.filter(obj => obj.pastille === "blue");
  const objetsRouges = objetsUniques.filter(obj => obj.pastille === "red");

  const totalPoids = objetsUniques.reduce((sum, obj) => sum + (obj.kg || 0), 0);
  
  nombre.textContent = `Nombre d'objets : ${objetsUniques.length}`;
  poid.textContent = `Poids total : ${totalPoids} kg`;
  prix.textContent = `Valeur totale : ${totalPoids * 20} €`;
  
  nombreBlue.textContent = `Nombre d'objets : ${objetsBleus.length}`;
  poidBlue.textContent = `Poids total : ${objetsBleus.reduce((sum, obj) => sum + (obj.kg || 0), 0)} kg`;
  
  nombreRed.textContent = `Nombre d'objets : ${objetsRouges.length}`;
  poidRed.textContent = `Poids total : ${objetsRouges.reduce((sum, obj) => sum + (obj.kg || 0), 0)} kg`;

  const maxPoids = 100;
  slider.value = totalPoids;
  sliderOutput.textContent = `${totalPoids} kg / 100 kg`;

  const needle = document.querySelector("#needle");
  const minAngle = -45;
  const maxAngle = 45;
  const angle = Math.min(maxAngle, minAngle + (totalPoids / maxPoids) * (maxAngle - minAngle));
  needle.style.transform = `rotate(${angle}deg)`;
}

setInterval(updateUI, 100);

// 🎨 Boutons rouge / bleu
document.querySelector("#red").addEventListener("click", () => (btnSelect = "red"));
document.querySelector("#blue").addEventListener("click", () => (btnSelect = "blue"));

// 👆 Clic sur canvas pour ajouter un vêtement
let isDragging = false;

render.canvas.addEventListener("mousedown", () => {
  isDragging = false;
});

render.canvas.addEventListener("mousemove", () => {
  isDragging = true;
});

render.canvas.addEventListener("mouseup", async (event) => {
  if (isDragging) return;

  const rect = render.canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  if (btnSelect === "red") {
    const item = listPastilleRed[Math.floor(Math.random() * listPastilleRed.length)];
    await createImage(x, y, item.img, item.kg, "red");
  } else {
    await createImage(x, y, './img/pantalon.svg', 10, "blue");
  }
});

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