/**
 * Absence.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    startDate: {
      type: 'date',
      required: true
    },
    endDate: {
      type: 'date',
      required: true
    },
    submittedAt: {
      type: 'date',
      required: true
    },
    type: {
      type: 'string',
      defaultsTo: 'paid',
      enum: ['paid', 'unpaid', 'sick']
    },
    attachments: {
      type: 'array'
    }
  }
};

