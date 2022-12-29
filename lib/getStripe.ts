import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<null | Stripe>;

const getStripe = async () => {
  if (!stripePromise) {
    const publishableKey: string = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string;
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

export default getStripe;
