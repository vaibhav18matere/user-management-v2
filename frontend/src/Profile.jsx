import React, { useState } from "react";
import axios from "axios";
import AuthContext from "./context/AuthProvider";
import { useContext } from "react";

const Profile = () => {
  const { auth } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    dob: "",
    address: "",
    contact: "",
    education: "",
    gender: "",
    hobbies: "",
    img: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(auth);
    try {
      const response = await axios.post("/addInfo", JSON.stringify(formData), {
        headers: {
          Authorization: auth.accessToken,
          "Content-Type": "application/json",
        },
      });
      if (response.status == 200) {
        setSuccess(true);
      }
    } catch (err) {
      console.log(err);
    }
    // Log the captured data (replace this with API call to send data to backend)
    console.log(formData);
    // Here, you can make an API call using fetch or Axios to send formData to the backend
  };
  const handleImageChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData({
          ...formData,
          img: reader.result, // base64 encoded string
        });
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };
  return (
    <>
      <section>
        <h1>Update User Profile</h1>
        <form id="updateProfileForm" onSubmit={handleSubmit}>
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            autoComplete="off"
            value={formData.dob}
            onChange={handleChange}
            required
          />

          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <label htmlFor="contact">Contact Number:</label>
          <input
            type="number"
            id="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />

          <label htmlFor="education">Education</label>
          <input
            type="text"
            id="education"
            value={formData.education}
            onChange={handleChange}
            required
          />

          <label htmlFor="gender">Gender:</label>
          <select id="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="dnd">Don't disclose</option>
          </select>

          <label htmlFor="hobbies">Hobbies</label>
          <input
            type="text"
            id="hobbies"
            value={formData.hobbies}
            onChange={handleChange}
            required
          />

          <label htmlFor="img">Upload image:</label>
          <input
            type="file"
            id="profile-image"
            name="img"
            accept="image/*"
            onChange={handleImageChange}
          />

          <button type="submit">Submit details</button>
        </form>
        {success && (
          <h3>
            Data Saved Successfully!
            <a href="/dashboard">View Dashboard</a>
          </h3>
        )}
      </section>
    </>
  );
};

export default Profile;
