const { User } = require('../models');
const {verify} = require('../helpers/jwt-helper');

async function authenticationMiddleware( req, res, next){
    // console.log(req.headers);
    if(!req.headers.access_token){
        res.status(401).json({ messages: ['Invalid Access Token']})
    } else {
        try {
            const payload = verify(req.headers.access_token);
            const {email} = payload;
            const user = await User.findOne({ where: {email}});
            if (!user) {
                throw {name: 'Unauthorized'}
            } 
            req.user = {id:user.id, email:user.email, role:user.role}
            next();
        } catch (error) {
            // console.log(error);
            next(error)
        }
    }
    
}

module.exports = authenticationMiddleware;