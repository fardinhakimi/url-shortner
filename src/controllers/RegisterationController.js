
const { validationResult } = require('express-validator')
const httpStatus = require('http-status-codes')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { unprocessableEntity , internalServerError } = require('../functions')

class RegistrationController {

    static async register(req, res) {

        try {

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return unprocessableEntity(res, errors.errors)
            }

            const { email, password, name } = req.body

            let user = await User.findOne({email: email})

            if(user){
                return res.status(httpStatus.BAD_REQUEST).json({errors:["this user already exists"]})
            }

            const passwordHash = await bcrypt.hash(password, 10)

            user = new User({
                email, 
                name,
                password: passwordHash
            })

            user = await user.save()
            
            return res.status(httpStatus.CREATED).send({ user })

        } catch (error) {
            return internalServerError(res, [error])
        }
    }
}

module.exports = RegistrationController