const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const httpStatus = require('http-status-codes')
const User = require('./models/user')
const bcrypt = require('bcrypt')
const secretKey = process.env.SECRET_KEY
const { ApiError } = require('./errors')

module.exports = (passport) => {

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },

        async (email, password, done) => {

            try {

                const user = await User.findOne({ email: email })

                if (user) {

                    const passwordsMatch = await bcrypt.compare(password, user.password)

                    if (passwordsMatch) {
                        return done(null, user)
                    } else {
                        throw new ApiError('Wrong password', httpStatus.UNAUTHORIZED)
                    }

                } else {

                    throw new ApiError('This email is not registered', httpStatus.NOT_FOUND)
                }

            } catch (error) {

                if (!error instanceof ApiError) {

                    error = {
                        getMessage() {
                            return error
                        },
                        getStatusCode() {
                            return httpStatus.BAD_REQUEST
                        }
                    }
                }

                return done(error)
            }
        }))

    // using jwt strategry // basically a middleware

    passport.use(new JWTStrategy({ jwtFromRequest: req => req.cookies.jwt, secretOrKey: secretKey },

        (jwtPayload, done) => {

            if (Date.now() > jwtPayload.expires) {
                return done('jwt expired')
            }

            return done(null, jwtPayload)
        }

    ))
}