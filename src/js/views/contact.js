// Contact.js
import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export const Contact = () => {
  // Variables de estado y funciones de store
  const { store, actions } = useContext(Context);

  useEffect(() => {
    //actions.fetchContacts() lo que hace es hacer un fetch a la API y guardar los datos en el store
    actions.fetchContacts();
    // al poner las acciones entre corchetes, le estoy diciendo que solo se ejecute una vez cuando se carga el componente
  }, [actions]);

  // Llamo a la acción pasando el id del contacto que quiero eliminar
  const handleDeleteContact = (contactId) => {
    actions.deleteContact(contactId);
  };

  const handleUpdateContact = (contactId) => {
    return <Link to={`/addContact/${contactId}`}>Actualizar</Link>;
  };
  return (
    //Mis contactos
    <div className="p-4">
      <h1 className="display-6 fw-bold">Contact List</h1>

      <Link to="/addContact" className="btn btn-primary">
        Añadir contacto
      </Link>
      <ul>
        {store.contacts.map(
          (contact) =>
            contact.id && (
              <li key={contact.id} className="p-5 border border-1 mt-3 rounded">
                <h2 className="display-3">{contact.full_name}</h2>{" "}
                <h5>
                  <i class="fa-solid fa-location-dot me-2"></i>
                  {contact.address}
                </h5>
                <h5>
                  <i class="fa-solid fa-phone me-2"></i>
                  {contact.phone}
                </h5>
                <h5>
                  <i class="fa-solid fa-envelope me-2"></i>
                  {contact.email}
                </h5>
                <div className="mt-3">
                  <button
                    type="button"
                    className="btn btn-warning me-2"
                    onClick={() => handleUpdateContact(contact.id)}
                  >
                    Actualizar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeleteContact(contact.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default Contact;
