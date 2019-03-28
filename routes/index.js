const express = require('express')
const router = express.Router()

const wineController = require('../controllers/wineController')
const userController = require('../controllers/userController')
const userWineController = require('../controllers/userWineController')

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

router.get('/user/:userId/userwine', userWineController.index)
router.post('/user/:userId/userwine', userWineController.create)
router.get('/user/:userId/userWine/:wineId', userWineController.show)
router.delete('/user/:userId/userWine/:wineId', userWineController.delete)
    


module.exports = router
