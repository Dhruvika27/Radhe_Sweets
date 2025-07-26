<script>
  import { products, productActions } from '../lib/stores.js';

  let searchTerm = $state('');
  let showAddForm = $state(false);
  let editingProduct = $state(null);
  let newProduct = $state({
    name: '',
    category: 'Indian Sweet',
    price: 0,
    stock: 0,
    minStock: 0,
    description: ''
  });
  
  let filteredProducts = $derived(
    $products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  function getStockStatus(stock, minStock) {
    if (stock === 0) return { status: 'Out of Stock', color: 'bg-red-100 text-red-800 border border-red-200' };
    if (stock <= minStock) return { status: 'Low Stock', color: 'bg-amber-100 text-amber-800 border border-amber-200' };
    return { status: 'In Stock', color: 'bg-green-100 text-green-800 border border-green-200' };
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  }

  function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
      productActions.delete(id);
    }
  }

  function editProduct(product) {
    editingProduct = { ...product };
    showAddForm = false;
  }

  function handleAddProduct(e) {
    e.preventDefault();
    if (newProduct.name && newProduct.price > 0 && newProduct.stock >= 0 && newProduct.minStock >= 0) {
      productActions.add({ ...newProduct });
      newProduct = { name: '', category: 'Indian Sweet', price: 0, stock: 0, minStock: 0, description: '' };
      showAddForm = false;
    }
  }

  function handleUpdateProduct(e) {
    e.preventDefault();
    if (editingProduct.name && editingProduct.price > 0 && editingProduct.stock >= 0 && editingProduct.minStock >= 0) {
      products.update(list => 
        list.map(prod => 
          prod.id === editingProduct.id ? { ...editingProduct } : prod
        )
      );
      editingProduct = null;
    }
  }

  function toggleAddForm() {
    showAddForm = !showAddForm;
    editingProduct = null;
    if (!showAddForm) {
      newProduct = { name: '', category: 'Indian Sweet', price: 0, stock: 0, minStock: 0, description: '' };
    }
  }

  function cancelEdit() {
    editingProduct = null;
  }

  let inStockCount = $derived($products.filter(p => getStockStatus(p.stock, p.minStock).status === 'In Stock').length);
  let lowStockCount = $derived($products.filter(p => getStockStatus(p.stock, p.minStock).status === 'Low Stock').length);
  let outOfStockCount = $derived($products.filter(p => getStockStatus(p.stock, p.minStock).status === 'Out of Stock').length);
</script>

