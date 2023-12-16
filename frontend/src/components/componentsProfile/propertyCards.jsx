import React from "react";

export default function propertyCards(props) {
  //console.log(props.rooms);
  //console.log(props.photos[0].slice(14));

  return (
    <div className="cardsPropertiesContainer">
      <h3>{props.name ? props.name : props.title.slice(0, 25)}</h3>
      <div className="imagesLayout">
        {props.photos && !props.rooms ? (
          <img
            src={`http://localhost:8000/${props.photos[0]}`}
            alt="property"
          />
        ) : null}
        {props.photos && props.photos.length > 0 && props.rooms ? (
          <img src={props.photos[0]} alt="property" />
        ) : null}

        <div className="imagesLayoutSmall"></div>
      </div>
      <p className="desc">{props.desc.slice(0, 80)}</p>
      <p className="price">{`$ ${props.price}`}</p>
      <p className="city">{props.city}</p>
      <button className="btn btn-success">See More</button>
    </div>
  );
}
