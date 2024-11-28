const Stripe = require('stripe');

const stripe = Stripe('sk_test_51QMFV8BqMEKqDL9cuLbIGxQVnqZhdlSNq3N3hPaJwW9MjyVvqg1LRdscf3bpj7k2WDIEvmiHhjTg8M8gxTuekECP003jZnoJHp'); // Replace with your Stripe Secret Key


exports.subscriptionStripe = async (req, res) => {
    const { priceId, customerEmail } = req.body;
    console.log(priceId, customerEmail)
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'subscription',
            line_items: [
                {
                    price: priceId, // Price ID from Stripe
                    quantity: 1,
                },
            ],
            customer_email: customerEmail, // Optional: Creates a Stripe customer
            success_url: 'http://localhost:3000/dashboard/subscription', // Redirect after success
            cancel_url: 'http://localhost:3000/dashboard/subscription',  // Redirect after cancel
        });

        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to create session' });
    }
};
