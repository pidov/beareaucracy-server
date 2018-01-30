const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  displayName: String,
  ldapProvider: {
    type: {
      userPrincipalName: String
    },
    select: false
  }
})

UserSchema.static('upsertLdapUser', function (profile, cb) {
  const { mail: email } = profile
  return this.findOne({
    'email': email
  }, (err, user) => {
    if (user) {
      return cb(err, user)
    }

    const newUser = new this({
      email,
      displayName: '',
      ldapProvider: profile
    })

    newUser.save((err, user) => {
      if (err) { return cb(err) }
      this.findOne({
        'email': email
      }, cb)
    })

  })
})

exports.User = mongoose.model('User', UserSchema)
