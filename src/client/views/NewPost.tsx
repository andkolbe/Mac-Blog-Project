import * as React from 'react';
import { useEffect, useState } from 'react';
import api from '../utils/api-service';
import type { ITag } from '../utils/types';
import { useHistory } from 'react-router-dom';
import Layout from '../components/Layout';


const NewPost: React.FC<NewPostProps> = props => {

    const history = useHistory();

    const [title, setTitle] = useState(''); // typescript will infer these are strings. you don't have to write <string>
    const [content, setContent] = useState('');
    const [file, setFile] = useState<File>(null); // there is a typescript datatype called File
    const [selectedTagid, setSelectedTagid] = useState('0');

    const [tags, setTags] = useState<ITag[]>([]);

    useEffect(() => {
        api('/api/tags').then(tags => setTags(tags))
    }, []); // a blank array means we don't want the effect to run more than once

    // const submitBlog = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault(); // prevents the form from refreshing the page before the POST promise can execute. Otherwise the click will reset the page with black form data
    //     const newBlog = new FormData(); // how to package data to the back end that contains a file. Images can't be stringified. Body parser would turn it into text
    //     newBlog.append('title', title);
    //     newBlog.append('content', content);
    //     newBlog.append('image', file); 
    //     api('/api/blogs', 'POST', newBlog) // newBlog can also be written as { title, content, file }
    //         .then(blogPost => {
    //             if (selectedTagid !== '0') {
    //                 api('/api/blogtags', 'POST', { blogid: blogPost.insertId, tagid: selectedTagid })
    //                     .then(() => setSelectedTagid('0')) // back to the default placeholder: Select a Tag...
    //             }
    //             history.push('/'); // place this here so you will still be redirected back to the home page even if a tag isn't selected 
    //         });
    // };

    const submitBlog = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // prevents the form from refreshing the page before the POST promise can execute. Otherwise the click will reset the page with black form data
        const newBlog = new FormData();
        newBlog.append('title', title);
        newBlog.append('content', content);
        newBlog.append('image', file); 
        const res = await fetch('/api/blogs', {
            method: 'POST',
            body: newBlog
        })
        const blogResult = await res.json();

        if (selectedTagid !== '0') {
            api('/api/blogtags', 'POST', { blogid: blogResult.insertId, tagid: selectedTagid })
                .then(() => setSelectedTagid('0')) // back to the default placeholder: Select a Tag...

        }
        history.push('/'); // place this here so you will still be redirected back to the home page even if a tag isn't selected 

    };

    // const submitBlog = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault(); // prevents the form from refreshing the page before the POST promise can execute. Otherwise the click will reset the page with black form data
    //     api('/api/blogs', 'POST', { title, content } ) // newBlog can also be written as { title, content, file }
    //         .then(blogPost => {
    //             if (selectedTagid !== '0') {
    //                 api('/api/blogtags', 'POST', { blogid: blogPost.insertId, tagid: selectedTagid })
    //                     .then(() => setSelectedTagid('0')) // back to the default placeholder: Select a Tag...

    //             }
    //             history.push('/'); // place this here so you will still be redirected back to the home page even if a tag isn't selected 
    //         });
    // };

    return ( // return is always written after the methods
        <Layout>
            <form className='form-group border p-4 shadow bg-white font-weight-bold'>
                <label htmlFor='name'>Title</label>
                <input placeholder='write title here...' value={title} onChange={e => setTitle(e.target.value)} type='text' className='form-control bg-warning' />
                <label htmlFor='selected tag' className='mt-4'>Tags</label>
                <select value={selectedTagid} onChange={e => setSelectedTagid(e.target.value)} className='form-control'>
                    <option value='0'>Select a Tag ...</option>
                    {tags.map(tag => (
                        <option key={`tag-key-${tag.id}`} value={tag.id}>{tag.name}</option>
                    ))}
                </select>
                <label className='mt-4'>Content</label>
                <textarea placeholder='write content here...' value={content} onChange={e => setContent(e.target.value)} rows={12} className='form-control my-1 bg-warning'></textarea>
                <label className='mt-4' htmlFor='picture'>Add Picture</label>
                <div>
                    <input onChange={e => setFile(e.target.files[0])} className='form-control-file' type='file' id='picture' />
                    <img className='img-thumbnail mt-3' src={file ? URL.createObjectURL(file) : 'https://via.placeholder.com/125'} alt='picture' />
                </div>
                <button onClick={submitBlog} className='btn btn-success mt-4 font-weight-bold'>Post</button>
            </form>
        </Layout>
    );
}

// the htmlFor and id need to match for screen readers

interface NewPostProps { }

export default NewPost;






