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
  balance: {
    colors: {
      ground: "#82BC43",
      platform: "#FBBB28",
      sensor: "#0000001c"
    },
    positions: {
      ground: { y: 440, width: 300, height: 25 },
      platform: { y: 465, width: 90, height: 25 },
      sensor: { y: 388, width: 300, height: 80 }
    }
  },
  physics: {
    gravity: { y: 1 },
    mouseConstraint: { stiffness: 0.2 }
  },
  rendering: {
    width: window.innerWidth,
    height: 600,
    background: "#008BF",
    wireframes: false
  },
  clothing: {
    scale: 0.25,
    dropDelay: 200,
    prices: { blue: 40, red: 20, orange: 60, vert: 30 }
  }
};

// Initialisation des éléments Matter.js
const engine = Engine.create();
const world = engine.world;
const render = Render.create({
  element: document.body,
  engine: engine,
  canvas: document.getElementById("world"),
  options: config.rendering
});

Render.run(render);
Runner.run(Runner.create(), engine);

// Gestion du redimensionnement
function handleResize() {
  config.rendering.width = window.innerWidth - 15;
  render.canvas.width = config.rendering.width;
  render.options.width = config.rendering.width;
  repositionBalanceElements();
}

window.addEventListener("resize", handleResize);

// Création des éléments statiques
function createStaticBodies() {
  const centerX = config.rendering.width / 2;
  const defaultX = config.rendering.width / 1.5;
  const isSmallScreen = config.rendering.width <= 730;
  const xPos = isSmallScreen ? centerX : defaultX;

  const sacBase = Bodies.rectangle(centerX, 490, config.rendering.width * 0.8, 26, {
    isStatic: true,
    render: { visible: true }
  });

  const balanceGround = Bodies.rectangle(xPos, config.balance.positions.ground.y, 
    config.balance.positions.ground.width, config.balance.positions.ground.height, {
    isStatic: true,
    render: { fillStyle: config.balance.colors.ground }
  });

  const balancePlatform = Bodies.rectangle(xPos, config.balance.positions.platform.y, 
    config.balance.positions.platform.width, config.balance.positions.platform.height, {
    isStatic: true,
    render: { fillStyle: config.balance.colors.platform }
  });

  const balanceSensor = Bodies.rectangle(xPos, config.balance.positions.sensor.y, 
    config.balance.positions.sensor.width, config.balance.positions.sensor.height, {
    isStatic: true,
    isSensor: true,
    render: { 
      visible: true, 
      fillStyle: config.balance.colors.sensor 
    }
  });

  World.add(world, [sacBase, balanceGround, balancePlatform, balanceSensor]);

  return { sacBase, balanceGround, balancePlatform, balanceSensor };
}

const { sacBase, balanceGround, balancePlatform, balanceSensor } = createStaticBodies();

function repositionBalanceElements() {
  const centerX = config.rendering.width / 2;
  const defaultX = config.rendering.width / 1.5;
  const isSmallScreen = config.rendering.width <= 730;
  const xPos = isSmallScreen ? centerX : defaultX;

  Matter.Body.setPosition(balanceGround, { x: xPos, y: config.balance.positions.ground.y });
  Matter.Body.setPosition(balancePlatform, { x: xPos, y: config.balance.positions.platform.y });
  Matter.Body.setPosition(balanceSensor, { x: xPos, y: config.balance.positions.sensor.y });
}

// Gestion des vêtements
class ClothingManager {
  constructor() {
    this.selectedColor = "red";
    this.clothingData = this.loadClothingData();
    this.selectedOutfit = this.initializeSelectedOutfit();
    this.objectsOnScale = new Map();
    this.setupEventListeners();
  }

  loadClothingData() {
    return {
      hat: [
        { name: "casquette", img: "./img/hat/casquette.svg", pastille: "red", kg: 0.18 },
        // ... autres chapeaux
      ],
      tshirt: [
        { name: "Tshirt Rouge", img: "./img/upperBody/tshirt.svg", pastille: "red", kg: 0.15 },
        // ... autres t-shirts
      ],
      // ... autres catégories
    };
  }

  initializeSelectedOutfit() {
    return [
      { ...this.clothingData.hat[0], category: "hat" },
      { ...this.clothingData.tshirt[0], category: "tshirt" },
      // ... autres éléments
    ];
  }

  setupEventListeners() {
    // Gestion des boutons de couleur
    document.querySelectorAll(".button-pastille").forEach(button => {
      button.addEventListener("click", () => {
        this.selectedColor = button.dataset.color;
        document.querySelectorAll(".button-pastille").forEach(btn => 
          btn.classList.remove("selected"));
        button.classList.add("selected");
      });
    });

    // Gestion du clic sur le canvas
    render.canvas.addEventListener("mouseup", this.handleCanvasClick.bind(this));
  }

  async handleCanvasClick(event) {
    if (this.isDragging || this.isLoading) return;
    this.isLoading = true;

    const rect = render.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const items = Object.values(this.clothingData)
      .flat()
      .filter(item => item.pastille === this.selectedColor);

    if (items.length) {
      const item = items[Math.floor(Math.random() * items.length)];
      await this.createClothingItem(x, y, item);
    }

    this.isLoading = false;
  }

  async createClothingItem(x, y, item) {
    try {
      const body = await this.createImage(x, y, item.img, item.kg, item.pastille);
      World.add(world, body);
      return body;
    } catch (error) {
      console.error("Error creating clothing item:", error);
    }
  }

