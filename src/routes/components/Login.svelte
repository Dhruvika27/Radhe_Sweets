<script>
  let { handleLogin } = $props();
  
  let username = $state('');
  let password = $state('');
  let isLoading = $state(false);

  function onSubmit(e) {
    e.preventDefault();
    isLoading = true;
    
    setTimeout(() => {
      handleLogin({ username, password });
      isLoading = false;
    }, 1000);
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 p-4">
  <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
    <div class="text-center mb-8">
      <div class="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 logo-3d-container">
        <span class="logo-3d text-3xl font-bold text-white font-serif italic">R</span>
      </div>
      <h1 class="text-2xl font-bold text-gray-900">Radhe Sweet</h1>
      <p class="text-gray-600">Admin Panel - Sign in to manage your sweet shop</p>
    </div>
    
    <form onsubmit={onSubmit} class="space-y-4">
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
        <input
          id="username"
          type="text"
          bind:value={username}
          placeholder="Enter username"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />
      </div>
      
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          id="password"
          type="password"
          bind:value={password}
          placeholder="Enter password"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        class="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
    
    <div class="mt-6 p-4 bg-purple-50 rounded-lg">
      <p class="text-sm text-purple-700">
        <strong>Demo Credentials:</strong><br>
        Username: admin<br>
        Password: admin123
      </p>
    </div>
  </div>
</div>

<style>
  .logo-3d-container {
    perspective: 1000px;
    animation: containerFloat 4s ease-in-out infinite;
  }

  .logo-3d {
    transform-style: preserve-3d;
    animation: rotate3d 6s linear infinite;
    text-shadow: 
      0 1px 0 rgba(255,255,255,0.8),
      0 2px 0 rgba(255,255,255,0.6),
      0 3px 0 rgba(255,255,255,0.4),
      0 4px 0 rgba(255,255,255,0.2),
      0 5px 10px rgba(0,0,0,0.3);
    position: relative;
  }

  .logo-3d::before {
    content: 'R';
    position: absolute;
    top: 0;
    left: 0;
    transform: translateZ(-10px);
    color: rgba(147, 51, 234, 0.8);
    text-shadow: none;
  }

  .logo-3d::after {
    content: 'R';
    position: absolute;
    top: 0;
    left: 0;
    transform: translateZ(-20px);
    color: rgba(147, 51, 234, 0.6);
    text-shadow: none;
  }

  @keyframes rotate3d {
    0% { transform: rotateY(0deg) rotateX(0deg); }
    25% { transform: rotateY(90deg) rotateX(15deg); }
    50% { transform: rotateY(180deg) rotateX(0deg); }
    75% { transform: rotateY(270deg) rotateX(-15deg); }
    100% { transform: rotateY(360deg) rotateX(0deg); }
  }

  @keyframes containerFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
  }

  .logo-3d-container:hover .logo-3d {
    animation-duration: 2s;
  }
</style>
