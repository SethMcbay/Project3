const User = require('../models/User.js')
const UserWine = require('../models/UserWine.js')


const userWineController = {
    index: (req, res) => {
        const userId = req.params.userId
        User.findById(userId)
            .populate("winecellar").then((userdata) => {
                const theirwine = userdata.winecellar
                res.send(theirwine)

            })

    },
    create: (req, res) => {
        const userId = req.params.userId
        User.findById(userId)
            .populate("winecellar").then((userdata) => {
                UserWine.create(req.body)
                .then((newuserwine) => {
                    userdata.winecellar.push(newuserwine)
                    userdata.save()
                    res.send(userdata)
                })

            })

    },


}



module.exports = userWineController