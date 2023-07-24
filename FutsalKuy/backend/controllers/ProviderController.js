const {Provider, Field} = require('../models')

class ProviderController {
    static async GetProviders (req, res, next) {
        try {
            const providers = await Provider.findAll({
                attributes: { exclude: ["createdAt", "updatedAt"] }
            })
            res.status(200).json(providers)
        } catch (error) {
            res.status(500).json({message: "Internal Server Error"})
        }
    }

    static async GetProvider (req, res, next) {
        try {
            const provider = await Provider.findByPk(req.params.providerId, {
                include: [
                    {model: Field, attributes: { exclude: ["createdAt", "updatedAt"] }}
                ]
            })
            if (!provider) throw ({ name: 'DataNotFound' })
            res.status(200).json(provider)
        } catch (error) {
            if(error.name === 'DataNotFound'){
                res.status(404).json({message: "Data Not Found"})
            }else {
                res.status(500).json({message: "Internal Server Error"})
            }
        }
    }
}

module.exports = ProviderController