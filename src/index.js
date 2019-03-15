const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

const TOYURL = "http://localhost:3000/toys"

// YOUR CODE HERE

const toyDivTag = document.querySelector('#toy-collection');

const toyCard = (toy) => {
  return `<div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p data-toy-id="${toy.id}">${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  </div>`
}
const toys = () => {
  fetch(TOYURL)
  .then (resp => resp.json())
  .then(toys => {
    for (let toy of toys){
      toyDivTag.innerHTML += toyCard(toy);
    }
  });
}
toys()

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

// OR HERE!


// helper method.
