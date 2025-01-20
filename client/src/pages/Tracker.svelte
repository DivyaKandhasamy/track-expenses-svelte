<script>
    import axios from "axios";
    import Transaction from "../components/Transaction.svelte";
    import SummaryCard from "../components/SummaryCard.svelte";
    import Loading from "../components/Loading.svelte";
    import Faq from "../components/FAQ.svelte";
    import { navigate } from 'svelte-routing';
    import { onMount } from "svelte";
    import {tick } from "svelte";
   
  
    import {
      transactions,
      sortedTransactions,
      income,
      expenses,
      balance,
      loginSucess,
      userDetails
    } from "../stores";
  
    let input = $state("");
    let typeOfTransaction = $state("+");
    let loading = $state(false);
    let disabled = $state(false);
    let showDropDown = $state(true);
    $effect(() => {
      disabled = !input;
      showDropDown = false;
    })
    onMount(async () => {
      loading = true;
      const { data } = await axios.get(`https://track-expenses-svelte.vercel.app/api/transactions/?id=${$userDetails._id}`);
      $transactions = data;
      loading = false;
    });

    $effect.pre(() => {
		tick().then(() => {
      if(!$loginSucess){
        navigate('/login')
      }
		});
	});
  
  
    const onTransactionTypeChange = (isCredited) =>{
      typeOfTransaction = isCredited ? "+" : "-";
      showDropDown = false;
    } 
  
    const showDropDownMenu = () =>{
      showDropDown = !showDropDown;
    }
  
    async function addTransaction() {
      loading = true;
      const transaction = {
        date: new Date().getTime(),
        value: typeOfTransaction === "+" ? input : input * -1,
        id: $userDetails._id
      };
      const response = await axios.post("https://track-expenses-svelte.vercel.app/api/transactions/", transaction);
      $transactions = [response.data, ...$transactions];
      loading = false;
      input = '';
    }
    async function removeTransaction(id) {
      loading = true;
      const response = await axios.delete("https://track-expenses-svelte.vercel.app/api/transactions/" + id);
      if (response.data.id === id) {
        $transactions = $transactions.filter(t => t._id !== id);
      }
      loading = false;
    }
  
    const handleEnter = (e) => {
      if(e.keyCode === 13){
        addTransaction();
      }
    }

    const logout = () => {
      $loginSucess = false;
      $userDetails = null;
      $transactions = [];
      navigate("/login");
    }
  
  
  </script>
  
  <div class="pt-10">
    <div class="max-w-md shadow-md mx-auto p-4 bg-white rounded-lg ">
      <div class="flex justify-between pb-4 items-center">
        <h1 class="text-2xl grow-[2] text-center font-bold">{$userDetails?.name}'s Expense Tracker</h1>
        <Faq/>
      </div>
      <div class="flex items-center mb-4">
        <div class="relative">
         <div class="relative inline-block text-left">
      <div>
        <button  onclick={()=>{showDropDownMenu()}} type="button" class="inline-flex w-full justify-center h-10  rounded-md rounded-tr-none rounded-br-none bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
         {typeOfTransaction}
          <svg class="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
            <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
     {#if showDropDown}
      <div class="absolute right-0 z-10 mt-2 w-22 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
        <div class="py-1" role="none">
          <button onclick={()=>{onTransactionTypeChange(true)}} class="mt-2 mb-2 block px-7 py-2 text-sm text-gray-700 hover:bg-gray-400" role="menuitem" tabindex="-1" id="menu-item-0">Credit</button>
          <button onclick={()=>{onTransactionTypeChange(false)}} class="mt-2 mb-2 block px-7 py-2 text-sm text-gray-700 hover:bg-gray-400" role="menuitem" tabindex="-1" id="menu-item-1">Debit</button>
        </div>
      </div>
      {/if}
    </div>
        </div>
        <input onkeypress={(e) => handleEnter(e)}
          class="flex-1 h-10 px-3 text-sm border border-gray-300  focus:outline-none"
          type="number"
          bind:value={input}
          placeholder="Enter your amount here" />
        <button 
          class="h-10 px-4 text-white bg-blue-950 rounded rounded-tl-none rounded-bl-none disabled:bg-gray-300 disabled:cursor-not-allowed"
          onclick={addTransaction} 
          {disabled}>
          Save
        </button>
      </div>
    
      {#if loading}
        <div class="flex justify-center">
          <Loading />
        </div>
      {/if}
    
      {#if $transactions.length > 0}
        <SummaryCard mode="balance" value={$balance} />
    
        <div class="grid grid-cols-2 gap-4 mt-4">
          <SummaryCard mode="income" value={$income} />
          <SummaryCard mode="expenses" value={$expenses} />
        </div>
    
        <hr class="my-4" />
      {:else if !loading}
        <div class="p-4 text-center text-gray-500 rounded">No transactions added</div>
      {/if}
      {#each $sortedTransactions as transaction (transaction._id)}
        <Transaction {transaction} {removeTransaction} />
      {/each}
      <button onclick={logout} class="bg-red-600 flex justify-self-center text-white px-5 py-2 rounded-md justify-self">Logout</button>
    </div>
  </div>