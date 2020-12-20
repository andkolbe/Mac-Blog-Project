import * as React from 'react';
import Layout from '../components/Layout';

const NotFound: React.FC<NotFoundProps> = props => {
    return (
        <Layout>
            <h1 className="text-center">404 NOT FOUND</h1>
        </Layout>
    );
}

interface NotFoundProps {}

export default NotFound;