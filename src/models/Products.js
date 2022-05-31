const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
 
  sequelize.define('products', {
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    category_id: {type: DataTypes.STRING},
    unit_price: {type: DataTypes.BIGINT},
  }, {timestamps: true })
};