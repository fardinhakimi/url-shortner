const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const googleStrategy = require('passport-google-oauth20').Strategy
const gitHubStrategy = require('passport-github').Strategy;
const httpStatus = require('http-status-codes')
const User = require('./models/user')
const bcrypt = require('bcrypt')
const secretKey = process.env.SECRET_KEY
const { ApiError } = require('./errors')


const BASE_URL = process.env.DOMAIN_NAME

module.exports = (passport) => {

    // LOCAL STRATEGY

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


    // JWT STRATEGY

    passport.use(new JWTStrategy({ jwtFromRequest: req => req.cookies.jwt, secretOrKey: secretKey },

        (jwtPayload, done) => {

            if (Date.now() > jwtPayload.expires) {
                return done('jwt expired')
            }

            return done(null, jwtPayload)
        }
    ))

    // GOOGLE STRATEGY

    passport.use(new googleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: BASE_URL+'/auth/google/callback'
    },

        async (accessToken, refreshToken, profile, done) => {

            try {

                const email = profile.emails[0].value;

                // check if user already exists
                let user = await User.findOne({ email: email });

                if (user) {
                    return done(null, user);
                }

                const { familyName, givenName } = profile.name

                user = new User(
                    {
                        email: email,
                        name: `${givenName} ${familyName}`,
                        googleId: profile.id,
                        googleProfileJson: profile._json
                    }
                )

                user = await user.save();

                return done(null, user);

            } catch (error) {

                return done(error)
            }

        }
    ))


    // GITHUB STRATEGY

    passport.use(new gitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_SECRET_KEY,
        callbackURL: BASE_URL+'/auth/github/callback'
    },
        async (accessToken, refreshToken, profile, done) => {

            try {

                let user = await User.findOne({ email: profile._json.email });

                if (user) {
                    return done(null, user);
                }

                user = new User(
                    {
                        email: profile._json.email,
                        name: profile._json.name,
                        githubId: profile.id,
                        githubProfileJson: profile._json
                    }
                )

                user = await user.save();

                return done(null, user);

            } catch (error) {
                return done(error)
            }
        }
    ))

    // SERIALIZER AND DESERIALIZER

    passport.serializeUser(function (user, cb) {
        cb(null, user);
    });


    passport.deserializeUser(function (obj, cb) {
        cb(null, obj);
    });
}


