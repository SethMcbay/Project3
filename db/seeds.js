const Wine = require('../models/wine.js')
const User = require('../models/User')
const mongoose = require('mongoose')
  
// using Promises
Wine.deleteMany().then(() => {
      const PARTIDACREUSSM = new Wine({name: 'PartidaCreusSM', description: 'Catalonia, Spain'})
      return PARTIDACREUSSM.save()
    }).then(() => {
    const LaClarine = new Wine({name: 'LaClarineFarmJambaliaRouge', description: 'Sierra Foothills, California'})
    return LaClarine.save()
  })