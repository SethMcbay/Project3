const Wine = require('../models/Wine.js')
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
  User.deleteMany().then(() => {
    const Peter = new User({name: 'Peter', age: 39,  winepreference: 'Cabernet', email: 'peter@yahoo.com'})
    return Peter.save()
  }).then(() => {
  const Seth = new User({name: 'Seth', age: 40, winepreference: 'PinotNoir', email: "sethmcbay@yahoo.com", winecellar: []})
  return Seth.save()
})
