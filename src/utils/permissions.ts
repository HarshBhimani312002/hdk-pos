export interface UserPermissions {
  // Inventory
  canStockIn: boolean;
  canStockOut: boolean;
  canExportInventory: boolean;

  // Products
  canManageProducts: boolean;

  // Billing
  canCreateBill: boolean;
  canCancelBill: boolean;

  // Customers
  canManageCustomers: boolean;

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
    canStockIn: isOwner,
    canStockOut: true,
    canExportInventory: isOwner,

    // Products
    canManageProducts: isOwner,

    // Billing
    canCreateBill: true,
    canCancelBill: isOwner,

    // Customers
    canManageCustomers: isOwner,

    // Reports
    canViewReports: isOwner,

    // Staff
    canManageStaff: isOwner,

    // Settings
    canManageSettings: isOwner,
  };
};