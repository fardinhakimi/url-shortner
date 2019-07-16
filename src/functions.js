
/**
 * 
 * @param {string} value
 * @returns boolean 
 */
const isEmpty = (value) => {
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
const isValidUrl = (url) => {
    const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/
    const pattern = new RegExp(regex)
    return pattern.test(url)

}

module.exports = {
    isEmpty,
    isValidUrl
}