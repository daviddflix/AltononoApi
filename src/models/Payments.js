const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
 
  sequelize.define('payments', {
    name: {type: DataTypes.STRING},
    monto: {type: DataTypes.INTEGER},
    method: {type: DataTypes.STRING},
    table: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    status: {type: DataTypes.STRING},
    comentarios: {type: DataTypes.STRING},
    items: {type: DataTypes.JSON},
    id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true}
  }, {timestamps: true })
};