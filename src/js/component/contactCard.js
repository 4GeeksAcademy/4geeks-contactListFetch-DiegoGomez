// ContactCard.js
import React from "react";
import { Link } from "react-router-dom";

const ContactCard = ({ contact, onDeleteContact }) => {
  return (
    <div className="col">
      <div className="p-5 border border-1 mt-3 rounded bg-dark text-white">
        <h2 className="display-3">{contact.full_name}</h2>
        <h5>
          <i className="fa-solid fa-location-dot me-2"></i>
          {contact.address}
        </h5>
        <h5>
          <i className="fa-solid fa-phone me-2"></i>
          {contact.phone}
        </h5>
        <h5>
          <i className="fa-solid fa-envelope me-2"></i>
          {contact.email}
        </h5>
        <div className="mt-3">
          <Link to={`/addContact/${contact.id}`} className="btn btn-warning me-2">
            <i className="fa-solid fa-pen"></i>
          </Link>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onDeleteContact(contact.id)}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
