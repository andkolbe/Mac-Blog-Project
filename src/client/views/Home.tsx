import * as React from 'react';
import type { IBlog } from '../utils/types';
import PreviewCard from '../components/PreviewCard';
import api from '../utils/api-service';
import { useLocation } from 'react-router-dom';

const Home: React.FC<HomeProps> = props => { // FC stands for function component. Template is a function component

    const location = useLocation<{ msg: string }>();

    const [blogs, setBlogs] = React.useState<IBlog[]>([]);

    React.useEffect(() => {
        api('/api/blogs').then(blogs => setBlogs(blogs));
    }, [])
    // use useEffect when you want to reach out to a network

    return (
        <main className="container">
            {location.state?.msg && <div className="alert alert-success text-center justify-content-center">{location.state.msg}</div>}
            <section className="row">
                {blogs.map(blog => (
                    <PreviewCard key={`blog-preview-${blog.id}`} blog={blog} />
                ))}
                <div className="col-md-4">
                    <div>
                        <input type="search" placeholder='search'/>
                    </div>
                    <div>
                        <article className="card my-2 shadow">
                            <div className="card-body">
                                <h4 className="card-title">Archives</h4>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </main>
        // state is stored on the keys so they must be unique to each component that is generated
    );
}

interface HomeProps { }

export default Home;


