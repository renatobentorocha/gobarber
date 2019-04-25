const { User } = require('../models')
const { Appoitment } = require('../models')

class AppoitmentController {
  async create (req, res) {
    const provider = await User.findByPk(req.params.provider)

    return res.render('appoitments/create', { provider })
  }

  async store (req, res) {
    const { id } = req.session.user
    const { provider } = req.params
    const { date } = req.body

    console.log(date)

    await Appoitment.create({
      user_id: id,
      provider_id: provider,
      date
    })

    return res.redirect('/app/dashboard')
  }
}

module.exports = new AppoitmentController()
