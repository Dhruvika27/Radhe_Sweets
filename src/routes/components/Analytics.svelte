<script>
  const monthlyData = [
    { month: 'Jan', sales: 245000, purchases: 180000, profit: 65000 },
    { month: 'Feb', sales: 280000, purchases: 200000, profit: 80000 },
    { month: 'Mar', sales: 320000, purchases: 220000, profit: 100000 },
    { month: 'Apr', sales: 290000, purchases: 210000, profit: 80000 },
    { month: 'May', sales: 350000, purchases: 240000, profit: 110000 },
    { month: 'Jun', sales: 380000, purchases: 260000, profit: 120000 }
  ];

  const topProducts = [
    { name: 'Gulab Jamun', sales: 45000, quantity: 1125 },
    { name: 'Kaju Katli', sales: 38000, quantity: 475 },
    { name: 'Burfi', sales: 32000, quantity: 711 },
    { name: 'Rasgulla', sales: 28000, quantity: 800 },
    { name: 'Peda', sales: 25000, quantity: 500 }
  ];

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  }

  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];
  
  const salesGrowth = ((currentMonth.sales - previousMonth.sales) / previousMonth.sales * 100).toFixed(1);
  const profitGrowth = ((currentMonth.profit - previousMonth.profit) / previousMonth.profit * 100).toFixed(1);
  
  const totalSales = monthlyData.reduce((sum, month) => sum + month.sales, 0);
  const totalPurchases = monthlyData.reduce((sum, month) => sum + month.purchases, 0);
  const totalProfit = totalSales - totalPurchases;
  
  const averageGrowth = (salesGrowth > 0 ? salesGrowth : 0);
</script>

