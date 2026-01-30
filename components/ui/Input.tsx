import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({ label, error, hint, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
          {props.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        className={`w-full px-3 py-2 bg-white border rounded-lg text-slate-900 placeholder:text-slate-400 transition-colors
          focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
          ${error ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-300 hover:border-slate-400'}
          ${className}`}
        {...props}
      />
      {hint && !error && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Textarea({
  label,
  error,
  hint,
  className = '',
  ...props
}: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
          {props.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <textarea
        className={`w-full px-3 py-2 bg-white border rounded-lg text-slate-900 placeholder:text-slate-400 transition-colors resize-y
          focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
          ${error ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-300 hover:border-slate-400'}
          ${className}`}
        rows={4}
        {...props}
      />
      {hint && !error && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({
  label,
  error,
  options,
  className = '',
  ...props
}: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
          {props.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <select
        className={`w-full px-3 py-2 bg-white border rounded-lg text-slate-900 transition-colors appearance-none
          bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%2364748b%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%20.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')]
          bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center] bg-no-repeat pr-10
          focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
          ${error ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-300 hover:border-slate-400'}
          ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}
