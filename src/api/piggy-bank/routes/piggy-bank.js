'use strict';

/**
 * piggy-bank router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::piggy-bank.piggy-bank');