<div class="space-y-6">
  <div>
    <h1 class="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Analytics Dashboard</h1>
    <p class="text-gray-600">Track your sweet shop's performance and growth</p>
  </div>

  <!-- Key Metrics -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <div class="bg-white rounded-lg shadow-md border border-purple-100 p-6 hover:shadow-lg transition-shadow">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Total Sales (6M)</p>
          <p class="text-2xl font-bold text-gray-900">{formatCurrency(totalSales)}</p>
          <div class="flex items-center mt-1">
            <span class="text-green-600">📈</span>
            <span class="text-sm text-green-600 ml-1">+{salesGrowth}%</span>
          </div>
        </div>
        <span class="text-2xl">💰</span>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md border border-purple-100 p-6 hover:shadow-lg transition-shadow">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Total Purchases (6M)</p>
          <p class="text-2xl font-bold text-gray-900">{formatCurrency(totalPurchases)}</p>
          <div class="flex items-center mt-1">
            <span class="text-blue-600">📊</span>
            <span class="text-sm text-blue-600 ml-1">Steady</span>
          </div>
        </div>
        <span class="text-2xl">🛒</span>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md border border-purple-100 p-6 hover:shadow-lg transition-shadow">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Total Profit (6M)</p>
          <p class="text-2xl font-bold text-gray-900">{formatCurrency(totalProfit)}</p>
          <div class="flex items-center mt-1">
            <span class="text-green-600">📈</span>
            <span class="text-sm text-green-600 ml-1">+{profitGrowth}%</span>
          </div>
        </div>
        <span class="text-2xl">📈</span>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md border border-purple-100 p-6 hover:shadow-lg transition-shadow">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Average Growth</p>
          <p class="text-2xl font-bold text-gray-900">{averageGrowth}%</p>
          <div class="flex items-center mt-1">
            <span class="text-green-600">📈</span>
            <span class="text-sm text-green-600 ml-1">Monthly</span>
          </div>
        </div>
        <span class="text-2xl">%</span>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Monthly Sales Chart -->
    <div class="bg-white rounded-lg shadow-md border border-purple-100 hover:shadow-lg transition-shadow">
      <div class="p-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
        <h3 class="text-lg font-semibold text-gray-900">Monthly Sales & Purchase Ratio</h3>
        <p class="text-gray-600">6-month performance overview</p>
      </div>
      <div class="p-6">
        <div class="space-y-4">
          {#each monthlyData as month}
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium text-gray-900">{month.month}</span>
                <div class="text-right">
                  <div class="text-sm font-medium text-gray-900">{formatCurrency(month.sales)}</div>
                  <div class="text-xs text-gray-500">Sales</div>
                </div>
              </div>
              
              <!-- Sales Bar -->
              <div class="w-full bg-gray-200 rounded-full h-3">
                <div 
                  class="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full relative"
                  style="width: {(month.sales / 400000) * 100}%"
                >
                  <div 
                    class="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full absolute top-0 left-0"
                    style="width: {(month.purchases / month.sales) * 100}%"
                  ></div>
                </div>
              </div>
              
              <div class="flex justify-between text-xs text-gray-500">
                <span>Purchases: {formatCurrency(month.purchases)}</span>
                <span>Profit: {formatCurrency(month.profit)}</span>
              </div>
            </div>
          {/each}
          
          <div class="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-purple-100">
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              <span class="text-sm text-gray-600">Sales</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              <span class="text-sm text-gray-600">Purchases</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Top Products -->
    <div class="bg-white rounded-lg shadow-md border border-purple-100 hover:shadow-lg transition-shadow">
      <div class="p-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
        <h3 class="text-lg font-semibold text-gray-900">Top Selling Products</h3>
        <p class="text-gray-600">Best performing sweets this month</p>
      </div>
      <div class="p-6">
        <div class="space-y-4">
          {#each topProducts as product, index}
            <div class="flex items-center justify-between p-3 bg-gradient-to-r from-purple-25 to-pink-25 rounded-lg border border-purple-100">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center border border-purple-200">
                  <span class="text-sm font-bold text-purple-600">#{index + 1}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="logo-3d-analytics text-lg font-bold text-purple-600 font-serif italic">R</span>
                  <div>
                    <p class="font-medium text-gray-900">{product.name}</p>
                    <p class="text-sm text-gray-600">{product.quantity} pieces sold</p>
                  </div>
                </div>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-900">{formatCurrency(product.sales)}</p>
                <p class="text-xs text-gray-500">Revenue</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- Sales vs Purchase Comparison -->
  <div class="bg-white rounded-lg shadow-md border border-purple-100 hover:shadow-lg transition-shadow">
    <div class="p-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
      <h3 class="text-lg font-semibold text-gray-900">Sales vs Purchase Analysis</h3>
      <p class="text-gray-600">Monthly comparison and profit margins</p>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gradient-to-r from-purple-50 to-pink-50">
          <tr>
            <th class="text-left py-3 px-6 font-medium text-gray-900">Month</th>
            <th class="text-left py-3 px-6 font-medium text-gray-900">Sales</th>
            <th class="text-left py-3 px-6 font-medium text-gray-900">Purchases</th>
            <th class="text-left py-3 px-6 font-medium text-gray-900">Profit</th>
            <th class="text-left py-3 px-6 font-medium text-gray-900">Margin</th>
            <th class="text-left py-3 px-6 font-medium text-gray-900">Growth</th>
          </tr>
        </thead>
        <tbody>
          {#each monthlyData as month, index}
            {@const margin = ((month.profit / month.sales) * 100).toFixed(1)}
            {@const growth = index > 0 ? (((month.sales - monthlyData[index - 1].sales) / monthlyData[index - 1].sales) * 100).toFixed(1) : '0'}
            <tr class="border-b border-purple-50 hover:bg-purple-25 transition-colors">
              <td class="py-4 px-6 font-medium text-gray-900">{month.month}</td>
              <td class="py-4 px-6 text-gray-900">{formatCurrency(month.sales)}</td>
              <td class="py-4 px-6 text-gray-600">{formatCurrency(month.purchases)}</td>
              <td class="py-4 px-6 font-medium text-green-600">{formatCurrency(month.profit)}</td>
              <td class="py-4 px-6">
                <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm border border-green-200">
                  {margin}%
                </span>
              </td>
              <td class="py-4 px-6">
                <div class="flex items-center">
                  {#if parseFloat(growth) > 0}
                    <span class="text-green-600">📈</span>
                    <span class="text-green-600 ml-1">+{growth}%</span>
                  {:else if parseFloat(growth) < 0}
                    <span class="text-red-600">📉</span>
                    <span class="text-red-600 ml-1">{growth}%</span>
                  {:else}
                    <span class="text-gray-500">-</span>
                  {/if}
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

<style>
  .logo-3d-analytics {
    display: inline-block;
    transform-style: preserve-3d;
    animation: analyticsGlow 3s ease-in-out infinite;
    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  @keyframes analyticsGlow {
    0%, 100% { 
      transform: scale(1) rotateY(0deg);
      text-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    50% { 
      transform: scale(1.1) rotateY(180deg);
      text-shadow: 0 4px 8px rgba(147, 51, 234, 0.4);
    }
  }
</style>
