import * as mysql from 'mysql'; // must use ' * as ' if you are importing a library
import config from '../config';
import authors from './queries/authors';
import blogs from './queries/blogs';
import blogtags from './queries/blogtags';
import comments from './queries/comments';
import tags from './queries/tags';

const pool = mysql.createPool(config.mysql); // pool automaticaly handles the handshaking Connection process for us // createPool is a function that takes an object as its argument
// This is how we connect our database to our project and hide our credentials

export const Query = <T = any>(query: string, values?: any) => { // <T = any> means pass in a generic if there is one, otherwise, default to type of any
    return new Promise<T>((resolve, reject) => {

        const sql = mysql.format(query, values); // debugging utility. Formats the query and values into one string
        // console.log(sql);

        pool.query(sql, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

export default { // we import and export our queries on this page for convenience when writing them out
    authors,
    blogs,
    blogtags,
    comments,
    tags
}


