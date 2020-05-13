import axios from 'axios';

export let user = localStorage.getItem( 'username' ) || "";

export function register( username, password ) {
    return axios.post( "http://localhost:8080/register", { username: username, password: password } )
        .then( res => {
            console.log( res )
            return { username: res.data.username, status: res.status };
        } )
        .catch( err => {
            console.log( err.message )
            return err;
        } );
}

export function login( username ) {
    return axios.post( "http://localhost:8080/login", {
        test: username
    } ).then( res => {
        console.log( res.data.message );
    } ).catch( function ( error ) {
        console.log( error );
    } );
}