const Wine = require('../models/Wine.js')
const User = require('../models/User')
const mongoose = require('mongoose')
  
// using Promises
Wine.deleteMany().then(() => {
      const PARTIDACREUSSM = new Wine({name: 'Partida Creus SM', Region: 'Catalonia, Spain', Country: 'Spain', vintage: 2014, Description: 'An interesting earthiness witht the taste of apple notes. Sharp and medicinal with herbs and some interestings crystalline fruit.'})
      return PARTIDACREUSSM.save()
    }).then(() => {
    const LaClarine = new Wine({name: 'La Clarine Farm JambaliaRouge', Region: 'Sierra Foothills, California', Country: 'USA', vintage: 2015, Description: 'This wine has potent berry, funky earth, and herb aromas. Its fruity-floral flavors are tinged with a balsamic nip and a tart, citrus inspired mouthfeel. Natural wine lovers and people excited about the new direction of Californian wine- rejoice!'})

    return LaClarine.save()
  })
  User.deleteMany().then(() => {
    const Peter = new User({name: 'Peter', age: 39,  winepreference: 'Cabernet', email: 'peter@yahoo.com'})
    return Peter.save()
  }).then(() => {
  const Seth = new User({name: 'Seth', age: 40, winepreference: 'PinotNoir', email: "sethmcbay@yahoo.com", winecellar: []})
  return Seth.save()
})
