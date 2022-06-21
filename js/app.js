'use strict';
// searches the HTML document for all img tags that are present.
let imageElementsArray = document.querySelectorAll('img');
console.log(imageElementsArray);

imageElementsArray.forEach(function (img) {
  img.addEventListener('click', handleClick);
});

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
let votes = 0;
let votesAllowed = 25;
const images = [];
let numVisible = 3; //how many images to display in each set
let indices = [];

// const resultsContainer = document.getElementById('results-container');
const startVotingButton = document.getElementById('start-voting-button');
const viewResultsButton = document.getElementById('view-results-button');
const resetButton = document.getElementById('reset-button');
const resultsList = document.getElementById('results-list');

// if(votes===votesAllowed){
//   viewResultsButton.classList.remove('hidden');
// }

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
  if(indices.length > 0){
    indices.length = 0;
  }
  for(let i = 0; i < numVisible; i++){
    let index = Math.floor(Math.random() * imageFilesArray.length);
    while(indices.indexOf(index) !== -1){
      index = Math.floor(Math.random() * imageFilesArray.length);
    }
    indices.push(index);
  }
  console.log(indices);
}

function displayImages() {
  generateRandomNumbers();
  for (let i = 0; i < numVisible; i++){
    let index = indices[i];
    imageElementsArray[i].id = images[index].id;
    imageElementsArray[i].src = images[index].src;
    images[index].views++;
  }
}

function handleClick(event) {
  for (let i = 0; i < images.length; i++) {
    if (event.target.id === images[i].id) {
      images[i].clicks++;
    }
    votes++;
    console.log(images[i].id,images[i].clicks);
  }
  displayImages();
}

startVotingButton.addEventListener('click',function(){
  // generateRandomNumbers();
  displayImages();
  startVotingButton.classList.add('hidden');
}

);

viewResultsButton.addEventListener('click',function(){
  viewResultsButton.classList.add('hidden');
  for(let i = 0; i < images.length; i++){
    let resultListItem = document.createElement('li');
    resultListItem.appendChild(document.createTextNode(`${images[i].id} was displayed ${images[i].views} times and received ${images[i].clicks} votes`));
    resultsList.appendChild(resultListItem);
  }
  // resetButton.classList.remove('hidden');
}
);

resetButton.addEventListener('click',function(){
  window.location.reload();
});
