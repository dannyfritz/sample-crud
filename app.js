var Express = require('express')
var app = Express()
var api = require('./api')
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))

function handleResponse(promise, res) {
  if (!res) {
    console.error('response object required for handleResponse')
    return
  }
  promise.then(function (results) {
    res.json(results)
  })
  .catch(function (err) {
    res.statusCode = 503
    res.json(err)
  })
}

app.get('/cities', function (req, res) {
  handleResponse(api.cities.read(), res)
})

app.get('/cities/:id', function (req, res) {
  handleResponse(api.city.read(req.params.id), res)
})

app.post('/cities', function (req, res) {
  handleResponse(api.city.create(req.body.name), res)
})

app.delete('/cities/:id', function (req, res) {
  handleResponse(api.city.delete(req.params.id), res)
})

app.put('/cities/:id', function (req, res) {
  handleResponse(api.city.update(req.params.id, req.body.name), res)
})

app.listen(8080, function () {
  console.log('server listening on port 8080')
})
