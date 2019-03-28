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
     show: async (req, res) => {
                try {
                    const userId = req.params.userId
                    const wineId = req.params.wineId
                    const savedWine = await UserWine.findById(wineId)
                    res.json(savedWine)
                } catch (err) {
                    res.json(err)
                }
    },
    delete: async (req, res) => {
        User.findById(req.params.userId).then((user) => {
            UserWine.findByIdAndDelete(req.params.wineId).then(() => {
                user.save()
            })
            res.send(200)
        })
        
    }

}


module.exports = userWineController