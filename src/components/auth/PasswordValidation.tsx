import { PASSWORD_RULES } from "../../lib/validation";

interface PasswordValidationProps {
  password: string;
}

export const PasswordValidation = ({ password }: PasswordValidationProps) => {
  return (
    <div className="text-xs text-gray-500 space-y-1">
      <p>Password must:</p>
      <ul className="list-disc pl-4">
        <li className={password.length >= PASSWORD_RULES.minLength ? "text-green-600" : ""}>
          Be at least {PASSWORD_RULES.minLength} characters long
        </li>
        <li className={PASSWORD_RULES.hasUpperCase(password) ? "text-green-600" : ""}>
          Contain at least one uppercase letter
        </li>
        <li className={PASSWORD_RULES.hasLowerCase(password) ? "text-green-600" : ""}>
          Contain at least one lowercase letter
        </li>
        <li className={PASSWORD_RULES.hasNumber(password) ? "text-green-600" : ""}>
          Contain at least one number
        </li>
        <li className={PASSWORD_RULES.hasSpecialChar(password) ? "text-green-600" : ""}>
          Contain at least one special character (!@#$%^&*(),.?":{}|&lt;&gt;)
        </li>
      </ul>
    </div>
  );
};
