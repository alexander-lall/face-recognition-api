const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin')
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'aFWgzROXtVvjnMwSjdsWS61dz93idaLs',
      database : 'smart-brain'
    }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('API is working...'));
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleProfileGet(db));
app.put('/image', image.handleImage(db));
app.post('/imageurl', (req, res) => image.handleApiCall(req, res));

app.listen(process.env.PORT || 3001, () => console.log(`app is running on port '${process.env.PORT}`));