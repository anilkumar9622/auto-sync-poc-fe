import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const Poc = () => {
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
  
 
  // const handleChange = (e) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  
const handleOfflineData = () =>{


  // useEffect(() => {
    // Save form data to an array in localStorage whenever it changes
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
    

  // useEffect(() => {
  //   // Retrieve form data array from localStorage on mount
  //   const savedOfflineData = JSON.parse(localStorage.getItem('offlineData'));
  //   if (savedOfflineData && savedOfflineData.length > 0) {
  //     // Assuming the latest data entry is the current form data
  //     setFormData(savedOfflineData[savedOfflineData.length - 1]);
  //   }
  // }, []);
 console.log('=======', formData );
 console.log("sdfghjkldfghjkldfghjkdfghjk",offline);
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

//  const handleOfflineData = (e) =>{
//   // setFormDatas({name:""})
//   // setFormData((prevData) => ({
//   //   ...prevData,
//   //   [e.target.name]: e.target.value,
//   // }));
//   e.preventDefault();
//     setFormDatas({ name: '',
//     email: '',
//     address: '',})
//     redirect("/poc-list")

//   }
  // useEffect(() => {
  //   if (offline) {
  //     const syncOfflineData = async (storedData) => {
  //       try {
  //         const response = await axios.post('https://auto-sync-poc-be.vercel.app/create', storedData);
  //         if (response) {
  //           message.success('Auto Sync up Successfully');
  //           localStorage.removeItem('offlineData');
  //         }
  //       } catch (error) {
  //         console.error('Error syncing data:', error.message);
  //       }
  //     };

  //     const storedData = JSON.parse(localStorage.getItem('offlineData')) || [];
  //     syncOfflineData(storedData);
  //   }
  // }, [offline]);

  return (
    <div className="container">
      <div className="content">
        <h2 className="signup-heading">POC</h2>
        {offline && <p className="message" style={{ color: 'red' }}>Data saved offline. Will sync when online.</p>}

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
          <Link to="/poc-list">
            <button type="" className="signup-button" onClick={handleOfflineData}>
              Save Offline
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Poc;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { message } from 'antd';
// import { Link } from 'react-router-dom';

// const Poc = () => {
//     const initialFormData = JSON.parse(localStorage.getItem('offlineData')) || {
//         name: '',
//         email: '',
//         address: '',
//       };
    
//       const [formData, setFormData] = useState(initialFormData);
//       const [offline, setOffline] = useState(!navigator.onLine);
//       const [once, setOnce] = useState(offline);
      
//       const handleChange = (e) => {
//         setFormData((prevData) => ({
//           ...prevData,
//           [e.target.name]: e.target.value,
//         }));
//       };
      
//       // const history = useHistory();

//       // useEffect(() => {
   
//       // const dataToSave = { key: 'value' };

    
//       // localStorage.setItem('offlineData', JSON.stringify(dataToSave));
    
//       // history.push('/list-page');
//       // }, [history]);

//       useEffect(() => {
//         // Save form data to localStorage whenever it changes
//         localStorage.setItem('offlineData', JSON.stringify(formData));
//       }, [formData]);
    
//       useEffect(() => {
//         // Retrieve form data from localStorage on mount
//         const savedOfflineData = localStorage.getItem('offlineData');
//         if (savedOfflineData) {
//           setFormData(JSON.parse(savedOfflineData));
//         }
//       }, []);
  
//   useEffect(() => {
//     const handleOfflineStatus = () => {
//       setOffline(!navigator.onLine);
//     };

//     window.addEventListener('offline', handleOfflineStatus);
//     window.addEventListener('online', handleOfflineStatus);

//     return () => {
//       window.removeEventListener('offline', handleOfflineStatus);
//       window.removeEventListener('online', handleOfflineStatus);
//     };
//   }, []);

 

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('https://auto-sync-poc-be.vercel.app/create', formData);
//       if(response){
//         message.success("Data Added Successfully")
//       }
//     } catch (error) {
//       console.error('Error:', error.message);
//       message.error('An error occurred. Please try again later.');
//     }
//   };
//   useEffect(() => {
//     if (offline) {
//         const syncOfflineData = async (storedData) => {
//                 try { 
//                   const response = await axios.post('https://auto-sync-poc-be.vercel.app/create', storedData);
//                   if(response){message.success("Auto Sync up Successfully")
//                   localStorage.removeItem('offlineData');
//                    }
//                 } catch (error) {
//                   console.error('Error syncing data:', error.message);
//                 }
//             };

//       const storedData = JSON.parse(localStorage.getItem('offlineData')) || [];
//       syncOfflineData(storedData);
//     }
//   }, [offline]);
 
//   return (
//     <div className="container">
//         <div className='content'>
//   <h2 className="signup-heading">POC</h2>
//   {offline && <p className="message" style={{color:"red",}}>Data saved offline. Will sync when online.</p>}

//   <form onSubmit={handleSubmit} className="signup-form">
//     <label>
//       Name:
//       <input
//         type="text"
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         className="input-field"
//       />
//     </label>
//     <br />
//     <label>
//       Email:
//       <input
//         type="email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         className="input-field"
//       />
//     </label>
//     <br />
//     <label>
//       Address:
//       <input
//         type="text"
//         name="address"
//         value={formData.address}
//         onChange={handleChange}
//         className="input-field"
//       />
//     </label>
//     <br />
//     <Link to="/poc-list">
//     <button type="submit" className="signup-button">
//       Submit
//     </button>
//     </Link>
//   </form>
//   </div>
// </div>

//   );
// };

// export default Poc;
