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
                    const wine = await User.findById(userId).then(user =>{
                        const userWine = user.wines.id(req.params.wineId)
                        res.json(userWine)
                    })
                } catch (err) {
                    console.log(err)
                    res.json(err)
                }
    }


}



module.exports = userWineController