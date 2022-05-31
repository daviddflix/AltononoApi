const {sequelize} = require('./src/db.JS')
const {server} = require('./src/App')

const port = process.env.PORT || 4000

sequelize.sync({ force: false }).then(() => {
  
  try {
    server.listen(port, () => {
      console.log(`%s server is listening on port ${port}`); 
    });
  } catch (error) {
    console.log(error)
  }
  
   
});