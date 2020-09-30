import React, { useContext, useState } from 'react';
import './Login.css';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleGoogleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';

initializeLoginFramework();

function Login() {
  
  const btnStyle = {
    notiColor: 'white',
    backgroundnotiColor: 'black',
    padding: '10px 15px',
    fontSize: '20px',
    borderRadius: '10px',
    border: 'none',
    outline: 'none'
  }

  const [user, setUser] = useState({
    isSignedIn: false, 
    name: '', 
    email: '', 
    password: '',
    photo: ''
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const [noti, setNoti] = useState('');
  const [notiColor, setNotiColor] = useState('');
  const [isNew, setIsNew] = useState(false);

  const handleBlur = (event) => {
  
    let isFieldValid = true;

    // console.log(event.target.name, event.target.value);
    if(event.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if(event.target.name === 'password'){
      isFieldValid = event.target.value.length >= 6 && /\d{1}/.test(event.target.value);
    }
    if(isFieldValid){
      const newUser = {...user};
      newUser[event.target.name] = event.target.value;
      setUser(newUser);
    }
  }

  const handleSubmit = (event) => {
    if(isNew && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        setLoggedInUser(res);
        history.replace(from);
      })
    }
    if(!isNew && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        setLoggedInUser(res);
        history.replace(from);
      })
    }
    event.preventDefault();
  }

  const handleIsNew = () => {
    setIsNew(!isNew);
  }

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
    })
  }

  const googleSignOut = () => {
    handleGoogleSignOut()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    })
  }

  const fbSignIn = () => {
    handleFbSignIn()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from); // eta kaj kortese na
    })
  }

  

  return (
    <div className="login">
      {
        user.isSignedIn ? <button className="btn" onClick={googleSignOut} style={btnStyle}>Sign out</button> 
        : <button onClick={googleSignIn} className="btn">Sign in with Google</button>
      }
      <br/><button onClick={handleFbSignIn} className="btn" >Sign in with Facebook</button>
      
      {
        user.isSignedIn && <div>
          <h3>Welcome {user.name}</h3>
          <h3>Your Email Address: {user.email}</h3>
          <img src={user.photo} alt=""/>
        </div>
      }

      {/* <h1>Our own authentication</h1>
      <h3>Your Email Address: {user.email}</h3>
      <h3>Your password: {user.password}</h3> */}
      
      {/* onChange
      <form onSubmit={handleSubmit}>
        <input name="email" type="text" onChange={handleChange} placeholder="Your Email address" required/><br/>
        <input name="password" type="password" onChange={handleChange} placeholder="Password" id="" required/><br/>
        <input type="submit" value="Sign In"/>
      </form> */}

      {/* onBlur */}
      <br/>
      <input type="checkbox" onChange={handleIsNew} name="" id=""/>
      <label htmlFor="newUser">New User sign up</label>
      <form onSubmit={handleSubmit}>
      {isNew && <input type="text" name="name" onBlur={handleBlur} id="" placeholder="Your name"/>}<br/>
        <input name="email" type="text" onBlur={handleBlur} placeholder="Your Email address" required/><br/>
        <input name="password" type="password" onBlur={handleBlur} placeholder="Password" id="" required/><br/>
        <input type="submit" onClick={handleSubmit} value="Sign In"/>
      </form>
      {
        <h3 style={{color: notiColor}}>{noti}</h3>
      }
    </div>
  );
}

export default Login;
