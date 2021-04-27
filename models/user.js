const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
  },
  hashedPassword:{ //okay this bad boy is being called somewhere
    type: String,
    required: true
  },
  blogs:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
    delete returnedObj.hashedPassword
    delete returnedObj.password
  }
})

//this will create a new collection in your Blogs DB
module.exports = mongoose.model('User', userSchema)