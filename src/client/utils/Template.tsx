import * as React from 'react';
import Layout from '../components/Layout';

const Template: React.FC<TemplateProps> = props => { 
// const Template = (props: TemplateProps) => {    Another way to write this. direct strong typing props
    return (
        <Layout>
            <h1 className="text-center">Template</h1>
        </Layout>
    );
}

interface TemplateProps {}

export default Template;