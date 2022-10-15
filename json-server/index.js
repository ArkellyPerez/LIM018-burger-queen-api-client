const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const secret = "EsUnSecreto"

server.use(jsonServer.bodyParser)
server.use(middlewares)

server.use((req, res, next) => {

  // console.log(req.headers);

  if(req.method === "POST" && req.path === "/auth") {
   next();
  } 
  else if (req.headers.authorization === `Bearer ${secret}`) {
    console.log('qqqqqq',req.headers);
  next();
  } else {
  res.sendStatus(401)
  }
 })


server.post('/auth', (req, res) => {
  if (
    req.body.email === 'maria@gmail.com' &&
    req.body.password === '123456') {
        console.log('hey',req.body)
    res.jsonp({
      token: secret
    })
  } else res.status(400).send('Bad Request')
})

server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})

// const datos = router.db.value()
// console.log('aqui', datos.user)
// console.log('aqui', datos.products)