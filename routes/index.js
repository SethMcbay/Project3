const express = require('express')
const router = express.Router()

const wineController = require('../controllers/wineController')

router.get('/', wineController.index)
router.post('/', wineController.create)
router.get('/:id', wineController.show)
router.put('/:id', wineController.update)
router.delete('/:id', wineController.delete)

module.exports = router
