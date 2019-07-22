
const { validationResult } = require('express-validator')
const httpStatus = require('http-status-codes')
const bcrypt = require('bcrypt')
const User = require('../models/user')

class RegistrationController {

    static async register(req, res) {

        try {

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(httpStatus.UNPROCESSABLE_ENTITY).json(errors)
            }

            const { email, password, name } = req.body

            let user = await User.findOne({email: email})

            if(user){
                return res.status(httpStatus.BAD_REQUEST).json({error: "this user already exists"})
            }

            const passwordHash = await bcrypt.hash(password, 10)

            user = new User({
                email, 
                name,
                password: passwordHash
            })

            user = await user.save()
            
            return res.status(httpStatus.CREATED).send({
                user
            })

        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
        }
    }
}

module.exports = RegistrationController