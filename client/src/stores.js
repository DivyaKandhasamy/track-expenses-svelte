import { writable, derived } from 'svelte/store'

export const transactions = writable([])
export const sortedTransactions = derived(transactions, (value) => value.sort((a, b) => b.date - a.date))
export const balance = derived(transactions, (value) => value.reduce((acc, t) => acc + t.value, 0))
export const income = derived(transactions, (value) => value.filter((t) => t.value > 0).reduce((acc, t) => acc + t.value, 0))
export const expenses = derived(transactions, (value) =>
    value.filter((t) => t.value < 0).reduce((acc, t) => acc + t.value, 0)
)

// Writable store for login success, persists state in sessionStorage
export const loginSucess = writable(
    // Load login status from sessionStorage
    sessionStorage.getItem('loginSuccess') === 'true'
  );
  
  // Writable store for user details, persists state in sessionStorage
  export const userDetails = writable(
    // Load user details from sessionStorage
    JSON.parse(sessionStorage.getItem('userDetails'))
  );
  
  // Subscribe to loginSucess and save changes to sessionStorage
  loginSucess.subscribe((value) => {
    sessionStorage.setItem('loginSuccess', JSON.stringify(value));
  });
  
  // Subscribe to userDetails and save changes to sessionStorage
  userDetails.subscribe((value) => {
    sessionStorage.setItem('userDetails', JSON.stringify(value));
  });