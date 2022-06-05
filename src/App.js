
const {Payments} = require('./database')
const axios = require("axios");
const express = require('express');
const http = require("http");
const { Server } = require("socket.io")

const app = express()
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin : "*",
    credentials: true,
  },
  transports: ['websocket', 'polling']

})

const cors = require('cors')

app.use(express.json())
app.use(cors())

function sendHeartbeat(){
  setTimeout(sendHeartbeat, 8000);
  io.sockets.emit('ping', {beat: 1})
}

global.socket = io
io.on('connection', (socket) => {
  socket.on('pong', (data) => {
    console.log('pong received')
  })

  socket.on('pedido', data => {
    socket.emit('order', data)
    console.log('data emitted:', data)
  })


  console.log('client connected', socket.id)
  global.socket = socket
})

setTimeout(sendHeartbeat, 8000)



app.post('/notification',async (req, res) => {


     try {
        const id = req.body.data.id
   
        const url = `https://api.mercadopago.com/v1/payments/${id}`

        const payment = await axios.get(url, {
                     headers: {
                       Authorization: `Bearer ${process.env.TEST_ACCESS_TOKEN}`
                     }
                   });
                   console.log('payment:', payment.data)
                
                  
                   
                  if(payment.data.status === 'approved'){
                    
                    const pay = await Payments.findOne({where: {name: payment.data.additional_info.payer.first_name}})
                

                       if(pay){
                        global.socket.emit('payment', pay)
                       }
                      
                  
                    res.sendStatus(200)
                  console.log('sent and emitted')
                  } else {

                    res.sendStatus(200)
                  }


                         
                  
     } catch (error) {
         console.log('error Notification:', error)
     }
      
      
})

app.post('/online', async(req, res) => {

  const {status} = req.query

  if(status === 'online'){
 
      console.log('online')
      global.socket.emit('online', status)
      res.send('store online and emitted')
   
   }

   if(status === 'offline'){
      console.log('offline')
      global.socket.emit('offline', status)
      res.send('store offline and emitted')
   }

})


app.post('/cashpayment', async (req, res) => {
 try {
  
  const body = req.body
  
  const subtotal = body.cart.map(p => p.unit_price * p.quantity)
  const total = subtotal.reduce((a,b) => a + b, 0)
  
  const pays = await Payments.create({
    method: 'Efectivo',
    status: 'approved',
    name: body.client.name,
    table: body.client.table,
    telefono: body.client.telefono,
    items: body.cart,
    monto: total,
    comentarios: body.client.comentarios
  })

  console.log('payment created')
  res.send('payment created and sent')
  
//  if(pays){
//     global.socket.emit('payment', pays)
//     console.log('payment created')
//    res.send('payment created and sent')
//  }

 } catch (error) {
   console.log('error en cashPayment', error)
 }

})


app.use(require('./routes/products'))
app.use(require('./routes/paymentLink'))
app.use(require('./routes/details'))

module.exports = server