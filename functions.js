
const isEmpty = (value) => {
    return (
        value === null
        || typeof value === 'undefined'
        || value.length === 0
        || value === ''
        || value === false
    )
}

module.exports = {
    isEmpty: isEmpty
}