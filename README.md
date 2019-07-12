# Voter Clues Backend

## Author: Caity Heath
---

#### APIs
* OpenSecrets 



#### Modules

##### Controller
###### server.js 
Endpoints: 
* `/legislators`  returns list of legislators for a specified state.
* `/legislator/:id` returns the details of a legislator specified by id


##### Data Models
###### mongo.js 
Generic model class
###### reps-model.js
Representative model class
###### reps-schema.js
Representative schema 

---

#### Running the Application
* `npm i` to install the necessary package dependencies
* You will need to create a Mongo URI in your .env file. Variable name is `MONGO`
* You will need to get a API key from OpenSecrets
* Run `nodemon` from the command line to fire up the server
* Hit `/legislators` endpoint to retrieve a list of legislators
