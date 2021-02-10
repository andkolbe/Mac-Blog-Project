import * as jwt from 'jsonwebtoken';
import config from '../config';
import type { IPayload } from './types';

export const createToken = (payload: IPayload) => {
    const token = jwt.sign(payload, config.auth.secret, { expiresIn: config.auth.expires }); // json web tokens can expire themselves with no extra logic from you
    // use jswt.sign because you are attaching a unique signature to each token. Unique payload, secret, and expire date
    // we need a signature to allow us to establish the authenticity of the JWT
    // hide the secret and expires in date behind .env
    // a signature doesn't prevent others from reading the contents of the JWT. That's what encryption is for
    return token;
}

// a token is made up of two parts. payload and secret
// payload is the body of the token. it is the information that is coded and sent somewhere else. ex: user id and email
// the secret stays in the back end. This prevents the token from being modified by someone else who finds the token on the front end

// a payload is a JavaScript object and can be populated with whatever we want 

// on the payload, iat stands for issued at

// jsonwebtoken isn't stored on the server. it is created anew every time a user logs in an destroyed when they log out
// the user info is stored on the client, so the server doesn't have to remember anything about the user


// if we store json web tokens in a database:
// resource intensive for constant database lookups but easy to validate and look up an individual token

// if we remain completely stateless and sign them and send them off, and don't store them anywhere:
// very quick and trustworthy, but if you need to invalidate a token, we have to add code and loops to jump through to find that individual token
// the easiest way is probably to change the secret, but that will log everyone out, and probably piss them off