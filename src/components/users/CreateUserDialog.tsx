import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordValidation } from "@/components/auth/PasswordValidation";
import { UserRole } from "@/types/users";
import { PASSWORD_RULES } from "@/lib/validation";

interface CreateUserDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const availablePermissions = [
  { id: 'view_products', label: 'View Products' },
  { id: 'edit_products', label: 'Edit Products' },
  { id: 'view_orders', label: 'View Orders' },
  { id: 'manage_orders', label: 'Manage Orders' },
  { id: 'view_customers', label: 'View Customers' },
  { id: 'manage_customers', label: 'Manage Customers' },
  { id: 'view_analytics', label: 'View Analytics' },
  { id: 'manage_users', label: 'Manage Users' },
];

export function CreateUserDialog({ open, onClose, onSubmit }: CreateUserDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin" as UserRole,
    permissions: [] as string[],
  });

  const [isValid, setIsValid] = useState(false);

  const validatePassword = (password: string) => {
    return (
      password.length >= PASSWORD_RULES.minLength &&
      PASSWORD_RULES.hasUpperCase(password) &&
      PASSWORD_RULES.hasLowerCase(password) &&
      PASSWORD_RULES.hasNumber(password) &&
      PASSWORD_RULES.hasSpecialChar(password)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword(formData.password)) {
      return;
    }
    onSubmit(formData);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setFormData(prev => ({ ...prev, password: newPassword }));
    setIsValid(validatePassword(newPassword));
  };

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: checked
        ? [...prev.permissions, permissionId]
        : prev.permissions.filter(id => id !== permissionId)
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Add a new user and set their permissions
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handlePasswordChange}
                required
              />
              <PasswordValidation password={formData.password} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value: UserRole) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Permissions</Label>
              <div className="grid grid-cols-2 gap-4">
                {availablePermissions.map((permission) => (
                  <div key={permission.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={permission.id}
                      checked={formData.permissions.includes(permission.id)}
                      onCheckedChange={(checked) => 
                        handlePermissionChange(permission.id, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={permission.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {permission.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid}>
              Create User
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
