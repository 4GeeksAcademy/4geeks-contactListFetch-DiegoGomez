import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

// Los parametros que estan en la URL se pueden acceder desde el componente usando el hook useParams
// los estoy pasando desde el componente ContactCard
export const UpdateContact = () => {
    // Traigo las actions del store
  const { actions, store } = useContext(Context);
    const navigate = useNavigate();
    // Traigo contact del store que me servirá para acceder al objeto vacío
  const [contact, setContact] = useState(store.contact);
    // Cada vez que haya un cambio en el input, se detecta y se actualiza
  const handleChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
    };
    // Cuando se pulsa el botón de actualizar contacto, se hace un PUT al endpoint que contiene los 
    //contactos pasando el id del contacto que queremos actualizar
  const handleSubmit = (event) => {
    event.preventDefault();
    const config = {
      method: "PUT",
      body: JSON.stringify(contact),
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `https://playground.4geeks.com/apis/fake/contact/${contact.id}`,
      config
    )
        // Controlo las response con then y catch
      .then((response) => response.text())
        .catch((error) => console.log("error", error))
        // Cuando se ejecuta el submit, se ejecuta el fetchContacts que es mi actions para guardar los contactos en el
        // store y después hago un navigate a contact (redirección).
      .then((response) => {
        actions.fetchContacts();
        navigate("/contact");
      });
  };
  return (
      <form className="container p-4" onSubmit={handleSubmit}>
          <h1 className="display-4 mb-4">Update contact</h1>
      <div className="mb-3">
        <label htmlFor="inputName" className="form-label">
          Full name
        </label>
        <input
          type="name"
          name="full_name"
          className="form-control"
          id="inputName"
          value={contact.full_name}
          onChange={(e) => handleChange(e)}
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="inputEmail" className="form-label">
          Email
        </label>
        <input
          type="name"
          name="email"
          className="form-control"
          id="inputEmail"
          value={contact.email}
          onChange={(e) => handleChange(e)}
        ></input>
      </div>
      <div className="mb-3"></div>
      <div className="mb-3">
        <label htmlFor="inputPhone" className="form-label">
          Phone
        </label>
        <input
          type="name"
          name="phone"
          className="form-control"
          id="inputPhone"
          value={contact.phone}
          onChange={(e) => handleChange(e)}
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="inputAddress" className="form-label">
          Address
        </label>
        <input
          type="name"
          name="address"
          className="form-control"
          id="inputAddress"
          value={contact.address}
          onChange={(e) => handleChange(e)}
        ></input>
      </div>
      <div className="">
        <button type="submit" className="btn btn-success btn-lg">
          Update
        </button>
        <Link to={"/contact"} type="button" className="btn btn-danger ms-4 btn-lg">
          Go back
        </Link>
      </div>
    </form>
  );
};
