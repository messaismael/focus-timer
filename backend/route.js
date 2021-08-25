const path = require('path');
const passport = require('passport');
const bcrypt = require("bcrypt");

module.exports = function (app, db) {

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  }
  app
    .route('/logout')
    .get((req, res) => {
      req.logout();
      res.redirect('/');
    });

  app
    .route("/login")
    .post(passport.authenticate("local", {failureRedirect: "/login"}), (req, res) => {
      res.status(200)
      res.json({username: req.body.username});
    });

  app
    .route("/profile")
    .get(ensureAuthenticated, (req, res) => {
      res.render(process.cwd() + "/views/pug/profile", {
        username: req.user.username,
        title: 'Profile Page'
      });
    });

  app
    .route('/register')
    .post(async(req, res, next) => {
      var hash = bcrypt.hashSync(req.body.password, 12);
      let user = await db.findOne({username: req.body.username});

      if (user) {
        console.log('this user already exist   :' + req.body.password)
        res.status(209);
        res.json({message: 'this user already exist'});
      } else {
        let newUser = new db({username: req.body.username, password: hash})
        await newUser.save();
        console.log('this user newly')
        next(null, newUser);
      }
    }, passport.authenticate('local', {failureRedirect: '/register'}), (req, res, next) => {
      res.status(200)
      res.json({username: req.body.username});
    });
  /*
    app.get( '/*', function ( req, res ) {
        res.sendFile( path.join( __dirname, 'build', 'index.html' ) )
    } );
*/

}