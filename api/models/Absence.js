/**
 * Absence.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  primaryKey: '_id',
  attributes: {
    _id: {
      type: 'text',
      columnType: 'objectid'
    },
    startDate: {
      type: 'string',
      columnType: 'date',
      required: true
    },
    endDate: {
      type: 'string',
      columnType: 'date',
      required: true
    },
    submittedAt: {
      type: 'string',
      columnType: 'date',
      required: true
    },
    absenceType: {
      type: 'string',
      defaultsTo: 'paid',
      enum: ['paid', 'unpaid', 'sick']
    },
    attachments: {
      type: 'json',
      columnType: 'array'
    }
  }
}
