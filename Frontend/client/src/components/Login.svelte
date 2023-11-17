<script>
    import { auth } from "../stores/Auth";
    import dumbo from "../assets/Dumbo.png";
    import loginPerson from "../assets/Login.png";

    let user = "";
    let password = "";
    let rutError = true;
    let passwordError = true;
    let isOpen = false;

    function handleChangeRut(e) {
        if (e.key === " ") {
            e.preventDefault();
        } else {
            user = e.target.value;
            rutError = user.trim() === "";
        }
    }
    function handleChangePassword(e) {
        if (e.key === " ") {
            e.preventDefault();
        } else {
            password = e.target.value;
            passwordError = password.trim() === "";
        }
    }

    let token = sessionStorage.getItem("jwtToken");
    async function login() {
        const data = {
            user,
            password,
        };
        console.log(data);

        const response = await fetch(
            `${import.meta.env.VITE_BASE_API_URL}/auth/login/admin`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        if (response.ok) {
            token = await response.text();
            console.log(token);
            auth.setToken(token);
            const decodedToken = decodeToken(token);

            console.log("Usuario:", decodedToken.iat);

            const homeURL = "/home";
            window.history.replaceState({}, document.title, homeURL);
            window.location.href = homeURL;
        } else {
            const errorResponse = await response.text();
            console.log("Error en la respuesta del servidor:", errorResponse);
            isOpen = !isOpen;
            setTimeout(() => {
                isOpen = !isOpen;
            }, 1500);
        }
    }

    let id = getTokenById(token);
    let rut = getTokenByRut(token);
    console.log(id);
    console.log(rut);

    function getTokenById(token) {
        if (!token) {
            return null;
        }

        const decodedToken = decodeToken(token);

        if (!decodedToken || !decodedToken.id) {
            return null;
        }
        return decodedToken.roles;
    }
    function getTokenByRut(token) {
        if (!token) {
            return null;
        }

        const decodedToken = decodeToken(token);

        if (!decodedToken || !decodedToken.roles) {
            return null;
        }
        return decodedToken.sub.replace(/[.-]/g, "");
    }

    function decodeToken(token) {
        if (!token) {
            return null;
        }
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(function (c) {
                    return (
                        "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                })
                .join("")
        );

        return JSON.parse(jsonPayload);
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
                        <h4>El usuario y/o la contraseña están incorrectas</h4>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</body>
