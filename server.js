'use strict';

const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
require('dotenv').config();
const model = require('./src/models/reps/reps-model.js');

const mongoose = require('mongoose');

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true
};

let database = process.env.MONGO;
mongoose.connect(database, mongooseOptions);

const PORT = process.env.PORT;
const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is UP');
})

app.get('/legislators/:state', getLegislators);
app.get('/legislator/:id', getOneLegislator);


function getOneLegislator(request, response){
  let id = request.params.id
  console.log('id',id);
  model.get(id)
  .then(record => {
    console.log(record);
    response.json(record);
  })
}


function getLegislators (request, response){
  let state = request.params.state;
  console.log(state);
  let url = `http://www.opensecrets.org/api/?method=getLegislators&id=${state}&apikey=${process.env.OPENSECRETS}&output=json`

  return superagent.get(url)
     .then(response => {
      let repsArray = [];
      const reps = JSON.parse(response.text);
      // console.log(reps.response.legislator[0]['@attributes']);
      for(let i = 0; i < reps.response.legislator.length; i++){
        repsArray.push(new Reps(reps.response.legislator[i]['@attributes']));
      }
      console.log(repsArray);
      return cacheReps(repsArray);
    })
     .catch(err => {
       console.log(err);
     })
}


function Reps(data){
  this.cid = data.cid;
  this.name = data.firstlast;
  this.party = data.party;
  this.office = data.office;
  this.first_elected = data.first_elected;
  this.phone = data.phone;
  this. website = data.website;
  this.congress_office = data.congress_office;
  this.twitter_id = data.twitter_id;
  this.birthdate = data.birthdate;
}

////////// CACHING REPS TO DB //////////


function cacheReps(reps){
  reps.forEach( rep => {
    model.post(rep)
    .then(recorded => {
      return recorded
    })
    .catch(err => {
      console.log(`didn't cache`);
    })
  });
}




app.listen(PORT, () => console.log(`App is up on ${PORT}`));

