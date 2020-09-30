import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    firebase.initializeApp(firebaseConfig);
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const { displayName, photoURL, email } = res.user;
      console.log(res.user);
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        password: '',
        photo: photoURL
      }
      
      return signedInUser;
      console.log(displayName, photoURL, email);
    })
    .catch(error => {
      console.log(error);
      console.log(error.message);
    });
  }

export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
    .then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        return user;
    })
    .catch(function(error) {
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

export const handleGoogleSignOut = () => {
    return firebase.auth().signOut()
    .then(res => {
            const user = {
            isSignedIn: false,
            name: '',
            email: '',
            password: '',
            photo: ''
        }
    })
    .catch(error => {
        console.log(error);
    })
}

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
        // console.log(res);
        // setNoti('User created successfully');
        // setNotiColor('green');
        updateUserProfile(name);
        const newUser = {
            email: email,
            password: password,
            name: name
        }
        return newUser;
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ...
        // setNoti(errorMessage)
        // setNotiColor('red');
        const newUser = {
            email: '',
            password: '',
            name: ''
        }
        return newUser;
      });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => {
        // console.log(res.user);
        // user.isSignedIn = true;
        // user.name = res.user.displayName;
        const newUser = res.user;
        return newUser;
        // setNoti('Sign in successful');
        // setNotiColor('green');
      })
      .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // setNoti(errorMessage);
        // setNotiColor('red')
        // ...
        const newUser = {};
        return newUser;
      });
}

const updateUserProfile = (name) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function() {
      console.log('update successful');
    }).catch(function(error) {
      console.log(error);
    });
}