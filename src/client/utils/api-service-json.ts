// new hotnesssssssss
// nice

export const TOKEN_KEY = 'token'; // strings are easy to typo. variables have autocomplete // can be named anything
// a named export must always be imported inside of curly braces
export default async <T = any>(uri: string, method: string = 'GET', body?: {}) => {
    // method will default to GET unless provided
    // body is optional because it is typically provided only on POST or PUT requests


    const Token = localStorage.getItem(TOKEN_KEY); // if there is nothing in localStorage, it will return undefined(falsy)
    // localstorage is an api built into every major modern browser. it is a json object that can store any type of json data you want under a key name
    // typically used for profile or account settings that don't need to be stored in a database
    // you can store info in it temporarily and quickly repopulate pages with information without having to make a call to your server
    // localstorage can expire or clear by manually clearing it with localStorage.clear(); or by going to your browser and clearing your cache or cookies
    // it is not global. it is defined per root path. my localhost 3000 storage won't conflict with google's localstorage or any other website
    // localstorage persists even if you close thr browser
    // it is not available in private browsing or incognito mode
    // it is encoded not encrypted. it can be accessed and goofed with by anyone
    // sessionStorage is the same as localStorage but it does not persist. Once you leave the browser, the sessionStorage is cleared
    // we have to use methods that are provided for us with localStorage to retrieve, set, clear values, etc. Getters and Setters
    // getItem will return a string if there is a token in localstorage, if not, getItem will return null


    const headers = new Headers();
    // headers are mostly used to describe cryptographic operations such as signing and/or encryption
    // it can also specify additional properties like media and content type, but those are used less
    // the cryptographic operations in the header define whether the JWT is signed and/or encrypted 

    const options: {[ key: string ]: string | Headers} = { // how to strong type a javascript object when you don't know what the property is going to be
                // [] doesn't mean array here. bracket notation. same as using dot notation
        method, // is of type string
        headers // is of type Headers
    }

    /* This is the options object
    {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json
            },
            body: JSON.stringify();
    */

    if (method === 'POST' || method === 'PUT') {
        headers.append('Content-Type', 'application/json') // we only need this line if we are using a POST or PUT request
        // append won't overwrite existing keys. set will overwrite existing keys
        options.body = JSON.stringify(body); // we only need to add the body property and stringify it for a POST or PUT request 
    }

    if (Token) { // if we have a correct token, go to the original route path
        headers.append('Authorization', `Bearer ${Token}`) // if the token is real, attach it for our server to find
        // bearer tokens are always in the 'Authorization' request header field
        // headers are harder to hack than bodies because they need to be more specific
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

        if (res.ok) { // status codes 200s and 300s are ok
            return <T>await res.json();
        }

    } catch (error) { // the specific error is thrown down here
        console.log(error); // and then logged
    }

}

export const setStorage  = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const logout = () => localStorage.removeItem(TOKEN_KEY);
// removeItem will only remove the token and not anything else stored in localStorage










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

