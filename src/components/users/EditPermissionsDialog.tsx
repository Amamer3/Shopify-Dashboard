import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { User } from "@/types/users";

interface EditPermissionsDialogProps {
  user: User;
  open: boolean;
  onClose: () => void;
  onSubmit: (permissions: string[]) => void;
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

export function EditPermissionsDialog({ user, open, onClose, onSubmit }: EditPermissionsDialogProps) {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  useEffect(() => {
    setSelectedPermissions(user.permissions || []);
  }, [user]);

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setSelectedPermissions(prev => 
      checked
        ? [...prev, permissionId]
        : prev.filter(id => id !== permissionId)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(selectedPermissions);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit User Permissions</DialogTitle>
            <DialogDescription>
              Modify permissions for {user.name}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Permissions</Label>
              <div className="grid grid-cols-2 gap-4">
                {availablePermissions.map((permission) => (
                  <div key={permission.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={permission.id}
                      checked={selectedPermissions.includes(permission.id)}
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
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
