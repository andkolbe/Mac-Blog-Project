import * as dotenv from 'dotenv';

const envFound = dotenv.config();

if (!envFound) {
    throw new Error('no .env file'); // if there is no env file don't run the application
}

// config object
// the process.env property returns an object containing the user environment
// assigning a property on process.env will convert the value to a string
export default {
    mysql: { // credentials for the mysql.createPool(). export as config.mysql
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_SCHEMA
    },
    app: {
        prefix: process.env.API_PREFIX || '/api' // this will hide the /api route data from any randos who go on the web page and try to type it in the url bar it
    },
    auth: {
        secret: process.env.JWT_SECRET,
        expires: process.env.JWT_EXPIRES
    },
    keys: {
        stripe: process.env.STRIPE_KEY,
        mailgun: process.env.MAILGUN_KEY,
        mailgun_domain: process.env.MAILGUN_DOMAIN,
        aws_key_id: process.env.AWS_KEY_ID,
        aws_secret_key: process.env.AWS_SECRET_KEY
    }
}