/**
 * Users.js
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
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    name: {
      type: 'string'
    },
    displayName: {
      type: 'string'
    },
    position: {
      type: 'string',
      enum: ['developer', 'lead', 'manager'] // TODO: Fill all positions
    },
    identities: {
      type: 'json',
      columnType: 'array'
    },
    absences: {
      type: 'json',
      columnType: 'array'
    }
  }
}
