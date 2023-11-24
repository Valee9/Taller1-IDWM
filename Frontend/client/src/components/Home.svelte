<script>
  /**
   * Importación de la función `validateRUT` para comprobar que el RUT ingresado sea válido
   * y del método `auth` para gestionar el token de autenticación.
   */
  import { validateRUT } from "validar-rut";
  import { auth } from "../stores/Auth";

  /**
   * Declaración e inicialización de variables para almacenar los clientes, filtro de la búsqueda
   * y cargar los datos actuales del cliente.
   */
  let clients = []; // Almacena la lista completa de clientes.
  let searchResults = []; // Almacena los resultados que coinciden con la búsqueda actual.
  let originalClientData = {}; // Almacena los datos originales de un cliente para la edición.

  /**
   * Declaración e inicialización de las variables de los campos de un cliente.
   */
  let name = ""; // Almacena el nombre del cliente.
  let lastname = ""; // Almacena el apellido del cliente.
  let nid = ""; // Almacena el número de identificación (RUT o DNI) del cliente.
  let email = ""; // Almacena la dirección de correo electrónico del cliente.
  let point = ""; // Almacena los puntos del cliente.
  let nameError = true; // Indica si hay un error en el campo de nombre.
  let lastnameError = true; // Indica si hay un error en el campo de apellido.
  let isValidNid = false; // Indica si el RUT o DNI ingresado es válido.
  let isValidEmail = true; // Indica si la dirección de correo electrónico es válida.
  let pointError = true; // Indica si hay un error en el campo de puntos.

  /**
   * Declaración e inicialización de las variables que controlan el estado de los modales.
   */
  let isOpen = false; // Controla el estado del modal.
  let isOpen1 = false; // Controla el estado del modal 1.
  let isOpen2 = false; // Controla el estado del modal 2.
  let isOpen3 = false; // Controla el estado del modal 3.
  let isOpen4 = false; // Controla el estado del modal 4.
  let isOpen5 = false; // Controla el estado del modal 5.
  let isOpen6 = false; // Controla el estado del modal 6.
  let isOpen7 = false; // Controla el estado del modal 7.
  let isOpen8 = false; // Controla el estado del modal 8.
  let isOpen9 = false; // Controla el estado del modal 9.

  /**
   * Declaración e inicialización de las variables para manejar la paginación.
   */
  let rowCount = 0; // Almacena la cantidad total de filas en la lista de clientes.
  let showButton = false; // Indica si se debe mostrar la paginación.
  let selectedClient = null; // Almacena los datos del cliente seleccionado.

  /**
   * Modifica el estado de la variable isOpen para abrir el modal, de las variables de error y limpia los valores de los campos del formulario.
   * @function modal
   */
  function modal() {
    isOpen = !isOpen; // Alterna el estado del modal principal (lo abre o lo cierra).
    name = ""; // Limpia el valor del campo de nombre.
    lastname = ""; // Limpia el valor del campo de apellido.
    nid = ""; // Limpia el valor del campo de número de identificación (RUT o DNI).
    email = ""; // Limpia el valor del campo de correo electrónico.
    point = ""; // Limpia el valor del campo de puntos.
    nameError = true; // Restablece el estado de error del campo de nombre.
    lastnameError = true; // Restablece el estado de error del campo de apellido.
    isValidNid = false; // Restablece el estado de validez del número de identificación (RUT o DNI).
    isValidEmail = true; // Restablece el estado de validez del correo electrónico.
    pointError = true; // Restablece el estado de error del campo de puntos.
  }

  /**
   * Declaración e inicialización de las variables para eliminar un cliente
   */
  let nidDelete = ""; // Almacena el nid del cliente a eliminar.
  let nameDelete = ""; // Almacena el nombre del cliente a eliminar.
  let lastnameDelete = ""; // Almacena el apellido del cliente a eliminar.

  /**
   * Modifica el estado de la variable isOpen1 para abrir el modal y las variables toman el valor de los parametros.
   * @function modal1
   * @param nid del cliente a eliminar
   * @param name del cliente a eliminar
   * @param lastname del cliente a eliminar
   */
  function modal1(nid, name, lastname) {
    isOpen1 = !isOpen1;         // Alterna el estado del modal de eliminación.
    nidDelete = nid;            // Asigna el valor del nid del cliente a la variable de eliminación.
    nameDelete = name;          // Asigna el valor del nombre del cliente a la variable de eliminación.
    lastnameDelete = lastname;  // Asigna el valor del apellido del cliente a la variable de eliminación.
  }

  /**
   * Crea un nuevo cliente mediante una solicitud asíncrona POST al servidor.
   * @async
   * @function createClient
   */
  async function createClient() {
    // Convierte el NID a mayúsculas (específicamente la letra) y capitaliza el nombre y el apellido
    nid = nid.toUpperCase();
    name = capitalizeName(name);
    lastname = capitalizeName(lastname);
    // Construye el objeto de datos para la solicitud POST
    const data = {
      name,
      lastname,
      nid,
      email,
      point,
    };
    console.log(data);
    // Realiza una solicitud POST al servidor
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/clients`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    // Maneja la respuesta del servidor
    if (response.ok) {
      const responseData = await response.json();
      // Verifica si el cliente se creó con éxito
      if (responseData.created) {
        const newClient = responseData.client;
        // Agrega el nuevo cliente a la lista existente
        clients = [...clients, newClient];
        // Abre un modal de éxito y lo cierra después de un tiempo
        isOpen4 = !isOpen4;
        setTimeout(() => {
          isOpen4 = !isOpen4;
        }, 1500);
        // Cierra el modal de crear cliente
        modal();
        // Recarga la página para reflejar los cambios
        window.location.reload();
      } else {
        // Maneja errores si el cliente no se creó con éxito
        console.log("Error al crear al cliente", response.status);
        // Abre un modal de error y lo cierra después de un tiempo
        modal();
        isOpen3 = !isOpen3;
        setTimeout(() => {
          isOpen3 = !isOpen3;
        }, 1500);
      }
    } else {
      // Maneja errores si la respuesta tuvo un error
      const errorData = await response.json();
      console.error("Error en la solicitud al servidor:", errorData.message);
      // Abre un modal de error y lo cierra después de un tiempo
      modal();
      isOpen3 = !isOpen3;
      setTimeout(() => {
        isOpen3 = !isOpen3;
      }, 1500);
    }
  }

  /**
   * Busca los datos del cliente a editar según su nid y los asigna a originalClientData.
   * Desactiva los errores de los campos para permitir la edición y abre el modal de edición.
   * @function modalEdit
   * @param nid del cliente a editar
   */
  function modalEdit(nid) {
    selectedClient = clients.find((client) => client.nid === nid);
    /**
     * Almacena los datos originales del cliente seleccionado antes de la edición.
     */
    originalClientData = {
      name: selectedClient.name,
      lastname: selectedClient.lastname,
      nid: selectedClient.nid,
      email: selectedClient.email,
      point: selectedClient.point,
    };

    // Desactiva los errores de los campos
    nameError = false; // Desactiva el error del campo de nombre.
    lastnameError = false; // Desactiva el error del campo de apellido.
    isValidNid = true; // Indica que el NID (Número de Identificación) es válido.
    isValidEmail = false; // Desactiva el error del campo de correo electrónico.
    pointError = false; // Desactiva el error del campo relacionado con puntos (o cualquier otro campo relacionado).

    // Abre el modal de edición
    isOpen5 = !isOpen5; // Alterna el estado del modal de edición.
  }

  /**
   * Reinicia los valores al original si es que al editar los datos de un cliente no se confirman los cambios y se cierra el modal.
   * @function closeModalEdit
   */
  function closeModalEdit() {
    // Restaura los valores originales del cliente seleccionado
    selectedClient.name = originalClientData.name; // Restaura el nombre original del cliente.
    selectedClient.lastname = originalClientData.lastname; // Restaura el apellido original del cliente.
    selectedClient.nid = originalClientData.nid; // Restaura el nid original del cliente.
    selectedClient.email = originalClientData.email; // Restaura el correo electrónico original del cliente.
    selectedClient.point = originalClientData.point; // Restaura los puntos originales del cliente.

    // Cierra el modal de edición
    isOpen5 = !isOpen5; // Alterna el estado del modal de edición.
  }

  /**
   * Edita un cliente mediante una solicitud asíncrona PUT al servidor.
   * @async
   * @function editClient
   * @param name del cliente a editar
   * @param lastname del cliente a editar
   * @param nid del cliente a editar
   * @param email del cliente a editar
   * @param point del cliente a editar
   */
  async function editClient(name, lastname, nid, email, point) {
    nid = nid.toUpperCase(); // Convierte la identificación a mayúsculas.
    name = capitalizeName(name); // Capitaliza el nuevo nombre.
    lastname = capitalizeName(lastname); // Capitaliza el nuevo apellido.
    // Construye el objeto de datos para la solicitud PUT
    const data = {
      name,
      lastname,
      nid,
      email,
      point,
    };
    console.log(data);
    // Realiza una solicitud PUT al servidor
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/clients/${nid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    // Maneja la respuesta del servidor
    if (response.ok) {
      // Abre un modal de éxito y lo cierra después de un tiempo
      isOpen5 = !isOpen5;
      isOpen6 = !isOpen6;
      setTimeout(() => {
        isOpen6 = !isOpen6;
      }, 1500);
      // Recarga la página para reflejar los cambios
      window.location.reload();
    } else {
      // Maneja errores si la solicitud no es exitosa
      console.log("Error al editar el cliente");
      // Abre un modal de error y lo cierra después de un tiempo
      isOpen5 = !isOpen5;
      isOpen8 = !isOpen8;
      setTimeout(() => {
        isOpen8 = !isOpen8;
      }, 1500);
    }
  }

  /**
   * Elimina un cliente del sistema mediante una solicitud asíncrona DELETE al servidor
   * @async
   * @function deleteClient
   * @param nid del cliente que se eliminará.
   */
  async function deleteClient(nid) {
    // Realiza una solicitud DELETE al servidor
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/clients/${nid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    // Maneja la respuesta del servidor
    if (response.ok) {
      // Actualiza la lista de clientes después de la eliminación
      const updatedclients = await getClientsUpdate();
      clients = updatedclients;
      // Abre un modal de éxito y lo cierra después de un tiempo
      isOpen1 = !isOpen1;
      console.log(nid);
      isOpen2 = !isOpen2;
      setTimeout(() => {
        isOpen2 = !isOpen2;
      }, 1500);
      // Recarga la página para reflejar los cambios
      window.location.reload();
    } else {
      // Maneja errores si la solicitud no es exitosa
      console.log("Error al eliminar al cliente");
      // Abre un modal de error y lo cierra después de un tiempo
      isOpen1 = !isOpen1;
      isOpen9 = !isOpen9;
      setTimeout(() => {
        isOpen9 = !isOpen9;
      }, 1500);
    }
  }

  /**
   * Actualiza la data de todos los clientes del sistema
   * @async
   * @function getClientsUpdate
   * @returns Arreglo que contiene la información actualizada de todos los clientes del sistema.
   */
  async function getClientsUpdate() {
    // Realiza una solicitud GET al servidor para obtener la información actualizada de los clientes
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/clients`,
    );
    // Maneja la respuesta del servidor
    if (response.ok) {
      return await response.json();
    }
    return [];
  }

  /**
   * Obtiene todos los clientes del sistema mediante una solicitud asíncrona GET al servidor y los almacena en el arreglo clients.
   * @async
   * @function fetchClients
   */
  async function fetchClients() {
    // Realiza una solicitud GET al servidor
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/clients`,
      {
        method: "GET",
      },
    );
    // Maneja la respuesta del servidor
    if (response.ok) {
      // Almacena la información de los clientes en el arreglo clients.
      clients = await response.json();
      searchResults = clients;
      rowCount = clients.length;
      // Si hay 5 clientes, muestra el botón de paginación.
      if (rowCount === 5) {
        showButton = true;
      }
      console.log(clients);
      // Actualiza la paginación
      updatePagination();
    } else {
      // Registra un mensaje de error si hay un problema al cargar los datos desde la API
      console.error("Error al cargar datos de los clientes desde la API");
    }
  }
  // Llama a la función fetchClients para obtener los clientes al cargar la página
  fetchClients();

  /**
   * Variables para almacenar información del primer formulario.
   */
  let name1 = ""; // Almacena el nombre del cliente.
  let lastName1 = ""; // Almacena el apellido del cliente.
  let nid1 = ""; // Almacena la identificación del cliente.
  let email1 = ""; // Almacena el correo electrónico del cliente.
  let point1 = 0; // Almacena los puntos (u otro dato) del cliente. Inicializado en 0.

  /**
   * Capitaliza el nombre proporcionado, convirtiendo la primera letra de cada palabra a mayúscula.
   * @function capitalizeName
   * @param name a capitalizar.
   * @returns el nombre capitalizado.
   */
  function capitalizeName(name) {
    return name
      .toLowerCase()
      .replace(/\b\w/g, (firstChar) => firstChar.toUpperCase());
  }

  /**
   * Maneja el cambio en el campo de nombre del formulario y si tiene algún error.
   * @function handleChangeName
   * @param e evento de cambio en el campo de nombre.
   */
  function handleChangeName(e) {
    if (e.key === " ") {
      e.preventDefault();
    }
    // Valida la longitud y contenido del nombre
    name1 = e.target.value;
    if (name1.length > 2 && !/\d/.test(name1)) {
      nameError = false; // Desactiva el error del campo de nombre.
    } else {
      nameError = true; // Activa el error del campo de nombre.
    }
  }

  /**
   * Maneja el cambio en el campo de apellido del formulario y si tiene algún error.
   * @function handleChangeLastname
   * @param e evento de cambio en el campo de apellido.
   */
  function handleChangeLastname(e) {
    if (e.key === " ") {
      e.preventDefault();
    }
    lastName1 = e.target.value;
    // Valida la longitud y contenido del apellido
    if (lastName1.length > 2 && !/\d/.test(lastName1)) {
      lastnameError = false; // Desactiva el error del campo de apellido.
    } else {
      lastnameError = true; // Activa el error del campo de apellido.
    }
  }
  /**
   * Valida un RUT.
   * @function validateRut
   * @param nid a validar.
   * @returns boolean true si el RUT o DNI es válido, de lo contrario, false.
   */
  function validateRut(nid) {
    const cleanRUT = String(nid).replace(/[.-]/g, "");

    if (cleanRUT.length < 7 || cleanRUT.length > 12) {
      return false;
    }
    const isValid = validateRUT(cleanRUT); // Debe proporcionarse una función validateRUT adecuada.
    return isValid;
  }

  /**
   * Valida un DNI.
   * @function validateDNI
   * @param dni a validar.
   * @returns boolean true si el DNI es válido, de lo contrario, false.
   */
  function validateDNI(dni) {
    var rexDNI = /^\d{8}[a-zA-Z]$/;

    if (!rexDNI.test(dni)) {
      return false;
    }

    var number = dni.substr(0, dni.length - 1);
    var letter = dni.substr(dni.length - 1, 1);
    var letters = "TRWAGMYFPDXBNJZSQVHLCKET";
    var letterDNI = letters[number % 23];
    console.log(number);
    console.log(letter);
    console.log(letters);

    return letterDNI === letter.toUpperCase();
  }
  /**
   * Maneja el cambio en el campo de número de identificación del formulario y si es válido o no.
   * @function handleChangeNid
   * @param e evento de cambio en el campo de número de identificación.
   */
  function handleChangeNid(e) {
    nid1 = e.target.value;
    isValidNid = validateRut(nid1) || validateDNI(nid1);
  }
  /**
   * Maneja el cambio en el campo de puntos del formulario y si tiene algún error.
   * @function handleChangePoint
   * @param e evento de cambio en el campo de puntos.
   */
  function handleChangePoint(e) {
    if (e.key === " ") {
      e.preventDefault();
    }
    const inputText = e.target.value;

    // Valida que el campo de puntos solo contenga números y verifica su validez.
    if (/[^0-9]/.test(inputText)) {
      pointError = true;
    } else {
      point1 = parseInt(inputText, 10);
      pointError = isNaN(point1) || point1 < 0;
    }
  }
  /**
   * Valida una dirección de correo electrónico.
   * @function validateEmail
   * @param email a validar.
   * @returns boolean true si la dirección de correo electrónico es válida, de lo contrario, false.
   */
  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const cleanEmail = email.trim();

    if (
      cleanEmail.length < 4 ||
      cleanEmail.length > 255 ||
      !emailRegex.test(cleanEmail)
    ) {
      return true;
    }

    return false;
  }

  /**
   * Abre o cierra el modal correspondiente.
   * @function modal2
   */
  function modal2() {
    isOpen7 = !isOpen7;
  }

  /**
   * Maneja el evento de cierre de sesión.
   * @function handleLogout
   */
  function handleLogout() {
    auth.clearToken();
    isLoggedIn() == false;
    const homeURL = "/";
    window.history.replaceState({}, document.title, homeURL);
    window.location.href = homeURL;
  }
  const token = sessionStorage.getItem("jwtToken");

  /**
   * Verifica si el usuario está actualmente autenticado.
   * @function isLoggedIn
   * @returns boolean true si el usuario está autenticado, de lo contrario, false.
   */
  function isLoggedIn() {
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Maneja el cambio en el campo de correo electrónico del formulario y si tiene algún error.
   * @function handleChangeEmail
   * @param e evento de cambio en el campo de correo electrónico.
   */
  function handleChangeEmail(e) {
    if (e.key === " ") {
      e.preventDefault();
    }

    email1 = e.target.value;
    isValidEmail = validateEmail(email1);
  }
  /**
   * Declaración e inicilaición de variables
   */
  let currentPage = 1;
  const itemsPerPage = 5;
  let totalPages = 0;
  /**
   * Actualiza la paginación con base en la cantidad total de clientes.
   * @function updatePagination
   */
  function updatePagination() {
    const totalItems = clients.length;
    totalPages = Math.ceil(totalItems / itemsPerPage);
    currentPage = 1;
  }

  /**
   * Muestra una página específica de resultados.
   * @function showPage
   * @param page de la página a mostrar.
   */
  function showPage(page) {
    currentPage = page;
    console.log({ currentPage });
  }

  /**
   * Avanza a la siguiente página de resultados.
   * @function nextPage
   */
  function nextPage() {
    totalPages = Math.ceil(clients.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
    }
  }

  /**
   * Retrocede a la página anterior de resultados.
   * @function previousPage
   */
  function previousPage() {
    if (currentPage > 1) {
      currentPage--;
    }
  }

  /**
   * Formatea un número de identificación añadiendo el guión al final.
   * @function formatDni
   * @param dni a formatear.
   * @returns el número de identificación formateado.
   */
  function formatDni(dni) {
    const last = dni.slice(-1);
    const start = dni.slice(0, -1);
    const dniFormat = start + "-" + last;

    return dniFormat;
  }
  // Declaración e inicilaición de variable de búsqueda
  let searchTerm = "";

  /**
   * Realiza una búsqueda en los clientes según un término especificado.
   * @function handleSearch
   */
  function handleSearch() {
    const lowerCaseTerm = searchTerm.toLowerCase();
    searchResults = clients.filter(
      (client) =>
        client.nid.toLowerCase().includes(lowerCaseTerm) ||
        client.email.toLowerCase().includes(lowerCaseTerm),
    );
  }
</script>

<body style="background-color: white;">
  <main>
    <div class="div-main">
      <div style="text-align: end;">
        <button
          on:click={modal2}
          type="button"
          class="button-icon col bi bi-box-arrow-right"
          style="background-color: #8e8e8e; margin-bottom: 10px;"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Cerra sesión"
        />
      </div>
      <div class="title">
        <p class="title-info" style="margin: 5px 0">Listado de clientes</p>
      </div>
      <div />

      <div class="text-end">
        <button
          on:click={modal}
          type="button"
          class="button-icon col bi bi-plus-lg"
          style="background-color: #18cf5e;"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Crear"
        />
      </div>

      {#if clients.length === 0}
        <h2
          class="title-info"
          style="color: black; font-size: 20px; font-weight: 300"
        >
          No hay clientes registrados.
        </h2>
      {:else}
        <div
          class="d-flex justify-content-between align-items-center"
          style="margin-bottom: 10px;"
        >
          <div class="flex-fill text-center" style="margin-left: 40px">
            <input
              type="text"
              class="input-search"
              bind:value={searchTerm}
              placeholder="Buscar por RUT/DNI o correo"
              on:input={handleSearch}
            />
          </div>
        </div>
        <div class="text-center table-responsive">
          <table class="table table-striped border table-bordered align-middle">
            <thead class="align-middle">
              <tr>
                <th style="width:15%">Nombre</th>
                <th style="width:15%">Apellidos</th>
                <th style="width:20%">N° de identificación</th>
                <th style="width:20%">Correo electrónico</th>
                <th style="width:15%">Puntos obtenidos</th>
                <th style="width:15%">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {#each searchResults.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) as item, index (index + 1)}
                <tr>
                  <td style="width:15%">{item.name}</td>
                  <td style="width:15%">{item.lastname}</td>
                  <td style="width:20%">{formatDni(item.nid)}</td>
                  <td style="width:20%">{item.email}</td>
                  <td style="width:15%">{item.point}</td>
                  <td style="width:15%">
                    <div
                      class="button-container display-flex justify-content-center align-items-center;">
                      <button
                        on:click={() => modalEdit(item.nid)}
                        type="button"
                        class="button-icon col bi bi-pencil-fill"
                        style=" background-color: #FBD24E; margin: 0 5px"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Editar"/>
                      <button
                        on:click={() => modal1(item.nid, item.name, item.lastname)}
                        type="button"
                        class="button-icon col bi bi-trash-fill"
                        style="background-color: red; margin:5px 5px 0 5px"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Eliminar"/>
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>

        {#if clients.length > 5}
          <div class="pagination-container fixed-bottom mb-3">
            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center">
                <li class="page-item">
                  <a
                    class="page-link"
                    href="#"
                    aria-label="Previous"
                    on:click={previousPage}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                {#each Array.from({ length: totalPages }, (_, i) => i + 1) as page}
                  <li class="page-item">
                    <a
                      class:active={currentPage === page}
                      class="page-link"
                      href="#"
                      on:click={() => showPage(page)}>{page}</a
                    >
                  </li>
                {/each}
                <li class="page-item">
                  <a
                    class="page-link"
                    href="#"
                    aria-label="Next"
                    on:click={nextPage}
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        {/if}
      {/if}
    </div>

    {#if isOpen}
      <div class="modal-overlay">
        <div class="modal-software w-50">
          <div style="text-align:right">
            <button class="close-button" on:click={modal}>&times;</button>
          </div>
          <div class="container-modal">
            <form on:submit|preventDefault={createClient}>
              <h3>Crear cliente</h3>
              <div class="label-input">
                <label for="nameClient" class="form-label">Nombre *</label>
                <input
                  type="text"
                  class="form-control input-edit"
                  on:input={handleChangeName}
                  bind:value={name}
                  placeholder="Juan"
                  required
                />
                {#if nameError}
                  <p style="color: red; margin:5px 0 0">
                    El nombre no es válido.
                  </p>
                {:else}
                  <p style="color: green; margin:5px 0 0">
                    El nombre es válido.
                  </p>
                {/if}
              </div>
              <div class="label-input">
                <label for="lastNameClient" class="form-label">Apellido *</label
                >
                <input
                  type="text"
                  class="form-control input-edit"
                  on:input={handleChangeLastname}
                  bind:value={lastname}
                  placeholder="Perez"
                  required
                />
                {#if lastnameError}
                  <p style="color: red; margin:5px 0 0">
                    El apellido no es válido.
                  </p>
                {:else}
                  <p style="color: green; margin:5px 0 0">
                    El apellido es válido.
                  </p>
                {/if}
              </div>
              <div class="label-input">
                <label for="nidClient" class="form-label"
                  >Número de identificación *</label
                >
                <input
                  type="text"
                  class="form-control input-edit"
                  on:input={handleChangeNid}
                  bind:value={nid}
                  placeholder="RUT o DNI"
                  required
                />
                {#if isValidNid}
                  <p style="color: green; margin:5px 0 0">
                    El número de identificación es válido.
                  </p>
                {:else}
                  <p style="color: red; margin:5px 0 0">
                    El número de identificación no es válido.
                  </p>
                {/if}
              </div>
              <div class="label-input">
                <label for="nidClient" class="form-label">Email *</label>
                <input
                  type="text"
                  class="form-control input-edit"
                  on:input={handleChangeEmail}
                  bind:value={email}
                  placeholder="prueba@gmail.com"
                  required
                />
                {#if isValidEmail}
                  <p style="color: red; margin:5px 0 0">
                    El email no es válido.
                  </p>
                {:else}
                  <p style="color: green; margin:5px 0 0">
                    El email es válido.
                  </p>
                {/if}
              </div>
              <div class="label-input">
                <label for="nidClient" class="form-label">Puntos *</label>
                <input
                  type="text"
                  class="form-control input-edit"
                  on:input={handleChangePoint}
                  bind:value={point}
                  placeholder="20"
                  required
                />
                {#if pointError}
                  <p style="color: red; margin:5px 0 0">
                    Los puntos no son válidos.
                  </p>
                {:else}
                  <p style="color: green; margin:5px 0 0">
                    Los puntos son válidos.
                  </p>
                {/if}
              </div>
              <div class="modal-button">
                <button
                  type="submit"
                  class="button-confirm"
                  disabled={nameError ||
                    lastnameError ||
                    !isValidNid ||
                    isValidEmail ||
                    pointError}>Crear</button
                >
                <button class="button-confirm button-cancel" on:click={modal}
                  >Cancelar</button
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    {/if}

    {#if isOpen1}
      <div class="modal-overlay">
        <div class="modal-software w-50">
          <div style="text-align:right">
            <button class="close-button" on:click={() => modal1(nidDelete, nameDelete, lastnameDelete)}>&times;</button>
          </div>
          <div class="container-modal">
            <h2>
              ¿Estas seguro de eliminar al cliente(a) {nameDelete}
              {lastnameDelete}?
            </h2>
            <div class="modal-button">
              <button
                class="button-confirm"
                on:click={() => deleteClient(nidDelete)}>Si</button
              >
              <button class="button-confirm button-cancel" on:click={() => modal1(nidDelete, nameDelete, lastnameDelete)}>No</button>
            </div>
          </div>
        </div>
      </div>
    {/if}

    {#if isOpen2}
      <div class="modal-overlay">
        <div class="modal-software w-50">
          <h5>Cliente eliminado con éxito.</h5>
        </div>
      </div>
    {/if}

    {#if isOpen3}
      <div class="modal-overlay">
        <div class="modal-software w-50">
          <h5>
            Error al crear el cliente, el rut o correo electrónico ya existen.
          </h5>
        </div>
      </div>
    {/if}

    {#if isOpen4}
      <div class="modal-overlay">
        <div class="modal-software w-50">
          <h5>Cliente creado con éxito.</h5>
        </div>
      </div>
    {/if}

    {#if isOpen5}
      <div class="modal-overlay">
        <div class="modal-software w-50">
          <div style="text-align:right">
            <button class="close-button" on:click={closeModalEdit}
              >&times;</button
            >
          </div>
          <div class="container-modal">
            <form
              on:submit|preventDefault={() =>
                editClient(
                  selectedClient.name,
                  selectedClient.lastname,
                  selectedClient.nid,
                  selectedClient.email,
                  selectedClient.point,
                )}
            >
              <h3>Editar cliente</h3>

              <div class="label-input">
                <label for="nameClient" class="form-label">Nombre *</label>
                <input
                  type="text"
                  class="form-control input-edit"
                  on:input={handleChangeName}
                  bind:value={selectedClient.name}
                  placeholder="Juan"
                  required
                />
                {#if nameError}
                  <p style="color: red; margin:5px 0 0">
                    El nombre no es válido.
                  </p>
                {:else}
                  <p style="color: green; margin:5px 0 0">
                    El nombre es válido.
                  </p>
                {/if}
              </div>

              <div class="label-input">
                <label for="lastNameClient" class="form-label">Apellido *</label
                >
                <input
                  type="text"
                  class="form-control input-edit"
                  on:input={handleChangeLastname}
                  bind:value={selectedClient.lastname}
                  placeholder="Perez"
                  required
                />
                {#if lastnameError}
                  <p style="color: red; margin:5px 0 0">
                    El apellido no es válido.
                  </p>
                {:else}
                  <p style="color: green; margin:5px 0 0">
                    El apellido es válido.
                  </p>
                {/if}
              </div>
              <div class="label-input">
                <label for="nidClient" class="form-label"
                  >Número de identificación *</label
                >
                <input
                  type="text"
                  class="form-control input-edit"
                  on:input={handleChangeNid}
                  bind:value={selectedClient.nid}
                  readonly
                  disabled
                />
                {#if isValidNid}
                  <p style="color: green; margin:5px 0 0">
                    El número de identificación es válido.
                  </p>
                {:else}
                  <p style="color: red; margin:5px 0 0">
                    El número de identificación no es válido.
                  </p>
                {/if}
              </div>
              <div class="label-input">
                <label for="nidClient" class="form-label">Email *</label>
                <input
                  type="text"
                  class="form-control input-edit"
                  on:input={handleChangeEmail}
                  bind:value={selectedClient.email}
                  placeholder="prueba@gmail.com"
                  required
                />
                {#if isValidEmail}
                  <p style="color: red; margin:5px 0 0">
                    El email no es válido.
                  </p>
                {:else}
                  <p style="color: green; margin:5px 0 0">
                    El email es válido.
                  </p>
                {/if}
              </div>
              <div class="label-input">
                <label for="nidClient" class="form-label">Puntos *</label>
                <input
                  type="text"
                  class="form-control input-edit"
                  on:input={handleChangePoint}
                  bind:value={selectedClient.point}
                  placeholder="20"
                  required
                />
                {#if pointError}
                  <p style="color: red; margin:5px 0 0">
                    Los puntos no son válidos.
                  </p>
                {:else}
                  <p style="color: green; margin:5px 0 0">
                    Los puntos son válidos.
                  </p>
                {/if}
              </div>

              <div class="modal-button">
                <button
                  type="submit"
                  class="button-confirm"
                  disabled={nameError ||
                    lastnameError ||
                    !isValidNid ||
                    isValidEmail ||
                    pointError}>Editar</button
                >
                <button
                  class="button-confirm button-cancel"
                  on:click={closeModalEdit}>Cancelar</button
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    {/if}
    {#if isOpen6}
      <div class="modal-overlay">
        <div class="modal-software w-50">
          <h5>Cliente editado con éxito.</h5>
        </div>
      </div>
    {/if}

    {#if isOpen7}
      <div class="modal-overlay">
        <div class="modal-software w-50">
          <div style="text-align:right">
            <button class="close-button" on:click={modal2}>&times;</button>
          </div>
          <div class="container-modal">
            <h2>¿Estas seguro que deseas cerrar sesión?</h2>
            <div class="modal-button">
              <button class="button-confirm" on:click={handleLogout}
                >Confirmar</button
              >
              <button class="button-confirm button-cancel" on:click={modal2}
                >Cancelar</button
              >
            </div>
          </div>
        </div>
      </div>
    {/if}

    {#if isOpen8}
      <div class="modal-overlay">
        <div class="modal-software w-50">
          <h5>Error al editar el cliente.</h5>
        </div>
      </div>
    {/if}

    {#if isOpen9}
      <div class="modal-overlay">
        <div class="modal-software w-50">
          <h5>Error al eliminar el cliente.</h5>
        </div>
      </div>
    {/if}
  </main>
</body>
