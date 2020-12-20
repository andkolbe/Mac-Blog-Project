import * as React from 'react';
import api from '../utils/api-service';
import type { ITag } from '../utils/Types';
import { useHistory, useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';


const Admin: React.FC<AdminProps> = props => {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();

    const [title, setTitle] = React.useState(''); // typescript will infer these are strings. you don't have to write <string>
    const [content, setContent] = React.useState('');
    const [selectedTagid, setSelectedTagid] = React.useState('0');

    const [tags, setTags] = React.useState<ITag[]>([]);

    React.useEffect(() => {
        (async () => {
            const res = await fetch(`/api/blogs/${id}`);
            const blog = await res.json();

            const blogTagsRes = await fetch(`/api/blogtags/${id}`) // same id as /blogs
            const blogtags = await blogTagsRes.json();

            setTitle(blog.title);
            setContent(blog.content);
            setSelectedTagid(blogtags[0].id);
        })()
    }, [id]) // rerender the view when the id changes

    React.useEffect(() => {
        api('/api/tags').then(tags => setTags(tags))
    }, []); // a blank array means we don't want the effect to run more than once

    const editBlog = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // prevents the form from refreshing the page before the POST promise can execute. Otherwise the click will reset the page with black form data
        const res = await fetch(`/api/blogs/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });
        await res.json();
        history.push(`/details/${id}`)
    };   

    const deleteBlog = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const res = await fetch(`/api/blogtags/${id}`, {
            method: 'DELETE'
        });
        const res2 = await fetch(`/api/blogs/${id}`, {
            method: 'DELETE'
        });
        if (res.ok && res2.ok) { // res.ok comes from a fetch response. it will check the status number from the server. ok will be true for 200-399 and false for 400-500
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