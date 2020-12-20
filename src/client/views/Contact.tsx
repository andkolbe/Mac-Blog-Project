import * as React from 'react';
import Layout from '../components/Layout';

const Contact: React.FC<ContactProps> = props => { 
// const Contact = (props: ContactProps) => {    Another way to write this. direct strong typing props
    return (
        <Layout>
            <h1 className="text-center">Contact</h1>
        </Layout>
    );
}

interface ContactProps {}

export default Contact;