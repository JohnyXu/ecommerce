import { SanityImageSource, SanityImageObject } from '@sanity/image-url/lib/types/types';
import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';
const secretKey: string = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string;
const stripe = new Stripe(secretKey, { apiVersion: '2020-08-27' });

interface IReqBodyItems {
  name: string;
  price: number;
  quantity: number;
  image: SanityImageSource[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('stripe post request', req.method);

  if (req.method === 'POST') {
    try {
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          { shipping_rate: 'shr_1MJsp5CSqTfpqcwxh7JUPJPm' },
          { shipping_rate: 'shr_1MJsrWCSqTfpqcwxH61cAGuf' },
        ],
        line_items: req.body.map((item: IReqBodyItems) => {
          const img = (item.image[0] as SanityImageObject).asset._ref;
          const newImage = img
            .replace('image-', 'https://cdn.sanity.io/images/7ovu9so5/production/')
            .replace('-webp', '.webp');

          return {
            price_data: {
              currency: 'aud',
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };

      // Create Checkout Sessions from body params.
      console.log('params:', params);

      const session = await stripe.checkout.sessions.create(params);
      console.log('session', session);

      res.status(200).json(session);
    } catch (err: any) {
      console.log(err);

      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
