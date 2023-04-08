// importing modules
const express = require('express');
const path = require('path');
require("./db/conn");
const bcrypt = require("bcryptjs");

const app = express();
const port = process.env.PORT || 27017;

// requiring register 
const register = require("./registers");

// Express Specific Stuff
app.use('/static', express.static('../servingFiles'));
app.use(express.urlencoded({ extended: false }));

// Pug Specific Stuff
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Endpoints
app.get('/', (req, res) => {
    res.status(200).render('home.pug');
});

// contact page requests
app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug');
});

// register page requests
app.get('/register', (req, res) => {
    res.status(200).render('register.pug');
});

// making post mehtod for register button
app.post("/register", async (req, res) => {
    try {
        const passd = req.body.pass;
        const confpassd = req.body.confirmpass;

        if (passd == confpassd) {
            const reguser = new register({
                Name: req.body.name,
                username: req.body.uname,
                email: req.body.email,
                // here hashed passwored will be stored
                password: req.body.pass,
                confpass: req.body.confirmpass,
                phone: req.body.phone,
                gender: req.body.gender
            })

            const registered = await reguser.save();
            console.log(registered);
            res.status(201).send("Registration Succesfull :)");
        }

        else
            res.send("Password do not match");
    }

    catch (err) {
        res.send("Exception occured ", err)
        console.log("", err);
    }
})

// Login validation
app.get('/login', (req, res) => {
    res.status(200).render('login.pug');
});

app.post("/login", async (req, res) => {
    try {
        const Email = req.body.email;
        const pass = req.body.password;

        const useremail = await register.findOne({ email: Email });

        // comparing hashed password and entered password 
        const isMatch = await bcrypt.compare(pass, useremail.password);

        if (isMatch) {
            // res.status(201).send("successfully logged in!");
            // res.status(201).json({ message: 'Successfully Logged In' });
            res.status(201).send("<script>alert('Successfully Logged In');</script>");
        }

        else
            res.send("Invalid login details");
    }

    catch (err) {
        res.status(400).send("Invalid Email", err);
    }
})

// Start The server
app.listen(port, () => {
    console.log(`The application started succesfully on port ${port}`);
});