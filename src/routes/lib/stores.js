import { writable, derived } from "svelte/store"

// Employee Store
export const employees = writable([
  {
    id: 1,
    name: "Raj Kumar",
    role: "Chef",
    joinDate: "2024-01-15",
    workingDays: 25,
    phone: "+91 9876543210",
    salary: 25000,
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Cashier",
    joinDate: "2024-01-10",
    workingDays: 28,
    phone: "+91 9876543211",
    salary: 20000,
    status: "Active",
  },
  {
    id: 3,
    name: "Amit Singh",
    role: "Worker",
    joinDate: "2024-01-20",
    workingDays: 22,
    phone: "+91 9876543212",
    salary: 18000,
    status: "Active",
  },
  {
    id: 4,
    name: "Sunita Devi",
    role: "Chef",
    joinDate: "2023-12-05",
    workingDays: 45,
    phone: "+91 9876543213",
    salary: 28000,
    status: "Active",
  },
  {
    id: 5,
    name: "Ramesh Gupta",
    role: "Worker",
    joinDate: "2024-01-25",
    workingDays: 18,
    phone: "+91 9876543214",
    salary: 17000,
    status: "Active",
  },
])

// Products Store
export const products = writable([
  {
    id: 1,
    name: "Gulab Jamun",
    category: "Indian Sweet",
    price: 40,
    stock: 150,
    minStock: 20,
    description: "Soft, spongy balls soaked in sugar syrup",
  },
  {
    id: 2,
    name: "Rasgulla",
    category: "Indian Sweet",
    price: 35,
    stock: 8,
    minStock: 25,
    description: "Spongy cottage cheese balls in sugar syrup",
  },
  {
    id: 3,
    name: "Peda",
    category: "Indian Sweet",
    price: 50,
    stock: 0,
    minStock: 30,
    description: "Traditional milk-based sweet",
  },
  {
    id: 4,
    name: "Burfi",
    category: "Indian Sweet",
    price: 45,
    stock: 75,
    minStock: 15,
    description: "Dense milk-based sweet confection",
  },
  {
    id: 5,
    name: "Cham Cham",
    category: "Indian Sweet",
    price: 38,
    stock: 12,
    minStock: 20,
    description: "Cylindrical cottage cheese sweet",
  },
  {
    id: 6,
    name: "Kaju Katli",
    category: "Indian Sweet",
    price: 80,
    stock: 60,
    minStock: 10,
    description: "Diamond-shaped cashew sweet",
  },
  {
    id: 7,
    name: "Jalebi",
    category: "Indian Sweet",
    price: 30,
    stock: 25,
    minStock: 15,
    description: "Spiral-shaped deep-fried sweet",
  },
  {
    id: 8,
    name: "Laddu",
    category: "Indian Sweet",
    price: 25,
    stock: 90,
    minStock: 20,
    description: "Round sweet balls made from flour",
  },
])

// Notifications Store
export const notifications = writable([
  {
    id: 1,
    message: "Rasgulla stock is running low (8 pieces left)",
    type: "warning",
    time: "5 min ago",
    page: "stock",
    productId: 2,
  },
  {
    id: 2,
    message: "Peda is out of stock",
    type: "error",
    time: "10 min ago",
    page: "stock",
    productId: 3,
  },
  {
    id: 3,
    message: "New employee Raj Kumar added",
    type: "info",
    time: "1 hour ago",
    page: "employees",
    employeeId: 1,
  },
])

// Derived stores for dashboard stats
export const employeeStats = derived(employees, ($employees) => ({
  total: $employees.length,
  chefs: $employees.filter((e) => e.role === "Chef").length,
  cashiers: $employees.filter((e) => e.role === "Cashier").length,
  workers: $employees.filter((e) => e.role === "Worker").length,
  recent: $employees.slice(-3),
}))

export const productStats = derived(products, ($products) => ({
  total: $products.length,
  inStock: $products.filter((p) => p.stock > p.minStock).length,
  lowStock: $products.filter((p) => p.stock <= p.minStock && p.stock > 0).length,
  outOfStock: $products.filter((p) => p.stock === 0).length,
  lowStockItems: $products.filter((p) => p.stock <= p.minStock),
}))

// Store actions
export const employeeActions = {
  add: (employee) => {
    employees.update((list) => {
      const newEmployee = {
        ...employee,
        id: Math.max(...list.map((e) => e.id)) + 1,
        joinDate: new Date().toISOString().split("T")[0],
        workingDays: 0,
        status: "Active",
      }

      // Add notification
      notifications.update((notifs) => [
        {
          id: Date.now(),
          message: `New employee ${employee.name} added`,
          type: "info",
          time: "Just now",
          page: "employees",
          employeeId: newEmployee.id,
        },
        ...notifs,
      ])

      return [...list, newEmployee]
    })
  },

  delete: (id) => {
    employees.update((list) => {
      const employee = list.find((e) => e.id === id)
      if (employee) {
        notifications.update((notifs) => [
          {
            id: Date.now(),
            message: `Employee ${employee.name} removed`,
            type: "info",
            time: "Just now",
            page: "employees",
          },
          ...notifs,
        ])
      }
      return list.filter((e) => e.id !== id)
    })
  },
}

export const productActions = {
  add: (product) => {
    products.update((list) => {
      const newProduct = {
        ...product,
        id: Math.max(...list.map((p) => p.id)) + 1,
      }

      // Add notification
      notifications.update((notifs) => [
        {
          id: Date.now(),
          message: `New product ${product.name} added`,
          type: "info",
          time: "Just now",
          page: "products",
          productId: newProduct.id,
        },
        ...notifs,
      ])

      return [...list, newProduct]
    })
  },

  delete: (id) => {
    products.update((list) => {
      const product = list.find((p) => p.id === id)
      if (product) {
        notifications.update((notifs) => [
          {
            id: Date.now(),
            message: `Product ${product.name} removed`,
            type: "info",
            time: "Just now",
            page: "products",
          },
          ...notifs,
        ])
      }
      return list.filter((p) => p.id !== id)
    })
  },

  updateStock: (id, newStock) => {
    products.update((list) => {
      return list.map((product) => {
        if (product.id === id) {
          const updatedProduct = { ...product, stock: newStock }

          // Update notifications based on stock level
          notifications.update((notifs) => {
            // Remove old stock notifications for this product
            const filtered = notifs.filter((n) => n.productId !== id || (n.type !== "warning" && n.type !== "error"))

            // Add new notification if needed
            if (newStock === 0) {
              filtered.unshift({
                id: Date.now(),
                message: `${product.name} is out of stock`,
                type: "error",
                time: "Just now",
                page: "stock",
                productId: id,
              })
            } else if (newStock <= product.minStock) {
              filtered.unshift({
                id: Date.now(),
                message: `${product.name} stock is running low (${newStock} pieces left)`,
                type: "warning",
                time: "Just now",
                page: "stock",
                productId: id,
              })
            } else {
              filtered.unshift({
                id: Date.now(),
                message: `${product.name} restocked successfully`,
                type: "info",
                time: "Just now",
                page: "stock",
                productId: id,
              })
            }

            return filtered
          })

          return updatedProduct
        }
        return product
      })
    })
  },
}

export const notificationActions = {
  remove: (id) => {
    notifications.update((list) => list.filter((n) => n.id !== id))
  },

  markAsRead: (id) => {
    notifications.update((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)))
  },
}
