const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// const secret = "EsUnSecreto"
const tokenMeseroMario ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIzIiwiZW1haWwiOiJtYXJpb0BnbWFpbC5jb20iLCJyb2xlcyI6WyJtZXNlcm8iXX0.4EM1L2ThUV1uIyPaGYFJDlbv_oHTIQ8eAbQDJ93RDOo";
const tokenWaiter1 ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndhaXRlcjFAZGVsaWNlcy5jb20iLCJyb2xlcyI6eyJtZXNlcm8iOnRydWV9fQ.WOSQaf_-4sbSQSQab_p3cQ8Y9eEygZoY-clOBhcknRg"
const tokenChef1 ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoZWYxQGRlbGljZXMuY29tIiwicm9sZXMiOnsiY2hlZiI6dHJ1ZX19.PmbJQxA7YPk2u8iaTRrcsdxwfSftST74lO2vBx9diJo"
const tokenAdmin1 ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGRlbGljZXMuY29tIiwicm9sZXMiOnsiYWRtaW4iOnRydWV9fQ.LzbbGXw95_XjmitjZG9QazytGHyhmpEpj_IQTfDdceU"
// const secret ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIzIiwiZW1haWwiOiJtYXJpb0BnbWFpbC5jb20iLCJyb2xlcyI6WyJtZXNlcm8iXX0.4EM1L2ThUV1uIyPaGYFJDlbv_oHTIQ8eAbQDJ93RDOo";
//let token = (tokenWaiter1|tokenChef1|tokenAdmin1)

//const [token, setToken] = useState("");
let tokenOk
server.use(jsonServer.bodyParser)
server.use(middlewares)

server.use((req, res, next) => {
  //console.log("HOLAAAAAA",req.headers);
  if(req.method === "POST" && req.path === "/auth") {
   next();
  } 
  else if (req.headers.authorization === `Bearer ${tokenOk}`) {
    console.log('qqqqqq',req.headers);
  next();
  } else {
  res.sendStatus(401)
  }
 })

server.post('/auth', (req, res) => {
  if ( req.body.email === 'waiter1@delices.com' && req.body.password === 'waiter1') { //JWT -ENCRIPTAR CONTRASEÑA - DE UNA SOLA VIA -
        // console.log('hey',req.body)
      tokenOk=tokenWaiter1;
      res.jsonp({
      token: tokenWaiter1 ///OH
      // token: secret
    })
  } else if ( req.body.email === 'chef1@delices.com' && req.body.password === 'chef1') { 
      // setToken(tokenChef1)
      tokenOk=tokenChef1;
      res.jsonp({
      token:  tokenChef1 ///OH
    })
  }  else if ( req.body.email === 'admin@delices.com' && req.body.password === 'admin') { 
    //setToken(tokenAdmin1)
    tokenOk=tokenAdmin1;
    res.jsonp({
    token:  tokenAdmin1 ///OH
  })
  } else res.status(400).send('Bad Request')


})

server.post("/orders", (req,res)=>{

  if(!!req.headers){
    console.log(req.body)
    // console.log(req.body.clients.trim().equals(""))
    if(req.body.client===""|| req.body.products.length===0){
      res.status(400).send('No se indica userId(nombre de usuario o mesa) o se intenta crear una orden sin productos.')
    }else{
      // console.log('a')
      const orders = router.db.get('orders');
      // console.log('jj',orders.__wrapped__.orders)
      const order = {
        id: orders.__wrapped__.orders.length + 1,
        userId: req.body.userId,
        client: req.body.client,
        products: req.body.products,
        status: 'pending',
        dateEntry: new Date().toLocaleString(),
        dateProcessed:''
      }
      orders.push(order).write();
      res.status(200).jsonp(order)
    }
  } else res.status(401).send(' No hay cabecera de autenticación.')
})

// server.put(`/orders/${id}`, (req,res)=>{

//   if(!!req.headers){
//       // console.log('a')
//       const orders = router.db.get('orders');
//       // console.log('jj',orders.__wrapped__.orders)

//       const order = {
//         _id: orders.__wrapped__.orders.length + 1,
//         userId: req.body.userId,
//         client: req.body.client,
//         products: req.body.products,
//         status: 'pending',
//         dateEntry: new Date().toLocaleString(),
//         dateProcessed:''
//       }
//       orders.push(order).write();
//       res.status(200).jsonp(order)
//     } else res.status(401).send(' No hay cabecera de autenticación.')
// })

server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})
