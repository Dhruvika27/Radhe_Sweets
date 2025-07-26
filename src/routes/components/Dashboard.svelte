<script>
  import { employeeStats, productStats } from '../lib/stores.js';

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  }
</script>

<div class="space-y-4 sm:space-y-6">
  <div class="flex items-center space-x-3 sm:space-x-4">
    <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center logo-3d-container-medium">
      <span class="logo-3d-medium text-xl sm:text-2xl font-bold text-white font-serif italic">R</span>
    </div>
    <div class="min-w-0 flex-1">
      <h1 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        <span class="hidden sm:inline">Radhe Sweet </span>Dashboard
      </h1>
      <p class="text-sm sm:text-base text-gray-600">Overview of your sweet shop operations</p>
    </div>
  </div>

  <!-- Stats Cards -->
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
    <div class="bg-white rounded-lg shadow-md border border-purple-100 p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div class="mb-2 sm:mb-0">
          <p class="text-xs sm:text-sm font-medium text-gray-600">Total Employees</p>
          <p class="text-xl sm:text-2xl font-bold text-gray-900">{$employeeStats.total}</p>
          <p class="text-xs text-gray-500 mt-1 hidden sm:block">Active team members</p>
        </div>
        <div class="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center self-end sm:self-auto">
          <span class="text-lg sm:text-2xl">👥</span>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md border border-purple-100 p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div class="mb-2 sm:mb-0">
          <p class="text-xs sm:text-sm font-medium text-gray-600">Total Products</p>
          <p class="text-xl sm:text-2xl font-bold text-gray-900">{$productStats.total}</p>
          <p class="text-xs text-gray-500 mt-1 hidden sm:block">Available varieties</p>
        </div>
        <div class="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-green-100 to-purple-100 rounded-lg flex items-center justify-center logo-3d-container-card self-end sm:self-auto">
          <span class="logo-3d-card text-sm sm:text-xl font-bold text-purple-600 font-serif italic">R</span>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md border border-purple-100 p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div class="mb-2 sm:mb-0">
          <p class="text-xs sm:text-sm font-medium text-gray-600">Monthly Sales</p>
          <p class="text-lg sm:text-2xl font-bold text-gray-900">₹2,45,000</p>
          <p class="text-xs text-gray-500 mt-1 hidden sm:block">+12% from last month</p>
        </div>
        <div class="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg flex items-center justify-center self-end sm:self-auto">
          <span class="text-lg sm:text-2xl">💰</span>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md border border-purple-100 p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div class="mb-2 sm:mb-0">
          <p class="text-xs sm:text-sm font-medium text-gray-600">Low Stock Items</p>
          <p class="text-xl sm:text-2xl font-bold text-gray-900">{$productStats.lowStock + $productStats.outOfStock}</p>
          <p class="text-xs text-gray-500 mt-1 hidden sm:block">Need immediate attention</p>
        </div>
        <div class="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-red-100 to-pink-100 rounded-lg flex items-center justify-center self-end sm:self-auto">
          <span class="text-lg sm:text-2xl">⚠️</span>
        </div>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
    <!-- Recent Employees -->
    <div class="bg-white rounded-lg shadow-md border border-purple-100 hover:shadow-lg transition-shadow">
      <div class="p-4 sm:p-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
        <h3 class="text-base sm:text-lg font-semibold text-gray-900">Recent Employees</h3>
        <p class="text-sm sm:text-base text-gray-600">Latest additions to your team</p>
      </div>
      <div class="p-4 sm:p-6">
        <div class="space-y-3 sm:space-y-4">
          {#each $employeeStats.recent as employee}
            <div class="flex items-center justify-between p-3 bg-gradient-to-r from-purple-25 to-pink-25 rounded-lg border border-purple-100">
              <div class="min-w-0 flex-1">
                <p class="font-medium text-gray-900 text-sm sm:text-base truncate">{employee.name}</p>
                <p class="text-xs sm:text-sm text-purple-600">{employee.role}</p>
              </div>
              <div class="text-right ml-2">
                <p class="text-xs sm:text-sm font-medium text-gray-900">{employee.workingDays} days</p>
                <p class="text-xs text-gray-500">Working</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- Low Stock Alert -->
    <div class="bg-white rounded-lg shadow-md border border-purple-100 hover:shadow-lg transition-shadow">
      <div class="p-4 sm:p-6 border-b border-purple-100 bg-gradient-to-r from-red-50 to-pink-50">
        <h3 class="text-base sm:text-lg font-semibold text-red-600">Low Stock Alert</h3>
        <p class="text-sm sm:text-base text-gray-600">Products that need restocking</p>
      </div>
      <div class="p-4 sm:p-6">
        <div class="space-y-3 sm:space-y-4">
          {#each $productStats.lowStockItems.slice(0, 3) as product}
            <div class="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
              <div class="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                <span class="logo-3d-inline text-base sm:text-lg font-bold text-purple-600 font-serif italic flex-shrink-0">R</span>
                <div class="min-w-0 flex-1">
                  <p class="font-medium text-gray-900 text-sm sm:text-base truncate">{product.name}</p>
                  <p class="text-xs sm:text-sm text-red-600">Current: {product.stock} pieces</p>
                </div>
              </div>
              <div class="text-right ml-2">
                <p class="text-xs sm:text-sm font-medium text-red-700">Min: {product.minStock}</p>
                <p class="text-xs text-red-500">Required</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- Employee Role Distribution -->
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
    <div class="bg-white rounded-lg shadow-md border border-purple-100 p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div class="text-center">
        <p class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-500 to-purple-500 bg-clip-text text-transparent">{$employeeStats.chefs}</p>
        <p class="text-sm text-gray-600">Chefs</p>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow-md border border-purple-100 p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div class="text-center">
        <p class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">{$employeeStats.cashiers}</p>
        <p class="text-sm text-gray-600">Cashiers</p>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow-md border border-purple-100 p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div class="text-center">
        <p class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-500 to-purple-500 bg-clip-text text-transparent">{$employeeStats.workers}</p>
        <p class="text-sm text-gray-600">Workers</p>
      </div>
    </div>
  </div>
</div>

<style>
  .logo-3d-container-medium {
    perspective: 800px;
    animation: containerSway 5s ease-in-out infinite;
  }

  .logo-3d-medium {
    transform-style: preserve-3d;
    animation: complexRotate 8s linear infinite;
    text-shadow: 
      0 1px 0 rgba(255,255,255,0.8),
      0 2px 0 rgba(255,255,255,0.6),
      0 3px 0 rgba(255,255,255,0.4),
      0 4px 8px rgba(0,0,0,0.3);
    position: relative;
  }

  .logo-3d-medium::before {
    content: 'R';
    position: absolute;
    top: 0;
    left: 0;
    transform: translateZ(-8px);
    color: rgba(147, 51, 234, 0.7);
    text-shadow: none;
  }

  .logo-3d-container-card {
    perspective: 400px;
  }

  .logo-3d-card {
    transform-style: preserve-3d;
    animation: cardFlip 4s ease-in-out infinite;
    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
    position: relative;
  }

  .logo-3d-card::before {
    content: 'R';
    position: absolute;
    top: 0;
    left: 0;
    transform: translateZ(-4px);
    color: rgba(147, 51, 234, 0.5);
    text-shadow: none;
  }

  .logo-3d-inline {
    display: inline-block;
    transform-style: preserve-3d;
    animation: inlineWobble 2s ease-in-out infinite;
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
  }

  @keyframes complexRotate {
    0% { transform: rotateY(0deg) rotateX(0deg) rotateZ(0deg); }
    33% { transform: rotateY(120deg) rotateX(20deg) rotateZ(10deg); }
    66% { transform: rotateY(240deg) rotateX(-20deg) rotateZ(-10deg); }
    100% { transform: rotateY(360deg) rotateX(0deg) rotateZ(0deg); }
  }

  @keyframes containerSway {
    0%, 100% { transform: rotateZ(0deg); }
    25% { transform: rotateZ(2deg); }
    75% { transform: rotateZ(-2deg); }
  }

  @keyframes cardFlip {
    0%, 100% { transform: rotateY(0deg); }
    50% { transform: rotateY(180deg); }
  }

  @keyframes inlineWobble {
    0%, 100% { transform: rotateZ(0deg); }
    25% { transform: rotateZ(5deg); }
    75% { transform: rotateZ(-5deg); }
  }

  .logo-3d-container-medium:hover .logo-3d-medium {
    animation-duration: 3s;
  }

  .logo-3d-container-card:hover .logo-3d-card {
    animation-duration: 1s;
  }

  /* Mobile optimizations */
  @media (max-width: 640px) {
    .logo-3d-container-medium {
      animation-duration: 8s; /* Slower on mobile */
    }
    
    .logo-3d-medium {
      animation-duration: 12s; /* Slower on mobile */
    }
    
    .logo-3d-card {
      animation-duration: 6s; /* Slower on mobile */
    }
    
    .logo-3d-inline {
      animation-duration: 3s; /* Slower on mobile */
    }
  }
</style>
