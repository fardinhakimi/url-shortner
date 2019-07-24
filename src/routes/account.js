const router = require('express').Router()
const registerationController = require('../controllers/RegisterationController')
const { check, validationResult } = require('express-validator')
const httpStatus = require('http-status-codes')
const User = require('../models/user')
const { isEmpty, internalServerError, unprocessableEntity } = require('../functions')


// REGISTRATION

router.post('/register', [
  check('name').isString().isLength({ min: 3 }).withMessage('Name is required'),
  check('email').isEmail().withMessage('must contain a valid email address'),
  check('password').isLength({ min: 8 }).withMessage('password must be minimum 8 chars')
], registerationController.register)


// IS THE USERNAME UNIQUE
router.post('/username-unique', [
  check('email').isString().isEmail().withMessage('Email address is required')
], async (req, res) => {
  try {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return unprocessableEntity(res, errors.errors)
    }

    const { email } = req.body

    const user = await User.findOne({ email: email })

    res.status(httpStatus.OK).send(
      {
        'is_username_unique': isEmpty(user)
      })

  } catch (error) {
    return internalServerError(res, [error])
  }

})


module.exports = router