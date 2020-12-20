// new hotnesssssssss
// nice

export const TOKEN_KEY = 'token';
export default async <T = any>(uri: string, method: string = 'GET', body?: {}) => {

    const Token = localStorage.getItem(TOKEN_KEY); 

    const headers = new Headers();
    const options: {[ key: string ]: string | Headers} = {
        method, 
        headers
    }

    if (method === 'POST' || method === 'PUT') {
        headers.append('Content-Type', 'application/json')
        options.body = JSON.stringify(body);
    }

    if (Token) {
        headers.append('Authorization', `Bearer ${Token}`)
    } 

    try {
        const res = await fetch(uri, options)

        if (res.status === 404) {
            throw new Error('path not found. Check server routes or URI!')
        }

        if (res.status === 401) {
            throw new Error('token is invalid or does not exist')
        }

        if (res.status === 500) {
            throw new Error('my server code sucks :( check terminal!')
        }

        if (res.ok) {
            return <T>await res.json();
        }

    } catch (error) {
        console.log(error);
    }

}










// ole bust'd

// export default async <T = any>(uri: string, method: string = 'GET', body?: {}) => {
//     const headers = {
//         //'Authorization': 'Bearer nh[w9u45ngvouensrgibs',
//         'Content-Type': 'application/json' // pins a note to our request to let our server know to pass our json data through the body parser middleware
//     }
//     try {
//         const res = await fetch(uri, {
//             method, // es6 shorthand. we don't have to write method: method,
//             headers,
//             body: JSON.stringify(body)
//         })
//         if (res.ok) {
//             return <T>await res.json();
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };

// // uri is the underlying network architecture that encompasses the url. written similar to a serial number. url is like the name property of the uri

// // method: GET, POST, PUT, DELETE
// // fetch defaults to GET if your request isn't specified, so we can code in the same thing here

// // body is optional because GET and DELETE requests don't need a body

