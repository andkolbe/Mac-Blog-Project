import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../components/Layout';

const Lulz: React.FC<LulzProps> = props => { 
// const Lulz = (props: LulzProps) => {    Another way to write this. direct strong typing props
    
    const history = useHistory();

    React.useEffect(() => {
        const token = localStorage.getItem('token'); // pull the token from localStorage if it exists
        if (!token) {
            history.push('/login');
        } else {
            fetch('/api/lulz', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(lulz => console.log(lulz));
        }
        
    }, []);


    return (
        <Layout>
            <h1 className="text-center">Lulz</h1>
        </Layout>
    );
}

interface LulzProps {}

export default Lulz;