<script>
  import { validateRUT } from "validar-rut";
  import { auth } from "../stores/Auth";

  let clients = [];

  let name = "";
  let lastname = "";
  let nid = "";
  let email = "";
  let point = "";
  let nameError = true;
  let lastnameError = true;
  let isValidNid = false;
  let isValidEmail = true;
  let pointError = true;

  let isOpen = false;
  let isOpen1 = false;
  let isOpen2 = false;
  let isOpen3 = false;
  let isOpen4 = false;
  let isOpen5 = false;
  let isOpen6 = false;
  let isOpen7 = false;

  let api = true;
  let message = "";
  let rowCount = 0;
  let showButton = false;
  let selectedClient = null;

  function modal() {
    isOpen = !isOpen;
    name = "";
    lastname = "";
    nid = "";
    email = "";
    point = "";
    nameError = true;
    lastnameError = true;
    isValidNid = false;
    isValidEmail = true;
    pointError = true;
  }

  let nidDelete = "";
  let nameDelete = "";
  let lastnameDelete = "";
  let emailDelete = "";
  let pointDelete = "";

  function modal1(nid, name, lastname, email, point) {
    isOpen1 = !isOpen1;
    nidDelete = nid;
    nameDelete = name;
    lastnameDelete = lastname;
    emailDelete = email;
    pointDelete = point;
  }

  async function createClient() {
    const data = {
      name,
      lastname,
      nid,
      email,
      point
    };
    console.log(data);
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/clients`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      if (responseData.created) {
        const newClient = responseData.client;
        clients = [...clients, newClient];
        isOpen4 = !isOpen4;
        setTimeout(() => {
          isOpen4 = !isOpen4;
        }, 1500);
        modal();
        // window.location.reload();
      } else {
        console.log("Error al crear al cliente", response.status);
      }
    } else {
      const errorData = await response.json();
      console.error("Error en la solicitud al servidor:", errorData.message);

      modal();
      isOpen3 = !isOpen3;
      setTimeout(() => {
        isOpen3 = !isOpen3;
      }, 1500);
    }
  }

  let originalClientData = {};
  function closeModalEdit() {
    selectedClient.name = originalClientData.name;
    selectedClient.lastname = originalClientData.lastname;
    selectedClient.nid = originalClientData.nid;
    selectedClient.email = originalClientData.email;
    selectedClient.point = originalClientData.point;
    isOpen5 = !isOpen5;
  }

  function modalEdit(nid) {
    selectedClient = clients.find((client) => client.nid === nid);

    originalClientData = {
      name: selectedClient.name,
      lastname: selectedClient.lastname,
      nid: selectedClient.nid,
      email: selectedClient.email,
      point: selectedClient.point,
    };

    nameError = false;
    lastnameError = false;
    isValidNid = true;
    isValidEmail = false;
    pointError = false;
    isOpen5 = !isOpen5;
  }

  async function editClient(name, lastname, nid, email, point) {
    const data = {
      name,
      lastname,
      nid,
      email,
      point
    };
    console.log(data);
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/clients/${nid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (response.ok) {
      isOpen5 = !isOpen5;
      isOpen6 = !isOpen6;
      setTimeout(() => {
        isOpen6 = !isOpen6;
      }, 1500);
      window.location.reload();
    } else {
      console.log("Error al editar el cliente");
      isOpen5 = !isOpen5;
    }
  }

  async function deleteClient(nid) {
    isOpen1 = !isOpen1;
    console.log(nid)
    isOpen2 = !isOpen2;
    setTimeout(() => {
      isOpen2 = !isOpen2;
    }, 1500);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/clients/${nid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const updatedclients = await getClientsUpdate();
        clients = updatedclients;
        window.location.reload();
      } else {
        message = `Error al eliminar al cliente: ${response.statusText}`;
      }
    } catch (error) {
      message = `Error al eliminar al cliente: ${error.message}`;
    }
  }
  async function getClientsUpdate() {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/clients`
    );
    if (response.ok) {
      return await response.json();
    }
    return [];
  }

  async function fetchClients() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/clients`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        clients = await response.json();
        rowCount = clients.length;
        if (rowCount === 5) {
          showButton = true;
        }
        console.log(clients);
        updatePagination();
        api = false;
      } else {
        console.error("Error al cargar datos de los clientes desde la API");
      }
    } catch (err) {
      console.error("Error al realizar la solicitud a la API:", err);
    }
  }

  fetchClients();

  let name1 = "";
  let lastName1 = "";
  let nid1 = "";
  let email1 = "";
  let point1 = 0;
  let subject1 = "";

  function handleChangeName(e) {
    if (e.key === " ") {
      e.preventDefault();
    }
    name1 = e.target.value;
    if (name1.length > 2 && !/\d/.test(name1)) {
      nameError = false;
    } else {
      nameError = true;
    }
  }

  function handleChangeLastname(e) {
    if (e.key === " ") {
      e.preventDefault();
    }
    lastName1 = e.target.value;
    if (lastName1.length > 2 && !/\d/.test(lastName1)) {
      lastnameError = false;
    } else {
      lastnameError = true;
    }
  }

  function validateRut(nid) {
    const cleanRUT = String(nid).replace(/[.-]/g, "");

    if (cleanRUT.length < 7 || cleanRUT.length > 12) {
      return false;
    }
    const isValid = validateRUT(cleanRUT);
    return isValid;
  }

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

  function handleChangeNid(e) {
    nid1 = e.target.value;
    isValidNid = validateRut(nid1) || validateDNI(nid1);
  }

  function handleChangePoint(e) {
    if (e.key === " ") {
      e.preventDefault();
    }
    const inputText = e.target.value;
    if (/[^0-9]/.test(inputText)) {
      pointError = true;
    } else {
      point1 = parseInt(inputText, 10);
      pointError = isNaN(point1) || point1 < 0;
    }
  }

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
  
  function modal2 () {
    isOpen7 = !isOpen7
  }

  function handleLogout() {
    auth.clearToken();
    isLoggedIn() == false;
    const homeURL = "/";
    window.history.replaceState({}, document.title, homeURL);
    window.location.href = homeURL;
  }

  const token = sessionStorage.getItem("jwtToken");
  function isLoggedIn() {
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  function handleChangeEmail(e) {
    if (e.key === " ") {
      e.preventDefault();
    }

    email1 = e.target.value;
    isValidEmail = validateEmail(email1);
  }

  let currentPage = 1;
  const itemsPerPage = 5;
  let totalPages = 0;

  function updatePagination() {
    const totalItems = clients.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (currentPage > totalPages) {
      currentPage = totalPages;
    }
  }

  function nextPage() {
    totalPages = Math.ceil(clients.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
    }
  }

  function previousPage() {
    if (currentPage > 1) {
      currentPage--;
    }
  }

  let searchTerm = "";
  let searchResults = clients;

  function handleSearch() {
    const lowerCaseTerm = searchTerm.toLowerCase();
    searchResults = clients.filter((client) =>
      client.nid.toLowerCase().includes(lowerCaseTerm)
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
      <div
        style="background-color: #f0f0f0; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; margin-bottom: 20px"
      >
        <p class="title-info" style="margin: 5px 0">Listado de clientes</p>
      </div>
      <!-- <div>
          <input type="text" bind:value={searchTerm} on:input={handleSearch} placeholder="Buscar" />
        </div> -->
      
      {#if api || clients.length === 0}
        <h2
          class="title-info"
          style="color: black; font-size: 20px; font-weight: 300"
        >
          No hay clientes registrados.
        </h2>
      {:else}
        <div style="text-align: end;">
          <button
            on:click={modal}
            type="button"
            class="button-icon col bi bi-plus-lg"
            style="background-color: #18cf5e; margin-bottom: 10px;"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Crear"
          />
        </div>
        <div class="text-center table-responsive">
          <table class="table table-striped border table-bordered align-middle">
            <thead class="align-middle">
              <tr>
                <th class="col-2">Nombre</th>
                <th class="col-2">Apellidos</th>
                <th class="col-2">N° de identificación</th>
                <th class="col-2">Correo electrónico</th>
                <th class="col-2">Puntos obtenidos</th>
                <th class="col-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {#each clients as item}
                <tr>
                  <td>{item.name}</td>
                  <td>{item.lastname}</td>
                  <td>{item.nid}</td>
                  <td>{item.email}</td>
                  <td>{item.point}</td>
                  <td>
                    <div
                      class="button-container display-flex justify-content-center align-items-center;"
                    >
                      <button
                        on:click={() => modalEdit(item.nid)}
                        type="button"
                        class="button-icon col bi bi-pencil-fill"
                        style=" background-color: #FBD24E; margin-right: 10px"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Editar"
                      />
                      <button
                        on:click={() =>
                          modal1(
                            item.nid,
                            item.name,
                            item.lastname,
                            item.email,
                            item.point
                          )}
                        type="button"
                        class="button-icon col bi bi-trash-fill"
                        style="background-color: red;"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Eliminar"
                      />
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>

        {#if clients.length > 5}
          <div class="pagination-container">
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
            <button class="close-button" on:click={modal1}>&times;</button>
          </div>
          <div class="container-modal">
            <h2>
              ¿Estas seguro de eliminar al cliente(a) {nameDelete}
              {lastnameDelete}?
            </h2>
            <div class="modal-button">
              <button
                class="button-confirm"
                on:click={() => deleteClient(nidDelete)}>Confirmar</button
              >
              <button class="button-confirm button-cancel" on:click={modal1}
                >Cancelar</button
              >
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
          <div class="container-modal">
            <form
              on:submit|preventDefault={() =>
                editClient(
                  selectedClient.name,
                  selectedClient.lastname,
                  selectedClient.nid,
                  selectedClient.email,
                  selectedClient.point
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
            <div class='modal-overlay'>
                <div class='modal-software w-50'>
                    <div style='text-align:right'>
                        <button class='close-button' on:click={modal2}>&times;</button>
                    </div>
                    <div class='container-modal'>
                        <h2>¿Estas seguro que deseas cerrar sesión?</h2>
                        <div class='modal-button'>
                            <button class='button-confirm' on:click={handleLogout}>Confirmar</button>
                            <button class='button-confirm button-cancel' on:click={modal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
            {/if}
  </main>
</body>
