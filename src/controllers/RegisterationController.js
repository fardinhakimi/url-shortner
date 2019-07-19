
const httpStatus = require('http-status-codes')

class RegistrationController {

    static register(req, res) {

        const { email, password } = req.body
        const hashCost = 10

        try {

            const passwordHash = await bcrypt.hash(password, hashCost)

            const userDocument = new UserModel({
                email, passwordHash
            })

            await userDocument.save()

            return res.status(httpStatus.OK).send({ username })

        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: 'something went wrong'})
        }
    }
}

module.exports = RegistrationController