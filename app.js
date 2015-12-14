var Express = require('express')
var app = Express()
var api = require('./api')
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))

app.get('/cities', function (req, res) {
  api.cities.read()
  .then(function (results) {
    res.json(results)
  })
})

app.get('/cities/:id', function (req, res) {
  api.city.read(req.params.id)
  .then(function (results) {
    res.json(results)
  })
})

app.post('/cities', function (req, res) {
  api.city.create(req.body.name)
  .then(function (results) {
    res.json(results)
  })
})

app.delete('/cities/:id', function (req, res) {
  api.city.delete(req.params.id)
  .then(function (results) {
    res.json(results)
  })
})

app.put('/cities/:id', function (req, res) {
  api.city.update(req.params.id, req.body.name)
  .then(function (results) {
    res.json(results)
  })
})

app.listen(8080, function () {
  console.log('server listening on port 8080')
})
