'use strict';

// searches the HTML document for all img tags that are present.
let imageElementsArray = document.querySelectorAll('img'); // [<img>]
console.log(imageElementsArray);

let clicks = 0;
let views = 0;

// looping through imageElementsArray
// for (let i = 0; i < imageElementsArray.length; i++) {
//   let img = imageElementsArray[i];
//   img.src = './assets/image.jpeg';
// }

let imageFilesArray = [
  'bag.jpg',
  'bathroom.jpg',
  'banana.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'water-can.jpg',
  'wine-glass.jpg'
];

let numImages = imageFilesArray.length; //how many image are available
let numVisible = 3; //how many images to display in each set

Image.prototype.removeExtension = function() {
  let label = this.fileName.slice(0,this.fileName.indexOf('.'));
  return(label);
};

const images = [];

// constructor for an image
function Image(fileName) {
  this.clicks = 0;
  this.views = 0;
  this.id = fileName;
  this.src = `./assets/images/${fileName}`;
}

// adding an ability to each Image object to run on click.
Image.prototype.handleClick = function() {

};


for (let i = 0; i < imageFilesArray.length; i++) {
  images.push(new Image(imageFilesArray[i]));
}

// rendering the image data and assigning id attribute in images onto the imageElementsArray
imageElementsArray[0].id = images[0].id;
imageElementsArray[0].src = images[0].src;
images[0].views++;
imageElementsArray[1].id = images[1].id;
imageElementsArray[1].src = images[1].src;
images[1].views++;
// img.src = './assets/images/cruisin-goat.jpg';

function handleClick(event) {
  // check which image was clicked on.
  // event.target.src == some image in images, increment the clicks
  for (let i = 0; i < images.length; i++) { // array search

    console.log(event.target.id, images[i].id);
    if (event.target.id === images[i].id) {
      images[i].clicks++;
    }
  }
  renderImages();
  console.log(images);
}

// forEach method, that exists on every array.
// adds an event listener to every img tag in imageElementsArray
imageElementsArray.forEach(function (img) {
  img.addEventListener('click', handleClick);
}); //  provide a callback


// generating random non duplicate images to render.
//  new image each time one is clicked, and those images should not be the same.
function renderImages() {

  // generate 2 new images and if they are different render them.
  let image1 = generateRandomImage();
  let image2 = generateRandomImage();

  while (image1.id === image2.id) {
    image1 = generateRandomImage();
  }

  // render to the our imageElementsArray
  imageElementsArray[0].id = image1.id;
  imageElementsArray[0].src = image1.src;
  imageElementsArray[1].id = image2.id;
  imageElementsArray[1].src = image2.src;
  image1.views++;
  image2.views++;
}

// return a random Image from images
function generateRandomNumbers() {
  let indices = [];
  let index1 = Math.floor(Math.random() * numImages);
  let index2 = Math.floor(Math.random() * numImages);
  let index3 = Math.floor(Math.random() * numImages);

  while(index1 === index2 || index1 === index3){
    let index1 = Math.floor(Math.random() * numImages);
  }
  indices.push(index1,index2,index3);
  console.log(indices);
}

console.log(images);
