
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

global.socket = io
io.on('connection', (socket) => {
  console.log('client connect', socket.id)
  global.socket = socket
})


app.post('/notification',async (req, res) => {
  // console.log('body:',req.body)

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
                    
                    const pay = await Payments.findOne({where: {items: payment.data.additional_info.items}})
                

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
    email: body.client.email,
    items: body.cart,
    monto: total
  })
  
  global.socket.emit('payment', pays)

 res.send('payment created and sent')

 } catch (error) {
   console.log('error en cash', error)
 }

})


app.use(require('./routes/products'))
app.use(require('./routes/paymentLink'))

module.exports = server