<script>
    let showDropDown = false;
</script>

<button on:mouseenter={() => {showDropDown = true}}
     on:mouseleave={() => {showDropDown = false}} 
     class="bg-gray-400 relative text-white px-2 rounded-xl">
    ?
    {#if showDropDown}
    <div class="absolute left-5 z-10 mt-2 w-72 origin-top-right 
    rounded bg-white shadow-lg ring-1 ring-black/5 focus:outline-none" 
    role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
      <div class=" text-left p-2" role="none">
        <span class="text-gray-600 text-xs">This is an expense tracker app made using 
            <strong>Svelte, Tailwind for Frontend</strong>, and, 
            <strong>Mongoose</strong> along with 
            <strong>Node JS and MongoDB for Backend</strong>. 
            This project is to test my skills in the above mentioned technologies. 
            I have tried to <strong>implement conditional rendering, implemented component 
            communication</strong> along with <strong>tailwind configuration</strong>.
            </span>
      </div>
    </div>
{/if}
</button>