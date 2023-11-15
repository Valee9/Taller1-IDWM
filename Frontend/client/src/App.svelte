<script>
  import { Router, Route } from "svelte-routing";
  import Home from "./components/Home.svelte";
  import Login from "./components/Login.svelte";

  const token = sessionStorage.getItem("jwtToken");
  let iat = getTokenByIat(token);

  function getTokenByIat(token) {
    if (!token) {
      return null;
    }
    const decodedToken = decodeToken(token);
    if (!decodedToken || !decodedToken.iat) {
      return null;
    }

    return decodedToken.iat;
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
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
  console.log(iat)
</script>

<Router>
  <Route path="/" component={Login} />
  {#if iat != 0}
    <Route path="/home" component={Home} />
  {/if}
</Router>
