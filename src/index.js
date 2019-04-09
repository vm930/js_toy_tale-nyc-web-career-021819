const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollectionDiv = document.querySelector("#toy-collection")
let addToy = false
let toys

// YOUR CODE HERE

addBtn.addEventListener('click', (e) => {
  // hide & seek with the form
  addToy = !addToy 
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    console.log(e.target)
    toyForm.addEventListener("submit",function(e){
      e.preventDefault()
      // console.log(e.target);
      const toyName = toyForm.querySelector("#toyName")
      const imgUrl = toyForm.querySelector("#imgUrl")
      
      const toyNameInput = toyName.value
      const imgUrlInput = imgUrl.value
      console.log(toyNameInput);
      console.log(imgUrlInput);

      //post request 
      fetch("http://localhost:3000/toys",{
        method:"POST",
        headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: toyNameInput,
          image: imgUrlInput,
          likes: 0
        })//end of body
      })//end of fetch
      .then(res=>res.json())
      .then(function(json){
        // console.log(json)
      })
      //make a card in the front end
      toyCollectionDiv.innerHTML += `
          <div data-id="${json.id}" class="card">
        <h2>${json.name}</h2>
        <img src= ${json.image} class="toy-avatar" />
        <p>${json.likes} Likes </p>
        <button data-id="${json.id}" class="like-btn">Like <3</button>
      </div>
    `

    })//end of form add event

  } else {
    toyForm.style.display = 'none'
  }


})

//add event listener  on toy collection
toyCollectionDiv.addEventListener("click",function(e){
 clickedP = e.target.parentNode.querySelector("p")
 const clickedToyId = parseInt(e.target.dataset.id)
 
// console.log(clickedP.innerText)

 let foundtoy = toys.find(function(toy){
   return toy.id === clickedToyId
 })

 let inceasedLikes = foundtoy.likes ++
  // console.log(inceasedLikes)
 clickedP.innerText = inceasedLikes + " Likes"

  fetch(`http://localhost:3000/toys/${clickedToyId}`,{
    method:"PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({"likes": inceasedLikes })
          })
        
        })//end of event lisener
//<p>4 Likes </p> should increase 

//send a patch request to the backend update 

// OR HERE!

fetch("http://localhost:3000/toys")
.then(res=>res.json())
.then(function(json){
  // console.table(json)
  toys = json
  // console.log(json[0].name)
  json.forEach(function(toy){
    //create div 
    toyCollectionDiv.innerHTML += `
          <div data-id="${toy.id}" class="card">
        <h2>${toy.name}</h2>
        <img src= ${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button data-id="${toy.id}" class="like-btn">Like <3</button>
      </div>
    `
  })

})