<script>
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { TrendingUp, TrendingDown, IndianRupee, ShoppingCart } from 'lucide-svelte';

  // Mock analytics data
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

  // Calculate current month stats
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
    <h1 class="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
    <p class="text-gray-600">Track your sweet shop's performance and growth</p>
  </div>

  <!-- Key Metrics -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <Card>
      <CardContent class="p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Sales (6M)</p>
            <p class="text-2xl font-bold text-gray-900">{formatCurrency(totalSales)}</p>
            <div class="flex items-center mt-1">
              <TrendingUp class="w-4 h-4 text-green-600 mr-1" />
              <span class="text-sm text-green-600">+{salesGrowth}%</span>
            </div>
          </div>
          <IndianRupee class="w-8 h-8 text-green-600" />
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent class="p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Purchases (6M)</p>
            <p class="text-2xl font-bold text-gray-900">{formatCurrency(totalPurchases)}</p>
            <div class="flex items-center mt-1">
              <TrendingUp class="w-4 h-4 text-blue-600 mr-1" />
              <span class="text-sm text-blue-600">Steady</span>
            </div>
          </div>
          <ShoppingCart class="w-8 h-8 text-blue-600" />
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent class="p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Profit (6M)</p>
            <p class="text-2xl font-bold text-gray-900">{formatCurrency(totalProfit)}</p>
            <div class="flex items-center mt-1">
              <TrendingUp class="w-4 h-4 text-green-600 mr-1" />
              <span class="text-sm text-green-600">+{profitGrowth}%</span>
            </div>
          </div>
          <TrendingUp class="w-8 h-8 text-green-600" />
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent class="p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Average Growth</p>
            <p class="text-2xl font-bold text-gray-900">{averageGrowth}%</p>
            <div class="flex items-center mt-1">
              <TrendingUp class="w-4 h-4 text-green-600 mr-1" />
              <span class="text-sm text-green-600">Monthly</span>
            </div>
          </div>
          <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <span class="text-green-600 font-bold">%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Monthly Sales Chart -->
    <Card>
      <CardHeader>
        <CardTitle>Monthly Sales & Purchase Ratio</CardTitle>
        <CardDescription>6-month performance overview</CardDescription>
      </CardHeader>
      <CardContent>
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
                  class="bg-green-600 h-3 rounded-full relative"
                  style="width: {(month.sales / 400000) * 100}%"
                >
                  <div 
                    class="bg-blue-600 h-3 rounded-full absolute top-0 left-0"
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
          
          <div class="flex items-center justify-center space-x-6 mt-4 pt-4 border-t">
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-green-600 rounded-full"></div>
              <span class="text-sm text-gray-600">Sales</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span class="text-sm text-gray-600">Purchases</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Top Products -->
    <Card>
      <CardHeader>
        <CardTitle>Top Selling Products</CardTitle>
        <CardDescription>Best performing sweets this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          {#each topProducts as product, index}
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span class="text-sm font-bold text-orange-600">#{index + 1}</span>
                </div>
                <div>
                  <p class="font-medium text-gray-900">{product.name}</p>
                  <p class="text-sm text-gray-600">{product.quantity} pieces sold</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-900">{formatCurrency(product.sales)}</p>
                <p class="text-xs text-gray-500">Revenue</p>
              </div>
            </div>
          {/each}
        </div>
      </CardContent>
    </Card>
  </div>

  <!-- Sales vs Purchase Comparison -->
  <Card>
    <CardHeader>
      <CardTitle>Sales vs Purchase Analysis</CardTitle>
      <CardDescription>Monthly comparison and profit margins</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b">
              <th class="text-left py-3 px-4 font-medium text-gray-900">Month</th>
              <th class="text-left py-3 px-4 font-medium text-gray-900">Sales</th>
              <th class="text-left py-3 px-4 font-medium text-gray-900">Purchases</th>
              <th class="text-left py-3 px-4 font-medium text-gray-900">Profit</th>
              <th class="text-left py-3 px-4 font-medium text-gray-900">Margin</th>
              <th class="text-left py-3 px-4 font-medium text-gray-900">Growth</th>
            </tr>
          </thead>
          <tbody>
            {#each monthlyData as month, index}
              {@const margin = ((month.profit / month.sales) * 100).toFixed(1)}
              {@const growth = index > 0 ? (((month.sales - monthlyData[index - 1].sales) / monthlyData[index - 1].sales) * 100).toFixed(1) : '0'}
              <tr class="border-b hover:bg-gray-50">
                <td class="py-3 px-4 font-medium text-gray-900">{month.month}</td>
                <td class="py-3 px-4 text-gray-900">{formatCurrency(month.sales)}</td>
                <td class="py-3 px-4 text-gray-600">{formatCurrency(month.purchases)}</td>
                <td class="py-3 px-4 font-medium text-green-600">{formatCurrency(month.profit)}</td>
                <td class="py-3 px-4">
                  <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {margin}%
                  </span>
                </td>
                <td class="py-3 px-4">
                  <div class="flex items-center">
                    {#if parseFloat(growth) > 0}
                      <TrendingUp class="w-4 h-4 text-green-600 mr-1" />
                      <span class="text-green-600">+{growth}%</span>
                    {:else if parseFloat(growth) < 0}
                      <TrendingDown class="w-4 h-4 text-red-600 mr-1" />
                      <span class="text-red-600">{growth}%</span>
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
    </CardContent>
  </Card>
</div>
