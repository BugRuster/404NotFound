// src/components/common/Button.jsx
import React from 'react';

const variants = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
  secondary: 'bg-white text-indigo-600 hover:bg-gray-50 border border-indigo-600',
  link: 'text-indigo-600 hover:text-indigo-700 underline'
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  className = '',
  as: Component = 'button',
  children,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200';
  const variantClasses = variants[variant];
  const sizeClasses = sizes[size];

  return (
    <Component
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};