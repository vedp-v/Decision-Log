import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-blue-500 shadow-sm',
    secondary:
      'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:border-slate-400 active:bg-slate-100 focus-visible:ring-slate-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-500 shadow-sm',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200 focus-visible:ring-slate-500',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
