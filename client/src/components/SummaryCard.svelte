<script>
  export let value = 0;
  export let mode = "balance";

  $: label = mode.toUpperCase();
  $: cssClass = getCssClass(mode);

  function getCssClass(mode) {
    switch (mode) {
      case "balance":
        return "bg-blue-100 text-blue-800";
      case "income":
        return "bg-green-100 text-green-800";
      case "expenses":
        return "bg-red-100 text-red-800";
    }
  }
</script>

<div class="p-4 rounded hover:shadow-md delay-75 {cssClass} text-center">
  {label} :
  <strong>{value}</strong>
</div>