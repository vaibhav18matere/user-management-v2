import React, { useState } from "react";
import axios from "axios";
import AuthContext from "./context/AuthProvider";
import { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faRocket } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { auth } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/dashboard", {
          headers: {
            Authorization: auth.accessToken,
          },
        });

        if (response.status === 200) {
          console.log(response.data);
          setData(response.data);
          setSuccess(true);
        }
      } catch (error) {
        console.error(error);
        // Handle error states if needed
      }
    };

    fetchData(); // Call the async function to fetch data
  }, [auth.accessToken]);

  function calculateAge(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const now = new Date();

    let age = now.getFullYear() - dob.getFullYear();

    // Check if the current date hasn't passed the birthdate in the current year
    if (
      now.getMonth() < dob.getMonth() ||
      (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate())
    ) {
      age--;
    }

    return age;
  }
  return (
    <div id="dashboard">
      <div id="nav">
        <a href="/">
          <FontAwesomeIcon icon={faRocket} />
        </a>
        <div className="flex">
          <a href="/">
            <FontAwesomeIcon icon={faHome} />
          </a>
          <a href="/profile">
            <FontAwesomeIcon icon={faUser} />
          </a>
          <a href="dashboard">Dashboard</a>
        </div>
      </div>

      <section>
        {success && (
          <div id="details">
            <h1>Dashboard</h1>
            <div>
              <img id="profileImage" src={data.img} alt="profile image"></img>
              <h3>
                {data.name}, {calculateAge(data.dob)}
              </h3>
              <p>{data.address}</p>
              <p>{data.education}</p>
              <p id="all-details">
                <div>Hobbies: {data.hobbies.join(",")}</div>
                <div>Gender: {data.gender}</div>
                <div>Email: {data.email}</div>
                <div>Contact: {data.contact}</div>
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;
