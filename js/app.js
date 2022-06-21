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
let votesAllowed = 10;
const images = [];
let numVisible = 3; //how many images to display in each set
let indices = [];

const startVotingButton = document.getElementById('start-voting-button');
const viewResultsButton = document.getElementById('view-results-button');
const resetButton = document.getElementById('reset-button');
// const resultsList = document.getElementById('results-list');

let resultsChart = document.getElementById('results-chart');
let ctx = resultsChart.getContext('2d');

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
  let prevIndices = [];
  if(indices.length > 0){
    for(let i = 0; i < numVisible; i++){
      prevIndices.push(indices.pop());
    }
  }
  for(let i = 0; i < numVisible; i++){
    let index = Math.floor(Math.random() * imageFilesArray.length);
    while(indices.indexOf(index) !== -1 || prevIndices.indexOf(index) !== -1){
      index = Math.floor(Math.random() * imageFilesArray.length);
    }
    indices.push(index);
  }
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

function clearImages() {
  for (let i = 0; i < imageElementsArray.length; i++){
    imageElementsArray[i].id = '';
    imageElementsArray[i].src = '';
  }
}

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}

function handleClick(event) {
  console.log(votes);
  if(votes < votesAllowed){
    for (let i = 0; i < images.length; i++) {
      if (event.target.id === images[i].id) {
        images[i].clicks++;
      }
    }
    votes++;
    displayImages();}
  if(votes >= votesAllowed){
    viewResultsButton.classList.remove('hidden');
    resetButton.classList.remove('hidden');
  }
}

startVotingButton.addEventListener('click',function(){
  displayImages();
  hide(startVotingButton);
}

);

viewResultsButton.addEventListener('click',function(){
  show(resetButton);
  hide(viewResultsButton);
  clearImages();
  // for(let i = 0; i < images.length; i++){
  //   let resultListItem = document.createElement('li');
  //   resultListItem.appendChild(document.createTextNode(`${images[i].id} was displayed ${images[i].views} times and received ${images[i].clicks} votes`));
  //   resultsList.appendChild(resultListItem);
  // }
  renderChart();
}
);

resetButton.addEventListener('click',function(){
  window.location.reload();
});

function removeExtension(fileName) {
  let label = fileName.slice(0,fileName.indexOf('.'));
  return(label);
}

function renderChart() {
  let clicksArray = [];
  let viewsArray = [];
  let labelsArray = [];

  for(let i = 0; i < images.length; i++){
    viewsArray.push(images[i].views);
    clicksArray.push(images[i].clicks);
    labelsArray.push(removeExtension(images[i].id));
  }

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labelsArray,
      datasets: [{
        label: '# of Votes',
        data: clicksArray,
        backgroundColor: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']
      }, {
        label: '# of Views',
        data: viewsArray
      }]
    },
  });

}