<div class="space-y-4 sm:space-y-6">
  <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
    <div>
      <h1 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Product Management</h1>
      <p class="text-sm sm:text-base text-gray-600">Manage your sweet shop inventory</p>
    </div>
    <button 
      onclick={toggleAddForm}
      class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md w-full sm:w-auto"
      disabled={editingProduct !== null}
    >
      <span>{showAddForm ? '✕' : '➕'}</span>
      <span>{showAddForm ? 'Cancel' : 'Add Product'}</span>
    </button>
  </div>

  <!-- Add Product Form -->
  {#if showAddForm}
    <div class="bg-white rounded-lg shadow-md border border-purple-100 p-4 sm:p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Add New Product</h3>
      <form onsubmit={handleAddProduct} class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label for="productName" class="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input
            id="productName"
            type="text"
            bind:value={newProduct.name}
            placeholder="e.g., Gulab Jamun"
            class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label for="productCategory" class="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            id="productCategory"
            bind:value={newProduct.category}
            class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="Indian Sweet">Indian Sweet</option>
            <option value="Dry Fruit Sweet">Dry Fruit Sweet</option>
            <option value="Milk Sweet">Milk Sweet</option>
          </select>
        </div>
        <div>
          <label for="productPrice" class="block text-sm font-medium text-gray-700 mb-1">Price per piece (₹)</label>
          <input
            id="productPrice"
            type="number"
            bind:value={newProduct.price}
            placeholder="40"
            min="1"
            class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label for="productStock" class="block text-sm font-medium text-gray-700 mb-1">Initial Stock</label>
          <input
            id="productStock"
            type="number"
            bind:value={newProduct.stock}
            placeholder="100"
            min="0"
            class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label for="productMinStock" class="block text-sm font-medium text-gray-700 mb-1">Minimum Stock Level</label>
          <input
            id="productMinStock"
            type="number"
            bind:value={newProduct.minStock}
            placeholder="20"
            min="0"
            class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>
        <div class="sm:col-span-2">
          <label for="productDescription" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            id="productDescription"
            bind:value={newProduct.description}
            placeholder="Brief description of the product"
            rows="2"
            class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          ></textarea>
        </div>
        <div class="sm:col-span-2">
          <button
            type="submit"
            class="w-full sm:w-auto bg-gradient-to-r from-green-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-purple-600 transition-all duration-200 shadow-md"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  {/if}

  <!-- Edit Product Form -->
  {#if editingProduct}
    <div class="bg-white rounded-lg shadow-md border-2 border-blue-300 p-4 sm:p-6">
      <h3 class="text-lg font-semibold text-blue-900 mb-4">Edit Product</h3>
      <form onsubmit={handleUpdateProduct} class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label for="editProductName" class="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input
            id="editProductName"
            type="text"
            bind:value={editingProduct.name}
            placeholder="e.g., Gulab Jamun"
            class="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label for="editProductCategory" class="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            id="editProductCategory"
            bind:value={editingProduct.category}
            class="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Indian Sweet">Indian Sweet</option>
            <option value="Dry Fruit Sweet">Dry Fruit Sweet</option>
            <option value="Milk Sweet">Milk Sweet</option>
          </select>
        </div>
        <div>
          <label for="editProductPrice" class="block text-sm font-medium text-gray-700 mb-1">Price per piece (₹)</label>
          <input
            id="editProductPrice"
            type="number"
            bind:value={editingProduct.price}
            placeholder="40"
            min="1"
            class="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label for="editProductStock" class="block text-sm font-medium text-gray-700 mb-1">Current Stock</label>
          <input
            id="editProductStock"
            type="number"
            bind:value={editingProduct.stock}
            placeholder="100"
            min="0"
            class="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label for="editProductMinStock" class="block text-sm font-medium text-gray-700 mb-1">Minimum Stock Level</label>
          <input
            id="editProductMinStock"
            type="number"
            bind:value={editingProduct.minStock}
            placeholder="20"
            min="0"
            class="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div class="sm:col-span-2">
          <label for="editProductDescription" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            id="editProductDescription"
            bind:value={editingProduct.description}
            placeholder="Brief description of the product"
            rows="2"
            class="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          ></textarea>
        </div>
        <div class="sm:col-span-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            type="submit"
            class="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-md"
          >
            Update Product
          </button>
          <button
            type="button"
            onclick={cancelEdit}
            class="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-2 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  {/if}

  <!-- Search -->
  <div class="bg-white rounded-lg shadow-md border border-purple-100 p-4 sm:p-6">
    <div class="relative">
      <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">🔍</span>
      <input
        type="text"
        placeholder="Search products by name or category..."
        bind:value={searchTerm}
        class="w-full pl-10 pr-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    </div>
  </div>

  <!-- Product Stats -->
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
    <div class="bg-white rounded-lg shadow-md border border-purple-100 p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div class="mb-2 sm:mb-0">
          <p class="text-xs sm:text-sm font-medium text-gray-600">Total Products</p>
          <p class="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{filteredProducts.length}</p>
        </div>
        <span class="logo-3d-stat text-lg sm:text-2xl font-bold text-purple-600 font-serif italic self-end sm:self-auto">R</span>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow-md border border-purple-100 p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div class="mb-2 sm:mb-0">
          <p class="text-xs sm:text-sm font-medium text-gray-600">In Stock</p>
          <p class="text-lg sm:text-2xl font-bold text-green-600">{inStockCount}</p>
        </div>
        <span class="logo-3d-stat text-lg sm:text-2xl font-bold text-purple-600 font-serif italic self-end sm:self-auto">R</span>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow-md border border-purple-100 p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div class="mb-2 sm:mb-0">
          <p class="text-xs sm:text-sm font-medium text-gray-600">Low Stock</p>
          <p class="text-lg sm:text-2xl font-bold text-amber-600">{lowStockCount}</p>
        </div>
        <span class="logo-3d-stat text-lg sm:text-2xl font-bold text-purple-600 font-serif italic self-end sm:self-auto">R</span>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow-md border border-purple-100 p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div class="mb-2 sm:mb-0">
          <p class="text-xs sm:text-sm font-medium text-gray-600">Out of Stock</p>
          <p class="text-lg sm:text-2xl font-bold text-red-600">{outOfStockCount}</p>
        </div>
        <span class="logo-3d-stat text-lg sm:text-2xl font-bold text-purple-600 font-serif italic self-end sm:self-auto">R</span>
      </div>
    </div>
  </div>

  <!-- Product List -->
  <div class="bg-white rounded-lg shadow-md border border-purple-100 hover:shadow-lg transition-shadow">
    <div class="p-4 sm:p-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
      <h3 class="text-base sm:text-lg font-semibold text-gray-900">Product Inventory</h3>
      <p class="text-sm sm:text-base text-gray-600">Complete list of products in your shop</p>
    </div>
    
    <!-- Mobile Card View -->
    <div class="block sm:hidden">
      {#each filteredProducts as product}
        {@const stockInfo = getStockStatus(product.stock, product.minStock)}
        <div class="p-4 border-b border-purple-50 {editingProduct?.id === product.id ? 'bg-blue-50' : ''}">
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center space-x-3 min-w-0 flex-1">
              <div class="w-10 h-10 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg flex items-center justify-center border border-purple-200 logo-3d-container-product flex-shrink-0">
                <span class="logo-3d-product text-sm font-bold text-purple-600 font-serif italic">R</span>
              </div>
              <div class="min-w-0 flex-1">
                <h4 class="font-semibold text-gray-900 truncate">{product.name}</h4>
                <p class="text-xs text-gray-600 truncate">{product.description}</p>
                <p class="text-xs text-purple-600 mt-1">{product.category}</p>
              </div>
            </div>
            <div class="flex items-center space-x-2 ml-2">
              <button 
                onclick={() => editProduct(product)}
                class="text-blue-600 hover:text-blue-800 p-1 border border-purple-200 rounded hover:bg-blue-100 transition-colors"
                title="Edit Product"
              >
                ✏️
              </button>
              <button 
                onclick={() => deleteProduct(product.id)}
                class="text-red-600 hover:text-red-800 p-1 border border-purple-200 rounded hover:bg-red-100 transition-colors"
                title="Delete Product"
              >
                🗑️
              </button>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span class="font-medium text-gray-700">Price:</span><br>
              <span class="text-gray-900">{formatCurrency(product.price)}/piece</span>
            </div>
            <div>
              <span class="font-medium text-gray-700">Stock:</span><br>
              <span class="text-gray-900">{product.stock} pieces</span>
            </div>
            <div>
              <span class="font-medium text-gray-700">Min Stock:</span><br>
              <span class="text-gray-600">{product.minStock} pieces</span>
            </div>
            <div>
              <span class="font-medium text-gray-700">Status:</span><br>
              <span class="px-2 py-1 rounded-full text-xs font-medium {stockInfo.color}">
                {stockInfo.status}
              </span>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Desktop List View -->
    <div class="hidden sm:block p-4 sm:p-6">
      <div class="space-y-4">
        {#each filteredProducts as product}
          {@const stockInfo = getStockStatus(product.stock, product.minStock)}
          <div class="flex items-center justify-between p-4 border border-purple-100 rounded-lg hover:bg-purple-25 transition-colors {editingProduct?.id === product.id ? 'bg-blue-50 border-blue-200' : ''}">
            <div class="flex-1">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg flex items-center justify-center border border-purple-200 logo-3d-container-product">
                  <span class="logo-3d-product text-xl font-bold text-purple-600 font-serif italic">R</span>
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-gray-900">{product.name}</h3>
                  <p class="text-sm text-gray-600">{product.description}</p>
                  <div class="flex items-center space-x-4 mt-1">
                    <span class="text-sm text-purple-600">Category: {product.category}</span>
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
                <span class="px-2 py-1 rounded-full text-xs font-medium {stockInfo.color}">
                  {stockInfo.status}
                </span>
              </div>
              
              <div class="flex items-center space-x-2">
                <button 
                  onclick={() => editProduct(product)}
                  class="text-blue-600 hover:text-blue-800 p-2 border border-purple-200 rounded hover:bg-blue-100 transition-colors"
                  title="Edit Product"
                >
                  ✏️
                </button>
                <button 
                  onclick={() => deleteProduct(product.id)}
                  class="text-red-600 hover:text-red-800 p-2 border border-purple-200 rounded hover:bg-red-100 transition-colors"
                  title="Delete Product"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .logo-3d-stat {
    display: inline-block;
    transform-style: preserve-3d;
    animation: statPulse 3s ease-in-out infinite;
    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  .logo-3d-container-product {
    perspective: 300px;
  }

  .logo-3d-product {
    transform-style: preserve-3d;
    animation: productSpin 5s linear infinite;
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
    position: relative;
  }

  .logo-3d-product::before {
    content: 'R';
    position: absolute;
    top: 0;
    left: 0;
    transform: translateZ(-3px);
    color: rgba(147, 51, 234, 0.5);
    text-shadow: none;
  }

  @keyframes statPulse {
    0%, 100% { transform: scale(1) rotateY(0deg); }
    50% { transform: scale(1.1) rotateY(180deg); }
  }

  @keyframes productSpin {
    0% { transform: rotateY(0deg); }
    100% { transform: rotateY(360deg); }
  }

  .logo-3d-container-product:hover .logo-3d-product {
    animation-duration: 1s;
  }

  /* Mobile optimizations */
  @media (max-width: 640px) {
    .logo-3d-stat {
      animation-duration: 5s; /* Slower on mobile */
    }
    
    .logo-3d-product {
      animation-duration: 8s; /* Slower on mobile */
    }
  }
</style>
