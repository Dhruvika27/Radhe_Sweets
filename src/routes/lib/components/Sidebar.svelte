<script>
  import { Home, Users, Package, BarChart3, TrendingUp } from 'lucide-svelte';

  let { currentPage, onPageChange } = $props();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'employees', label: 'Employee Management', icon: Users },
    { id: 'products', label: 'Product Management', icon: Package },
    { id: 'stock', label: 'Stock Management', icon: TrendingUp },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  function handleMenuClick(itemId) {
    onPageChange(itemId);
  }
</script>

<div class="bg-white w-64 shadow-lg flex flex-col">
  <div class="p-6 border-b">
    <div class="flex items-center space-x-3">
      <div class="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
        <span class="text-xl">🍬</span>
      </div>
      <div>
        <h1 class="text-xl font-bold text-gray-900">Sweet Shop</h1>
        <p class="text-sm text-gray-500">Management System</p>
      </div>
    </div>
  </div>
  
  <nav class="flex-1 p-4">
    <ul class="space-y-2">
      {#each menuItems as item}
        <li>
          <button
            onclick={() => handleMenuClick(item.id)}
            class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors {currentPage === item.id ? 'bg-orange-100 text-orange-700 border-r-2 border-orange-500' : 'text-gray-600 hover:bg-gray-100'}"
          >
            <item.icon class="w-5 h-5" />
            <span class="font-medium">{item.label}</span>
          </button>
        </li>
      {/each}
    </ul>
  </nav>
</div>
