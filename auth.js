const passport = require( 'passport' );
const LocalStrategy = require( 'passport-local' );


module.exports = function ( app, db ) {

    app.use( require( 'express-session' )( {
        secret: "Miss white is my cat",
        resave: false,
        saveUninitialized: false
    } ) );


    app.use( passport.initialize() );
    app.use( passport.session() );

    passport.use( new LocalStrategy( db.authenticate() ) );
    passport.serializeUser( db.serializeUser() );
    passport.deserializeUser( db.deserializeUser() );
}
