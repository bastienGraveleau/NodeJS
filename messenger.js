const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const {getUsers, saveUsers} = require('./lib/users.model')
const cookieParser = require('cookie-parser')
const req = require('express/lib/request')




