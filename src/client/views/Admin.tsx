import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import type { ITag } from '../utils/types';
import api from '../utils/api-service';
import Layout from '../components/Layout';

let oldId: number = null;

const Admin: React.FC<AdminProps> = props => {

    const { id } = useParams<{ id: string }>(); // the variable name must match the name on the route path
    
    const history = useHistory();

    const [title, setTitle] = useState(''); // typescript will infer these are strings. you don't have to write <string>
    const [content, setContent] = useState('');
    const [selectedTagid, setSelectedTagid] = useState('0');

    const [tags, setTags] = useState<ITag[]>([]); // typescript will not infer array or object datatypes so those must be written between the []

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/blogs/${id}`);
            const blog = await res.json();
            const res2 = await fetch(`/api/blogtags/${id}`) // same id as /blogs
            const blogtags = await res2.json();
            oldId = blogtags[0].tagid;
            setTitle(blog.title);
            setContent(blog.content);
            setSelectedTagid(blogtags[0].tagid); // tagid comes from way the stored procedure is written
        })()
    }, [id]) // rerender the view when the id changes

    useEffect(() => {
        api('/api/tags').then(tags => setTags(tags))
    }, []); // a blank array means we don't want the effect to run more than once

    const editBlog = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // prevents the form from refreshing the page before the POST promise can execute. Otherwise the click will reset the page with black form data
        api(`/api/blogs/${id}`, 'PUT', { title, content })
        if (oldId !== Number(selectedTagid)) {
            api(`/api/blogtags/${id}`, 'PUT', { oldId, newId: Number(selectedTagid) })
        }
        history.push(`/details/${id}`);
    };   

    const deleteBlog = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        // api(`/api/blogtags/${id}`, 'DELETE');
        // api(`/api/blogs/${id}`, 'DELETE');
        // history.push('/');

        const res = await fetch(`/api/blogtags/${id}`, {
            method: 'DELETE'
        });
        const res2 = await fetch(`/api/blogs/${id}`, {
            method: 'DELETE'
        });
        if (res.ok && res2.ok) {
            history.push('/');
        }
        
        
    }

    return ( // return is always written after the methods
        <Layout>
            <form className="form-group border p-4 shadow bg-white">
                <label htmlFor="name" className="font-weight-bold">Title</label>
                <input placeholder="write title here..." value={title} onChange={e => setTitle(e.target.value)} type="text" className="form-control bg-warning" />
                <label className="font-weight-bold mt-4">Tags</label>
                <select value={selectedTagid} onChange={e => setSelectedTagid(e.target.value)} className="form-control">
                    <option value="0">Select a Tag ...</option>
                    {tags.map(tag => (
                        <option key={`tag-key-${tag.id}`} value={tag.id}>{tag.name}</option>
                    ))}
                </select>
                <label className="mt-4 font-weight-bold">Content</label>
                <textarea placeholder="write content here..." value={content} onChange={e => setContent(e.target.value)} rows={12} className="form-control my-1 bg-warning"></textarea>
                <div className="d-flex justify-content-between mt-4">
                    <button onClick={editBlog} className="btn btn-success">Submit</button>
                    <Link className="btn btn-success" to={`/details/${id}`}>Go Back</Link>
                    <button onClick={deleteBlog} className="btn font-weight-bold text-danger">Delete</button>
                </div>
            </form>
        </Layout>
    );
}

interface AdminProps { }

export default Admin;