<script>
  import { employees, employeeActions } from '../lib/stores.js';

  let searchTerm = $state('');
  let showAddForm = $state(false);
  let editingEmployee = $state(null);
  let newEmployee = $state({
    name: '',
    role: 'Worker',
    phone: '',
    salary: 0
  });

  let filteredEmployees = $derived(
    $employees.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  let totalEmployees = $derived($employees.length);
  let totalChefs = $derived($employees.filter(e => e.role === 'Chef').length);
  let totalCashiers = $derived($employees.filter(e => e.role === 'Cashier').length);

  function getRoleBadgeColor(role) {
    switch (role) {
      case 'Chef': return 'bg-green-100 text-green-800 border border-green-200';
      case 'Cashier': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'Worker': return 'bg-purple-100 text-purple-800 border border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN');
  }

  function deleteEmployee(id) {
    if (confirm('Are you sure you want to delete this employee?')) {
      employeeActions.delete(id);
    }
  }

  function editEmployee(employee) {
    editingEmployee = { ...employee };
    showAddForm = false;
  }

  function handleAddEmployee(e) {
    e.preventDefault();
    if (newEmployee.name && newEmployee.phone && newEmployee.salary > 0) {
      employeeActions.add({ ...newEmployee });
      newEmployee = { name: '', role: 'Worker', phone: '', salary: 0 };
      showAddForm = false;
    }
  }

  function handleUpdateEmployee(e) {
    e.preventDefault();
    if (editingEmployee.name && editingEmployee.phone && editingEmployee.salary > 0) {
      employees.update(list => 
        list.map(emp => 
          emp.id === editingEmployee.id ? { ...editingEmployee } : emp
        )
      );
      editingEmployee = null;
    }
  }

  function toggleAddForm() {
    showAddForm = !showAddForm;
    editingEmployee = null;
    if (!showAddForm) {
      newEmployee = { name: '', role: 'Worker', phone: '', salary: 0 };
    }
  }

  function cancelEdit() {
    editingEmployee = null;
  }
</script>

<div class="space-y-4 sm:space-y-6">
  <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
    <div>
      <h1 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Employee Management</h1>
      <p class="text-sm sm:text-base text-gray-600">Manage your sweet shop team</p>
    </div>
    <button 
      onclick={toggleAddForm}
      class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md w-full sm:w-auto"
      disabled={editingEmployee !== null}
    >
      <span>{showAddForm ? '✕' : '➕'}</span>
      <span>{showAddForm ? 'Cancel' : 'Add Employee'}</span>
    </button>
  </div>

  <!-- Add Employee Form -->
  {#if showAddForm}
    <div class="bg-white rounded-lg shadow-md border border-purple-100 p-4 sm:p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Add New Employee</h3>
      <form onsubmit={handleAddEmployee} class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1" for="name">Name</label>
          <input
            type="text"
            bind:value={newEmployee.name}
            id="name"
            placeholder="Employee name"
            class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1" for="role">Role</label>
          <select
            bind:value={newEmployee.role}
            id="role"
            class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="Worker">Worker</option>
            <option value="Chef">Chef</option>
            <option value="Cashier">Cashier</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1" for="phone">Phone</label>
          <input
            type="tel"
            bind:value={newEmployee.phone}
            id="phone"
            placeholder="+91 9876543210"
            class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1" for="salary">Salary (₹)</label>
          <input
            type="number"
            bind:value={newEmployee.salary}
            id="salary"
            placeholder="25000"
            min="1"
            class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>
        <div class="sm:col-span-2">
          <button
            type="submit"
            class="w-full sm:w-auto bg-gradient-to-r from-green-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-purple-600 transition-all duration-200 shadow-md"
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  {/if}

  <!-- Edit Employee Form -->
  {#if editingEmployee}
    <div class="bg-white rounded-lg shadow-md border-2 border-blue-300 p-4 sm:p-6">
      <h3 class="text-lg font-semibold text-blue-900 mb-4">Edit Employee</h3>
      <form onsubmit={handleUpdateEmployee} class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1" for="edit-name">Name</label>
          <input
            type="text"
            bind:value={editingEmployee.name}
            id="edit-name"
            placeholder="Employee name"
            class="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1" for="edit-role">Role</label>
          <select
            bind:value={editingEmployee.role}
            id="edit-role"
            class="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Worker">Worker</option>
            <option value="Chef">Chef</option>
            <option value="Cashier">Cashier</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1" for="edit-phone">Phone</label>
          <input
            type="tel"
            bind:value={editingEmployee.phone}
            id="edit-phone"
            placeholder="+91 9876543210"
            class="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1" for="edit-salary">Salary (₹)</label>
          <input
            type="number"
            bind:value={editingEmployee.salary}
            id="edit-salary"
            placeholder="25000"
            min="1"
            class="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div class="sm:col-span-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            type="submit"
            class="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-md"
          >
            Update Employee
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
        placeholder="Search employees by name or role..."
        bind:value={searchTerm}
        class="w-full pl-10 pr-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    </div>
  </div>

  <!-- Employee Stats -->
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
    <div class="bg-white rounded-lg shadow-md border border-purple-100 p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div class="text-center">
        <p class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{totalEmployees}</p>
        <p class="text-sm text-gray-600">Total Employees</p>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow-md border border-purple-100 p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div class="text-center">
        <p class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">{totalChefs}</p>
        <p class="text-sm text-gray-600">Chefs</p>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow-md border border-purple-100 p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div class="text-center">
        <p class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{totalCashiers}</p>
        <p class="text-sm text-gray-600">Cashiers</p>
      </div>
    </div>
  </div>

  <!-- Employee Table -->
  <div class="bg-white rounded-lg shadow-md border border-purple-100 hover:shadow-lg transition-shadow">
    <div class="p-4 sm:p-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
      <h3 class="text-base sm:text-lg font-semibold text-gray-900">Employee Details</h3>
      <p class="text-sm sm:text-base text-gray-600">Complete information about your team members</p>
    </div>
    
    <!-- Mobile Card View -->
    <div class="block sm:hidden">
      {#each filteredEmployees as employee}
        <div class="p-4 border-b border-purple-50 {editingEmployee?.id === employee.id ? 'bg-blue-50' : ''}">
          <div class="flex justify-between items-start mb-2">
            <div>
              <h4 class="font-medium text-gray-900">{employee.name}</h4>
              <span class="inline-block px-2 py-1 rounded-full text-xs font-medium {getRoleBadgeColor(employee.role)} mt-1">
                {employee.role}
              </span>
            </div>
            <div class="flex items-center space-x-2">
              <button 
                onclick={() => editEmployee(employee)}
                class="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-100 rounded transition-colors"
                title="Edit Employee"
              >
                ✏️
              </button>
              <button 
                onclick={() => deleteEmployee(employee.id)}
                class="text-red-600 hover:text-red-800 p-1 hover:bg-red-100 rounded transition-colors"
                title="Delete Employee"
              >
                🗑️
              </button>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2 text-sm text-gray-600">
            <div>
              <span class="font-medium">Join Date:</span><br>
              {formatDate(employee.joinDate)}
            </div>
            <div>
              <span class="font-medium">Working Days:</span><br>
              {employee.workingDays} days
            </div>
            <div>
              <span class="font-medium">Phone:</span><br>
              {employee.phone}
            </div>
            <div>
              <span class="font-medium">Salary:</span><br>
              {formatCurrency(employee.salary)}
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Desktop Table View -->
    <div class="hidden sm:block overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gradient-to-r from-purple-50 to-pink-50">
          <tr>
            <th class="text-left py-3 px-6 font-medium text-gray-900">Name</th>
            <th class="text-left py-3 px-6 font-medium text-gray-900">Role</th>
            <th class="text-left py-3 px-6 font-medium text-gray-900">Join Date</th>
            <th class="text-left py-3 px-6 font-medium text-gray-900">Working Days</th>
            <th class="text-left py-3 px-6 font-medium text-gray-900">Phone</th>
            <th class="text-left py-3 px-6 font-medium text-gray-900">Salary</th>
            <th class="text-left py-3 px-6 font-medium text-gray-900">Status</th>
            <th class="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each filteredEmployees as employee}
            <tr class="border-b border-purple-50 hover:bg-purple-25 {editingEmployee?.id === employee.id ? 'bg-blue-50' : ''}">
              <td class="py-4 px-6">
                <div class="font-medium text-gray-900">{employee.name}</div>
              </td>
              <td class="py-4 px-6">
                <span class="px-2 py-1 rounded-full text-xs font-medium {getRoleBadgeColor(employee.role)}">
                  {employee.role}
                </span>
              </td>
              <td class="py-4 px-6 text-gray-600">{formatDate(employee.joinDate)}</td>
              <td class="py-4 px-6">
                <span class="font-medium text-gray-900">{employee.workingDays}</span>
                <span class="text-sm text-gray-500"> days</span>
              </td>
              <td class="py-4 px-6 text-gray-600">{employee.phone}</td>
              <td class="py-4 px-6 font-medium text-gray-900">{formatCurrency(employee.salary)}</td>
              <td class="py-4 px-6">
                <span class="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                  {employee.status}
                </span>
              </td>
              <td class="py-4 px-6">
                <div class="flex items-center space-x-2">
                  <button 
                    onclick={() => editEmployee(employee)}
                    class="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-100 rounded transition-colors"
                    title="Edit Employee"
                  >
                    ✏️
                  </button>
                  <button 
                    onclick={() => deleteEmployee(employee.id)}
                    class="text-red-600 hover:text-red-800 p-1 hover:bg-red-100 rounded transition-colors"
                    title="Delete Employee"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
