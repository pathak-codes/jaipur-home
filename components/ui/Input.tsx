import { InputHTMLAttributes, forwardRef, TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, className = "", id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-[var(--foreground)]">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)] w-4 h-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
                {leftIcon}
              </svg>
            </span>
          )}
          <input
            ref={ref}
            id={id}
            className={`
              h-11 px-3 rounded-lg border border-[var(--border)]
              bg-[var(--background)] text-[var(--foreground)]
              placeholder:text-[var(--muted)]
              focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:border-[var(--focus)]
              disabled:opacity-50 w-full
              ${leftIcon ? "pl-10" : ""}
              ${error ? "border-[var(--danger)]" : ""}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <span className="text-xs text-[var(--danger)]">{error}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-[var(--foreground)]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          rows={4}
          className={`
            px-3 py-3 rounded-lg border border-[var(--border)]
            bg-[var(--background)] text-[var(--foreground)]
            placeholder:text-[var(--muted)]
            focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:border-[var(--focus)]
            disabled:opacity-50 w-full resize-none
            ${error ? "border-[var(--danger)]" : ""}
            ${className}
          `}
          {...props}
        />
        {error && <span className="text-xs text-[var(--danger)]">{error}</span>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
