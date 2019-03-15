const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

const TOYURL = "http://localhost:3000/toys"
const toyDivTag = document.querySelector('#toy-collection');
const formTag = document.querySelector("form")

const toyCard = (toy) => {
  return `<div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p data-likes="${toy.likes}"">${toy.likes} Likes </p>
    <button data-id="${toy.id}" class="like-btn">Like <3</button>
  </div>`
}
// All Toys
const toys = async () => {
  await fetch(TOYURL)
    .then(resp => resp.json())
    .then(toys => {
      for (let toy of toys) {
        toyDivTag.innerHTML += toyCard(toy);
      }
    });
}
toys()

formTag.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = event.target.name.value
  const image = event.target.image.value

  addNewToy(name, image)

});

toyDivTag.addEventListener('click', function(event) {
  if (event.target.className === 'like-btn') {

    let likes = event.target.previousElementSibling.dataset.likes
    let p = event.target.previousElementSibling

    let updatedLikeCount = parseInt(likes) + 1
    const toyId = event.target.dataset.id

    updateLikeCount(toyId, updatedLikeCount)
      .then(updatedLike => {

        likes = updatedLikeCount

        p.innerText = `${likes} Likes`;
        p.dataset.likes = likes
      })
  }
})

const addNewToy = async (name, image) => {
  const settings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      image: image,
      likes: 0
    })
  };

  await fetch(TOYURL, settings)
    .then(resp => resp.json())
    .then(toy => {

      toyDivTag.innerHTML += toyCard(toy)
    })

}


const updateLikeCount = async (toyId, updatedLikeCount) => {
  // i need an id of the compliment i want to update

  const settings = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      likes: updatedLikeCount
    })
  };

  const data = await fetch(`http://localhost:3000/toys/${toyId}`, settings)
    .then(resp => resp.json())
  return data

}

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