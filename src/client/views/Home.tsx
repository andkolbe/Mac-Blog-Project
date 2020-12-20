import * as React from 'react';
import Layout from '../components/Layout';
import type { IBlog } from '../utils/Types';
import PreviewCard from '../components/PreviewCard';

const Home: React.FC<HomeProps> = props => { // FC stands for function component. Template is a function component

    const [blogs, setBlogs] = React.useState<IBlog[]>([]);

    React.useEffect(() => {
        (async () => {
            const res = await fetch('/api/blogs');
            const blogs = await res.json();
            setBlogs(blogs);
        })()
    }, []);

    return (
        <main className="container">
            <section className="row">
            {blogs.map(blog => (
                <PreviewCard key={`blog-preview-${blog.id}`} blog={blog} />
            ))}
            </section>
        </main>
        // state is stored on the keys so they must be unique to each component that is generated
    );
}

interface HomeProps { }

export default Home;


