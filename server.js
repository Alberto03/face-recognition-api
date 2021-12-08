const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const app = express();

const database = {
    users : [
        {
            id:'123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id:'124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananass',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){
        res.json(database.users[0])
    }
    else{
        res.status(400).json('error loggin in');
    }

    res.json('signin');
})

app.post('/register', (req, res) => {
    const {email, name, password} = req.body;
    database.users.push({
        id:'125',
        name: name, 
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    const found = false;
    database.users.forEach(user => {
        if(user.id === id){
           return res.json(user);
        }
    });
    if(!found){
        res.status(404).json('no such user');
    }
})

app.put('/image', (req, res)=>{
    const {id} = req.body;
    const found = false;
    database.users.forEach(user => {
        if(user.id === id){
            user.entries++; 
            return res.json(user.entries);
        }
    });
    if(!found){
        res.status(404).json('no such user');
    }
})

/*
bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
  });
  
  // Load hash from your password DB.
  bcrypt.compare("bacon", hash, function(err, res) {
      // res == true
  });
  bcrypt.compare("veggies", hash, function(err, res) {
      // res = false
  });
*/


app.listen(3000, () => {
    console.log('app running');
});