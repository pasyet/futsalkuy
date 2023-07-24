const { User } = require('../models')
async function authorization (req, res, next){
    try {
        const user = await User.findByPk(req.params.userId)
        if(!user) throw ({ name: 'DataNotFound' })
        console.log(user.id);
        if(req.user.email) return next()
        if(req.user.email !== user.email) throw ({ name: 'Forbidden' })
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authorization