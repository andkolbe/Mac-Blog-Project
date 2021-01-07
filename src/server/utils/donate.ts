import config from '../config';

const stripe = require('stripe')(config.keys.stripe); 
// basically an import statement importing stripe and the secret key on one line of code instead of two seperate ones

const charge = (id: string, amount: number) => {
    return stripe.charges.create({
        source: id, // what is the source that we are charging. the id of the token
        currency: 'usd', // the type of currency that we are using
        amount: amount * 100, // stripe charges the smallest possible value of that currency
        description: 'Thanks for buying me a coffee!'
    });
}

export default charge;