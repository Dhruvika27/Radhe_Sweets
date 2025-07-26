<script>
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Badge } from '$lib/components/ui/badge';
  import { Plus, Search, Edit, Trash2, Package } from 'lucide-svelte';

  let searchTerm = $state('');
  let products = $state([
    {
      id: 1,
      name: 'Gulab Jamun',
      category: 'Indian Sweet',
      price: 40,
      stock: 150,
      minStock: 20,
      description: 'Soft, spongy balls soaked in sugar syrup',
      status: 'In Stock'
    },
    {
      id: 2,
      name: 'Rasgulla',
      category: 'Indian Sweet',
      price: 35,
      stock: 8,
      minStock: 25,
      description: 'Spongy cottage cheese balls in sugar syrup',
      status: 'Low Stock'
    },
    {
      id: 3,
      name: 'Peda',
      category: 'Indian Sweet',
      price: 50,
      stock: 0,
      minStock: 30,
      description: 'Traditional milk-based sweet',
      status: 'Out of Stock'
    },
    {
      id: 4,
      name: 'Burfi',
      category: 'Indian Sweet',
      price: 45,
      stock: 75,
      minStock: 15,
      description: 'Dense milk-based sweet confection',
      status: 'In Stock'
    },
    {
      id: 5,
      name: 'Cham Cham',
      category: 'Indian Sweet',
      price: 38,
      stock: 12,
      minStock: 20,
      description: 'Cylindrical cottage cheese sweet',
      status: 'Low Stock'
    },
    {
      id: 6,
      name: 'Kaju Katli',
      category: 'Indian Sweet',
      price: 80,
      stock: 60,
      minStock: 10,
      description: 'Diamond-shaped cashew sweet',
      status: 'In Stock'
    },
    {
      id: 7,
      name: 'Jalebi',
      category: 'Indian Sweet',
      price: 30,
      stock: 25,
      minStock: 15,
      description: 'Spiral-shaped deep-fried sweet',
      status: 'In Stock'
    },
    {
      id: 8,
      name: 'Laddu',
      category: 'Indian Sweet',
      price: 25,
      stock: 90,
      minStock: 20,
      description: 'Round sweet balls made from flour',
      status: 'In Stock'
    }
  ]);

  let filteredProducts = $derived(
    products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  let inStockCount = $derived(filteredProducts.filter(p => p.status === 'In Stock').length);
  let lowStockCount = $derived(filteredProducts.filter(p => p.status === 'Low Stock').length);
  let outOfStockCount = $derived(filteredProducts.filter(p => p.status === 'Out of Stock').length);

  function getStatusBadgeColor(status) {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  }

  function getStockStatus(stock, minStock) {
    if (stock === 0) return 'Out of Stock';
    if (stock <= minStock) return 'Low Stock';
    return 'In Stock';
  }

  // Update product status based on stock
  $effect(() => {
    products = products.map(product => ({
      ...product,
      status: getStockStatus(product.stock, product.minStock)
    }));
  });
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Product Management</h1>
      <p class="text-gray-600">Manage your sweet shop inventory</p>
    </div>
    <Button class="flex items-center space-x-2">
      <Plus class="w-4 h-4" />
      <span>Add Product</span>
    </Button>
  </div>

  <!-- Search -->
  <Card>
    <CardContent class="p-6">
      <div class="relative">
        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search products by name or category..."
          bind:value={$searchTerm}
          class="pl-10"
        />
      </div>
    </CardContent>
  </Card>

  <!-- Product Stats -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <Card>
      <CardContent class="p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Products</p>
            <p class="text-2xl font-bold text-gray-900">{products.length}</p>
          </div>
          <Package class="w-8 h-8 text-blue-600" />
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent class="p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">In Stock</p>
            <p class="text-2xl font-bold text-green-600">{inStockCount}</p>
          </div>
          <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <div class="w-4 h-4 bg-green-600 rounded-full"></div>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent class="p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Low Stock</p>
            <p class="text-2xl font-bold text-yellow-600">{lowStockCount}</p>
          </div>
          <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
            <div class="w-4 h-4 bg-yellow-600 rounded-full"></div>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent class="p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Out of Stock</p>
            <p class="text-2xl font-bold text-red-600">{outOfStockCount}</p>
          </div>
          <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <div class="w-4 h-4 bg-red-600 rounded-full"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>

  <!-- Product List -->
  <Card>
    <CardHeader>
      <CardTitle>Product Inventory</CardTitle>
      <CardDescription>Complete list of Indian sweets in your shop</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="space-y-4">
        {#each filteredProducts as product}
          <div class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
            <div class="flex-1">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span class="text-xl">🍬</span>
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-900">{product.name}</h3>
                  <p class="text-sm text-gray-600">{product.description}</p>
                  <div class="flex items-center space-x-4 mt-1">
                    <span class="text-sm text-gray-500">Category: {product.category}</span>
                    <span class="text-sm font-medium text-gray-900">Price: {formatCurrency(product.price)}/piece</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="flex items-center space-x-6">
              <div class="text-center">
                <p class="text-sm text-gray-600">Stock</p>
                <p class="font-semibold text-gray-900">{product.stock} pieces</p>
                <p class="text-xs text-gray-500">Min: {product.minStock}</p>
              </div>
              
              <div class="text-center">
                <Badge class={getStatusBadgeColor(product.status)}>{product.status}</Badge>
              </div>
              
              <div class="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Edit class="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" class="text-red-600 hover:text-red-700">
                  <Trash2 class="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </CardContent>
  </Card>
</div>
