require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set ('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose
    .connect(url)
    .then(res => {
        console.log(('connected to MongoDB'));
    })
    .catch(error =>{
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, 'name is very short, min 3 letters'],
        required: [true, 'name is required']
    },
    number: {
        type: String,
        validate: {
            validator: function(v){
                return /^\d{2,3}-\d{6,12}$/.test(v)
            },
            message: props => `${props.value} is not a valid phone number: XX-XXXXXXX or XXX-XXXXXXX`
        },
        minLength: [8, 'The number must be at least 8 digits'],
        required: [true, 'number is required']
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
    
module.exports = mongoose.model('Person', personSchema)
