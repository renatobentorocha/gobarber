const { Appoitment } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class AvailableController {
  async index (req, res) {
    const date = moment(parseInt(req.query.date))

    const appointments = await Appoitment.findAll({
      where: {
        provider_id: req.params.provider,
        date: {
          [Op.between]: [
            date.startOf('day').format(),
            date.endOf('day').format()
          ]
        }
      }
    })

    const schedule = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '23:00',
      '24:00'
    ]

    const available = schedule.map(time => {
      const [hour, minute] = time.split(':')
      const value = date
        .hour(hour)
        .minute(minute)
        .second(0)

      return {
        time,
        value: value.format(),
        available:
          value.isAfter(moment()) &&
          !appointments.find(a => {
            console.log(a.date)
            console.log(moment(a.date).format('HH:mm'))
            console.log(time)
            return moment(a.date).format('HH:mm') === time
          })
      }
    })

    return res.render('available/index', { available })
  }
}

module.exports = new AvailableController()
