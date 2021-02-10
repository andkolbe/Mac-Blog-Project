import * as moment from 'moment';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { Link, useParams } from 'react-router-dom';
import apiJSON from '../utils/api-service-json';
import type { IBlog, ITag, IComment } from '../utils/types'; // adding type makes sure that when the code compiles, this will have no impact on the final bundle size

const Details: React.FC<DetailsProps> = props => {

    const { id } = useParams<{ id: string }>(); // parameters are always strings by default
    // the id parameter should match what is written in App.tsx '/details/:id'

    const [blog, setBlog] = useState<IBlog>(null);
    // a single IBlog is an object. You can't initialize an empty object because it's expecting all the properties in one IBlog. 
    // We don't want to have to write out every property of our object for our inital render. use null as a placeholder. 
    const [blogtags, setBlogTags] = useState<ITag[]>([]);

    const [comments, setComments] = useState<IComment[]>([])
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');

    React.useEffect(() => {
        const getBlog = async () => {
            // const blogRes = await fetch(`/api/blogs/${id}`)
            // const blog = await blogRes.json();
            // const blogTagsRes = await fetch(`/api/blogtags/${id}`) // same id as /blogs
            // const blogtags = await blogTagsRes.json();
            //    setBlog(blog);
            //    setBlogTags(blogtags);

            const [blogRes, blogtagRes, commentRes] = await Promise.all([fetch(`/api/blogs/${id}`), fetch(`/api/blogtags/${id}`), fetch(`/api/comments/${id}`)]);
            const [blog, blogtags, comments] = await Promise.all([blogRes.json(), blogtagRes.json(), commentRes.json()]);
            unstable_batchedUpdates(() => {
                setBlog(blog);
                setBlogTags(blogtags);
                setComments(comments);
            });
        };
        getBlog();
    }, [id]) // we can rerun this effect when id changes value


    const postComment = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        apiJSON('/api/comments', 'POST', { name, comment })
    }

    return (
        <main className="container">
            <section className="row justify-content-center mt-3">
                <div className="col-11">
                    <div className="card">
                        <div className="card-body">
                            <img className='w-100' src={blog?.image_url} alt="image" />
                            <h5 className="d-flex card-title justify-content-center align-items-center">{blog?.title}</h5>
                            <div>
                                {blogtags?.map(blogtag => (
                                    <span className="badge badge-primary mb-3 mx-1 p-2" key={`blogtag-${blogtag.id}`}>{blogtag.name}</span>
                                ))}
                            </div>
                            <p className="card-text">{blog?.content}</p>
                            <Link className="btn btn-success mr-4" to={`/admin/${id}`}>Edit / Delete</Link>
                            <Link className="btn text-secondary" to={'/'}>Go Back</Link>
                        </div>
                    </div>
                    <div>
                        <form className='col-10 form-group border shadow bg-white font-weight-bold  p-4 mt-5'>
                            <h5>Add a Comment</h5>
                            <label htmlFor='name'>Name</label>
                            <input placeholder='write your name...' value={name} onChange={e => setName(e.target.value)} type='text' className='form-control bg-warning' />
                            <label className='mt-4'>Comment</label>
                            <textarea placeholder='write your comment...' value={comment} onChange={e => setComment(e.target.value)} rows={5} className='form-control my-1 bg-warning'></textarea>
                            <button onClick={postComment} className='btn btn-success mt-4 font-weight-bold'>Post</button>
                        </form>
                        {comments.map(comment => (  // shorthand multi line return with () // .map takes an existing array, does something to it, and returns a new array
                            <div key={`comment-key-${comment.id}`} className="card my-2 shadow">
                                <div className="card-body">
                                    <h5 className="card-title">{comment.name}</h5>
                                    <p className="card-text">{comment.comment}</p>
                                    <small className="card-text text-secondary">{moment(comment.created_at).format('h:mm a - l')}</small>
                                    <div className="d-flex justify-content-end">
                                        <Link className="btn text-success font-weight-bold" to={`/comments/${comment.id}/admin`}>Edit Comment</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
} // optional chaining (?) in front of blog and blogatgs so the initial render doesn't error out. Initial render of array is null. 
// null has no properties on it. We will get an error saying title doesn't exist on null 

interface DetailsProps { }

export default Details;