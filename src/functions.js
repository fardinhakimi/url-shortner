
const httpStatus = require('http-status-codes')

/**
 * 
 * @param {string} value
 * @returns boolean 
 */
function isEmpty(value) {
    return (
        value === null
        || typeof value === 'undefined'
        || value.length === 0
        || value === ''
        || value === false
    )
}

/**
 * Checks for valid url
 * @param {string} url 
 * @returns boolean
 */
function isValidUrl(url){
    const pattern = new RegExp(/(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/)
    return pattern.test(url)
}

/**
 * 
 * @param { express response } res 
 * @param { [] } errors 
 */
const internalServerError = (res, errors = []) => {
    return res.status(httpStatus.internalServerError).send({errors})
}

/**
 * 
 * @param express responses res 
 * @param [] errors 
 */
const unprocessableEntity = (res, errors = []) => {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({errors})
}

module.exports = {
    isEmpty,
    isValidUrl,
    internalServerError,
    unprocessableEntity
}