// Contact.js
import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import ContactCard from "../component/contactCard";

const Contact = () => {
  const { store, actions } = useContext(Context);

  // Aquí se llama al método fetchContacts de actions para que se ejecute cuando se cargue el componente
  useEffect(() => {
    actions.fetchContacts();
  }, [actions]);

  // Llamo al actions para borrar el contacto pasando el id del contacto
  const handleDeleteContact = (contactId) => {
    actions.deleteContact(contactId);
  };

  // Quitar los puntos de la lista
  const ulStyle = {
    listStyleType: "none",
  };

  return (
    <div className="p-4">
      <h1 className="display-6 fw-bold">Contact List</h1>
      <Link to="/addContact" className="btn btn-primary">
        Add contact
      </Link>
      <Link to="/" className="btn btn-success ms-3">
        Home
      </Link>
      <div className="row row-cols-1 row-cols-md-2 g-4" style={ulStyle}>
        {store.contacts.map(
          (contact) =>
            contact.id && (
              <ContactCard
                key={contact.id}
                contact={contact}
                onDeleteContact={handleDeleteContact}
              />
            )
        )}
      </div>
    </div>
  );
};

export default Contact;
