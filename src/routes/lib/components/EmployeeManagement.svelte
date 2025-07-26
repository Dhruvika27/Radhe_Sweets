<script>
  import { run } from 'svelte/legacy';

  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Badge } from '$lib/components/ui/badge';
  import { Plus, Search, Edit, Trash2 } from 'lucide-svelte';

  let searchTerm = $state('');

  // Mock employee data
  let employees = [
    {
      id: 1,
      name: 'Raj Kumar',
      role: 'Chef',
      joinDate: '2024-01-15',
      workingDays: 25,
      phone: '+91 9876543210',
      salary: 25000,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'Cashier',
      joinDate: '2024-01-10',
      workingDays: 28,
      phone: '+91 9876543211',
      salary: 20000,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Amit Singh',
      role: 'Worker',
      joinDate: '2024-01-20',
      workingDays: 22,
      phone: '+91 9876543212',
      salary: 18000,
      status: 'Active'
    },
    {
      id: 4,
      name: 'Sunita Devi',
      role: 'Chef',
      joinDate: '2023-12-05',
      workingDays: 45,
      phone: '+91 9876543213',
      salary: 28000,
      status: 'Active'
    },
    {
      id: 5,
      name: 'Ramesh Gupta',
      role: 'Worker',
      joinDate: '2024-01-25',
      workingDays: 18,
      phone: '+91 9876543214',
      salary: 17000,
      status: 'Active'
    }
  ];

  let filteredEmployees = $state(employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase())
  ));

  function getRoleBadgeColor(role) {
    switch (role) {
      case 'Chef': return 'bg-green-100 text-green-800';
      case 'Cashier': return 'bg-blue-100 text-blue-800';
      case 'Worker': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
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

  run(() => {
    filteredEmployees = employees.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Employee Management</h1>
      <p class="text-gray-600">Manage your sweet shop team</p>
    </div>
    <Button class="flex items-center space-x-2">
      <Plus class="w-4 h-4" />
      <span>Add Employee</span>
    </Button>
  </div>

  <!-- Search and Filters -->
  <Card>
    <CardContent class="p-6">
      <div class="flex items-center space-x-4">
        <div class="relative flex-1">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search employees by name or role..."
            bind:value={searchTerm}
            class="pl-10"
          />
        </div>
      </div>
    </CardContent>
  </Card>

  <!-- Employee Stats -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <Card>
      <CardContent class="p-6">
        <div class="text-center">
          <p class="text-2xl font-bold text-gray-900">{employees.length}</p>
          <p class="text-sm text-gray-600">Total Employees</p>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent class="p-6">
        <div class="text-center">
          <p class="text-2xl font-bold text-green-600">{employees.filter(e => e.role === 'Chef').length}</p>
          <p class="text-sm text-gray-600">Chefs</p>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent class="p-6">
        <div class="text-center">
          <p class="text-2xl font-bold text-blue-600">{employees.filter(e => e.role === 'Cashier').length}</p>
          <p class="text-sm text-gray-600">Cashiers</p>
        </div>
      </CardContent>
    </Card>
  </div>

  <!-- Employee Table -->
  <Card>
    <CardHeader>
      <CardTitle>Employee Details</CardTitle>
      <CardDescription>Complete information about your team members</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b">
              <th class="text-left py-3 px-4 font-medium text-gray-900">Name</th>
              <th class="text-left py-3 px-4 font-medium text-gray-900">Role</th>
              <th class="text-left py-3 px-4 font-medium text-gray-900">Join Date</th>
              <th class="text-left py-3 px-4 font-medium text-gray-900">Working Days</th>
              <th class="text-left py-3 px-4 font-medium text-gray-900">Phone</th>
              <th class="text-left py-3 px-4 font-medium text-gray-900">Salary</th>
              <th class="text-left py-3 px-4 font-medium text-gray-900">Status</th>
              <th class="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each filteredEmployees as employee}
              <tr class="border-b hover:bg-gray-50">
                <td class="py-3 px-4">
                  <div class="font-medium text-gray-900">{employee.name}</div>
                </td>
                <td class="py-3 px-4">
                  <Badge class={getRoleBadgeColor(employee.role)}>{employee.role}</Badge>
                </td>
                <td class="py-3 px-4 text-gray-600">{formatDate(employee.joinDate)}</td>
                <td class="py-3 px-4">
                  <span class="font-medium text-gray-900">{employee.workingDays}</span>
                  <span class="text-sm text-gray-500">days</span>
                </td>
                <td class="py-3 px-4 text-gray-600">{employee.phone}</td>
                <td class="py-3 px-4 font-medium text-gray-900">{formatCurrency(employee.salary)}</td>
                <td class="py-3 px-4">
                  <Badge class="bg-green-100 text-green-800">{employee.status}</Badge>
                </td>
                <td class="py-3 px-4">
                  <div class="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit class="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" class="text-red-600 hover:text-red-700">
                      <Trash2 class="w-4 h-4" />
                    </Button>
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
