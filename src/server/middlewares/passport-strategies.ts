import * as passport from 'passport';
// we have to write middlewares for passport just like we do for app. these are called strategies
import * as LocalStrategy from 'passport-local';
import * as JWTStrategy from 'passport-jwt';
import db from '../db';
import { comparePasswordToHash } from '../utils/passwords';
import { IPayload } from '../utils/types';
import config from '../config';

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))
// these two lines create a req.user. They must go before you initialize your routes
// serialize creates a req.user and deserialize will remove it in certain scenarios
// the user is saved in the session and is later used to retrieve the whole object via the deserialize function

// the process of serialization consists of encoding a header, payload and signature if present with base64url algorithm

passport.use(new LocalStrategy.Strategy({ // passport strategies are writtien as object oriented classes
    usernameField: 'email' // local accepts a username by default so we can override that with email
}, async (email, password, done) => { // done is a function used by passport to determine when the strategy is done
    // email and password are authomatically pulled from the request body and given to you as variables
    // you don't need to write 
    // const email = req.body.email
    // const password = req.body.password
    
    try { 
        const [author] = await db.authors.find('email', email);
        // when someone is logging in, we need to make sure the email matches an email in our db
        // we need to compare the 'email' column stored in our db with the email they are trying to log in with (from the req.body)
        // the first parameter must match the column name in your database

        if (author && comparePasswordToHash(password, author.password)) {
            // first parameter is the plain text password submitted by a user, second parameter is the hash password stored in the database
            delete author.password // this will make sure your password is not returned to the front end by mistake
            done(null, author); // there is no error so the first argument is null
            // if the two passwords match, delete the password and serialize the req.user again
        } else {
            done(null, false); // false will default to 401 unauthorized 
        }
    } catch (error) {
        console.log(error);
        done(error);
    }
}))

// local lets you authenticate using a username and password in node.js applications
// local is used with logging in to a website when using our own database and our own written logic
// logging in via google or facebook or twitter have their own passport strategies

// someone attemps to log in with an req.body.email and req.body.password
// look up the email in the database 
// if the email finds a person, and the password they log in with matches what is stored in the database using the salt and hashing
// then the author info stored in the database becomes the req.user
// if the author email is not found, or the password does not match, respond with a 401



passport.use(new JWTStrategy.Strategy({ // tells our server how to handle a bearer token request
    jwtFromRequest: JWTStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(), // bearer tokens always go in the header! You can hold a token in the body, without using bearer, but it will be easier to hack. 
    // jwtFromRequest asks, how am I sending the JWT to my server? As a bearer token 
    secretOrKey: config.auth.secret // must provide your secret key here
}, async (payload: IPayload, done) => {
    try {
        const [author] = await db.authors.one(payload.userid);  
    //  const [author] = await db.authors.find('id', payload.userid); SAME THING
    if (author && author.banned !== 'y') {
            delete author.password
            done(null, author); // the first argument of done is whatever the error is
        } else {
            done(null, false);
        }
    } catch (error) {
        console.log(error);
        done(error);
    }
}))
// passport.jwt will automatically handle the expiration

// extract the token from the header
// verify the token by checking the secret
// display the payload 


/*

Can use this if you are not checking for banned

passport.use(new JWTStrategy.Strategy({ // tells our server how to handle a bearer token request
    jwtFromRequest: JWTStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
    // jwtFromRequest asks, how am I sending the JWT to my server? As a bearer token 
    secretOrKey: config.auth.secret // must provide your secret key here
}, (payload:IPayload, done) => {
    done(null, payload); // the first argument of done is whatever the error is
}))

*/
