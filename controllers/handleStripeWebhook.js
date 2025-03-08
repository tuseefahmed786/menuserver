const express = require('express');
const Stripe = require('stripe');
const user = require('../schema/user');
const stripe = Stripe('sk_test_51QMFV8BqMEKqDL9cuLbIGxQVnqZhdlSNq3N3hPaJwW9MjyVvqg1LRdscf3bpj7k2WDIEvmiHhjTg8M8gxTuekECP003jZnoJHp'); // Replace with your Stripe Secret Key
const endpointSecret = 'whsec_lKOlv7EF3FWgx5YRR9Ivy6TsyAPz4UJd'; // Replace with your Stripe webhook secret

exports.handleStripeWebhook = async (req, res) => {
    console.log('Webhook received');
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log('Event verified successfully:', event.type);
    } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        console.log('Handling checkout.session.completed event');
        const session = event.data.object;

        try {
            const customerId = session.customer;
            const subscriptionId = session.subscription;

            const customer = await stripe.customers.retrieve(customerId);
            console.log('Customer retrieved:', customer);

            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            console.log('Subscription retrieved:', subscription);

            const userId = customer.metadata.userId;
            console.log(`User ID from metadata: ${userId}`);

            await user.updateOne({ _id: userId }, { $set: { subscriptionStatus: 'active' } });
            console.log(`Subscription for user ${userId} is now active.`);
        } catch (err) {
            console.error('Error processing checkout.session.completed event:', err);
        }
    }

    res.status(200).send({ received: true });
};

