import './Login.css';
import Navbar from "./Navbar/Navbar";
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  async function loginUser(email, password) {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: email, // Backend expects 'username'
          password: password, // Backend expects 'password'
        }).toString(),
        credentials: 'include', // Include the JSESSIONID cookie
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Login Error:', errorText);
        alert('Login failed. Please check your credentials.');
        return;
      }

      const data = await response.json();
      console.log('Login Response:', data);

      if (data.status === 'success') {
        // User is logged in; no need to handle JSESSIONID manually
        alert(data.message || 'Login successful!');
        navigate('/'); // Redirect to the homepage
      } else {
        alert(data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Unexpected Login Error:', error.message);
      alert('An unexpected error occurred. Please try again.');
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.passw.value;

    await loginUser(email, password);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#a1a1a1]">
        <div id="animatedpart" className="loginpage">
          <input type="checkbox" id="chk" aria-hidden="true" />
          <div className="signup">
            <form>
              <label className="girislabel" htmlFor="chk" aria-hidden="true">Sign Up</label>
              <input className="girisinput" type="text" name="ad" placeholder="Name" required />
              <input className="girisinput" type="text" name="soyad" placeholder="Surname" required />
              <input className="girisinput" type="email" name="email" placeholder="Email" required />
              <input className="girisinput" type="password" name="passw" placeholder="Password" required />
              <button className="girisbutton">Sign Up</button>
            </form>
          </div>

          <div className="login">
            <form onSubmit={handleLogin}>
              <label className="girislabel" htmlFor="chk" aria-hidden="true">Sign In</label>
              <input className="girisinput" type="email" name="email" placeholder="Email" required />
              <input className="girisinput" type="password" name="passw" placeholder="Password" required />
              <button className="girisbutton">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
