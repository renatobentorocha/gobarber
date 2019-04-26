const { Appoitment } = require('../models')
const { User } = require('../models')
const Sequelize = require('sequelize')
const moment = require('moment')

class ScheduleController {
  index (req, res) {
    return res.render('schedule/index')
  }

  async consumer (req, res) {
    const date = moment(parseInt(req.query.date))
    console.log(date.format('YYYY-MM-DD'))

    const consumer = await Appoitment.findAll({
      include: [
        {
          model: User,
          as: 'user'
        }
      ],
      where: {
        provider_id: req.params.provider,
        where: Sequelize.where(
          Sequelize.fn('date', Sequelize.col('date')),
          date.format('YYYY-MM-DD')
        )
      }
    })

    const schedules = consumer.map(c => {
      return {
        name: c.user.name,
        avatar: c.user.avatar,
        date: moment(c.date).format('hh:mm')
      }
    })

    return res.render('schedule/consumer', { schedules })
  }
}

module.exports = new ScheduleController()
