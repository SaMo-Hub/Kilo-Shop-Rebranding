const listCloth =
{
    hat: [
        { name: 'casquette', img: './casquette.svg', pastille: "rouge" },
        { name: 'casquette', img: './casquetterouge.svg', pastille: "rouge" },
        { name: 'casquette', img: './casquettebleu.svg', pastille: "rouge" },
        { name: 'casquette', img: './casquettejaune.svg', pastille: "rouge" },
        { name: 'casquette', img: './casquetterose.svg', pastille: "rouge" },
        { name: 'casquette', img: './casquetteviolet.svg', pastille: "rouge" },
        { name: 'Chapeau', img: './casquettevert.svg', pastille: "bleu" },
    ],
    tshirt : [
        { name: 'rose', img: './tshirtrose.png', pastille: "rouge" },
        { name: 'jaune', img: './tshirtjaune.png', pastille: "jaune" },
        { name: 'vert', img: './tshirtvert.png', pastille: "vert" },
    ],
    pantalon : [
        { name: 'rose', img: './pantalonbleu.png', pastille: "rouge" },
        { name: 'jaune', img: './pantalonjaune.png', pastille: "jaune" },
        { name: 'vert', img: './pantalonrouge.png', pastille: "vert" },
        { name: 'vert', img: './pantalonvert.png', pastille: "vert" },
    ]
}



const hatImage = document.getElementById("hatImage");
const upperBodyImage = document.getElementById("upperBodyImage");



const hatTexte = document.getElementById("hatTexte");
const upperBodyText = document.getElementById("upperBodyText");
const lowerBodyText = document.getElementById("lowerBodyText");
const shoesText = document.getElementById("shoesText");


const nextHat = document.getElementById("nextHat");
const prevHat = document.getElementById("prevHat");

const nextTshirt = document.getElementById("nextTshirt");
const prevTshirt = document.getElementById("prevTshirt");
// Liste des chemins vers les images des chapeaux
const hats = ["./casquette.svg", "./chapeau.svg",];
let currentIndex = 0;

nextHat.addEventListener("click", () => {
    const hats = listCloth.hat
    currentIndex = (currentIndex + 1) % hats.length;
    hatImage.src = hats[currentIndex].img;
    hatTexte.textContent = `pastille : ${hats
[currentIndex].pastille}`

});
prevHat.addEventListener("click", () => {
    const hats = listCloth.hat
    currentIndex = (currentIndex -1) % hats.length;
    hatImage.src = hats[currentIndex].img;
    hatTexte.textContent = `pastille : ${hats
[currentIndex].pastille}`

});

nextTshirt.addEventListener("click", () => {
    const tshirt = listCloth.tshirt
    currentIndex = (currentIndex + 1) % tshirt.length;
    upperBodyImage.src = tshirt[currentIndex].img;
    upperBodyText.textContent = `pastille : ${tshirt
[currentIndex].pastille}`

});
prevTshirt.addEventListener("click", () => {
    const tshirt = listCloth.tshirt
    currentIndex = (currentIndex -1) % tshirt.length;
    hatImage.src = hats[currentIndex].img;
    hatTexte.textContent = `pastille : ${tshirt
[currentIndex].pastille}`

});

