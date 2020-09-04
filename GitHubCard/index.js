import axios from 'axios'

//gets my information and list of friends, invokes creating my card and invokes creating friend cards with information from a callback
axios.get('https://api.github.com/users/kristapants')
  .then(apiData => { //apiData now refers to the JSON stuff in the get ask. 
    cardMaker(apiData.data) 
    const {followers_url} = apiData.data; //destructoring of this object. Extracting followers_url from apiData.data so that entering followers_url is already known to be from api.data.data
    axios.get(followers_url) //making a new http request to get the followers list.
      .then(friendList => { //follower list is now known at friendList
        addFriends(friendList.data) //invokes addfriends function that makes friend cards using the data in friendList 
      })
  })
  .catch(err => { //big boss bother
    console.log(err)
  })

//callback invoked above. collects information on each of my followers
const addFriends = (friendList) => { //declaring a function called addFriends that takes an array of objects argument
  friendList.forEach( ( {login} ) => {// for each on the array of objects but it's just acting on the login key value from each object in the array.
    axios.get(`https://api.github.com/users/${login}`) //new http get using the usernames from the friendlist array. since login was all that was pulled from the object, it doesn't need to be further specified
      .then(singleFriendData => { //the single friends userdata is now called singleFriendData
        cardMaker(singleFriendData.data) //run the information stored in singleFriendData.data through cardmaker.
      })
      .catch(err => { //whyyyyy
        console.log(err)
      })
  })
}

//Defines the container for all cards to have children appended to it. 
const cardBox = document.querySelector('.cards') //the div that all the user cards need to go into

//structure, definitions, style and creation of each card.
const cardMaker = ( {avatar_url, name, login, location, html_url, followers, following, bio} ) => { //destructured object data. a single object entered as parameter but only these key value pairs are being used so they do not need to be further specified later. 
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
  const gitContributions = document.createElement('img')
  const contributionsContainer = document.createElement('div')

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
  card.appendChild(contributionsContainer)
  contributionsContainer.appendChild(gitContributions)

  card.classList.add('card')
  profilePic.classList.add('profile-pic')
  cardInfo.classList.add('card-info')
  realName.classList.add('name')
  username.classList.add('username')
  gitContributions.classList.add('gitContributions')
  
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
  gitContributions.src = `https://ghchart.rshah.org/${login}`
}
