const connect = require('mongoose').connect

const connectWithRetry = () => {

    const dbUrl = process.env.DATABASE_URL || 'mongodb://admin:admin_pass@0.0.0.0:27017/urls_db?authSource=admin'

    connect(dbUrl, { useNewUrlParser: true })
    .then(() => {
        console.log('database connected!');
    })
    .catch((err) => {
        console.error('Failed to connect to mongo on startup - retrying in 1 sec', err);
        setTimeout(connectWithRetry, 1000);
    })
}

module.exports = connectWithRetry