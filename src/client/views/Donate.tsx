import * as React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'; // react stripe comes with its own hooks
// react-stripe-js is the component library, it gives you the credit card fields
// CardElement is a component that will correspond to the credit card number, security code, and the expiration date all in one inline input
import Layout from '../components/Layout';
import apiJSON from '../utils/api-service-json';

const Donate = (props: DonateProps) => {    // direct strong typing props

    const stripe = useStripe(); // returns a reference to Stripe passed to the Elements provider
    const elements = useElements(); // hook used to safely pass the payment information collected by an Element to the Stripe API

    const [amount, setAmount] = React.useState(''); // typescript will infer primitive datatypes such as string or boolean

    const handleDonate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const cardElement = elements.getElement(CardElement); // we put the CardElement in a variable because we don't want to mess around with anything from stripe directly. Protects us against liability
        const { token, error } = await stripe.createToken(cardElement); // same as making a fetch request to their server without having to actually write it. We use their built in function to make the process much easier for us
        // createToken returns an object that has two properties. token and error. destructured from obj.token and obj.error
        const result = await apiJSON('/api/donate', 'POST', { amount, token }); // we take the amount and the token from stripe and send it to our back end
        // shorthand for amount: amount and token: token
        console.log(result);
        setAmount(''); // clears our amount input
        cardElement.clear(); // clears the CardElement
    }

    return (
        <Layout>
            <form className="form-group font-weight-bold">
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input className="form-control" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="" className="form-label">Credit Card</label>
                    <CardElement className="form-control" />
                </div>
                <button onClick={handleDonate} type="submit" className="btn btn-success">Buy Me A Coffee</button>
            </form>
        </Layout>
    );
}

interface DonateProps { }

export default Donate;

// how do we grab the info from the CardElement input they gave us safely? We don't want to touch the information directly
// when the button is clicked, it will grab what is in the input field no problem, as it is controlled by our amount state
// it will send the CardElement info to the stripe api, which will then tokenize(encrypt) it, and return the token to us
// we take the amount and the token together, and send them to our express server