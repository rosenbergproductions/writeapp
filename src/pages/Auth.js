import React, { useState } from 'react';
import { supabase } from '../services/supabase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);

  const handleAuth = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        alert(error.message);
      } else {
        alert('Check your email for the confirmation link!');
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="container">
      <h1>{isSignUp ? 'Sign Up' : 'Log In'}</h1>
      <form onSubmit={handleAuth}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isSignUp ? 'Sign Up' : 'Log In'}
        </button>
      </form>
      <button className="btn btn-secondary mt-3" onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Switch to Log In' : 'Switch to Sign Up'}
      </button>
    </div>
  );
};

export default Auth;
