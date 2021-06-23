const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/student')

var studentSchema = new Schema({
  idNumber: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  diseaseType: {
    type: String,
    required: true
  },
  disease: {
    type: String,
    required: true
  },
  symptom: {
    type: String
  },
  bingLi: {
    type: String
  }
})

module.exports = mongoose.model('Patients', studentSchema)

