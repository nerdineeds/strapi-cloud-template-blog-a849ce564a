'use strict';

/**
 * piggy-bank controller
 */

// @ts-ignore
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::piggy-bank.piggy-bank', ({ strapi }) => ({
    async createStripeSession(ctx) {
      const user = ctx.state.user;
      const { piggyBankId, amount } = ctx.request.body;
  
      if (!user) {
        return ctx.unauthorized('You must be logged in.');
      }
  
      if (!piggyBankId || !amount) {
        return ctx.badRequest('Missing piggyBankId or amount.');
      }
  
      try {
        const url = await strapi
          .service('api::piggy-bank.stripe')
          .createCheckoutSession(user.id, piggyBankId, amount);
        return ctx.send({ url });
      } catch (err) {
        return ctx.internalServerError(err.message);
      }
    },
  }));