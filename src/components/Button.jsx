import React from 'react';

const Button = ({
    className = '',
    size = 'default',
    variant = 'primary',
    onClick,
    children,
    type = 'button',
    disabled = false,
}) => {
    const baseClasses =
        'relative inline-flex items-center justify-center overflow-hidden rounded-full font-orbitron font-semibold tracking-wide transition-all duration-300 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

    const variantClasses = {
        primary:
            'bg-gradient-to-r from-primary to-secondary text-slate-950 font-bold hover:shadow-[0_0_20px_rgba(20,184,166,0.45)] shadow-lg shadow-primary/25',
        secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700 hover:text-white',
        outline:
            'border border-primary/40 bg-transparent text-primary hover:bg-primary/10 hover:border-primary/70',
        glass: 'glass text-teal-400 hover:bg-white/10 hover:text-white hover:border-primary/40',
    };

    const sizeClasses = {
        sm: 'px-5 py-2 text-xs',
        default: 'px-7 py-3 text-sm',
        lg: 'px-8 py-4 text-sm md:text-base',
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    return (
        <button type={type} onClick={onClick} disabled={disabled} className={classes}>
            <span className="relative flex items-center justify-center gap-2">{children}</span>
        </button>
    );
};

export default Button;
