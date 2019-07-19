const router = require('express').Router()
const loginController = require('./controllers/LoginController')
const registerationController = require('./controllers/RegistrationController')
const { check } = require('express-validator');
const HttpStatus = require('http-status-codes')

const passport = require('passport');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
const UserModel = require('../models/user');




const router = express.Router();


router.post('/login', (req, res) => {

    passport.authenticate(
      'local',
      { session: false },
      (error, user) => {
  
        if (error || !user) {
          res.status(HttpStatus.BAD_REQUEST).json({ error });
        }

        const payload = {
          email: user.email,
          expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS),
        }
  
        /** assigns payload to req.user */
        req.login(payload, {session: false}, (error) => {

        if (error) {
            res.status(400).send({ error });
        }

        const token = jwt.sign(JSON.stringify(payload), secretKey);

        /** assign our jwt to the cookie */
        res.cookie('jwt', token, { httpOnly: true, secure: true });

        res.status(200).send({ user: {
            token,
            isGuest: false,
            email: user.email
        } })

      })
    },
  )(req, res)

})


router.get('/', (req, res) => {
    res.send("POST to /api/shorten-url {'long_url': long_url_value } to shorten urls!")
})

const validationList = [
    check('email').isEmail().withMessage('must contain a valid email address'),
    check('password').isLength({ min: 8 }).withMessage('password must be minimum 8 chars')
]

router.post('/accounts/login',validationList, loginController.login)

validationList.push(check('name').isString().isLength({ min:3 }).withMessage('Name is required'))

router.post('/accounts/register', validationList,registerationController.register)

module.exports = router