import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../utils/api-service';

const Lulz: React.FC<LulzProps> = props => {
    // const Lulz = (props: LulzProps) => {    Another way to write this. direct strong typing props

    const history = useHistory();

    React.useEffect(() => {
        api('/api/lulz')
            .then(lulz => console.log(lulz));
    }, []);


    return (
        <Layout>
            <h1 className="text-center">Lulz</h1>
        </Layout>
    );
}

interface LulzProps { }

export default Lulz;