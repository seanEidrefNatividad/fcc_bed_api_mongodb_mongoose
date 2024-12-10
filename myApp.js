require('dotenv').config();
let express = require('express');
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  favoriteFoods: {
    type: [String]
  }
})
const Person = mongoose.model('Person',personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'Sean',
    age: 24,
    favoriteFoods: ["rice", "chicken"]
  })
  person.save((err,data)=>{
    if (err) return done(err);
    done(null, data);
  })
};


const arrayOfPeople = [{name:'Sean',age:24,favoriteFoods:["egg","rice"]}, {name:'Sean',age:24,favoriteFoods:["egg","rice"]},]
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err,data)=>{
    if (err) return done(err);
    done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, (err,data)=>{
    if (err) return done(err);
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food}, (err,data)=>{
    if(err) return done(err)
    done(null,data)
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id:personId}, (err,data)=>{
    if(err) return done(err)
    done(null, data)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id:personId}, (err,person)=>{
    if (err) return done(err)
    person.favoriteFoods.push(foodToAdd)
    person.save((err,updatedPerson)=>{
      if (err) return done(err);
      done(null, updatedPerson);
    })
  })

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName}, {age:ageToSet}, { new: true }, (err,updatedDoc)=>{
    if (err) return done(err);
    done(null, updatedDoc);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err,removedPerson)=>{
    if (err) return done(err)
    done(null,removedPerson)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove}, (err,response)=>{
    if(err) return done(err)
      done(null,response)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch})
  .sort({name:'asc'})
  .limit(2)
  .select('name')
  .exec((err,data)=>{
    if(err) return done(err)
    done(null,data)
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
