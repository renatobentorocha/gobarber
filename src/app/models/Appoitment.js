module.exports = (sequelize, DataTypes) => {
  const Appoitment = sequelize.define('Appoitment', {
    date: DataTypes.DATE
  })

  Appoitment.associate = models => {
    Appoitment.belongsTo(models.User, { foreignKey: 'user_id' })
    Appoitment.belongsTo(models.User, { foreignKey: 'provider_id' })
  }

  return Appoitment
}
