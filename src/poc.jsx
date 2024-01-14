import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';

const Poc = () => {
    const initialFormData = JSON.parse(localStorage.getItem('offlineData')) || {
        name: '',
        email: '',
        address: '',
      };
    
      const [formData, setFormData] = useState(initialFormData);
      const [offline, setOffline] = useState(!navigator.onLine);
      const [once, setOnce] = useState(offline);

      const handleChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }));
      };
    
      useEffect(() => {
        // Save form data to localStorage whenever it changes
        localStorage.setItem('offlineData', JSON.stringify(formData));
      }, [formData]);
    
      useEffect(() => {
        // Retrieve form data from localStorage on mount
        const savedOfflineData = localStorage.getItem('offlineData');
        if (savedOfflineData) {
          setFormData(JSON.parse(savedOfflineData));
        }
      }, []);
  
  useEffect(() => {
    const handleOfflineStatus = () => {
      setOffline(!navigator.onLine);
    };

    window.addEventListener('offline', handleOfflineStatus);
    window.addEventListener('online', handleOfflineStatus);

    return () => {
      window.removeEventListener('offline', handleOfflineStatus);
      window.removeEventListener('online', handleOfflineStatus);
    };
  }, []);

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://auto-sync-poc-be.vercel.app/create', formData);
      if(response){
        message.success("Data Added Successfully")
      }
    } catch (error) {
      console.error('Error:', error.message);
      message.error('An error occurred. Please try again later.');
    }
  };
  useEffect(() => {
    if (offline) {
        const syncOfflineData = async (storedData) => {
                try { 
                  const response = await axios.post('https://auto-sync-poc-be.vercel.app/create', storedData);
                  if(response){message.success("Auto Sync up Successfully")
                  localStorage.removeItem('offlineData');
                   }
                } catch (error) {
                  console.error('Error syncing data:', error.message);
                }
            };

      const storedData = JSON.parse(localStorage.getItem('offlineData')) || [];
      syncOfflineData(storedData);
    }
  }, [offline]);
 
  return (
    <div className="container">
        <div className='content'>
  <h2 className="signup-heading">POC</h2>
  {offline && <p className="message" style={{color:"red",}}>Data saved offline. Will sync when online.</p>}

  <form onSubmit={handleSubmit} className="signup-form">
    <label>
      Name:
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="input-field"
      />
    </label>
    <br />
    <label>
      Email:
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="input-field"
      />
    </label>
    <br />
    <label>
      Address:
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        className="input-field"
      />
    </label>
    <br />
    <button type="submit" className="signup-button">
      Submit
    </button>
  </form>
  </div>
</div>

  );
};

export default Poc;
