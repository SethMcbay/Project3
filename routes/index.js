const express = require('express')
const router = express.Router()

const wineController = require('../controllers/wineController')
const userController = require('../controllers/userController')

// router.get('/', userController.index)
// router.post('/', userController.create)
// router.get('/:id', userController.show)
// router.put('/:id', userController.update)
// router.delete('/:id', userController.delete)

router.get('/', wineController.index)
router.post('/', wineController.create)
router.get('/:id', wineController.show)
router.put('/:id', wineController.update)
router.delete('/:id', wineController.delete)
module.exports = router
