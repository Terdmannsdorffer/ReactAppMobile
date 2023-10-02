import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, makeStyles, Button, Modal } from "@mui/material";
import "./HomePage.css"; // Import the CSS file

const posts = [
  {
    id: 1,
    title: "Exploring the Hidden Paradise",
    content: "Just returned from an incredible journey to Bali, Indonesia. From pristine beaches to lush jungles, Bali is truly a hidden paradise. Here's a glimpse of my adventure!",
    images: [],
  },
  {
    id: 2,
    title: "Adventures in the Swiss Alps",
    content: "Spent an adrenaline-packed week in the Swiss Alps. Hiked to breathtaking mountain peaks, paraglided over picturesque valleys, and indulged in Swiss chocolate. What an unforgettable experience!",
    images: [],
  },
  {
    id: 3,
    title: "Safari Safari Safari!",
    content: "Embarked on a thrilling safari in the heart of Africa. Witnessed the 'Big Five' up close and personal, and enjoyed evenings by the campfire under the starry African sky. An epic adventure!",
    images: [],
  },
  {
    id: 4,
    title: "Cultural Immersion in Kyoto",
    content: "Explored the enchanting city of Kyoto in Japan. From ancient temples to traditional tea ceremonies, Kyoto's rich culture left me speechless. Don't miss the cherry blossoms in spring!",
    images: [],
  },
  {
    id: 5,
    title: "Island-Hopping in Greece",
    content: "Visited the Greek Islands and hopped from one paradise to another. Crystal-clear waters, charming villages, and mouthwatering Greek cuisine. Opa!",
    images: [],
  },
  {
    id: 6,
    title: "Road Trip Across the American West",
    content: "Embarked on an epic road trip across the American West. Explored the Grand Canyon, Yosemite National Park, and the iconic Route 66. The beauty of nature and the open road!",
    images: [],
  },
];

function HomePage(props) {
  const [updatedPosts, setUpdatedPosts] = useState(posts);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts'));
    if (storedPosts) {
      setUpdatedPosts(storedPosts);
    }
  }, []);

  const handleImageChange = (postId, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = function () {
        const base64String = reader.result;

        const updatedPostsCopy = [...updatedPosts];
        const postIndex = updatedPostsCopy.findIndex((post) => post.id === postId);

        if (postIndex !== -1) {
          updatedPostsCopy[postIndex].images.push(base64String);
          localStorage.setItem('posts', JSON.stringify(updatedPostsCopy));
          setUpdatedPosts(updatedPostsCopy);
        }
      }
    }
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <Box mt={4} display="flex" justifyContent="center">
      <Box className="posts-container">
        {updatedPosts.map((post) => (
          <Paper key={post.id} className="post">
            <Typography variant="h4">{post.title}</Typography>
            <Typography>{post.content}</Typography>
            <div className="post-gallery">
              {post.images.map((image, index) => (
                <div
                  key={index}
                  className="post-image"
                  onClick={() => openImageModal(image)}
                >
                  <img src={image} alt={`Image ${index + 1}`} />
                </div>
              ))}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(post.id, e)}
            />
          </Paper>
        ))}
      </Box>
      {/* Modal for displaying the enlarged image */}
      <Modal open={selectedImage !== null} onClose={closeImageModal}>
        <div className="image-modal">
          <img src={selectedImage} alt="Enlarged Image" />
        </div>
      </Modal>
    </Box>
  );
}

export default HomePage;
