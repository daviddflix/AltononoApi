const {sequelize} = require('./src/database')
const {server} = require('./src/App')

const port = process.env.PORT || 4000

sequelize.sync({ force: true }).then(() => {
  
  try {
    server.listen(port, () => {
      console.log(`%s server is listening on port ${port}`); 
    });
  } catch (error) {
    console.log(error)
  }
  
   
});