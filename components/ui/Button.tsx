import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = "primary", 
  fullWidth = false,
  className = "",
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold transition-colors duration-200 rounded-lg px-6 py-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green focus:ring-offset-brand-black";
  
  const variants = {
    primary: "bg-brand-green text-brand-black hover:bg-brand-greenHover shadow-lg shadow-brand-green/20",
    secondary: "bg-white text-brand-black hover:bg-gray-100",
    outline: "border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-brand-black"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};