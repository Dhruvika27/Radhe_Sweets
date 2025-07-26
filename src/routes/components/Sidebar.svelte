<script>
  let { currentPage, changePage } = $props();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠', shortLabel: 'Home' },
    { id: 'employees', label: 'Employee Management', icon: '👥', shortLabel: 'Staff' },
    { id: 'products', label: 'Product Management', icon: '📦', shortLabel: 'Products' },
    { id: 'stock', label: 'Stock Management', icon: '📊', shortLabel: 'Stock' },
    { id: 'analytics', label: 'Analytics', icon: '📈', shortLabel: 'Reports' }
  ];

  function handleClick(itemId) {
    changePage(itemId);
  }
</script>

<div class="bg-white w-64 shadow-lg flex flex-col border-r border-purple-100 h-full">
  <div class="p-4 sm:p-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
    <div class="flex items-center space-x-3">
      <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center logo-3d-container-small">
        <span class="logo-3d-small text-lg sm:text-xl font-bold text-white font-serif italic">R</span>
      </div>
      <div class="min-w-0 flex-1">
        <h1 class="text-lg sm:text-xl font-bold text-gray-900 truncate">Radhe Sweet</h1>
        <p class="text-xs sm:text-sm text-purple-600">Management System</p>
      </div>
    </div>
  </div>
  
  <nav class="flex-1 p-2 sm:p-4 overflow-y-auto">
    <ul class="space-y-1 sm:space-y-2">
      {#each menuItems as item}
        <li>
          <button
            onclick={() => handleClick(item.id)}
            class="w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-left transition-all duration-200 {currentPage === item.id ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-r-4 border-purple-500 shadow-sm' : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'}"
          >
            <span class="text-base sm:text-lg flex-shrink-0">{item.icon}</span>
            <span class="font-medium text-sm sm:text-base truncate">
              <span class="sm:hidden">{item.shortLabel}</span>
              <span class="hidden sm:inline">{item.label}</span>
            </span>
          </button>
        </li>
      {/each}
    </ul>
  </nav>
</div>

<style>
  .logo-3d-container-small {
    perspective: 500px;
    animation: containerPulse 3s ease-in-out infinite;
  }

  .logo-3d-small {
    transform-style: preserve-3d;
    animation: rotateY 4s linear infinite;
    text-shadow: 
      0 1px 0 rgba(255,255,255,0.8),
      0 2px 0 rgba(255,255,255,0.6),
      0 3px 5px rgba(0,0,0,0.2);
    position: relative;
  }

  .logo-3d-small::before {
    content: 'R';
    position: absolute;
    top: 0;
    left: 0;
    transform: translateZ(-5px);
    color: rgba(147, 51, 234, 0.7);
    text-shadow: none;
  }

  @keyframes rotateY {
    0% { transform: rotateY(0deg); }
    100% { transform: rotateY(360deg); }
  }

  @keyframes containerPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  .logo-3d-container-small:hover .logo-3d-small {
    animation-duration: 1s;
  }

  /* Mobile optimizations */
  @media (max-width: 640px) {
    .logo-3d-container-small {
      animation-duration: 5s; /* Slower on mobile */
    }
    
    .logo-3d-small {
      animation-duration: 8s; /* Slower on mobile */
    }
  }
</style>
