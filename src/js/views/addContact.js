import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Link } from "react-router-dom";

export const AddContact = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate(); // Use useNavigate hook

  //Estados para el formulario de contacto
  const [contactData, setContactData] = useState({
    full_name: "",
    email: "",
    agenda_slug: "agenda-diego",
    address: "",
    phone: "",
  });

  // Con handleChange actualizo el estado de contactData con los valores de los inputs
  const handleChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  //En la funcion handleSubmit hago el fetch para crear un nuevo contacto
  const handleSubmit = (e) => {
    // PreventDefault me sirve para que no se recargue la pagina al hacer submit
    e.preventDefault();

    // Si el contacto ya existe, actualizo el contacto, sino lo creo
    if (contactData.id) {
      actions.updateContact(contactData.id, contactData);
    } else {
      actions.createContact(contactData);
    }

    // Cuando termino de crear o actualizar el contacto, navego a la pagina de contactos
    navigate("/contact");
  };

  return (
    <div className="p-3">
      <h1 className="display-5">{contactData.id ? "Edit Contact" : "Add a new contact"}</h1>
      <form className="p-5" onSubmit={handleSubmit}>
        <label for="fullName" class="form-label">
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
        <label for="email" class="form-label">
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
        <label for="address" class="form-label">
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
        <label for="phone" class="form-label">
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

        <div class="d-grid gap-2">
          <button class="btn btn-primary mt-3" type="submit">
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
