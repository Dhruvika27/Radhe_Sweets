<script>
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Users, Package, TrendingUp, IndianRupee } from 'lucide-svelte';

  // Mock data
  const stats = [
    {
      title: 'Total Employees',
      value: '12',
      description: '2 new this month',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total Products',
      value: '45',
      description: '8 varieties available',
      icon: Package,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Monthly Sales',
      value: '₹2,45,000',
      description: '+12% from last month',
      icon: IndianRupee,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Low Stock Items',
      value: '7',
      description: 'Need immediate attention',
      icon: TrendingUp,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ];

  const recentEmployees = [
    { name: 'Raj Kumar', role: 'Chef', joinDate: '2024-01-15', workingDays: 25 },
    { name: 'Priya Sharma', role: 'Cashier', joinDate: '2024-01-10', workingDays: 28 },
    { name: 'Amit Singh', role: 'Worker', joinDate: '2024-01-20', workingDays: 22 }
  ];

  const lowStockProducts = [
    { name: 'Gulab Jamun', stock: 5, minStock: 20 },
    { name: 'Rasgulla', stock: 8, minStock: 25 },
    { name: 'Peda', stock: 12, minStock: 30 }
  ];
</script>

<div class="space-y-6">
  <div>
    <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
    <p class="text-gray-600">Overview of your sweet shop operations</p>
  </div>

  <!-- Stats Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {#each stats as stat}
      <Card>
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">{stat.title}</p>
              <p class="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p class="text-xs text-gray-500 mt-1">{stat.description}</p>
            </div>
            <div class="w-12 h-12 {stat.bgColor} rounded-lg flex items-center justify-center">
              <stat.icon class="w-6 h-6 {stat.color}" />
            </div>
          </div>
        </CardContent>
      </Card>
    {/each}
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Recent Employees -->
    <Card>
      <CardHeader>
        <CardTitle>Recent Employees</CardTitle>
        <CardDescription>Latest additions to your team</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          {#each recentEmployees as employee}
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p class="font-medium text-gray-900">{employee.name}</p>
                <p class="text-sm text-gray-600">{employee.role}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">{employee.workingDays} days</p>
                <p class="text-xs text-gray-500">Working</p>
              </div>
            </div>
          {/each}
        </div>
      </CardContent>
    </Card>

    <!-- Low Stock Alert -->
    <Card>
      <CardHeader>
        <CardTitle class="text-red-600">Low Stock Alert</CardTitle>
        <CardDescription>Products that need restocking</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          {#each lowStockProducts as product}
            <div class="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
              <div>
                <p class="font-medium text-gray-900">{product.name}</p>
                <p class="text-sm text-red-600">Current: {product.stock} pieces</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-red-700">Min: {product.minStock}</p>
                <p class="text-xs text-red-500">Required</p>
              </div>
            </div>
          {/each}
        </div>
      </CardContent>
    </Card>
  </div>
</div>
