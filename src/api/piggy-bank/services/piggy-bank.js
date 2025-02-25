'use strict';

/**
 * piggy-bank service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::piggy-bank.piggy-bank');
