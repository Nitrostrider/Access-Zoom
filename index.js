const express = require('express')
const app = express()
const cors = require('cors')
const passport = require('passport');
const cookieSession = require('cookie-session')

require('./passport-setup');

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

app.use(cookieSession({
  name: 'academiaedge-access-zoom-session',
  keys: ['key1', 'key2']
}))

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.send("You did not login"));
app.get('/failed', (req, res) => res.send("You failed to log in"))
app.get('/good', isLoggedIn, (req, res) => res.send(`You are logged in, ${req.user.displayName}!`));


app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/good');
  }
);
app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/')
})


app.listen(3000, () => console.log(`Example app listening on port ${3000}!`))