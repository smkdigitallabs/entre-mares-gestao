"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function SubmitButton({ children, className }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${className ?? ""} inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin" size={16} />
          Enviando...
        </>
      ) : (
        children
      )}
    </button>
  );
}
