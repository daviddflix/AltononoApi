
const {Payments} = require('../database')

const details = (async(req, res) => {

    const {id} = req.params
    try {
     const found = await Payments.findByPk(id)
     found? res.json(found) : res.sendStatus(404)
 
    } catch (error) {
        console.log('error en details', error)
    }

})

module.exports = details