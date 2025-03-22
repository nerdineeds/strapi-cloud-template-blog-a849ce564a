'use strict';

/**
 * piggy-bank router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::piggy-bank.piggy-bank', {
    config: {
      createStripeSession: {
        auth: true,
      },
    },
    routes: [
      {
        method: 'POST',
        path: '/piggy-banks/checkout',
        handler: 'piggy-bank.createStripeSession',
        config: {
          auth: true,
        },
      },
    ],
  });