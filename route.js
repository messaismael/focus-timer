const path = require( 'path' );
const passport = require( 'passport' );

module.exports = function ( app, db ) {
    /*
        function ensureAuthenticated( req, res, next ) {
            if ( req.isAuthenticated() ) {
                return next();
            }
            res.redirect( "/" );
        }
        app.route( '/logout' )
            .get( ( req, res ) => {
                req.logout();
                res.redirect( '/' );
            } );

        app.route( "/login" )
            .post( authenticate( "local", { failureRedirect: "/" } ), ( req, res ) => {
                res.redirect( "/profile" );
            } );
    
        app.route( "/profile" )
            .get( ensureAuthenticated, ( req, res ) => {
                res.render( process.cwd() + "/views/pug/profile", { username: req.user.username, title: 'Profile Page' } );
            } );
    */
    /*
        app.route( '/register' )
            .post( ( req, res ) => {
                res.json( { username: req.body.username } )
            } )
        */

    app.route( '/register' )
        .post( ( req, res ) => {
            db.register( new db( { username: req.body.username } ), req.body.password, function ( err, user ) {
                if ( err ) {
                    console.log( err );
                    res.status( 409 )
                    return res.json( err );
                }
                passport.authenticate( "local" )( req, res, function () {
                    res.status( 200 )
                    res.json( { username: req.body.username } );
                } );
            } );
        } );

    app.get( '/*', function ( req, res ) {
        res.sendFile( path.join( __dirname, 'build', 'index.html' ) )
    } );

}