const router = require('express').Router()
const registerationController = require('../controllers/RegisterationController')
const { check, validationResult } = require('express-validator')
const httpStatus = require('http-status-codes')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const {ApiError} = require('../errors')

const secretKey = process.env.SECRET_KEY

const validationList = [
  check('email').isEmail().withMessage('must contain a valid email address'),
  check('password').isLength({ min: 8 }).withMessage('password must be minimum 8 chars')
]

router.post('/login', validationList, (req, res) => {

  try {
    
    const errors = validationResult(req)

    if(!errors.isEmpty()){
      res.status(httpStatus.UNPROCESSABLE_ENTITY).json(errors)
    }

    passport.authenticate(
      'local',
      { session: false },
      (error, user) => {
  
        if (error || !user) {
            res.status(error.getStatusCode()).json({error: error.getMessage()})
        }

        const payload = {
          email: user.email,
          expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS),
        }
  
        req.login(payload, { session: false }, (error) => {
  
          if (error) {
            res.status(httpStatus.BAD_REQUEST).send({ error })
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

  }catch(error){
    res.json(error)
  }

})

validationList.push(check('name').isString().isLength({ min: 3 }).withMessage('Name is required'))

router.post('/register', validationList,registerationController.register)

module.exports = router