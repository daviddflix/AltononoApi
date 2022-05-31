const data = require('../items/Items')
const {Products} = require('../database')


 const products = (async (req, res) => {

    
    
    try { 
        
        const items = await Products.findAll();
         console.log('items', items)

        if(!items.length){
      const info  = await Products.bulkCreate(data)  
      res.send(info) 
          }
        if(items.length){
            res.send(items)
        }
    } catch (error) {
        console.log('error on product route', error)
    }

  
})

module.exports = products