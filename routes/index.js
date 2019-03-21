const express = require('express')
const router = express.Router()

const wineController = require('../controllers/wineController')
const userController = require('../controllers/userController')

router.get('/user', userController.index)
router.post('/user', userController.create)
router.get('/user/:userId', userController.show)
router.put('/user/:userId', userController.update)
router.delete('/user/:userId', userController.delete)

router.get('/wine', wineController.index)
router.post('/wine', wineController.create)
router.get('/wine/:wineId', wineController.show)
router.put('/wine/:wineId', wineController.update)
router.delete('/wine/:wineId', wineController.delete)


module.exports = router
