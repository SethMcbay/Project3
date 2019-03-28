const User = require('../models/User.js')

const userController = {
    index: async (req, res) => {
        try {
            const user = await User.find({}).populate('winecellar')
            res.json(user)
        } catch (err) {
            console.log(err)
        }
    },
    show: async (req, res) => {
        try {
            const userId = req.params.userId
            const user = await User.findById(userId).populate('winecellar')
            res.json(user)
        } catch (err) {
            console.log(err)
            res.json(err)
        }
    },
    create: async (req, res) => {
        try {
          const newuser = req.body
          const saveduser = await User.create(newuser)
          res.json(saveduser)
        } catch (err) {
          res.status(500).json(err)
        }
    },
    update: async (req, res) => {
        try {
          const userId = req.params.userId
          const updateduser = req.body
          const saveduser = await User.findByIdAndUpdate(userId, updateduser, {new: true})
          res.json(saveduser)
        } catch (err) {
          res.status(500).json(err)
        }
    },
    delete: async (req, res) => {
        console.log('DELETE')
        try {
          const userId = req.params.userId
          const deleteduser = await User.findByIdAndRemove(userId)
          res.json(deleteduser)
        } catch (err) {
          res.status(500).json(err)
        }
    }
}

module.exports = userController