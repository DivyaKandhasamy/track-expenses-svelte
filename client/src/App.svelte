<script>
  import axios from "axios";
  import './app.css';
  import Register from "./pages/Register.svelte";
  import Login from "./pages/Login.svelte";
  import Tracker from "./pages/Tracker.svelte";
  import { Router, Route, Link } from 'svelte-routing';


</script>
<Router>
  <Route path="/" component="{Tracker}" />
  <Route path="/login" component="{Login}" />
  <Route path="/register" component="{Register}" />
</Router>
