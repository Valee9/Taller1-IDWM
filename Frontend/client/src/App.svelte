<script>
  import { Router, Route } from "svelte-routing";
  import Home from "./components/Home.svelte";
  import Login from "./components/Login.svelte";

  const token = sessionStorage.getItem("jwtToken");

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
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
  console.log(token)
</script>

<Router>
  <Route path="/" component={Login} />
  {#if token}
    <Route path="/home" component={Home} />
  {/if}
</Router>
