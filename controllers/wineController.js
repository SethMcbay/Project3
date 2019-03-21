const Wine = require('../models/Wine.js')

const wineController = {
    index: async (req, res) => {
        try {
            const wine = await Wine.find({})
            res.json(wine)
        } catch (err) {
            console.log(err)
        }
    },
    show: async (req, res) => {
        try {
            const wineId = req.params.wineId
            const wine = await Wine.findById(wineId)
            res.json(wine)
        } catch (err) {
            console.log(err)
            res.json(err)
        }
    },
    create: async (req, res) => {
        try {
          const newWine = req.body
          const savedWine = await Wine.create(newWine)
          res.json(savedWine)
        } catch (err) {
          console.log(err)
          res.status(500).json(err)
        }
    },
    update: async (req, res) => {
        try {
          const wineId = req.params.wineId
          const updatedWine = req.body
          const savedWine = await Wine.findByIdAndUpdate(wineId, updatedWine, {new: true})
          res.json(savedWine)
        } catch (err) {
          console.log(err)
          res.status(500).json(err)
        }
    },
    delete: async (req, res) => {
        console.log('DELETE')
        try {
          const wineId = req.params.wineId
          const deletedWine = await Wine.findByIdAndRemove(wineId)
          res.json(deletedWine)
        } catch (err) {
          console.log(err)
          res.status(500).json(err)
        }
    }
}

module.exports = wineController