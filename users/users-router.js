const express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

const restricted = require('../auth/restricted-middleware.js');
const restrictedRouter = require('../auth/restricted-router.js');

const router = express.Router();

router.use('/restricted', restrictedRouter);

router.post('/register', (req, res) => {
    const userInfo = req.body;


    // the password will be hashed & re-hashed 2 ^ 12 times
    const ROUNDS = process.env.HASHING_ROUNDS || 12;
    const hash = bcrypt.hashSync(userInfo.password, ROUNDS);

    userInfo.password = hash;

  Users.add(req.body)
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.post("/login", (req, res) => {
    const { username, password} = req.body; //so it clears the other credentials

    Users.findBy({ username })
        .then(([user]) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                // in here, I want the server to remember the client that has logged in or registered
                req.session.user = {
                    id: user.id,
                    username: user.username,
                };

                res.status(200).json({ hello: user.username });
            } else {
                res.status(401).json({ message: 'invalid credentials'})
            }
        })
        .catch(error => {
        res.status(500).json({ errorMessage: 'error finding the user'});
    });

});

router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy(error => {
            if(error) {
                res.status(500).json({message: "you can check out any time you like, but you can never leave..."});
            } else {
                res.status(200).json({ message: "logged out successfully"})
            }
        });
    } else {
        res.status(200).json({ message: "already logged out" })
    }
});

module.exports = router;