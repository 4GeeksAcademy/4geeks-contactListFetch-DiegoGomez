import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const AddContact = () => {
	const { actions } = useContext(Context);
	const navigate = useNavigate(); // Use useNavigate hook

	//Estados para el formulario de contacto
	const [contactData, setContactData] = useState({
		full_name: "",
		email: "",
		agenda_slug: "",
		address: "",
		phone: ""
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
		<div>
			<h1>{contactData.id ? "Edit Contact" : "Add Contact"}</h1>
			<form onSubmit={handleSubmit}>
				{/* Add input fields for contact data */}
				<input type="text" name="full_name" placeholder="Full Name" value={contactData.full_name} onChange={handleChange} required />
				<input type="email" name="email" placeholder="Email" value={contactData.email} onChange={handleChange} required />
				<input type="text" name="agenda_slug" placeholder="Agenda Slug" value={contactData.agenda_slug} onChange={handleChange} required />
				<input type="text" name="address" placeholder="Address" value={contactData.address} onChange={handleChange} required />
				<input type="tel" name="phone" placeholder="Phone" value={contactData.phone} onChange={handleChange} required />

				<button type="submit">{contactData.id ? "Update Contact" : "Add Contact"}</button>
			</form>
		</div>
	);
};
