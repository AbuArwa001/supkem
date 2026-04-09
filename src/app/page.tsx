// src/app/page.tsx
// Root redirect — sends bare "/" to "/en" (the default locale).
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/en');
}
