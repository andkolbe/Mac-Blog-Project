import { Request } from 'express'; // Request = req variable
import { TAuthors } from '../db/models';

export interface IPayload {
    userid?: number; // the is the unique id of the users(authors) in our database. We need the id to get to the token's payload
}

export interface ReqUser extends Request { 
    // take the Request interface that is already built into express and add our own properties to it
    user?: TAuthors & IPayload
    // & means it's a combination of both
    // | means only the intersection between the two
}

