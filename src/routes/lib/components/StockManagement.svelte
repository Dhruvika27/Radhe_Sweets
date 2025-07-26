<script>
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { AlertTriangle, Package, TrendingUp, RefreshCw } from 'lucide-svelte';

  // Mock stock data
  let stockData = $state([
    {
      id: 1,
      name: 'Gulab Jamun',
      currentStock: 150,
      minStock: 20,
      restockAmount: 100,
      lastRestocked: '2024-01-20',
      status: 'Good',
      priority: 'Low'
    },
    {
      id: 2,
      name: 'Rasgulla',
      currentStock: 8,
      minStock: 25,
      restockAmount: 50,
      lastRestocked: '2024-01-18',
      status: 'Critical',
      priority: 'High'
    },
    {
      id: 3,
      name: 'Peda',
      currentStock: 0,
      minStock: 30,
      restockAmount: 75,
      lastRestocked: '2024-01-15',
      status: 'Out of Stock',
      priority: 'Critical'
    },
    {
      id: 4,
      name: 'Burfi',
      currentStock: 75,
      minStock: 15,
      restockAmount: 50,
      lastRestocked: '2024-01-22',
      status: 'Good',
      priority: 'Low'
    },
    {
      id: 5,
      name: 'Cham Cham',
      currentStock: 12,
      minStock: 20,
      restockAmount: 40,
      lastRestocked: '2024-01-19',
      status: 'Low',
      priority: 'Medium'
    },
    {
      id: 6,
      name: 'Kaju Katli',
      currentStock: 60,
      minStock: 10,
      restockAmount: 30,
      lastRestocked: '2024-01-21',
      status: 'Good',
      priority: 'Low'
    }
  ]);

  let criticalItems = $derived(stockData.filter(item => item.status === 'Critical' || item.status === 'Out of Stock').length);
  let lowStockItems = $derived(stockData.filter(item => item.status === 'Low').length);
  let goodStockItems = $derived(stockData.filter(item => item.status === 'Good').length);
  let lowestStockItem = $derived(stockData.reduce((min, item) => 
    item.currentStock < min.currentStock ? item : min, stockData[0]));

  function getStatusBadgeColor(status) {
    switch (status) {
      case 'Good': return 'bg-green-100 text-green-800';
      case 'Low': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-orange-100 text-orange-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  function getPriorityBadgeColor(priority) {
    switch (priority) {
      case 'Low': return 'bg-blue-100 text-blue-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN');
  }

  function handleRestock(productId) {
    stockData = stockData.map(item => {
      if (item.id === productId) {
        return {
          ...item,
          currentStock: item.currentStock + item.restockAmount,
          lastRestocked: new Date().toISOString().split('T')[0],
          status: 'Good',
          priority: 'Low'
        };
      }
      return item;
    });
  }

  // Calculate stats
  // const criticalItems = derived(stockDataStore, $stockData => $stockData.filter(item => item.status === 'Critical' || item.status === 'Out of Stock').length);
  // const lowStockItems = derived(stockDataStore, $stockData => $stockData.filter(item => item.status === 'Low').length);
  // const goodStockItems = derived(stockDataStore, $stockData => $stockData.filter(item => item.status === 'Good').length);
  // const lowestStockItem = derived(stockDataStore, $stockData => $stockData.reduce((min, item) => 
  //   item.currentStock < min.currentStock ? item : min, $stockData[0]));

  $effect(() => {
    console.log('Critical Items:', criticalItems);
    console.log('Low Stock Items:', lowStockItems);
    console.log('Good Stock Items:', goodStockItems);
    console.log('Lowest Stock Item:', lowestStockItem);
  });
</script>

<div class="space-y-6">
  <div>
    <h1 class="text-3xl font-bold text-gray-900">Stock Management</h1>
    <p class="text-gray-600">Monitor and manage your inventory levels</p>
  </div>

  <!-- Stock Overview Stats -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <Card>
      <CardContent class="p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Critical Items</p>
            <p class="text-2xl font-bold text-red-600">{criticalItems}</p>
            <p class="text-xs text-red-500">Need immediate attention</p>
          </div>
          <AlertTriangle class="w-8 h-8 text-red-600" />
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardContent class="p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Low Stock</p>
            <p class="text-2xl font-bold text-yellow-600">{lowStockItems}</p>
            <p class="text-xs text-yellow-600">Monitor closely</p>
          </div>
          <TrendingUp class="w-8 h-8 text-yellow-600" />
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardContent class="p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Good Stock</p>
            <p class="text-2xl font-bold text-green-600">{goodStockItems}</p>
            <p class="text-xs text-green-600">Well stocked</p>
          </div>
          <Package class="w-8 h-8 text-green-600" />
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardContent class="p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Lowest Stock</p>
            <p class="text-lg font-bold text-gray-900">{lowestStockItem?.name}</p>
            <p class="text-xs text-gray-500">{lowestStockItem?.currentStock} pieces left</p>
          </div>
          <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <span class="text-sm">📦</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>

  <!-- Critical Stock Alert -->
  {#if criticalItems > 0}
    <Card class="border-red-200 bg-red-50">
      <CardHeader>
        <CardTitle class="text-red-800 flex items-center space-x-2">
          <AlertTriangle class="w-5 h-5" />
          Critical Stock Alert
        </CardTitle>
        <CardDescription class="text-red-600">
          {criticalItems} items need immediate restocking
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each stockData.filter(item => item.status === 'Critical' || item.status === 'Out of Stock') as item}
            <div class="bg-white p-4 rounded-lg border border-red-200">
              <h4 class="font-semibold text-gray-900">{item.name}</h4>
              <p class="text-sm text-red-600">Current: {item.currentStock} pieces</p>
              <p class="text-sm text-gray-600">Minimum: {item.minStock} pieces</p>
              <Button 
                size="sm" 
                class="mt-2 w-full"
                onclick={() => handleRestock(item.id)}
              >
                <RefreshCw class="w-4 h-4 mr-2" />
                Restock {item.restockAmount}
              </Button>
            </div>
          {/each}
        </div>
      </CardContent>
    </Card>
  {/if}

  <!-- Stock Details Table -->
  <Card>
    <CardHeader>
      <CardTitle>Stock Details</CardTitle>
      <CardDescription>Complete inventory status and restock information</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b">
              <th class="text-left py-3 px-4 font-medium text-gray-900">Product</th>
              <th class="text-left py-3 px-4 font-medium text-gray-900">Current Stock</th>
              <th class="text-left py-3 px-4 font-medium text-gray-900">Minimum Stock</th>
              <th class="text-left py-3 px-4 font-medium text-gray-900">Restock Amount</th>
              <th class="text-left py-3 px-4 font-medium text-gray-900">Last Restocked</th>
              <th class="text-left py-3 px-4 font-medium text-gray-900">Status</th>
              <th class="text-left py-3 px-4 font-medium text-gray-900">Priority</th>
              <th class="text-left py-3 px-4 font-medium text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody>
            {#each stockData as item}
              <tr class="border-b hover:bg-gray-50 {item.status === 'Critical' || item.status === 'Out of Stock' ? 'bg-red-50' : ''}">
                <td class="py-3 px-4">
                  <div class="font-medium text-gray-900">{item.name}</div>
                </td>
                <td class="py-3 px-4">
                  <span class="font-semibold {item.currentStock <= item.minStock ? 'text-red-600' : 'text-gray-900'}">
                    {item.currentStock}
                  </span>
                  <span class="text-sm text-gray-500"> pieces</span>
                </td>
                <td class="py-3 px-4 text-gray-600">{item.minStock} pieces</td>
                <td class="py-3 px-4 text-gray-600">{item.restockAmount} pieces</td>
                <td class="py-3 px-4 text-gray-600">{formatDate(item.lastRestocked)}</td>
                <td class="py-3 px-4">
                  <Badge class={getStatusBadgeColor(item.status)}>{item.status}</Badge>
                </td>
                <td class="py-3 px-4">
                  <Badge class={getPriorityBadgeColor(item.priority)}>{item.priority}</Badge>
                </td>
                <td class="py-3 px-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onclick={() => handleRestock(item.id)}
                    disabled={item.status === 'Good'}
                  >
                    <RefreshCw class="w-4 h-4 mr-1" />
                    Restock
                  </Button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
</div>
