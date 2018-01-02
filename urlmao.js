const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const nofavicon = require('express-no-favicons')

const app = express()

app.disable('x-powered-by')
app.use(cors())
app.use(nofavicon())
app.use(express.static(__dirname + '/static'))

app.get('/:urlParam(*)', (request, response) => {

  let urlParam = request.params.urlParam

  console.log(urlParam)
  response.json({
    url: urlParam,
  })
})







app.listen(process.env.PORT || 8080, () => {
  console.log('live connection')
})
