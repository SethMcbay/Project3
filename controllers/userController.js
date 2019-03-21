const User = require('../models/user.js')

const userController = {
    index: async (req, res) => {
        try {
            const user = await User.find({})
            res.json(user)
        } catch (err) {
            console.log(err)
        }
    },
    show: async (req, res) => {
        try {
            const userId = req.params.id
            const user = await User.findById(userId)
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
          console.log(err)
          res.status(500).json(err)
        }
    },
    update: async (req, res) => {
        try {
          const userId = req.params.id
          const updateduser = req.body
          const saveduser = await User.findByIdAndUpdate(userId, updateduser, {new: true})
          res.json(saveduser)
        } catch (err) {
          console.log(err)
          res.status(500).json(err)
        }
    },
    delete: async (req, res) => {
        console.log('DELETE')
        try {
          const userId = req.params.id
          const deleteduser = await User.findByIdAndRemove(userId)
          res.json(deleteduser)
        } catch (err) {
          console.log(err)
          res.status(500).json(err)
        }
    }
}

module.exports = userController