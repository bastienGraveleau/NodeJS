const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const {getUsers, saveUsers, saveMessage, getMessage, getDiscussions, saveDiscussion} = require('./lib/model')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt');
const { send } = require('express/lib/response')
const saltRounds = 10;
var date = new Date();

app.use(bodyParser.json())
app.use(cookieParser())

//Création d'un utilisateur

app.post('/users', async (req, res) => {
  if (!req.body.username ||
    !req.body.password ||
    typeof req.body.username !== "string" ||
    typeof req.body.password !== "string") {
    res.status(400).send({
      message: 'bad request'
    })
    return
  }

  const users = await getUsers()
  for (const user of users) {
    if (user.username === req.body.username) {
      res.status(402).send({
        message: 'conflict'
      })
      return
    }
  }

  //Chiffrement et création du mot de passe 

  const password = req.body.password
  const hachage = await bcrypt.hash ( password , saltRounds ) ;
  const newUser = {
    username: req.body.username,
    password: hachage
  }
  users.push(newUser)
  try {
    await saveUsers(users)
    res.status(201).send({
      user: newUser
    })
  } catch (e) {
    res.status(500).send(e)
  }
})

//Get utilisateur actuel

app.post('/auth', async (req, res) => {
  if (!req.body.username ||
    !req.body.password ||
    typeof req.body.username !== "string" ||
    typeof req.body.password !== "string") {
    res.status(400).send({
      message: 'bad request'
    })
    return
  }
  const users = await getUsers()
  const user = users.find((user) => user.username === req.body.username)
  const password = req.body.password
if (!user) {
    res.status(404).send({
      message: 'not-found'
    })
    return
  }
  const isSame = await bcrypt.compare( password , user.password ) 
  if (!isSame) {
    res.status(400).send({
      message: 'bad password'
    })
  } 

  //Authentification

  res.cookie('auth', user.username, {expire: 360000 + Date.now()});
  res.send({
    user
  })
})

app.get('/users/me', (req, res) => {
  res.send({
    user: req.cookies.auth
  })
})

//Création d'une discussion

app.post('/discussions', async (req, res) => {

  if (!req.cookies.auth) {
    res.status(400).send({
      message: 'no auth'
    })
    return
  }
  const allDiscussions = await getDiscussions()
  const idDiscussion = allDiscussions.length
  const newDiscussion = {
    id : idDiscussion
  } 
  allDiscussions.push(newDiscussion)
  try {
    await saveDiscussion(allDiscussions)
    res.send({
      id: idDiscussion
    })
  } catch (e) {
    res.status(500).send(e)
  }
})

//Création d'un message 

app.post('/messages', async (req, res) => {

  if (!req.cookies.auth) {
    res.status(400).send({
      message: 'no auth'
    })
    return
  }
  if (typeof req.body.post !== 'string' ||
      !req.body.post) {
    res.status(402).send({
      message: 'bad message'
  })
    return
  }
  
  const allDiscussions = await getDiscussions()
  const postList = await getMessage()
  
  const newMessage = {
    user : req.cookies.auth,
    post : req.body.post,
    date : date,
  }
  postList.push(newMessage)
  try {
    await saveMessage(newMessage)
    res.status(201).send({
      message: newMessage
    })
  } catch (e) {
    res.status(500).send(e)
  }
})

//Get tout les messages

app.get('/messages', async (req, res) => {
 const postList = await getMessage()
 
  if (!req.cookies.auth) {
    res.status(400).send({
      message: 'no auth'
    })
    return
  }
  res.send({
    AllPost: postList
  })
})

// Get toutes les discussions

app.get('/discussions', async (req, res) => {
  const allDiscussions = await getDiscussions()
  
   if (!req.cookies.auth) {
     res.status(400).send({
       message: 'no auth'
     })
     return
   }
   res.send({
     discussions: allDiscussions
   })
 })

//Console Localhost

app.listen(port, () => {
  console.log(`app started on the following url http://localhost:${port}`)
})