const fs = require('fs');
const path = require('path')
const filename = path.resolve('./data/users.json')
const filediscussions = path.resolve('./data/discussions.json')
const filemessage = path.resolve('./data/message.json')

function getUsers() {
  return new Promise((resolve) => {
    fs.readFile(filename, 'utf-8', (err, data) => {
      let users = []
      try {
        users = JSON.parse(data)
      } catch (e) {
        //do nothing
      }
      resolve(users)
    })
  })
}

function saveUsers(users) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, JSON.stringify(users), (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve(users)
    })
  })
}
function getDiscussions() {
  return new Promise((resolve) => {
    fs.readFile(filediscussions, 'utf-8', (err, data) => {
      let allDiscussions = new Array ()
      try {
        allDiscussions = JSON.parse(data)
      } catch (e) {
        //do nothing
      }
      resolve(allDiscussions)
    })
  })
}
function saveDiscussion(discussion) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filediscussions, JSON.stringify(discussion), (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve(discussion)
    })
  })
}
function getMessage() {
  return new Promise((resolve) => {
    fs.readFile(filemessage, 'utf-8', (err, data) => {
      let postList = []
      try {
        postList = JSON.parse(data)
      } catch (e) {
        //do nothing
      }
      resolve(postList)
    })
  })
}
function saveMessage(message) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filemessage, JSON.stringify(message), (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve(message)
    })
  })
}

module.exports = {
  getUsers,
  saveUsers,
  saveMessage,
  getMessage,
  getDiscussions,
  saveDiscussion
}