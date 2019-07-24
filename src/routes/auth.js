const router = require('express').Router()
const httpStatus = require('http-status-codes')
const { check, validationResult } = require('express-validator')
const { unprocessableEntity, internalServerError } = require('../functions')
const passport = require('passport')
const secretKey = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');

const FRONT_END_URL = process.env.FRONT_END_URL || process.env.DOMAIN_NAME

router.get('/', (req, res) => {

    return res.status(httpStatus.OK).json([
        '/auth/google <POST>',
        '/auth/google/callback <POST>'
    ])
})

// LOCAL STRATEGY

router.post('/login', [
    check('email').isEmail().withMessage('must contain a valid email address'),
    check('password').isLength({ min: 8 }).withMessage('password must be minimum 8 chars')
], (req, res) => {

    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return unprocessableEntity(res, errors.errors)
        }

        passport.authenticate(
            'local',
            { session: false },
            (error, user) => {

                if (error || !user) {
                    res.status(error.getStatusCode()).json({ errors: [error.getMessage()] })
                }

                const payload = {
                    email: user.email,
                    expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS),
                }

                req.login(payload, { session: false }, (error) => {

                    if (error) {

                        res.status(httpStatus.BAD_REQUEST).send({ errors: [error] })
                    }

                    const token = jwt.sign(JSON.stringify(payload), secretKey)

                    res.cookie('jwt', token, { httpOnly: true, secure: true })

                    res.status(httpStatus.OK).send({
                        user: {
                            token,
                            isGuest: false,
                            email: user.email
                        }
                    })
                })
            },
        )(req, res)

    } catch (error) {
        return internalServerError(res, [error])
    }
})

// GOOGLE STRATEGY


router.get('/google', passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email']
}))

router.get('/google/callback', (req, res) => {
    return providerLogin(req, res, 'google')
});

// GITHUB STRATEGY

router.get('/github', passport.authenticate('github', {
    session: false
}))

router.get('/github/callback', (req, res) => {
    return providerLogin(req, res, 'github')
});

const providerLogin = (req, res, providerName) => {

    passport.authenticate(
        providerName,
        { session: false },
        (error, user) => {

            if (error || !user) {
                return res.redirect(`${FRONT_END_URL}?login_status=FAILED_WITH_ERROR`)
            }

            const payload = {
                email: user.email,
                expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS),
            }

            req.login(payload, { session: false }, (error) => {

                if (error) {
                    return res.redirect(`${FRONT_END_URL}/accounts/login?login_status=FAILED_TOKEN_SIGNING`)
                }

                const token = jwt.sign(JSON.stringify(payload), secretKey)
                return res.redirect(`${FRONT_END_URL}/accounts/login?login_status=SUCCEEDED&&token=${token}`)
            })
        },
    )(req, res)
}

module.exports = router