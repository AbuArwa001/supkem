export interface PasswordStrengthResult {
  score: number;
  label: string;
  color: string;
  textColor?: string;
}

export function calculatePasswordStrength(pwd: string): PasswordStrengthResult {
  if (!pwd) return { score: 0, label: "", color: "bg-slate-200" };
  let score = 0;
  if (pwd.length >= 8) score += 1;
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score += 1;
  if (/\d/.test(pwd)) score += 1;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) score += 1;

  if (score <= 1) return { score: 25, label: "Weak", color: "bg-rose-500", textColor: "text-rose-500" };
  if (score === 2) return { score: 50, label: "Fair", color: "bg-amber-500", textColor: "text-amber-500" };
  if (score === 3) return { score: 75, label: "Good", color: "bg-blue-500", textColor: "text-blue-500" };
  return { score: 100, label: "Strong", color: "bg-emerald-500", textColor: "text-emerald-500" };
}
