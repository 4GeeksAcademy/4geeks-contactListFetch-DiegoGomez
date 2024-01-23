const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      contacts: [],
      contact: {}
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      loadSomeData: () => {
        /**
							fetch().then().then(data => setStore({ "foo": data.bar }))
						*/
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
      //fetchContacts guarda los datos de la API en el store
      fetchContacts: async () => {
        try {
          // Este endpoint me devuelve todos los contactos de la agenda agenda-diego (mi agenda)
          const response = await fetch(
            "https://playground.4geeks.com/apis/fake/contact/agenda/agenda-diego"
          );
          const data = await response.json();
          // Guardo los datos en el store con setStore
          setStore({ contacts: data || [] });
        } catch (error) {
          console.error("Error fetching contacts:", error);
        }
      },
      // Para crear los contactos, contactData es un objeto con los datos del contacto que quiero crear
      // el cual contiene los campos a rellenar del contacto
      createContact: async (contactData) => {
        try {
          const response = await fetch(
            "https://playground.4geeks.com/apis/fake/contact/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(contactData),
            }
          );
          const createdContact = await response.json();
          // De nuevo fetchContacts para actualizar los contactos
          getActions().fetchContacts();
        } catch (error) {
          console.error("Error creating contact:", error);
        }
      },
      // Para actualizar los contactos, contactId es el id del contacto que quiero actualizar
      // Con el método delete elimino el contacto recogiendo el id del contacto
      deleteContact: async (contactId) => {
        try {
          const response = await fetch(
            `https://playground.4geeks.com/apis/fake/contact/${contactId}`,
            {
              method: "DELETE",
            }
          );
          actions.fetchContacts();
        } catch (error) {
          console.error("Error deleting contact:", error);
        }
      },

      // Para actualizar los contactos, contactId es el id del contacto que quiero actualizar y contactData
      //es un objeto con los campos del contacto
      updateContact: async (contactId, contactData) => {
        try {
          const response = await fetch(
            `https://playground.4geeks.com/apis/fake/contact/${contactId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(contactData),
            }
          );
          // Si la respuesta es correcta, actualizo los contactos
          if (response.ok) {
            // Si la respuesta es correcta, actualizo los contactos
            getActions().fetchContacts();
          } else {
            console.error("Error updating contact:", response.status);
          }
        } catch (error) {
          console.error("Error updating contact:", error);
        }
      },
      //Este action lo llamo desde el botón de actualizar el contacto, guarda los contactos en el store
      //lo cual me sirve para poder manipularlos con el fetch que hago en el archivo updateContact
      seeContact: (contact) => {
        setStore ({contact:contact})
      }
    },
  };
};

export default getState;
