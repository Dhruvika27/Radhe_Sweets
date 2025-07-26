<script>
  import { notifications, notificationActions } from '../lib/stores.js';

  let { user, handleLogout, handleNotificationClick, toggleSidebar } = $props();
  let showNotifications = $state(false);

  function toggleNotifications() {
    showNotifications = !showNotifications;
  }

  function getNotificationColor(type) {
    switch (type) {
      case 'error': return 'text-red-600';
      case 'warning': return 'text-amber-600';
      case 'info': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  }

  function onNotificationClick(notification) {
    handleNotificationClick(notification);
    showNotifications = false;
  }

  function removeNotification(notificationId, event) {
    event.stopPropagation();
    notificationActions.remove(notificationId);
  }
</script>

<header class="bg-white shadow-sm border-b border-purple-100 px-3 sm:px-6 py-4">
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-2 sm:space-x-4">
      <!-- Mobile Menu Button -->
      <button
        onclick={toggleSidebar}
        class="lg:hidden p-2 rounded-md text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors"
        aria-label="Toggle Sidebar"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      
      <div class="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center logo-3d-container-mini">
        <span class="logo-3d-mini text-xs sm:text-sm font-bold text-white font-serif italic">R</span>
      </div>
      <div class="min-w-0 flex-1">
        <h2 class="text-lg sm:text-2xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent truncate">
          <span class="hidden sm:inline">Welcome to </span>Radhe Sweet
        </h2>
        <p class="text-xs sm:text-sm text-gray-600 hidden sm:block">Manage your sweet shop efficiently</p>
      </div>
    </div>
    
    <div class="flex items-center space-x-2 sm:space-x-4">
      <div class="relative">
        <button
          onclick={toggleNotifications}
          class="relative p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
          aria-label="Toggle Notifications"
        >
          <span class="text-lg sm:text-xl">🔔</span>
          {#if $notifications.length > 0}
            <span class="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
              {$notifications.length}
            </span>
          {/if}
        </button>
        
        {#if showNotifications}
          <div class="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-lg border border-purple-100 z-50" role="dialog" aria-modal="true">
            <div class="p-4 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
              <h3 class="font-semibold text-gray-900">Notifications</h3>
            </div>
            <div class="max-h-64 overflow-y-auto">
              {#if $notifications.length === 0}
                <div class="p-4 text-center text-gray-500">
                  No notifications
                </div>
              {:else}
                {#each $notifications as notification}
                  <div 
                    class="p-3 border-b border-purple-50 hover:bg-purple-25 cursor-pointer flex justify-between items-start"
                    onclick={() => onNotificationClick(notification)}
                    role="button"
                    tabindex="0"
                    onkeydown={(e) => { if (e.key === 'Enter') onNotificationClick(notification); }}
                  >
                    <div class="flex-1 min-w-0">
                      <p class="text-sm {getNotificationColor(notification.type)} break-words">{notification.message}</p>
                      <p class="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                    <button
                      onclick={(e) => removeNotification(notification.id, e)}
                      class="text-gray-400 hover:text-gray-600 ml-2 flex-shrink-0"
                      aria-label="Remove Notification"
                    >
                      ✕
                    </button>
                  </div>
                {/each}
              {/if}
            </div>
          </div>
        {/if}
      </div>
      
      <div class="flex items-center space-x-2 sm:space-x-3">
        <div class="text-right hidden sm:block">
          <p class="text-sm font-medium text-gray-900">{user.name}</p>
          <p class="text-xs text-purple-600">{user.role}</p>
        </div>
        <button
          onclick={handleLogout}
          class="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 border border-purple-200 rounded-md text-gray-700 hover:bg-purple-50 hover:border-purple-300 transition-colors"
          aria-label="Logout"
        >
          <span class="text-sm sm:text-base">🚪</span>
          <span class="text-xs sm:text-sm">Logout</span>
        </button>
      </div>
    </div>
  </div>
</header>

<style>
  .logo-3d-container-mini {
    perspective: 300px;
    animation: containerBounce 2s ease-in-out infinite;
  }

  .logo-3d-mini {
    transform-style: preserve-3d;
    animation: tiltRotate 3s ease-in-out infinite;
    text-shadow: 
      0 1px 0 rgba(255,255,255,0.8),
      0 2px 3px rgba(0,0,0,0.2);
    position: relative;
  }

  .logo-3d-mini::before {
    content: 'R';
    position: absolute;
    top: 0;
    left: 0;
    transform: translateZ(-3px);
    color: rgba(147, 51, 234, 0.6);
    text-shadow: none;
  }

  @keyframes tiltRotate {
    0%, 100% { transform: rotateX(0deg) rotateY(0deg); }
    25% { transform: rotateX(15deg) rotateY(15deg); }
    50% { transform: rotateX(0deg) rotateY(30deg); }
    75% { transform: rotateX(-15deg) rotateY(15deg); }
  }

  @keyframes containerBounce {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-2px); }
  }

  .logo-3d-container-mini:hover .logo-3d-mini {
    animation-duration: 1s;
  }

  /* Mobile optimizations */
  @media (max-width: 640px) {
    .logo-3d-container-mini {
      animation-duration: 4s; /* Slower on mobile for better performance */
    }
    
    .logo-3d-mini {
      animation-duration: 6s; /* Slower on mobile */
    }
  }
</style>
