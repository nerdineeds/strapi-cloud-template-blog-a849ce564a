'use strict';

const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

console.log('Loaded Stripe key:', process.env.STRIPE_SECRET_KEY);

module.exports = {
  async createCheckoutSession(userId, piggyBankId, amount) {
    const piggyBank = await strapi.entityService.findOne('api::piggy-bank.piggy-bank', piggyBankId, {
      populate: ['user'],
    });

    if (!piggyBank || piggyBank.user.id !== userId) {
      throw new Error('PiggyBank not found or unauthorized.');
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Deposit into PiggyBank: ${piggyBank.name}`,
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      }],
      metadata: {
        piggyBankId: piggyBank.id.toString(),
        userId: userId.toString(),
      },
      success_url: `${process.env.FRONTEND_URL}/piggybank-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/piggybank-cancelled`,
    });

    return session.url;
  },
};