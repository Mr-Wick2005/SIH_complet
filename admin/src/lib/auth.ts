export interface User {
  id: string;
  name: string;
  email: string;
  role: 'department-admin' | 'field-officer';
  department: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Mock users for demonstration
export const mockUsers: Record<string, { password: string; user: User }> = {
  'admin@civic.gov': {
    password: 'admin123',
    user: {
      id: '1',
      name: 'Sarah Wilson',
      email: 'admin@civic.gov',
      role: 'department-admin',
      department: 'main-department',
    }
  },
  'worker@civic.gov': {
    password: 'worker123',
    user: {
      id: '2',
      name: 'Mike Chen',
      email: 'worker@civic.gov',
      role: 'field-officer',
      department: 'main-department',
    }
  },
};

export const authenticateUser = (email: string, password: string): User | null => {
  const userRecord = mockUsers[email];
  if (userRecord && userRecord.password === password) {
    return userRecord.user;
  }
  return null;
};

export const hasPermission = (user: User | null, permission: string): boolean => {
  if (!user) return false;
  
  switch (permission) {
    case 'view-all-reports':
      return user.role === 'department-admin'; // Department admin can view all reports in their department
    case 'manage-departments':
      return user.role === 'department-admin'; // Department admin can manage their own department
    case 'assign-reports':
      return user.role === 'department-admin';
    case 'update-report-status':
      return true; // All authenticated users can update status
    case 'view-analytics':
      return user.role === 'department-admin';
    default:
      return false;
  }
};