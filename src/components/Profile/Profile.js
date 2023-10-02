import React, { useState, useEffect } from "react";
import axios from 'axios'; // Make sure to install this package
import "./Profile.css";

function Profile() {
  const userEmail = localStorage.getItem("email");
  const userName = userEmail.split("@")[0];

  const [selectedImage, setSelectedImage] = useState(localStorage.getItem('profileImage') || "/default-profile-image.png");

  useEffect(() => {
    // Fetch image from backend when component mounts
    axios.get('/api/v1/users/' + userEmail)
      .then(response => setSelectedImage(response.data.avatar))
      .catch(error => console.error('Error fetching profile image:', error));
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Selected file:', file); // Print selected file

      // Create a FileReader instance
      const reader = new FileReader();

      // Read the file as a Data URL
      reader.readAsDataURL(file);

      reader.onloadend = function () {
        // The result attribute contains the Data URL.
        // This is the base64 string
        const base64String = reader.result;

        // Save the string in the local storage
        localStorage.setItem('profileImage', base64String);

        // Update the state
        setSelectedImage(base64String);
      }

      // Rest of your code...
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-heading">User Profile</h1>
      <div className="profile-info">
        <div className="profile-image">
          <img
            src={selectedImage}
            alt="Profile"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <p>Name: {userName}</p>
        <p>Email: {userEmail}</p>
        {/* Add more profile information here */}
      </div>
    </div>
  );
}

export default Profile;





