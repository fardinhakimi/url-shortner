
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

module.exports = {
    isEmpty,
    isValidUrl
}