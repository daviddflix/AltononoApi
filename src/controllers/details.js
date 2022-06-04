
const {Payments} = require('../database')

const details = (async(req, res) => {

    const {id} = req.params
    try {
     const found = await Payments.findByPk(id)
     found? res.send(found) : res.send('detalle no encontrado')
 
    } catch (error) {
        console.log('error en details', error)
    }

})

module.exports = details