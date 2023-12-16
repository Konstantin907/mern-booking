import React, { useContext, useEffect, useState } from "react";
import ProfileNav from "../../components/profileNav/ProfileNav";
import Footer from "../../components/footer/Footer";
import { AuthContext } from "../../context/authContext.js";
import { usePropertyContext } from "../../context/propertysContext.jsx";

import GetStarted from "../../components/componentsProfile/getStarted.jsx";
import BenefitsBecomeHost from "../../components/componentsProfile/benefitsBecomeHost.jsx";
import NewProperty from "../../components/componentsProfile/newProperty.jsx";
import PropertiesUser from "../../components/componentsProfile/propertyCards.jsx";
import "./becomeHost.scss";

export default function BecomeHost() {
  const { propertiesByUser, getUserProperties, getReloadProperties } =
    usePropertyContext();
  console.log(propertiesByUser);

  const { user } = useContext(AuthContext);
  //getUserProperties(user.details._id);
  //console.log(user);
  const [showForm, setShowForm] = useState(false);
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    getUserProperties(user.details._id);
  }, []);

  return (
    <>
      <ProfileNav />
      <GetStarted
        firstName={user.details.firstName}
        lastName={user.details.lastName}
        showForm={showForm}
        setShowForm={setShowForm}
        animation={animation}
        setAnimation={setAnimation}
      />
      <NewProperty
        showForm={showForm}
        setShowForm={setShowForm}
        animation={animation}
        setAnimation={setAnimation}
        getReloadProperties={(_id) => getReloadProperties(_id)}
      />
      <div className="cardsContainerImportant">
        {propertiesByUser
          ? propertiesByUser.map((property) => {
              return (
                <PropertiesUser
                  key={property._id}
                  name={property.name}
                  title={property.title}
                  address={property.address}
                  city={property.city}
                  rating={property.rating}
                  price={property.cheapestPrice}
                  desc={property.desc}
                  photos={property.photos}
                  rooms={property.rooms}
                />
              );
            })
          : null}
      </div>
      <BenefitsBecomeHost />
      <Footer />
    </>
  );
}
