const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const nofavicon = require('express-no-favicons')
const Shortener = require('./shortener')

const app = express()

app.disable('x-powered-by')
app.use(cors())
app.use(nofavicon())
app.use(express.static(__dirname + '/static'))
// '/' returns 'static/index.html'

mongoose.connect(
  process.env.MONGODB_URI ||
  'mongodb://heroku_x7hcc5zd:39c8i70697o7qrpjn4rd6kslch@ds123371.mlab.com:23371/heroku_x7hcc5zd'
)

app.get('/url/:urlParam(*)', (request, response) => {
  let urlParam = request.params.urlParam
  console.log(urlParam)
  let urlRegEx = /[A-Za-z]+[://]+[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&;\?#/.=]+/g

  if (urlRegEx.test(urlParam)) {
    let shortRandomNum = Math.floor(Math.random() * 10000).toString()
    let lmao = new Shortener({
      url: urlParam,
      urlmao: 'ur-lmao.herokuapp.com/lol/' + shortRandomNum,
    })
    let urlStatus = 0

    // Request header from passed URL to verify legitimacy
    // Grab statusCode and end request.
    app.head(urlParam, (req, res) => {
      urlStatus = res.statusCode
      res.end
    })

    if (urlStatus = 200) {
      // Save to db.urlBank if passed URL returns status 200
      lmao.save((error) => {
        if (error) {
          response.send('Unable to write to collection')
        }
      })
      console.log('pass')
      response.json({lmao})
    }
  } else {
    // If passed URL does not satisfy regEx, return error message.
    urlParam = 'unfunny url. http(s):// prefix required. check url and retry.'
    console.log('invalid url')

    response.json({
      url: urlParam,
    })
  }
})

app.get('/lol/:urlToForward', (request, response) => {
  let shortenedURL = request.params.urlToForward
  let shortRegEx = new RegExp('^(http|https)://', 'i')

  Shortener.findOne({urlmao: shortenedURL}, (err, lmao) => {
    let originalUrl = lmao.url
    if (err) {
      response.send('Unable to access database LOL')
    }
    if (shortRegEx.test(originalUrl)) {
      response.redirect(302, lmao.url)
    } else {
      response.redirect(302, 'http://' + lmao.url)
    }
  })
})


app.listen(process.env.PORT || 8080, () => {
  console.log('live connection')
})
