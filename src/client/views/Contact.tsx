import * as React from 'react';
import { useState } from 'react';
import Layout from '../components/Layout';
import apiService from '../utils/api-service';

const Contact = (props: ContactProps) => {    // Another way to write this. direct strong typing props

    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const result = await apiService('/api/contact', 'POST', { email, subject: title, content });
        console.log(result);
        setEmail('');
        setTitle('');
        setContent('');
    }

    return (
        <Layout>
            <form className="form-group border p-4 shadow bg-white font-weight-bold">
                <div className="mb-4">
                    <label htmlFor="emailaddress" className="form-label" >Email Address</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email@email.com" className="form-control mb-3 bg-warning" />
                </div>
                <div className="mb-4">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} className="form-control mb-3 bg-warning" />
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="form-label" >Content</label>
                    <textarea value={content} onChange={e => setContent(e.target.value)} rows={8} className="form-control mb-3 bg-warning" />
                </div>
                <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
            </form>
        </Layout>
    );
}

interface ContactProps { }

export default Contact;