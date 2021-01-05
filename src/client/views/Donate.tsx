import * as React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Layout from '../components/Layout';
import apiService from '../utils/api-service';

const Donate: React.FC<DonateProps> = props => { 
// const Donate = (props: DonateProps) => {    Another way to write this. direct strong typing props
    
    const stripe = useStripe();
    const elements = useElements();

    const [amount, setAmount] = React.useState('');

    const handleDonate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const cardElement = elements.getElement(CardElement);
        const { token, error } = await stripe.createToken(cardElement);
        const result = await apiService('/api/donate', 'POST', { amount, token });
        console.log(result);
        setAmount('');
        cardElement.clear();
    }

    return (
        <Layout>
            <form className="form-group">
                <input className="form-control" value={amount} onChange={e => setAmount(e.target.value)}/>
                <CardElement className="form-control"/>
                <button onClick={handleDonate} className="btn btn-primary">Buy Me A Coffee</button>
            </form>
        </Layout>
    );
}

interface DonateProps {}

export default Donate;