const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session')
const ObjectID = require('mongodb').ObjectID;
const bcrypt = require("bcrypt");

module.exports = function (app, db) {

  app.use(session({secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true}));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser(async(id, done) => {
    let doc = await db.findOne({_id: new ObjectID(id)});
    done(null, doc)
  })

  passport.use(new LocalStrategy(async function (username, password, done) {
    let user = await db.findOne({username: username});
    console.log('User ' + username + ' attempted to log in.');

    if (!user) {
      return done(null, false);
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false);
    }
    return done(null, user);
  }))

}
