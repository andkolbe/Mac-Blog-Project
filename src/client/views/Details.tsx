import * as React from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { Link, useHistory, useParams } from 'react-router-dom';
import type { IBlog, ITag } from '../utils/types'; // adding type makes sure that when the code compiles, this will have no impact on the final bundle size

const Details: React.FC<DetailsProps> = props => {

    const { id } = useParams<{id: string}>();
    
    const history = useHistory();

    const [blog, setBlog] = React.useState<IBlog>(null);
    // a single IBlog is an object. You can't initialize an empty object because it's expecting all the properties in one IBlog. 
    // We don't want to have to write out every property of our object for our inital render. use null as a placeholder. 
    const [blogtags, setBlogTags] = React.useState<ITag[]>([]); 

    React.useEffect(() => {
        const getBlog = async () => {
           // const blogRes = await fetch(`/api/blogs/${id}`)
           // const blog = await blogRes.json();
           // const blogTagsRes = await fetch(`/api/blogtags/${id}`) // same id as /blogs
           // const blogtags = await blogTagsRes.json();
            //    setBlog(blog);
            //    setBlogTags(blogtags);
           
            const [ blogRes, blogtagRes ] = await Promise.all([fetch(`/api/blogs/${id}`), fetch(`/api/blogtags/${id}`)]);
            const [ blog, blogtags ] = await Promise.all([blogRes.json(), blogtagRes.json()]);
            unstable_batchedUpdates(() => {
                setBlog(blog);
                setBlogTags(blogtags);
            });
        };
        getBlog();
    }, [id]) // we can rerun this effect when id changes value

    return (
        <main className="container">
            <section className="row justify-content-center mt-3">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="d-flex card-title justify-content-center align-items-center">{blog?.title}</h5> 
                            <div>
                                {blogtags?.map(blogtag => (
                                    <span className="badge badge-primary mb-3 mx-1 p-2" key={`blogtag-${blogtag.id}`} >{blogtag.name}</span>
                                ))}
                            </div>
                            <p className="card-text">{blog?.content}</p>
                            <button onClick={() => history.push('/')} className="btn btn-success mr-4">Go Back</button>
                            <Link className="btn btn-secondary" to={`/admin/${id}`}>Edit / Delete</Link>
                        </div> 
                    </div> 
                </div> 
            </section> 
        </main>
    ); 
} // optional chaining (?) in front of blog and blogatgs so the initial render doesn't error out. Initial render of array is null. 
// null has no properties on it. We will get an error saying title doesn't exist on null 

interface DetailsProps { }

export default Details;