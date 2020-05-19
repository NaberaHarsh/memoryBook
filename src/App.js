import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard';
import * as firebase from "firebase/app";
import "firebase/auth";
import Appbar from './components/Appbar'

var firebaseConfig = {
  apiKey: "AIzaSyB99ZMQiexnzEjcTdgGug0ZfnOz968UYlc",
  authDomain: "memory-book-ecf89.firebaseapp.com",
  databaseURL: "https://memory-book-ecf89.firebaseio.com",
  projectId: "memory-book-ecf89",
  storageBucket: "memory-book-ecf89.appspot.com",
  messagingSenderId: "473816955063",
  appId: "1:473816955063:web:519e43801cd2acb5d0f532"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      UserLogged:" "
    }
  }


  googleLogin(){
    var provider = new firebase.auth.GoogleAuthProvider();
  
  
    firebase.auth().signInWithPopup(provider).then((result) =>{
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      this.setState(
        {user:user}
      )
      console.log(user.displayName);
  
      console.log(user.displayName,user.email);
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
    
  }
  
  

  logout(){
    firebase.auth().signOut().then(function() {
    console.log(" Sign-out successful.")
    }).catch(function(error) {
    // An error happened.
    });
  }

componentDidMount(){
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      this.setState({
        UserLogged:user.uid
      })
      this.setState({
          display:user.displayName
      })
      
      console.log("logged in",user.uid, user.displayName)
      
    } else {
       this.googleLogin()
    }
  });
}


  render(){

  return (
    <div>
      <Appbar display={this.state.display} logout={this.logout}/>
     <Dashboard />
    </div>
  );
  }
}

export default App;
