var express = require( 'express' );
//var favicon  = require( "serve-favicon" );
var bodyParser = require( 'body-parser' );
var path = require( "path" );
const cors = require( 'cors' )
var app = express();
const mongoose = require( 'mongoose' );
const passportLocalMongoose = require( 'passport-local-mongoose' );
require( "dotenv" ).config();

var port = process.env.PORT || 8080;

const routes = require( './route.js' );
const auth = require( "./auth.js" );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) )
app.use( bodyParser.json( { type: 'application/vnd.api+json' } ) );
app.use( express.static( path.join( __dirname, 'build' ) ) );
app.use( cors() );


mongoose.connect( process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} )
    .then( () => console.log( 'DB connnection successful!' ) )
    .catch( err => console.log( err ) );

const Schema = mongoose.Schema;
const UserDetail = new Schema( {
    username: String,
    password: String
} );

UserDetail.plugin( passportLocalMongoose );
const db = mongoose.model( 'user', UserDetail );

routes( app, db );
auth( app, db );

app.listen( port, function () {
    console.log( 'Magic happens on port ' + port );
} );





// put this in package.json //"proxy": "http://localhost:8080",


/*
*/