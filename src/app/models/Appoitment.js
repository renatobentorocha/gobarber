module.exports = (sequelize, DataTypes) => {
  const Appoitment = sequelize.define('Appoitment', {
    date: DataTypes.DATE
  })

  Appoitment.associate = models => {
    Appoitment.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' })
    Appoitment.belongsTo(models.User, {
      as: 'provider',
      foreignKey: 'provider_id'
    })
  }

  return Appoitment
}
