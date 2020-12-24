import { Request } from 'express'; // Request = req variable
import { TAuthors } from '../db/models';

export interface IPayload {
    userid?: number;
}

export interface ReqUser extends Request { 
    // take the Request interface that is already built into express and add our own properties to it
    user?: TAuthors & IPayload
    // & means it's a combination of both
    // | means only the intersection between the two
}

