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
  process.env.MONGODB_URI || 'mongodb://localhost/urlBank'
)

app.get('/:urlParam(*)', (request, response) => {
  let urlParam = request.params.urlParam
  console.log(urlParam)

  let urlRegEx = /[A-Za-z]+[://]+[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&;\?#/.=]+/g

  if (urlRegEx.test(urlParam)) {

    let shortRandomNum = Math.floor(Math.random() * 10000).toString()
    let lmao = new Shortener({
      url: urlParam,
      urlmao: shortRandomNum,
    })
    let urlStatus = 0

    // Request header from passed URL to verify legitimacy
    // Grab statusCode and end request.
    app.head(urlParam, (req, res) => {
      urlStatus = res.statusCode
      res.end
    })

    if (urlStatus = 200) {

      lmao.save((error) => {
        if (error) {
          response.send('Unable to write to collection')
        }
      })

      console.log('pass')
      response.json({lmao})
    }

  } else {
    urlParam = 'unfunny url: http(s):// prefix required. check url and retry.'
    console.log('invalid url')

    response.json({
      url: urlParam,
    })
  }

})


app.listen(process.env.PORT || 8080, () => {
  console.log('live connection')
})
