<script>
  import { slide } from "svelte/transition";
  export let transaction;
  export let removeTransaction;

  const formatAMPM = (date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
  } 

  const formatDate = (dateString) => {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let date = new Date(dateString);
    let formattedDate = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()
    let formattedTime = formatAMPM(date);
    return formattedDate + " " + formattedTime;
  }
</script>

<div
  class="p-4 relative mb-2 rounded hover:shadow-md delay-75 {transaction.value > 0
    ? 'bg-green-100 text-green-800'
    : 'bg-red-100 text-red-800'}"
  transition:slide={{ duration: 500 }}
>
  <div class="flex justify-between items-center">
    <div class="flex flex-col">
      <span class="text-lg font-semibold">{transaction.value}</span>
      <span class="text-xs text-gray-400"
        >
         { formatDate(transaction.date) }
        </span
      >
    </div>
    <button
      class="text-gray-500 hover:text-red-500 focus:outline-none"
      on:click={() => removeTransaction(transaction._id)}
    >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>    
    </button>
  </div>
</div>
