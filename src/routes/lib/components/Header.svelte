<script>
  import { Button } from '$lib/components/ui/button';
  import { LogOut, Bell } from 'lucide-svelte';

  let { user, onLogout, notifications = [] } = $props();
  let showNotifications = $state(false);

  function toggleNotifications() {
    showNotifications = !showNotifications;
  }

  function getNotificationColor(type) {
    switch (type) {
      case 'error': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  }
</script>

<header class="bg-white shadow-sm border-b px-6 py-4">
  <div class="flex items-center justify-between">
    <div>
      <h2 class="text-2xl font-semibold text-gray-900">Welcome back, {user.name}</h2>
      <p class="text-gray-600">Manage your sweet shop efficiently</p>
    </div>
    
    <div class="flex items-center space-x-4">
      <div class="relative">
        <Button variant="ghost" size="icon" onclick={toggleNotifications}>
          <Bell class="w-5 h-5" />
          {#if notifications.length > 0}
            <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notifications.length}
            </span>
          {/if}
        </Button>
        
        {#if showNotifications}
          <div class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
            <div class="p-4 border-b">
              <h3 class="font-semibold text-gray-900">Notifications</h3>
            </div>
            <div class="max-h-64 overflow-y-auto">
              {#each notifications as notification}
                <div class="p-3 border-b hover:bg-gray-50">
                  <p class="text-sm {getNotificationColor(notification.type)}">{notification.message}</p>
                  <p class="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
      
      <div class="flex items-center space-x-3">
        <div class="text-right">
          <p class="text-sm font-medium text-gray-900">{user.name}</p>
          <p class="text-xs text-gray-500">{user.role}</p>
        </div>
        <Button variant="outline" onclick={onLogout} class="flex items-center space-x-2">
          <LogOut class="w-4 h-4" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  </div>
</header>
