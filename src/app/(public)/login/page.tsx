"use client";

import Link from "next/link";
import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 px-6">
          <div className="w-full max-w-md bg-white border rounded-2xl p-8 shadow-sm">
            <div className="mb-6">
              <div className="h-7 w-48 rounded bg-slate-200" />
              <div className="h-4 w-64 rounded bg-slate-100 mt-3" />
            </div>
            <div className="space-y-4">
              <div className="h-10 rounded bg-slate-100" />
              <div className="h-10 rounded bg-slate-100" />
              <div className="h-10 rounded bg-slate-200" />
            </div>
          </div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const searchParams = useSearchParams();
  const nextPath = useMemo(() => searchParams.get("next") || "/", [searchParams]);
  const error = searchParams.get("error");
  const message = useMemo(() => {
    if (error === "missing_env") return "Configuração de acesso ausente.";
    if (error === "invalid_state") return "Sessão de login expirada. Tente novamente.";
    if (error === "oauth_failed") return "Falha no login Google. Tente novamente.";
    if (error === "unauthorized") return "E-mail não autorizado.";
    return null;
  }, [error]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md bg-white border rounded-2xl p-8 shadow-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Acesso Entre Marés</h1>
          <p className="text-sm text-slate-500 mt-1">Entre com sua conta para continuar.</p>
        </div>

        <div className="space-y-4">
          {message ? (
            <div className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
              {message}
            </div>
          ) : null}

          <Link
            href={`/auth/google?next=${encodeURIComponent(nextPath)}`}
            className="w-full rounded-lg bg-slate-900 text-white py-2 text-sm font-medium hover:bg-slate-800 transition-colors flex items-center justify-center"
          >
            Entrar com Google
          </Link>
        </div>
      </div>
    </div>
  );
}
