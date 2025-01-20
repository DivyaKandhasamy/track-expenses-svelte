<script>
    import { loginSucess, userDetails } from "../stores";
    import { Link, navigate } from 'svelte-routing';
    import axios from "axios";
    import {tick } from "svelte";

    let loginDetails = {
      email: "",
      password: ""
    };

    let alertDetails = $state({
      msg: '',
      type: ''
    });

    let errors = $state({
      email: "",
      password: ""
    });

    $effect.pre(() => {
		tick().then(() => {
      if($loginSucess){
        navigate('/')
      }
		});
	});
    
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;


    const formSubmit = async (event) => {
      event.preventDefault();

      errors = {
        email: "",
        password: ""
      };

      if (!loginDetails.email) {
        errors.email = "Email is required";
      } else if (!emailRegex.test(loginDetails.email)) {
        errors.email = "Enter a valid email address";
      }

      if (!loginDetails.password) {
        errors.password = "Password is required";
      } else if (!passwordRegex.test(loginDetails.password)) {
        errors.password = "Password must contain at least 8 characters";
      }

      if (!errors.email && !errors.password) {
        try {
          const {data} = await axios.post("https://track-expense-svelte.vercel.app/api/user/login", loginDetails);
            if(data.result == 'success'){
              $loginSucess = true;
              $userDetails = data.user;
              navigate("/");
          }else{
            $loginSucess = false;
            $userDetails = data.user;
            alertDetails = {
              msg: data.message,
              type: data.result
            };
            console.log(alertDetails);
          }
      }
      catch (error) {
          $loginSucess = false;
          $userDetails = null;
          console.log(error);
        }
        }
      }
</script>

<div class="pt-20">
  <div class="max-w-md mx-auto p-4">
    <h1 class="text-2xl grow-[2] text-center font-bold mb-5">Welcome</h1>
    <form onsubmit={formSubmit}>
      <div class="flex flex-col items-center">
        <div class="mb-3">
          <label for="mail">E-mail:</label><br />
          <input id="mail" bind:value={loginDetails.email} type="email" class={`flex-1 h-9 w-64 px-3 text-sm border rounded focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
          {#if errors.email}
            <p class="text-red-500 text-xs mt-1">{errors.email}</p>
          {/if}
        </div>

        <div class="mb-3">
          <label for="pass">Password:</label><br />
          <input id="pass" bind:value={loginDetails.password} type="password" class={`flex-1 h-9 w-64 px-3 text-sm border rounded focus:outline-none ${errors.password ? 'border-red-500' : 'border-gray-300'}`} />
          {#if errors.password}
            <p class="text-red-500 text-xs mt-1">{errors.password}</p>
          {/if}
        </div>

        <div class="mt-4">
          <button type="submit" class="h-10 px-16 text-white bg-blue-950 rounded cursor-pointer">
            Login
          </button>
        </div>

        <p class="mt-9 text-sm ml-7">
          Don't have an account yet? <span class="text-blue-600"><Link to="/register">Create an account</Link></span>
        </p>
      </div>
    </form>
  </div>
</div>