const data = require('../items/Items')
const {Products} = require('../database')


 const products = (async (req, res) => {

    
    
    try { 
        
        const items = await Products.findAll();
         console.log('items', items)

        if(!items.length){
         Products.bulkCreate(data)   
          }
        if(items.length){
            res.send(items)
        }
    } catch (error) {
        console.log('error on product route', error)
    }

  
})

module.exports = products