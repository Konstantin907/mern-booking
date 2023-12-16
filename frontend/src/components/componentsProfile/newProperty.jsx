import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
//import { getLocation } from "../../hooks/geoLib";

const NewPropertyForm = (props) => {
  const { setShowForm, animation, setAnimation } = props;
  const { user } = useContext(AuthContext);
  //console.log(user);
  const [file, setFile] = useState([]);
  const [propertyData, setPropertyData] = useState({
    title: "",
    desc: "",
    cheapestPrice: "",
    address: "",
    rating: "5",
    city: "",
    photos: [], // save photos here
    imgSrc:
      "https://images.contentstack.io/v3/assets/blt00454ccee8f8fe6b/blt55aa6fe881d45976/6091355f1671db1046c1a59c/UK_CityofLondon_UK_Header.jpg",
    user: user.details._id,
    location: {
      type: "Point",
      coordinates: [43.226, -79.875],
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({ ...propertyData, [name]: value });
  };

  /*
  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    const formData = new FormData();
    files.forEach((file, i) => {
      formData.append(`photos`, file);
    });

    axios.post("/property/register", formData).then((response) => {
      setPropertyData({ ...propertyData, photos: response.data.photos });
    });
  };*/
  const handlePhotoChange = (e) => {
    setFile(e.target.files);
  };

  const upload = async () => {
    const formData = new FormData();
    // Añadir archivos a formData

    for (let i = 0; i < file.length; i++) {
      formData.append("photos", file[i]);
    }

    try {
      const res = await axios.post(`/api/upload`, formData);
      console.log(res.data);
      //console.log(res.data.files); //i  got just the array of elements
      //console.log(res.data); //got URLS
      setPropertyData({ ...propertyData, photos: [...res.data.photoUrls] });
      //console.log("dtaa from upload", propertyData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await upload();

    try {
      const response = await axios.post("/api/hotels/new", propertyData);
      console.log("Property created:", response.data);
      setShowForm(false);
      setAnimation(false);
      props.getReloadProperties(user.details._id);
    } catch (error) {
      console.error("Error creating property: ", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`formNewProperty ${animation ? "active" : ""}`}
    >
      <legend>Lets to Set it ! your New Property</legend>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={propertyData.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="desc"
        placeholder="Description"
        value={propertyData.desc}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="cheapestPrice"
        placeholder="Price"
        value={propertyData.cheapestPrice}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={propertyData.address}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={propertyData.city}
        onChange={handleChange}
      />
      <input
        className="fileButton"
        type="file"
        name="photos"
        multiple
        onChange={handlePhotoChange}
      />
      {/*<button onClick={upload}>File Upload</button>*/}
      <button type="submit" className="btn btn-success">
        Save Property
      </button>
    </form>
  );
};

export default NewPropertyForm;
