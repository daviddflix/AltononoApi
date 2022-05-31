const data = require('../items/Items')
const {Products} = require('../database')


 const products = (async (req, res) => {

    
    
    try { 
        
        const items = await Products.findAll();
         console.log('items', items)

        if(items.length === 0){
          await Products.bulkCreate(data) 
        res.send('model created')
          }
        if(items.length){
            res.send(info)
        }
    } catch (error) {
        console.log('error on product route', error)
    }

  
})

module.exports = products