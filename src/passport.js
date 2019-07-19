const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const User = require('./models/user')
const { isEmpty } = require('./functions')
const bcrypt = require('bcrypt')
const secretKey = process.env.SECRECT_KEY

module.exports = (passport) => {

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },

        async (email, password, done) => {

            try {

                const user = await User.findOne({ username: email })

                if (!isEmpty(user)) {

                    const passwordsMatch = await bcrypt.compare(password, user.password)

                    if (passwordsMatch) {
                        return done(null, user)
                    }
                    return done(null, false, { message: 'This email is not registered' })
                }

                return next('this user does not exist')

            } catch (error) {
                return next(error)
            }
        }))

    passport.use(new JWTStrategy({ jwtFromRequest: req => req.cookies.jwt, secretOrKey: secretKey },

        (jwtPayload, done) => {

            if (Date.now() > jwtPayload.expires) {
                return done('jwt expired')
            }

            return done(null, jwtPayload)
        }

    ))
}