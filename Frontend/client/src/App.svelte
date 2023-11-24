<script>
  /**
   * Importación de las funciones para el enrutamiento de svelte,
   * del componente de la página de inicio y del login
  */
  import { Router, Route } from "svelte-routing";
  import Home from "./components/Home.svelte";
  import Login from "./components/Login.svelte";

  // Token de autenticación
  const token = sessionStorage.getItem("jwtToken");
  console.log(token)
</script>

<Router>
  <Route path="/" component={Login} />
  {#if token}
    <Route path="/home" component={Home} />
  {/if}
</Router>
