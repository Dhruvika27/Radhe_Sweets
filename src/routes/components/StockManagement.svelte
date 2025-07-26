<script>
  import { products, productActions } from '../lib/stores.js';

  let stockData = $derived(
    $products.map(product => ({
      id: product.id,
      name: product.name,
      currentStock: product.stock,
      minStock: product.minStock,
      restockAmount: Math.max(50, product.minStock * 2),
      lastRestocked: '2024-01-20',
      status: product.stock === 0 ? 'Out of Stock' : 
              product.stock <= product.minStock ? 'Critical' : 
              product.stock <= product.minStock * 1.5 ? 'Low' : 'Good',
      priority: product.stock === 0 ? 'Critical' : 
                product.stock <= product.minStock ? 'High' : 
                product.stock <= product.minStock * 1.5 ? 'Medium' : 'Low'
    }))
  );

  let criticalItems = $derived(stockData.filter(item => item.status === 'Critical' || item.status === 'Out of Stock').length);
  let lowStockItems = $derived(stockData.filter(item => item.status === 'Low').length);
  let goodStockItems = $derived(stockData.filter(item => item.status === 'Good').length);
  let lowestStockItem = $derived(stockData.reduce((min, item) => 
    item.currentStock < min.currentStock ? item : min, stockData[0]));

  function getStatusBadgeColor(status) {
    switch (status) {
      case 'Good': return 'bg-green-100 text-green-800 border border-green-200';
      case 'Low': return 'bg-amber-100 text-amber-800 border border-amber-200';
      case 'Critical': return 'bg-orange-100 text-orange-800 border border-orange-200';
      case 'Out of Stock': return 'bg-red-100 text-red-800 border border-red-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  }

  function getPriorityBadgeColor(priority) {
    switch (priority) {
      case 'Low': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'Medium': return 'bg-amber-100 text-amber-800 border border-amber-200';
      case 'High': return 'bg-orange-100 text-orange-800 border border-orange-200';
      case 'Critical': return 'bg-red-100 text-red-800 border border-red-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN');
  }

  function handleRestock(productId) {
    const item = stockData.find(item => item.id === productId);
    if (item) {
      const newStock = item.currentStock + item.restockAmount;
      productActions.updateStock(productId, newStock);
    }
  }
</script>

<div class="space-y-6">
  <div>
    <h1 class="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Stock Management</h1>
    <p class="text-gray-600">Monitor and manage your inventory levels</p>
  </div>

  <!-- Stock Overview Stats -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <div class="bg-white rounded-lg shadow-md border border-purple-100 p-6 hover:shadow-lg transition-shadow">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Critical Items</p>
          <p class="text-2xl font-bold text-red-600">{criticalItems}</p>
          <p class="text-xs text-red-500">Need immediate attention</p>
        </div>
        <span class="text-2xl">⚠️</span>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow-md border border-purple-100 p-6 hover:shadow-lg transition-shadow">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Low Stock</p>
          <p class="text-2xl font-bold text-amber-600">{lowStockItems}</p>
          <p class="text-xs text-amber-600">Monitor closely</p>
        </div>
        <span class="text-2xl">📊</span>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow-md border border-purple-100 p-6 hover:shadow-lg transition-shadow">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Good Stock</p>
          <p class="text-2xl font-bold text-green-600">{goodStockItems}</p>
          <p class="text-xs text-green-600">Well stocked</p>
        </div>
        <span class="logo-3d-stock text-2xl font-bold text-purple-600 font-serif italic">R</span>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow-md border border-purple-100 p-6 hover:shadow-lg transition-shadow">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Lowest Stock</p>
          <p class="text-lg font-bold text-gray-900">{lowestStockItem?.name}</p>
          <p class="text-xs text-gray-500">{lowestStockItem?.currentStock} pieces left</p>
        </div>
        <span class="text-2xl">📉</span>
      </div>
    </div>
  </div>

  <!-- Critical Stock Alert -->
  {#if criticalItems > 0}
    <div class="bg-red-50 border-2 border-red-200 rounded-lg shadow-md">
      <div class="p-6 border-b border-red-200 bg-gradient-to-r from-red-50 to-pink-50">
        <h3 class="text-lg font-semibold text-red-800 flex items-center space-x-2">
          <span>⚠️</span>
          <span>Critical Stock Alert</span>
        </h3>
        <p class="text-red-600">{criticalItems} items need immediate restocking</p>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each stockData.filter(item => item.status === 'Critical' || item.status === 'Out of Stock') as item}
            <div class="bg-white p-4 rounded-lg border-2 border-red-200 shadow-sm">
              <div class="flex items-center space-x-2 mb-2">
                <span class="logo-3d-alert text-lg font-bold text-purple-600 font-serif italic">R</span>
                <h4 class="font-semibold text-gray-900">{item.name}</h4>
              </div>
              <p class="text-sm text-red-600">Current: {item.currentStock} pieces</p>
              <p class="text-sm text-gray-600">Minimum: {item.minStock} pieces</p>
              <button 
                onclick={() => handleRestock(item.id)}
                class="mt-2 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md"
              >
                <span>🔄</span>
                <span>Restock {item.restockAmount}</span>
              </button>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}

  <!-- Stock Details Table -->
  <div class="bg-white rounded-lg shadow-md border border-purple-100 hover:shadow-lg transition-shadow">
    <div class="p-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
      <h3 class="text-lg font-semibold text-gray-900">Stock Details</h3>
      <p class="text-gray-600">Complete inventory status and restock information</p>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gradient-to-r from-purple-50 to-pink-50">
          <tr>
            <th class="text-left py-3 px-6 font-medium text-gray-900">Product</th>
            <th class="text-left py-3 px-6 font-medium text-gray-900">Current Stock</th>
            <th class="text-left py-3 px-6 font-medium text-gray-900">Minimum Stock</th>
            <th class="text-left py-3 px-6 font-medium text-gray-900">Restock Amount</th>
            <th class="text-left py-3 px-6 font-medium text-gray-900">Last Restocked</th>
            <th class="text-left py-3 px-6 font-medium text-gray-900">Status</th>
            <th class="text-left py-3 px-6 font-medium text-gray-900">Priority</th>
            <th class="text-left py-3 px-6 font-medium text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody>
          {#each stockData as item}
            <tr class="border-b border-purple-50 hover:bg-purple-25 transition-colors {item.status === 'Critical' || item.status === 'Out of Stock' ? 'bg-red-50' : ''}">
              <td class="py-4 px-6">
                <div class="flex items-center space-x-2">
                  <span class="logo-3d-table text-lg font-bold text-purple-600 font-serif italic">R</span>
                  <div class="font-medium text-gray-900">{item.name}</div>
                </div>
              </td>
              <td class="py-4 px-6">
                <span class="font-semibold {item.currentStock <= item.minStock ? 'text-red-600' : 'text-gray-900'}">
                  {item.currentStock}
                </span>
                <span class="text-sm text-gray-500"> pieces</span>
              </td>
              <td class="py-4 px-6 text-gray-600">{item.minStock} pieces</td>
              <td class="py-4 px-6 text-gray-600">{item.restockAmount} pieces</td>
              <td class="py-4 px-6 text-gray-600">{formatDate(item.lastRestocked)}</td>
              <td class="py-4 px-6">
                <span class="px-2 py-1 rounded-full text-xs font-medium {getStatusBadgeColor(item.status)}">
                  {item.status}
                </span>
              </td>
              <td class="py-4 px-6">
                <span class="px-2 py-1 rounded-full text-xs font-medium {getPriorityBadgeColor(item.priority)}">
                  {item.priority}
                </span>
              </td>
              <td class="py-4 px-6">
                <button 
                  onclick={() => handleRestock(item.id)}
                  disabled={item.status === 'Good'}
                  class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded text-sm hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1 shadow-sm"
                >
                  <span>🔄</span>
                  <span>Restock</span>
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

<style>
  .logo-3d-stock {
    display: inline-block;
    transform-style: preserve-3d;
    animation: stockBounce 2s ease-in-out infinite;
    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  .logo-3d-alert {
    display: inline-block;
    transform-style: preserve-3d;
    animation: alertShake 1s ease-in-out infinite;
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
  }

  .logo-3d-table {
    display: inline-block;
    transform-style: preserve-3d;
    animation: tableRotate 4s linear infinite;
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
  }

  @keyframes stockBounce {
    0%, 100% { transform: translateY(0px) rotateY(0deg); }
    50% { transform: translateY(-3px) rotateY(180deg); }
  }

  @keyframes alertShake {
    0%, 100% { transform: translateX(0px) rotateZ(0deg); }
    25% { transform: translateX(-2px) rotateZ(-5deg); }
    75% { transform: translateX(2px) rotateZ(5deg); }
  }

  @keyframes tableRotate {
    0% { transform: rotateY(0deg); }
    100% { transform: rotateY(360deg); }
  }
</style>
