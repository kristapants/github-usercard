import axios from 'axios'

axios.get('https://api.github.com/users/kristapants')
  .then(apiData => {
    console.log(apiData)
    cardMaker(apiData.data)
    axios.get(apiData.data.followers_url)
      .then(friendList => {
        addFriends(friendList.data)
      })
      .catch(err => {
        console.log(err)
      })
  })
  .catch(err => {
    console.log(err)
  })

const cardBox = document.querySelector('.cards')

const addFriends = (friendList) => {
  friendList.forEach(singleFriend => {
    axios.get(`https://api.github.com/users/${singleFriend.login}`)
    .then(singleFriendData => {
      cardMaker(singleFriendData.data)
    })
    .catch(err => {
      console.log(err)
    })
  })
}

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
