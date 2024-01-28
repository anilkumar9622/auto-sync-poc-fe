import { ArrowRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

export function PocDemo() {
    const initialFormData = JSON.parse(localStorage.getItem('offlineData')) || {
        name: '',
        email: '',
        address: '',
      };
  const redirect = useNavigate()
  const [formData, setFormData] = useState(initialFormData);
  const [offline, setOffline] = useState(!navigator.onLine);
  const [formDatas, setFormDatas] = useState({});

  const handleChange = (e) => {
    if (e) {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));
    } else {
      // If called without an event (for handleOfflineData), you can handle it differently
      // For example, reset the form data or do something else
      setFormData({
        name: '',
        email: '',
        address: '',
      });
    }
  };
    const handleOfflineData = () =>{
    const savedOfflineData = JSON.parse(localStorage.getItem('offlineData')) || [];
    
    // Check if the formData already exists in the array
    const isDuplicate = savedOfflineData.some((data) => {
      // You may need to adjust the condition based on your specific object structure
      return data.name === formData.name && data.email === formData.email && data.address === formData.address;
    });
  
    if (!isDuplicate) {
      const newDataArray = [formData, ...savedOfflineData];
      localStorage.setItem('offlineData', JSON.stringify(newDataArray));
    }
  // }, [formData]);
}
    
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
   
    handleChange();
    e.preventDefault();
    try {
      const response = await axios.post('https://auto-sync-poc-be.vercel.app/create', formData);
      if (response) {
        message.success('Data Added Successfully');
        // Clear the form data from localStorage after successful submission
        const savedOfflineData = JSON.parse(localStorage.getItem('offlineData'));
        const newDataArray = savedOfflineData.slice(0, -1); // Remove the last element
        localStorage.setItem('offlineData', JSON.stringify(newDataArray));
        setTimeout(() => {
          redirect("/poc-list")
            
          }, 2000);
        
      }
    } catch (error) {
      console.error('Error:', error.message);
      message.error('An error occurred. Please try again later.');
    }
  };

    return (
        <section>
            <div className="flex items-center justify-center container">
                <div className="content">
                    <div className="logo">
                        <svg
                            width="50"
                            height="56"
                            viewBox="0 0 50 56"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                                fill="black"
                            />
                        </svg>
                    </div>
                    <h2 className="text-center title">Sign up to create account</h2>
                    <p className="text-center subtitle">
                        Already have an account?{' '}
                        <a href="#" className="sign-in-link">
                            Sign In
                        </a>
                    </p>
                    <form onSubmit={handleSubmit} className="form">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                className="form-input"
                                placeholder="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                className="form-input"
                                placeholder="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address" className="form-label">Password</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                className="form-input"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="form-button"
                        >
                            Create Account <ArrowRight className="ml-2" size={16} />
                        </button>

                    </form>
                    <Link to="/poc-list">
                        <button
                            type="button"
                            className="form-button"
                            onClick={handleOfflineData}
                            style={{ marginTop: "12px", padding: "10px 55px" }}
                        >
                            Save Offline <ArrowRight className="ml-2" size={16} />
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
