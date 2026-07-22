export interface UserPermissions {
  // Inventory
  canViewInventory: boolean;
  canStockIn: boolean;
  canStockOut: boolean;
  canExportInventory: boolean;

  // Products
  canViewProducts: boolean;
  canManageProducts: boolean;

  // Billing
  canCreateBill: boolean;
  canCancelBill: boolean;

  // Customers
  canViewCustomers: boolean;
  canManageCustomers: boolean;

  // Sales History
  canDeleteMonthlySales: boolean;

  // Reports
  canViewReports: boolean;

  // Staff
  canManageStaff: boolean;

  // Settings
  canManageSettings: boolean;
}

export const getPermissions = (role: string): UserPermissions => {
  const isOwner = role === "owner";

  return {
    // Inventory
    canViewInventory: true,
    canStockIn: isOwner,
    canStockOut: true,
    canExportInventory: isOwner,

    // Products
    canViewProducts: true,
    canManageProducts: isOwner,

    // Billing
    canCreateBill: true,
    canCancelBill: isOwner,

    // Customers
    canViewCustomers: true,
    canManageCustomers: isOwner,

    // Sales History
    canDeleteMonthlySales: isOwner,

    // Reports
    canViewReports: isOwner,

    // Staff
    canManageStaff: isOwner,

    // Settings
    canManageSettings: isOwner,
  };
};