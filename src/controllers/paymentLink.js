const mercadopago = require ('mercadopago');
const {Payments} = require('../database')

const paymentLink = (async (req, res) => {
      
    const items = req.body
    console.log('items', items)

  // Agrega credenciales
  mercadopago.configure({
    access_token: process.env.TEST_ACCESS_TOKEN
  });

  let preference = {
    items: items.cart,
    auto_return:'approved',
    back_urls: {
      failure: "https://altonono.vercel.app",
      pending: "https://altonono.vercel.app",
      success: "https://altonono.vercel.app/paymentmp"
    },
    binary_mode:true,
    payer: {
      identification: {
        number: items.client.table,
        type: 'table'
      },   
      name: items.client.name,
    }
    
  };

  const subtotal = items.cart.map(p => p.unit_price * p.quantity)
  const total = subtotal.reduce((a,b) => a + b, 0)

  await Payments.create({
    method: 'Mercado Pago',
    status: 'approved',
    name: items.client.name,
    table: items.client.table,
    telefono: items.client.telefono,
    items: items.cart,
    monto: total,
    comentarios: items.client.comentarios
  })

    mercadopago.preferences.create(preference)
    .then(function(response){
      
      res.send(response.body.init_point)
      console.log('response:', response.body)
      
    }).catch(function(error){
      console.log(error);
    });

  
          
})

module.exports = paymentLink