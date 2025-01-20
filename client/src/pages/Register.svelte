<script>
    import { Link, navigate } from 'svelte-routing';
    import axios from "axios";
    import { loginSucess, userDetails } from "../stores";
    import {tick } from "svelte";
      let userDetail = {
        name: "",
        email: "",
        password: ""
      };
    
      let errors = $state({
        name: "",
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
    
       async function formSubmit(event){
        event.preventDefault();
    
        // Reset errors
        errors = {
          name: "",
          email: "",
          password: ""
        };
    
        // Name validation
        if (!userDetail.name) {
          errors.name = "Name is required";
        }
    
        // Email validation
        if (!userDetail.email) {
          errors.email = "Email is required";
        } else if (!emailRegex.test(userDetail.email)) {
          errors.email = "Enter a valid email address";
        }
    
        // Password validation
        if (!userDetail.password) {
          errors.password = "Password is required";
        } else if (!passwordRegex.test(userDetail.password)) {
          errors.password = "Password must contains at least 8 characters";
        }
    
        if (!errors.name && !errors.email && !errors.password) {
          const {data} = await axios.post("https://track-expenses-svelte.vercel.app/api/user/register", userDetail);
          if(data.result == 'success'){
            $loginSucess = true;
            $userDetails = data.user;
            navigate("/");
        }else{
          $loginSucess = false;
          $userDetails = null;
        }
        }
      };
    </script>
    
    <div class="pt-16">
      <div class="max-w-md mx-auto p-4 flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-24">
          <path d="M256 73.825a182.175 182.175 0 1 0 182.18 182.18A182.177 182.177 0 0 0 256 73.825zm0 71.833a55.05 55.05 0 1 1-55.054 55.046A55.046 55.046 0 0 1 256 145.658zm.52 208.723h-80.852c0-54.255 29.522-73.573 48.885-90.906a65.68 65.68 0 0 0 62.885 0c19.363 17.333 48.885 36.651 48.885 90.906z" data-name="Profile"/>
        </svg>
        <form onsubmit={formSubmit}>
          <div class="flex flex-col items-center">
            <div class="mb-3">
              <label for="name">Name:</label><br/>
              <input id="name" bind:value={userDetail.name} type="text" class={`flex-1 h-9 w-64 px-3 text-sm  border rounded focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`} />
              {#if errors.name}
                <p class="text-red-500 text-xs mt-1">{errors.name}</p>
              {/if}
            </div>
    
            <div class="mb-3">
              <label for="mail">E-mail:</label><br/>
              <input id="mail" bind:value={userDetail.email} type="email" class={ `flex-1 h-9 w-64 px-3 text-sm border rounded focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300' }`} />
              {#if errors.email}
                <p class="text-red-500 text-xs mt-1">{errors.email}</p>
              {/if}
            </div>
    
            <div class="mb-3">
              <label for="pass">Password:</label><br/>
              <input id="pass" bind:value={userDetail.password} type="password" class={`flex-1 h-9 w-64 px-3 text-sm border rounded focus:outline-none ${errors.password ? 'border-red-500' : 'border-gray-300'}`} />
              {#if errors.password}
                <p class="text-red-500 text-xs mt-1">{errors.password}</p>
              {/if}
            </div>
    
            <div class="mt-4">
              <button type="submit" class="h-10 px-16 text-white bg-blue-950 rounded cursor-pointer">
                Create Account
              </button>
            </div>
            <p class="mt-9 text-sm ml-7">
              Already have an account? <span class="text-blue-600"><Link to="/login">Login</Link></span>
            </p>
          </div>
        </form>
      </div>
    </div>