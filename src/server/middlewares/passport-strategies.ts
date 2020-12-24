import * as passport from 'passport';
import * as LocalStrategy from 'passport-local';
import * as JWTStrategy from 'passport-jwt';
import db from '../db';
import { comparePasswordToHash } from '../utils/passwords';
import { IPayload } from '../utils/types';
import config from '../config';

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))
// these two lines create a req.user. They must go before you initialize your routes

passport.use(new LocalStrategy.Strategy({
    usernameField: 'email' // local accepts a username by default so we can override that with email
}, async (email, password, done) => { // done is a function used by passport to determine when the strategy is done
        // email and password are authomatically pulled from the request body and give them to you as variables
    try {
        const [author] = await db.authors.find('email', email); 
        // we are finding the 'email' column with the email value from the req.body
        // the first parameter must match the column name in your database

        if (author && comparePasswordToHash(password, author.password)) { 
            // first parameter is the plain text password submitted by a user, second parameter is the hash password stored in the database
            delete author.password // this will make sure your password is not returned to the front end by mistake
            done(null, author);
        } else {
            done(null, false); // false will default to 401 unauthorized 
        }
    } catch (error) {
        console.log(error);
        done(error);
    }
}))

passport.use(new JWTStrategy.Strategy({ // tells our server how to handle a bearer token request
    jwtFromRequest: JWTStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
    // jwtFromRequest asks, how am I sending the JWT to my server? As a bearer token 
    secretOrKey: config.auth.secret // must provide your secret key here
}, (payload:IPayload, done) => {
    done(null, payload); // the first argument of done is whatever the error is
}))
