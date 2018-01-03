const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const nofavicon = require('express-no-favicons')
const shortener = require('./shortener')

const app = express()

app.disable('x-powered-by')
app.use(cors())
app.use(nofavicon())
app.use(express.static(__dirname + '/static'))
// '/' returns 'static/index.html'

// Mongo stuff
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/urlBank'
)

app.get('/:urlParam(*)', (request, response) => {
  let urlParam = request.params.urlParam
  console.log(urlParam)

  let urlRegEx = /[A-Za-z]+[://]+[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&;\?#/.=]+/g

  if (urlRegEx.test(urlParam)) {
    console.log('pass')
  } else {
    urlParam = 'invalid url'
    console.log('invalid url')
  }

  // Need to get random number and write it to db
  // along with given urlParam
  response.json({
    url: urlParam,
  })
})


app.listen(process.env.PORT || 8080, () => {
  console.log('live connection')
})
