<script>
  import { onMount } from 'svelte';
  import { notifications } from './lib/stores.js';
  import Login from './components/Login.svelte';
  import Dashboard from './components/Dashboard.svelte';
  import EmployeeManagement from './components/EmployeeManagement.svelte';
  import ProductManagement from './components/ProductManagement.svelte';
  import StockManagement from './components/StockManagement.svelte';
  import Analytics from './components/Analytics.svelte';
  import Sidebar from './components/Sidebar.svelte';
  import Header from './components/Header.svelte';

  let isAuthenticated = $state(false);
  let currentPage = $state('dashboard');
  let user = { name: 'Admin User', role: 'Owner' };
  let sidebarOpen = $state(false);

  function handleLogin(credentials) {
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      alert('Invalid credentials. Use admin/admin123');
    }
  }

  function handleLogout() {
    isAuthenticated = false;
    currentPage = 'dashboard';
    sidebarOpen = false;
    localStorage.removeItem('isAuthenticated');
  }

  function changePage(page) {
    currentPage = page;
    sidebarOpen = false; // Close sidebar on mobile after navigation
  }

  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }

  function handleNotificationClick(notification) {
    if (notification.page) {
      changePage(notification.page);
    }
  }

  onMount(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      isAuthenticated = true;
    }
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-purple-25 to-pink-25">
  {#if !isAuthenticated}
    <Login {handleLogin} />
  {:else}
    <div class="flex h-screen relative">
      <!-- Mobile Sidebar Overlay -->
      {#if sidebarOpen}
        <div 
          class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          role="button"
          tabindex="0"
          aria-label="Close sidebar"
          onclick={() => sidebarOpen = false}
          onkeydown={(e) => e.key === 'Enter' && (sidebarOpen = false)}
        ></div>
      {/if}
      
      <!-- Sidebar -->
      <div class="
        {sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 
        fixed lg:static 
        inset-y-0 left-0 
        z-50 lg:z-auto
        transition-transform duration-300 ease-in-out
      ">
        <Sidebar {currentPage} {changePage} />
      </div>
      
      <!-- Main Content -->
      <div class="flex-1 flex flex-col overflow-hidden w-full lg:w-auto">
        <Header {user} {handleLogout} {handleNotificationClick} {toggleSidebar} />
        <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-purple-25 to-pink-25 p-3 sm:p-6">
          {#if currentPage === 'dashboard'}
            <Dashboard />
          {:else if currentPage === 'employees'}
            <EmployeeManagement />
          {:else if currentPage === 'products'}
            <ProductManagement />
          {:else if currentPage === 'stock'}
            <StockManagement />
          {:else if currentPage === 'analytics'}
            <Analytics />
          {/if}
        </main>
      </div>
    </div>
  {/if}
</div>
