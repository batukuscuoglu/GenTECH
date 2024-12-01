import './Login.css';
import Navbar from './Navbar/Navbar';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  // Function to log in the user
  async function loginUser(email, password) {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: email,
          password: password,
        }).toString(),
        credentials: 'include',
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
        alert(data.message || 'Login successful!');
        await mergeOfflineCart(); // Merge offline cart with backend cart
        navigate('/');
      } else {
        alert(data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Unexpected Login Error:', error.message);
      alert('An unexpected error occurred. Please try again.');
    }
  }

  // Function to merge offline cart into the backend cart
  async function mergeOfflineCart() {
    const offlineCart = JSON.parse(localStorage.getItem('offlineCart')) || [];

    if (offlineCart.length === 0) {
      // If there are no items in the offline cart, no need to merge
      return;
    }

    try {
      // Fetch the existing online cart
      const response = await fetch('http://localhost:8080/api/cart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_API_TOKEN_HERE',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch online cart during merge.');
      }

      const onlineCartData = await response.json();
      const onlineCartItems = onlineCartData.cartItems || [];

      // Merge offline cart items into online cart
      for (const offlineItem of offlineCart) {
        const matchingOnlineItem = onlineCartItems.find(
          (onlineItem) => onlineItem.product.id === offlineItem.productId
        );

        if (matchingOnlineItem) {
          // If item exists in both carts, update its quantity in the backend
          const newQuantity = matchingOnlineItem.quantity + offlineItem.quantity;

          await fetch(
            `http://localhost:8080/api/cart/update-quantity?productId=${offlineItem.productId}&quantity=${newQuantity}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer YOUR_API_TOKEN_HERE',
              },
              credentials: 'include',
            }
          );
        } else {
          // If item exists only in the offline cart, add it to the backend cart
          await fetch(
            `http://localhost:8080/api/cart/cart/add?productId=${offlineItem.productId}&quantity=${offlineItem.quantity}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer YOUR_API_TOKEN_HERE',
              },
              credentials: 'include',
            }
          );
        }
      }

      // Clear offline cart after successful merge
      localStorage.removeItem('offlineCart');
      console.log('Offline cart merged with backend cart successfully.');
    } catch (err) {
      console.error('Error merging offline cart:', err.message);
      alert('Some items from the offline cart could not be added to the backend cart.');
    }
  }

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.passw.value;

    await loginUser(email, password);
  };

  // Handle registration form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const payload = {
      email: formData.get('email'),
      password: formData.get('passw'),
      name: formData.get('name'),
      surname: formData.get('surname'),
      phone: formData.get('phone'),
      age: formData.get('age'),
    };

    try {
      const response = await fetch('http://localhost:8080/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Registration Error:', errorText);
        alert('Registration failed. Please try again.');
        return;
      }

      alert('Registration successful! You can now log in.');
    } catch (error) {
      console.error('Unexpected Registration Error:', error.message);
      alert('An unexpected error occurred during registration.');
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        alert('Logged out successfully!');
        navigate('/');
      } else {
        const errorText = await response.text();
        console.error('Logout Error:', errorText);
        alert('Failed to log out. Please try again.');
      }
    } catch (error) {
      console.error('Unexpected Logout Error:', error.message);
      alert('An unexpected error occurred during logout.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#a1a1a1]">
        <div id="animatedpart" className="loginpage">
          <input type="checkbox" id="chk" aria-hidden="true" />
          <div className="signup">
            <form onSubmit={handleRegister}>
              <label className="girislabel" htmlFor="chk" aria-hidden="true">Sign Up</label>

              {/* Name and Surname */}
              <div className="grid grid-cols-2 gap-4 mb-2">
                <input
                  className="girisinput"
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                />
                <input
                  className="girisinput"
                  type="text"
                  name="surname"
                  placeholder="Surname"
                  required
                />
              </div>

              {/* Email */}
              <input
                className="girisinput mb-2"
                type="email"
                name="email"
                placeholder="Email"
                required
              />

              {/* Phone and Age */}
              <div className="grid grid-cols-2 gap-4 mb-2">
                <input
                  className="girisinput"
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  required
                />
                <input
                  className="girisinput"
                  type="text"
                  name="age"
                  placeholder="Age"
                  required
                />
              </div>

              {/* Password */}
              <input
                className="girisinput mb-4"
                type="password"
                name="passw"
                placeholder="Password"
                required
              />

              <button className="girisbutton">Sign Up</button>
            </form>
          </div>

          <div className="login">
            <form onSubmit={handleLogin}>
              <label className="girislabel" htmlFor="chk" aria-hidden="true">Sign In</label>
              <input
                className="girisinput"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
              <input
                className="girisinput"
                type="password"
                name="passw"
                placeholder="Password"
                required
              />
              <button className="girisbutton">Sign In</button>
            </form>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-8 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Login;
