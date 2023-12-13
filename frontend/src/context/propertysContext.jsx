import axios from "axios";
import React, { useState, useContext } from "react";
import { AuthContext } from "./authContext";
const INITIAL_STATE = {
  updateProperty: () => {},
  createProperty: () => {},
  deleteProperty: () => {},
  getUserProperties: () => {},
  property: [],
};

//step 1 :  createContext
export const PropertyContext = React.createContext(INITIAL_STATE);

//step 2 :  create Provider :
export const PropertyContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  //console.log("sicne context properties", user);
  const [property, setProperty] = useState([]);
  const [propertiesByUser, setPropertiesByUser] = useState([]);

  //get property data :
  React.useEffect(() => {
    axios
      .get("/hotels/")
      .then((response) => {
        setProperty(response.data);
      })
      .catch((error) => {
        console.log("Server can not get property info from data base", error);
      });
    //get properties from User LOGGED  :
    getUserProperties(user.details._id);
  }, []);
  const deleteProperty = (_id) => {
    axios
      .delete(`/hotels/${_id}`)
      .then((res) => {
        setProperty((prev) => {
          const newProperties = [...prev];
          const indexPropertyDeleted = newProperties.findIndex(
            (element) => element._id === _id
          );
          newProperties.splice(indexPropertyDeleted, 1);

          return newProperties;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateProperty = (updatedData) => {
    const { _id, price, city, address } = updatedData;
    if (updatedData) {
      axios
        .put(`/hotels/${_id}`, { price, address, city })
        .then((response) => {
          console.log(response.data);
          axios
            .get("/hotels/")
            .then((response) => {
              setProperty(response.data);
            })
            .catch((err) => {
              console.log(err);
            });

          alert("it was succesfully updated");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("the information did not save succesfully");
    }
  };

  const getUserProperties = (_id) => {
    axios
      .get(`/hotels/newFind/${_id}`)
      .then((response) => {
        setPropertiesByUser(response.data);
        //console.log(response.data);
      })
      .catch((error) => {
        console.log("Server can not get property info from data base", error);
      });
  };

  const value = {
    property,
    deleteProperty,
    updateProperty,
    getUserProperties,
    propertiesByUser,
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyContext = () => React.useContext(PropertyContext);
