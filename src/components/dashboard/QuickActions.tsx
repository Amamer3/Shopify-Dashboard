import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { usePermissions } from '@/hooks/use-permissions';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  ShoppingCart,
  UserPlus,
  Tags,
  Settings
} from 'lucide-react';

export function QuickActions() {
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();

  const actions = [
    {
      label: 'Add Product',
      icon: Package,
      onClick: () => navigate('/products/new'),
      permission: 'create_product'
    },
    {
      label: 'New Order',
      icon: ShoppingCart,
      onClick: () => navigate('/orders/new'),
      permission: 'create_order'
    },
    {
      label: 'Add Customer',
      icon: UserPlus,
      onClick: () => navigate('/customers/new'),
      permission: 'create_user'
    },
    {
      label: 'Manage Categories',
      icon: Tags,
      onClick: () => navigate('/categories'),
      permission: 'view_categories'
    },
    {
      label: 'Settings',
      icon: Settings,
      onClick: () => navigate('/settings'),
      permission: 'manage_settings'
    }
  ];

  const availableActions = actions.filter(action => hasPermission(action.permission));

  if (availableActions.length === 0) {
    return null;
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {availableActions.map((action) => (
          <Button
            key={action.label}
            variant="outline"
            className="flex flex-col items-center justify-center h-24 space-y-2"
            onClick={action.onClick}
          >
            <action.icon className="w-6 h-6" />
            <span>{action.label}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
}
