<script>
    /**
     * Importación del método `auth` para gestionar el token de autenticación,
     * del logo de la empresa y de la imagen de una persona.
     */
    import { auth } from "../stores/Auth";
    import dumbo from "../assets/Dumbo.png";
    import loginPerson from "../assets/Login.png";

    /**
     * Declaración e inicialización de las variables de los campos de inicio de sesión.
     */
    let user = "";
    let password = "";
    let rutError = true;
    let passwordError = true;
    let isOpen = false;

    /**
     * Maneja el cambio en el campo de rut del formulario y si tiene algún error.
     * @function handleChangeRut
     * @param e evento de cambio en el campo de rut.
     */
    function handleChangeRut(e) {
        if (e.key === " ") {
            e.preventDefault();
        } else {
            user = e.target.value;
            rutError = user.trim() === "";
        }
    }
    /**
     * Maneja el cambio en el campo de rut del formulario y si tiene algún error.
     * @function handleChangePassword
     * @param e evento de cambio en el campo de contraseña.
     */
    function handleChangePassword(e) {
        if (e.key === " ") {
            e.preventDefault();
        } else {
            password = e.target.value;
            passwordError = password.trim() === "";
        }
    }

    // Token de autenticación almacenado en la sesión del navegador.
    let token = sessionStorage.getItem("jwtToken");
    /**
     * Realiza una solicitud asíncrona al servidor para autenticar al usuario con las credenciales proporcionadas.
     * Actualiza el token de autenticación si la solicitud es exitosa y redirige al usuario a la página de inicio.
     * Muestra un mensaje de error si la autenticación falla.
     * @async
     * @function login
     */
    async function login() {
        // Construye el objeto de datos para la solicitud POST
        const data = {
            user,
            password,
        };
        console.log(data);
        // Realiza una solicitud POST al servidor
        const response = await fetch(
            `${import.meta.env.VITE_BASE_API_URL}/auth/login/admin`,
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
            token = await response.text();
            console.log(token);
            auth.setToken(token);
            // Redirige a la página de home
            const homeURL = "/home";
            window.history.replaceState({}, document.title, homeURL);
            window.location.href = homeURL;
        } else {
            const errorResponse = await response.text();
            console.log("Error en la respuesta del servidor:", errorResponse);
            // Abre un modal de error y lo cierra después de un tiempo
            isOpen = !isOpen;
            setTimeout(() => {
                isOpen = !isOpen;
            }, 1500);
        }
    }
</script>

<body>
    <div class="container align-items-center">
        <div class="row justify-content-center align-items-center">
            <div class="login col-md-7">
                <p class="title-info">Inicio de sesión</p>
                <form class="form-login" on:submit|preventDefault={login}>
                    <div class="label-input w-75">
                        <p
                            id="username-required"
                            style="color: red; margin-top:10px"
                        >
                            * Campo requerido
                        </p>
                        <label for="username">Usuario *</label>
                        <input
                            class="input-login"
                            on:input={handleChangeRut}
                            type="text"
                            id="user"
                            placeholder="RUT o DNI"
                        />
                        {#if rutError}
                            <div>
                                <p class="message-empty-text">
                                    Rellena este campo
                                </p>
                            </div>
                        {/if}
                    </div>
                    <div class="label-input w-75">
                        <label for="password">Contraseña *</label>
                        <input
                            class="input-login"
                            on:input={handleChangePassword}
                            type="password"
                            id="password"
                            placeholder="*********"
                        />
                        {#if passwordError}
                            <div>
                                <p class="message-empty-text">
                                    Rellena este campo
                                </p>
                            </div>
                        {/if}
                    </div>
                    <button
                        class="button-confirm"
                        type="submit"
                        disabled={rutError || passwordError}>Ingresar</button
                    >
                </form>
                <div class="image">
                    <img src={dumbo} width="70px" alt="dumbo" />
                </div>
            </div>
            <div class="col-md-4">
                <img src={loginPerson} alt="dumbo" />
            </div>
        </div>
        {#if isOpen}
            <div class="modal-overlay">
                <div class="modal-software w-50">
                    <div class="container-modal">
                        <h4>El usuario y/o la contraseña son incorrectas</h4>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</body>
