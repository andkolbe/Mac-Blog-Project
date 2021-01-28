import * as React from 'react';
import Layout from '../components/Layout';

const About = (props: AboutProps) => {   
    return (
        <Layout>
            <h1 className="text-center">About</h1>
        </Layout>
    );
}

interface AboutProps {}

export default About;