import React from 'react';

const Button = ({ 
    className = "", 
    size = "default", 
    variant = "primary", 
    onClick, 
    children, 
    type = "button" 
}) => {
    const baseClasses = 'relative inline-flex items-center justify-center overflow-hidden rounded-full font-semibold transition-all duration-300 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer';
    
    const variantClasses = {
        primary: 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-[0_0_20px_rgba(20,184,166,0.4)] shadow-lg shadow-primary/25',
        secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700 hover:text-white',
        outline: 'border border-primary/30 bg-transparent text-primary hover:bg-primary/10 hover:border-primary/60',
        glass: 'glass text-teal-400 hover:bg-white/10 hover:text-white hover:border-primary/40'
    };

    const sizeClasses = {
        sm: 'px-5 py-2 text-sm',
        default: 'px-7 py-3 text-base',
        lg: 'px-9 py-4 text-lg',
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    return (
        <button type={type} onClick={onClick} className={classes}>
            <span className="relative flex items-center justify-center gap-2">
                {children}
            </span>
        </button>
    );
};

export default Button;
