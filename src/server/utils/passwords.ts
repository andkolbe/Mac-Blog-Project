import * as bcrypt from 'bcrypt'; // bcryp is the silicon valley standard for salting and hashing

export const generateHash = (password: string) => { 
    // takes the plain text password as a parameter and returns the encrypted version
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

export const comparePasswordToHash = (password: string, hash: string) => bcrypt.compareSync(password, hash);
// compareSync will compare the plain text password the user submits to the hashed password stored in the database. Will return true or false
