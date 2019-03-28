const Wine = require('../models/Wine.js')
const User = require('../models/User')
const mongoose = require('mongoose')
  

Wine.deleteMany().then(() => {
      const partidaCreussm = new Wine({name: 'Partida Creus SM', region: 'Catalonia, Spain', type: 'Sumoll',
      year: 2014, rating: 3.5, description: 'An interesting earthiness witht the taste of apple notes. Sharp and medicinal with herbs and some interestings crystalline fruit.'})
      return partidaCreussm.save()
    }).then(() => {
    const laClarine = new Wine({name: 'La Clarine Farm JambaliaRouge', region: 'Sierra Foothills, California', type: 'Rouge', year: 2015, rating: 4,  description: 'This wine has potent berry, funky earth, and herb aromas. Its fruity-floral flavors are tinged with a balsamic nip and a tart, citrus inspired mouthfeel. Natural wine lovers and people excited about the new direction of Californian wine- rejoice!'})

    return laClarine.save()
  })
  User.deleteMany().then(() => {
    const Peter = new User({name: 'Peter', age: 39,  winepreference: 'Cabernet', email: 'peter@yahoo.com', winecellar: [partidaCreussm]})
    return Peter.save()
  }).then(() => {
  const laClarine = new Wine({name: 'La Clarine Farm JambaliaRouge', region: 'Sierra Foothills, California', type: 'Rouge', year: 2015, rating: 4,  description: 'This wine has potent berry, funky earth, and herb aromas. Its fruity-floral flavors are tinged with a balsamic nip and a tart, citrus inspired mouthfeel. Natural wine lovers and people excited about the new direction of Californian wine- rejoice!'})
  laClarine.save()
  const Seth = new User({name: 'Seth', age: 40, winepreference: 'PinotNoir', email: "sethmcbay@yahoo.com", winecellar: [laClarine]})
  return Seth.save()
}).then(() => {
  mongoose.connection.close()
})
