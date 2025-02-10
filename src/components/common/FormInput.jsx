// src/components/common/FormInput.jsx
import React from 'react';

const FormInput = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  className = '',
}) => {
  return (
    <div className="space-y-2">
      <label 
        htmlFor={name} 
        className="block text-sm font-medium text-secondary-light dark:text-secondary-dark"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`
            w-full px-4 py-2.5 
            bg-white/5 dark:bg-black/5 
            border border-gray-200 dark:border-gray-700
            rounded-lg
            text-secondary-light dark:text-secondary-dark
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-primary-light/50 dark:focus:ring-primary-dark/50
            transition-all duration-200
            ${error ? 'border-red-500 dark:border-red-500' : 'hover:border-primary-light/50 dark:hover:border-primary-dark/50'}
            ${className}
          `}
        />
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-lg pointer-events-none transition-all duration-300">
          <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100">
            <div className="absolute inset-0 rounded-lg bg-primary-light/10 dark:bg-primary-dark/10 blur-sm" />
          </div>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500 dark:text-red-400 mt-1 animate-slideIn">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;