'use strict';

/*
Place all images, then reveal:
1. run constructor on imageFilesArray to create all img elements with id=[truncated file name], class="hidden", clicks, views, event handler, alt text, caption
2. generate three random images
3. find those images, change class="visible", increment views
4. on click, increment clicks, generate three new images, repeat 3 & 4
Pros: I think it will be easier to increment clicks & views this way
Cons: can they appear in random order, or will 'bag' always appear on the far left of any group it's in?

If I create image elements with the constructor but don't place them on the page, what happens?

ADD THREE IMG TAGS TO THE INDEX, THEN PUT THE IMAGE DATA IN THERE AS THEY GET CREATED

Place images on each click:
1. generate three random images
2. run constructor on displayImagesArray to create three img elements with id=[truncated file name], clicks, views, event handler, alt text, caption
3. increment views, append each image to the gallery div
4. on click, increment click and generate three new images
Pros: images in random order, don't have to load all on page load
Cons: have to load images each time, will views/clicks reset when the next images load?

*/




// searches the HTML document for all img tags that are present.
let imageElementsArray = document.querySelectorAll('img'); // [<img>]
console.log(imageElementsArray);

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


let clicks = 0;
let views = 0;
const images = [];
// let numImages = imageFilesArray.length; //how many images are available
let numVisible = 3; //how many images to display in each set
let indices = [];
let displayImagesArray = [];

const resultsContainer = document.getElementById('results-container');
const galleryContainer = document.getElementById('gallery-container');


// looping through imageElementsArray
// for (let i = 0; i < imageElementsArray.length; i++) {
//   let img = imageElementsArray[i];
//   img.src = './assets/image.jpeg';
// }





// Image.prototype.removeExtension = function() {
//   let label = this.fileName.slice(0,this.fileName.indexOf('.'));
//   return(label);
// };


// constructor for an image
function Image(fileName) {
  this.clicks = 0;
  this.views = 0;
  this.id = fileName;
  this.src = `./img/${fileName}`;
}

for (let i = 0; i < imageFilesArray.length; i++) {
  images.push(new Image(imageFilesArray[i]));
}

function generateRandomNumbers() {
  for(let i = 0; i < numVisible; i++){
    let index = Math.floor(Math.random() * imageFilesArray.length);
    while(indices.indexOf(index) !== -1){
      index = Math.floor(Math.random() * imageFilesArray.length);
    }
    indices.push(index);
  }
  console.log(indices);
}

generateRandomNumbers();


function displayImages() {
  for (let i = 0; i < numVisible; i++){
    let index = indices[i];
    imageElementsArray[i].id = images[index].id;
    imageElementsArray[i].src = images[index].src;
    images[index].views++;
  }
  console.log(images);
}



// adding an ability to each Image object to run on click.
Image.prototype.handleClick = function() {

};


// console.log(images);

// rendering the image data and assigning id attribute in images onto the imageElementsArray

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
  //   renderImages();
  console.log(images);
}




//https://stackoverflow.com/questions/31829166/move-values-from-one-array-to-another-and-remove-them
function chooseRandomImages(showNum,sourceArray){
  for(let i = 0; i < showNum; i++){
    let max = sourceArray.length;
    displayImagesArray.push(sourceArray.splice(Math.floor(Math.random()*max),1)[0]);
  }
  console.log(sourceArray,displayImagesArray);
}


// forEach method, that exists on every array.
// adds an event listener to every img tag in imageElementsArray
imageElementsArray.forEach(function (img) {
  img.addEventListener('click', handleClick);
}); //  provide a callback


// // generating random non duplicate images to render.
// //  new image each time one is clicked, and those images should not be the same.
// function renderImages() {

//   // generate 2 new images and if they are different render them.
//   let image1 = generateRandomImage();
//   let image2 = generateRandomImage();

//   while (image1.id === image2.id) {
//     image1 = generateRandomImage();
//   }

//   // render to the imageElementsArray
//   imageElementsArray[0].id = image1.id;
//   imageElementsArray[0].src = image1.src;
//   imageElementsArray[1].id = image2.id;
//   imageElementsArray[1].src = image2.src;
//   image1.views++;
//   image2.views++;
// }

// // function displayImages(array){
// //   for(let i = 0; i < array.length; i++){

// //   }
// // }



// return an array of 3 unique random numbers betwee 0 and numImages
// function generateRandomNumbers() {
//   let indices = [];
//   let index1 = Math.floor(Math.random() * 15);
//   let index2 = Math.floor(Math.random() * 15);
//   let index3 = Math.floor(Math.random() * 15);

//   while(index1 === index2 || index1 === index3){
//     let index1 = Math.floor(Math.random() * 15);
//   }
//   indices.push(index1,index2,index3);
//   console.log(indices);
//   let index1 = Math.floor(Math.random() * numImages);
//   let index2 = Math.floor(Math.random() * numImages);
//   let index3 = Math.floor(Math.random() * numImages);

//   while(index1 === index2 || index1 === index3){
//     let index1 = Math.floor(Math.random() * numImages);
//   }
//   indices.push(index1,index2,index3);
//   console.log(indices);
// }