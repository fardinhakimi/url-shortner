
const httpStatus = require('http-status-codes')

class ApiError extends Error {

    constructor(msg = 'Bad request', status = httpStatus.BAD_REQUEST, ...params) {

      super(...params)
  
      // Maintains proper stack trace for where our error was thrown (only available on V8)
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, ApiError);
      }

      this.msg = msg
      this.status = status
    }

    getMessage(){
        return this.msg
    }

    getStatusCode(){
        return this.status
    }
}

module.exports = {
    ApiError
}
