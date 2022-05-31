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
      failure: "https://hitpasta.vercel.app",
      pending: "https://hitpasta.vercel.app",
      success: "https://hitpasta.vercel.app"
    },
    binary_mode:true,
    payer: {
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