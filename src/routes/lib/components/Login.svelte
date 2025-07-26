<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';

  let { onLogin } = $props();

  let username = $state('');
  let password = $state('');
  let isLoading = $state(false);

  function handleSubmit(e) {
    e.preventDefault();
    isLoading = true;
    
    setTimeout(() => {
      onLogin({ username, password });
      isLoading = false;
    }, 1000);
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 p-4">
  <Card class="w-full max-w-md">
    <CardHeader class="text-center">
      <div class="mx-auto w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-4">
        <span class="text-2xl">🍬</span>
      </div>
      <CardTitle class="text-2xl font-bold text-gray-900">Sweet Shop Admin</CardTitle>
      <CardDescription>Sign in to manage your sweet shop</CardDescription>
    </CardHeader>
    <CardContent>
      <form onsubmit={handleSubmit} class="space-y-4">
        <div class="space-y-2">
          <Label for="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter username"
            bind:value={username}
            required
          />
        </div>
        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter password"
            bind:value={password}
            required
          />
        </div>
        <Button type="submit" class="w-full" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
      <div class="mt-4 p-3 bg-blue-50 rounded-lg">
        <p class="text-sm text-blue-700">
          <strong>Demo Credentials:</strong><br>
          Username: admin<br>
          Password: admin123
        </p>
      </div>
    </CardContent>
  </Card>
</div>
