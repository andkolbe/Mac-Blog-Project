import { TOKEN_KEY } from './api-service-json';

export default async <T = any>(uri: string, method: string = 'GET', body?: {}) => {
   
    const Token = localStorage.getItem(TOKEN_KEY); 

    const headers = new Headers();
    const formData = new FormData();
    
    const options: {[ key: string ]: string | FormData} = {       
        method
    }

    if (method === 'POST' || method === 'PUT') {
        //headers.append('Content-Type', 'multipart/form-data')
        options.body = formData; 
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
