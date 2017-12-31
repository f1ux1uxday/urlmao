const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.disable('x-powered-by')
app.use(cors())
app.use(express.static(__dirname + '/static'))
app.get('/:urlParam(*)', (request, response) => {

  let urlParam = request.params.urlParam

  response.send(urlParam)
})







app.listen(process.env.PORT || 8080, () => {
  console.log('live connection')
})