  async createImage(x, y, imagePath, kg, pastille) {
    const response = await fetch(imagePath);
    const svgText = await response.text();
    const pathMatch = svgText.match(/<path[^>]*d="([^"]+)"/i)?.[1];

    if (!pathMatch) throw new Error("No path found in SVG!");

    const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathEl.setAttribute("d", pathMatch);
    document.body.appendChild(pathEl);

    const vertices = [];
    const totalLength = pathEl.getTotalLength();

    for (let i = 0; i <= totalLength; i += 1) {
      const pt = pathEl.getPointAtLength(i);
      vertices.push({ x: pt.x * config.clothing.scale, y: pt.y * config.clothing.scale });
    }

    document.body.removeChild(pathEl);

    const body = Bodies.fromVertices(
      x, y, [vertices],
      {
        render: { sprite: { xScale: config.clothing.scale, yScale: config.clothing.scale } },
        kg,
        pastille,
        objectId: `obj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        isMainObject: true
      },
      true
    );

    return body;
  }
}

const clothingManager = new ClothingManager();

// Gestion des collisions
Events.on(engine, "collisionStart", event => {
  event.pairs.forEach(({ bodyA, bodyB }) => {
    if (bodyA === balanceSensor && bodyB.isMainObject) {
      clothingManager.objectsOnScale.set(bodyB.objectId, bodyB);
    } else if (bodyB === balanceSensor && bodyA.isMainObject) {
      clothingManager.objectsOnScale.set(bodyA.objectId, bodyA);
    }
  });
});

Events.on(engine, "collisionEnd", event => {
  event.pairs.forEach(({ bodyA, bodyB }) => {
    if (bodyA === balanceSensor && bodyB.objectId) {
      clothingManager.objectsOnScale.delete(bodyB.objectId);
    } else if (bodyB === balanceSensor && bodyA.objectId) {
      clothingManager.objectsOnScale.delete(bodyA.objectId);
    }
  });
});

// Gestion de l'UI
class UIManager {
  constructor() {
    this.weightElement = document.getElementById("poid");
    this.priceElement = document.getElementById("prix");
    this.needleElement = document.querySelector("#needle");
    this.setupOutfitUI();
    this.setupValidation();
  }

  updateUI() {
    const objects = Array.from(clothingManager.objectsOnScale.values());
    const { totalWeight, totalPrice } = this.calculateWeightAndPrice(objects);
    
    this.weightElement.textContent = totalWeight.toFixed(2);
    this.priceElement.textContent = totalPrice.toFixed(2);
    this.updateNeedle(totalWeight);
  }

  calculateWeightAndPrice(objects) {
    const weights = {};
    let totalWeight = 0;
    let totalPrice = 0;

    objects.forEach(obj => {
      const color = obj.pastille;
      const weight = obj.kg || 0;
      weights[color] = (weights[color] || 0) + weight;
      totalWeight += weight;
      totalPrice += weight * (config.clothing.prices[color] || 0);
    });

    return { totalWeight, totalPrice };
  }

  updateNeedle(weight) {
    const minAngle = -30;
    const maxAngle = 45;
    const maxWeight = 100;
    const angle = Math.min(
      maxAngle,
      minAngle + (weight / maxWeight) * (maxAngle - minAngle)
    );
    this.needleElement.style.transform = `rotate(${angle}deg)`;
  }

  setupOutfitUI() {
    const parts = {
      hat: { imageEl: document.getElementById("hatImage"), textEl: document.getElementById("hatTexte") },
      // ... autres parties
    };

    Object.entries(parts).forEach(([part, elements]) => {
      const data = clothingManager.clothingData[part];
      let currentIndex = 0;

      document.getElementById(`next${part}`).addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % data.length;
        this.updateOutfitPart(part, currentIndex, elements);
      });

      document.getElementById(`prev${part}`).addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + data.length) % data.length;
        this.updateOutfitPart(part, currentIndex, elements);
      });

      this.updateOutfitPart(part, 0, elements);
    });
  }

  updateOutfitPart(part, index, elements) {
    const item = clothingManager.clothingData[part][index];
    elements.imageEl.src = item.img;
    elements.textEl.textContent = `pastille : ${item.pastille}`;
    
    // Mettre à jour la tenue sélectionnée
    const outfitIndex = clothingManager.selectedOutfit.findIndex(i => i.category === part);
    if (outfitIndex >= 0) {
      clothingManager.selectedOutfit[outfitIndex] = { ...item, category: part };
    }
  }

  setupValidation() {
    const validerTenue = document.getElementById("validerTenue");
    let isValidationInProgress = false;
    let hasValidatedOnScroll = false;

    validerTenue.addEventListener("click", async () => {
      if (isValidationInProgress) return;
      isValidationInProgress = true;

      try {
        for (const item of clothingManager.selectedOutfit) {
          await clothingManager.createClothingItem(520, 20, item);
          await new Promise(resolve => setTimeout(resolve, config.clothing.dropDelay));
        }
      } finally {
        isValidationInProgress = false;
      }
    });

    // Validation automatique au scroll
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasValidatedOnScroll) {
        validerTenue.click();
        hasValidatedOnScroll = true;
        observer.disconnect();
      }
    }, { threshold: 0.8 });

    observer.observe(document.querySelector(".balance"));
  }
}

const uiManager = new UIManager();

// Mise à jour périodique de l'UI
setInterval(() => uiManager.updateUI(), 100);

// Configuration de la souris
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: config.physics.mouseConstraint.stiffness,
    render: { visible: false }
  }
});

World.add(world, mouseConstraint);
render.mouse = mouse;
engine.gravity.y = config.physics.gravity.y;