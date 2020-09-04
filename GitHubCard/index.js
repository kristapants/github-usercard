import axios from 'axios'
/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
axios.get('https://api.github.com/users/kristapants')
/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/
  .then(apiData => {
    console.log(apiData)
    cardMaker(apiData.data)
    return addFollowers(followersArray)
  })
  .catch(err => {
    console.log(err)
  })

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/
const followersArray = ["deanbot", "LeTanque", "tetondan", "dustinmyers", "justsml"];

const addFollowers = (friends) => {
  friends.forEach(element => {
    axios.get(`https://api.github.com/users/${element}`)
      .then(friendData => {
        console.log(friendData)
        cardMaker(friendData.data)
      })
      .catch(err => {
        console.log(err)
      })
  });
}







/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
const cardBox = document.querySelector('.cards')

const cardMaker = ( {avatar_url, name, login, location, html_url, followers, following, bio} ) => {
  const card = document.createElement('div')
  const profilePic = document.createElement('img')
  const cardInfo = document.createElement('div')
  const realName = document.createElement('h3')
  const username = document.createElement('p')
  const profileLocation = document.createElement('p')
  const profileInfo = document.createElement('p')
  const profileText = document.createElement('span')
  const profileURL = document.createElement('a')
  const profileFollowers = document.createElement('p')
  const profileFollowing = document.createElement('p')
  const profileBio = document.createElement('p')

  cardBox.appendChild(card)
  card.appendChild(profilePic)
  card.appendChild(cardInfo)
  cardInfo.appendChild(realName)
  cardInfo.appendChild(username)
  cardInfo.appendChild(profileLocation)
  cardInfo.appendChild(profileInfo)
  profileInfo.appendChild(profileText)
  profileInfo.appendChild(profileURL)
  cardInfo.appendChild(profileFollowers)
  cardInfo.appendChild(profileFollowing)
  cardInfo.appendChild(profileBio)

  card.classList.add('card')
  cardInfo.classList.add('card-info')
  realName.classList.add('name')
  username.classList.add('username')
  
  profilePic.src = avatar_url
  realName.textContent = name
  username.textContent = login
  profileLocation.textContent = location
  profileText.textContent = 'Profile: '
  profileURL.href = html_url
  profileURL.alt = `${name}'s Github profile`
  profileURL.textContent = html_url
  profileFollowers.textContent = `Followers: ${followers}`
  profileFollowing.textContent = `Following: ${following}`
  profileBio.textContent = bio

  return cardBox
}


/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
