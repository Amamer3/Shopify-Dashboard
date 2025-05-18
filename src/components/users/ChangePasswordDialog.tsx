import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordValidation } from "@/components/auth/PasswordValidation";
import { PASSWORD_RULES } from "@/lib/validation";

interface ChangePasswordDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
  userId: string;
}

export function ChangePasswordDialog({ open, onClose, onSubmit, userId }: ChangePasswordDialogProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    
    if (!validatePassword(password)) {
      setError("Password does not meet the requirements");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(null);
    onSubmit(password);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsValid(validatePassword(newPassword));
    setError(null);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter a new password for this user
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <PasswordValidation password={password} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="text-sm text-red-500">
                {error}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!isValid || !confirmPassword || password !== confirmPassword}
            >
              Change Password
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
