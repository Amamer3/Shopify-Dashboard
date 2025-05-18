import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { Header } from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, UserPlus, Shield, ShieldOff, Key } from "lucide-react";
import { CreateUserDialog } from "@/components/users/CreateUserDialog";
import { ChangePasswordDialog } from "@/components/users/ChangePasswordDialog";
import { User } from "@/types/users";
import { usersService } from "@/services/users.service";
import { EditPermissionsDialog } from "@/components/users/EditPermissionsDialog";
import { Navigate, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [passwordChangeUser, setPasswordChangeUser] = useState<User | null>(null);
  const { user: currentUser, isAuthenticated, logout, getToken, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Handle session expiration with debug logging
  const handleSessionExpiration = useCallback(() => {
    console.log('Session expiration detected. Logging out...');
    logout();
    navigate("/login");
    toast({
      title: "Session Expired",
      description: "Your session has expired. Please log in again.",
      variant: "destructive",
    });
  }, [logout, navigate, toast]);

  // Load users data
  const loadUsers = useCallback(async () => {
    try {
      const token = getToken();
      console.log('Loading users with token:', token ? 'Present' : 'Missing');
      
      if (!token) {
        console.log('No token available, handling session expiration');
        handleSessionExpiration();
        return;
      }
      
      const fetchedUsers = await usersService.getUsers(token);
      console.log('Users loaded successfully:', fetchedUsers.length);
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error loading users:', error);
      
      if (
        error instanceof Error && (
          error.message.includes('401') ||
          error.message.includes('403') ||
          error.message.includes('expired')
        )
      ) {
        handleSessionExpiration();
        return;
      }

      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to load users",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [getToken, handleSessionExpiration, toast]);

  // Initialize data loading
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      console.log('Auth ready, loading users...');
      loadUsers();
    }
  }, [authLoading, isAuthenticated, loadUsers]);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login...');
    return <Navigate to="/login" />;
  }

  // Check if user has permission to access this page
  if (currentUser && !['admin', 'superadmin'].includes(currentUser.role)) {
    console.log('Insufficient permissions, redirecting to dashboard...');
    return <Navigate to="/dashboard" />;
  }

  const handleCreateUser = async (userData: any) => {
    try {
      const token = getToken();
      if (!token) {
        handleSessionExpiration();
        return;
      }

      await usersService.createUser(userData, token);
      toast({
        title: "Success",
        description: "User created successfully",
      });
      loadUsers();
      setShowCreateDialog(false);
    } catch (error) {
      if (error instanceof Error && (error.message.includes('401') || error.message.includes('403'))) {
        handleSessionExpiration();
        return;
      }
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create user",
        variant: "destructive",
      });
    }
  };

  const handleUpdatePermissions = async (userId: string, permissions: string[]) => {
    try {
      const token = getToken();
      if (!token) {
        handleSessionExpiration();
        return;
      }

      await usersService.updateUserPermissions(userId, permissions, token);
      toast({
        title: "Success",
        description: "User permissions updated successfully",
      });
      loadUsers();
      setEditingUser(null);
    } catch (error) {
      if (error instanceof Error && (error.message.includes('401') || error.message.includes('403'))) {
        handleSessionExpiration();
        return;
      }
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update permissions",
        variant: "destructive",
      });
    }
  };

  const handleUpdateStatus = async (userId: string, status: 'active' | 'inactive') => {
    try {
      const token = getToken();
      if (!token) {
        handleSessionExpiration();
        return;
      }

      await usersService.updateUserStatus(userId, status, token);
      toast({
        title: "Success",
        description: "User status updated successfully",
      });
      loadUsers();
    } catch (error) {
      if (error instanceof Error && (error.message.includes('401') || error.message.includes('403'))) {
        handleSessionExpiration();
        return;
      }
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const handlePasswordChange = async (newPassword: string) => {
    try {
      const token = getToken();
      if (!token || !passwordChangeUser) {
        handleSessionExpiration();
        return;
      }

      await usersService.updateUserPassword(passwordChangeUser.id, newPassword, token);
      toast({
        title: "Success",
        description: "Password updated successfully",
      });
      setPasswordChangeUser(null);
    } catch (error) {
      if (error instanceof Error && (error.message.includes('401') || error.message.includes('403'))) {
        handleSessionExpiration();
        return;
      }
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update password",
        variant: "destructive",
      });
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getBreadcrumbs = () => {
        const paths = location.pathname.split('/').filter(Boolean);
        return paths.map((path, index) => {
          const displayName = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
          const isLast = index === paths.length - 1;
          return (
            <span key={path} className="flex items-center">
              {index > 0 && <span className="mx-2 text-gray-400">/</span>}
              <span className={cn(
                "hover:text-primary cursor-pointer",
                isLast ? "text-gray-600" : "text-gray-400"
              )}>
                {displayName}
              </span>
            </span>
          );
        });
      };
  return (
    <div className="flex-1 bg-store-light-gray min-h-screen">
      {/* Breadcrumbs */}
        <div className="flex text-sm items-center h-6">
          {getBreadcrumbs()}
        </div> 
      
      <div className="container mx-auto px-4 py-6">
        {/* Actions Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          {currentUser?.role === 'superadmin' && (
            <Button
              onClick={() => setShowCreateDialog(true)}
              className="bg-store-purple hover:bg-purple-600"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          )}
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === 'superadmin' 
                        ? 'bg-purple-100 text-purple-800'
                        : user.role === 'admin'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {currentUser?.role === 'superadmin' && user.id !== currentUser.id && (
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPasswordChangeUser(user)}
                        >
                          <Key className="h-4 w-4 mr-1" />
                          Change Password
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingUser(user)}
                        >
                          <Shield className="h-4 w-4 mr-1" />
                          Permissions
                        </Button>
                        <Button
                          variant={user.status === 'active' ? 'destructive' : 'default'}
                          size="sm"
                          onClick={() => handleUpdateStatus(
                            user.id,
                            user.status === 'active' ? 'inactive' : 'active'
                          )}
                        >
                          {user.status === 'active' ? (
                            <ShieldOff className="h-4 w-4 mr-1" />
                          ) : (
                            <Shield className="h-4 w-4 mr-1" />
                          )}
                          {user.status === 'active' ? 'Deactivate' : 'Activate'}
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Create User Dialog */}
      {showCreateDialog && (
        <CreateUserDialog
          open={showCreateDialog}
          onClose={() => setShowCreateDialog(false)}
          onSubmit={handleCreateUser}
        />
      )}

      {/* Edit Permissions Dialog */}
      {editingUser && (
        <EditPermissionsDialog
          user={editingUser}
          open={!!editingUser}
          onClose={() => setEditingUser(null)}
          onSubmit={(permissions) => handleUpdatePermissions(editingUser.id, permissions)}
        />
      )}

      {/* Change Password Dialog */}
      {passwordChangeUser && (
        <ChangePasswordDialog
          userId={passwordChangeUser.id}
          open={!!passwordChangeUser}
          onClose={() => setPasswordChangeUser(null)}
          onSubmit={handlePasswordChange}
        />
      )}
    </div>
  );
}