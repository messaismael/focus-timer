// require depedencies
var express = require( 'express' );
var favicon = require( "serve-favicon" );
var bodyParser = require( 'body-parser' );
var path = require( "path" );

var app = express();

var port = process.env.PORT || 8080;

// parse application/json
app.use( bodyParser.json() );

// favicon
app.use( favicon( '*', path.join( __dirname, 'public', 'icon.ico' ) ) );

// parse application/x-www-form-urlencoded
app.use( bodyParser.urlencoded( { extended: true } ) )

// parse application/vnd.api+json as json
app.use( bodyParser.json( { type: 'application/vnd.api+json' } ) );

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT


app.use( express.static( path.join( __dirname, 'build' ) ) );

app.get( '*', function ( req, res ) {
    res.sendFile( path.join( __dirname, 'build', 'index.html' ) )
} );

app.listen( port, function () {
    console.log( 'Magic happens on port ' + port );
} );

// put this in package.json //"proxy": "http://localhost:8080",