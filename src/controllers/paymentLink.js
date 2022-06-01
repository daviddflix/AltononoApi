const mercadopago = require ('mercadopago');

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
        number: Number(items.client.id),
        type: 'table'
      },   
      email: items.client.email,
      name: items.client.name,
    }
    
  };
    mercadopago.preferences.create(preference)
    .then(function(response){
      
      res.send(response.body.init_point)
      console.log('response:', response.body)
      
    }).catch(function(error){
      console.log(error);
    });

  
          
})

module.exports = paymentLink