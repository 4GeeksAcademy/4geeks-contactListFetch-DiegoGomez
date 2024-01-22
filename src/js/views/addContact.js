import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams} from "react-router-dom";
import { Link } from "react-router-dom";

// Los parametros que estan en la URL se pueden acceder desde el componente usando el hook useParams
// los estoy pasando desde el componente ContactCard
export const AddContact = ({ params }) => {
  // Este console log muestra si los parametros llegaron al componente
  console.log("Parámetros de llegada:", params);

  const { actions, store } = useContext(Context);
  const navigate = useNavigate();
  const { contactId } = useParams();


  // El estado inicial del formulario es un objeto vacío con los campos del formulario
  const [contactData, setContactData] = useState({
    full_name: "",
    email: "",
    agenda_slug: "agenda-diego",
    address: "",
    phone: "",
  });

  useEffect(() => {
    if (contactId) {
      const selectedContact = store.contacts.find((contact) => contact.id === contactId);
      if (selectedContact) {
        setContactData({
          ...selectedContact,
          agenda_slug: "agenda-diego",
        });
      }
    }
  }, [contactId, store.contacts]);

  // Cada vez que hay un cambio en los campos del formulario, se actualiza el estado del formulario
  const handleChange = (e) => {
    // target.name y target.value son propiedades de los inputs que me permiten acceder al nombre y al valor del input
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    // Evito que se recargue la página
    e.preventDefault();

    // Si hay un id en el contacto, llamo al método updateContact de actions pasando el id del contacto y los datos del contacto
    if (contactData.id) {
      actions.updateContact(contactData.id, contactData);
    } else {
      actions.createContact(contactData);
    }

    // Al enviar el formulario, me voy a la página de contactos
    navigate("/contact");
  };

  return (
    <div className="p-3">
      <h1 className="display-5">
        {contactData.id ? "Edit Contact" : "Add a new contact"}
      </h1>
      <form className="p-5" onSubmit={handleSubmit}>
        <label htmlFor="fullName" className="form-label">
          Full name
        </label>
        <input
          className="form-control form-control-lg"
          id="fullName"
          type="text"
          name="full_name"
          value={contactData.full_name}
          onChange={handleChange}
          required
        />
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          className="form-control form-control-lg"
          id="email"
          type="email"
          name="email"
          value={contactData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="address" className="form-label">
          Address
        </label>
        <input
          className="form-control form-control-lg"
          id="address"
          type="text"
          name="address"
          value={contactData.address}
          onChange={handleChange}
          required
        />
        <label htmlFor="phone" className="form-label">
          Phone
        </label>
        <input
          className="form-control form-control-lg"
          id="phone"
          type="tel"
          name="phone"
          value={contactData.phone}
          onChange={handleChange}
          required
        />

        <div className="d-grid gap-2">
          <button className="btn btn-primary mt-3" type="submit">
            {contactData.id ? "Update Contact" : "Add Contact"}
          </button>
        </div>
        <Link to="/contact" className="btn btn-secondary btn-lg mt-3">
          Go back
        </Link>
      </form>
    </div>
  );
};
