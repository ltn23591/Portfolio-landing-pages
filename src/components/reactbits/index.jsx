import React, { useState, useEffect, useRef } from 'react';

/**
 * React Bits - ShinyText
 * https://reactbits.dev/text-animations/shiny-text
 */
export const ShinyText = ({ text, disabled = false, speed = 4, className = '' }) => {
    const animationDuration = `${speed}s`;
    return (
        <span
            className={`inline-block text-teal-400 bg-clip-text ${disabled ? '' : 'animate-rb-shine'} ${className}`}
            style={{
                backgroundImage:
                    'linear-gradient(120deg, rgba(45, 212, 191, 0.9) 35%, rgba(255, 255, 255, 1) 50%, rgba(45, 212, 191, 0.9) 65%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animationDuration,
            }}
        >
            {text}
        </span>
    );
};

/**
 * React Bits - GradientText
 * https://reactbits.dev/text-animations/gradient-text
 */
export const GradientText = ({
    children,
    className = '',
    colors = ['#14b8a6', '#0ea5e9', '#10b981', '#14b8a6'],
}) => {
    const gradientStyle = {
        backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    };

    return (
        <span
            className={`inline-block text-transparent bg-clip-text animate-rb-gradient ${className}`}
            style={gradientStyle}
        >
            {children}
        </span>
    );
};

/**
 * React Bits - BlurText
 * https://reactbits.dev/text-animations/blur-text
 */
export const BlurText = ({
    text = '',
    delay = 60,
    className = '',
    animateBy = 'words',
}) => {
    const elements = animateBy === 'words' ? text.split(' ') : text.split('');
    const [inView, setInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const hasJustify = className.includes('justify-');
    const justifyClass = hasJustify ? '' : 'justify-center';

    return (
        <span ref={ref} className={`inline-flex flex-wrap ${justifyClass} ${className}`}>
            {elements.map((el, index) => (
                <span
                    key={index}
                    style={{
                        transitionDelay: `${index * delay}ms`,
                    }}
                    className={`inline-block transition-all duration-700 ease-out ${
                        inView
                            ? 'opacity-100 translate-y-0 blur-0'
                            : 'opacity-0 translate-y-4 blur-md'
                    }`}
                >
                    {el}
                    {animateBy === 'words' && index < elements.length - 1 ? '\u00A0' : ''}
                </span>
            ))}
        </span>
    );
};

/**
 * React Bits - DecryptedText
 * https://reactbits.dev/text-animations/decrypted-text
 */
export const DecryptedText = ({
    text = '',
    speed = 35,
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*',
    className = '',
}) => {
    const [displayText, setDisplayText] = useState(text);
    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split('')
                    .map((char, index) => {
                        if (char === ' ') return ' ';
                        if (index < iteration) {
                            return text[index];
                        }
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join('')
            );

            if (iteration >= text.length) {
                clearInterval(interval);
            }
            iteration += 1 / 2;
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, characters, trigger]);

    return (
        <span
            onMouseEnter={() => setTrigger((prev) => prev + 1)}
            className={`inline-block cursor-default ${className}`}
        >
            {displayText}
        </span>
    );
};

/**
 * React Bits - SpotlightCard
 * https://reactbits.dev/components/spotlight-card
 */
export const SpotlightCard = ({
    children,
    className = '',
    spotlightColor = 'rgba(20, 184, 166, 0.18)',
    onClick,
}) => {
    const divRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div
            ref={divRef}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
            className={`relative rounded-2xl border border-white/10 bg-[#0c1219]/85 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-primary/40 ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-500 z-0"
                style={{
                    opacity,
                    background: `radial-gradient(550px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
                }}
            />
            <div className="relative z-10 h-full">{children}</div>
        </div>
    );
};

/**
 * React Bits - TiltedCard
 * https://reactbits.dev/components/tilted-card
 */
export const TiltedCard = ({
    children,
    className = '',
    maxTilt = 8,
    scale = 1.02,
}) => {
    const cardRef = useRef(null);
    const [transformStyle, setTransformStyle] = useState(
        'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    );

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        setTransformStyle(
            `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
        );
    };

    const handleMouseLeave = () => {
        setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: transformStyle,
                transition: 'transform 0.25s cubic-bezier(0.03, 0.98, 0.52, 0.99)',
                transformStyle: 'preserve-3d',
            }}
            className={className}
        >
            {children}
        </div>
    );
};

/**
 * React Bits - StarBorder
 * https://reactbits.dev/animations/star-border
 */
export const StarBorder = ({
    className = '',
    color = '#14b8a6',
    speed = '5s',
    children,
    ...rest
}) => {
    return (
        <div
            className={`relative inline-block py-[1px] overflow-hidden rounded-2xl ${className}`}
            {...rest}
        >
            <div
                className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full z-0 pointer-events-none"
                style={{
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    animation: `rb-star-bottom ${speed} linear infinite alternate`,
                }}
            />
            <div
                className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full z-0 pointer-events-none"
                style={{
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    animation: `rb-star-top ${speed} linear infinite alternate`,
                }}
            />
            <div className="relative z-10 bg-[#0b1118]/95 border border-white/10 rounded-2xl">
                {children}
            </div>
        </div>
    );
};

/**
 * React Bits - Magnet
 * https://reactbits.dev/animations/magnet
 */
export const Magnet = ({ children, padding = 40, magnetStrength = 3, className = '' }) => {
    const magnetRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isActive, setIsActive] = useState(false);

    const handleMouseMove = (e) => {
        if (!magnetRef.current) return;
        const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const distX = Math.abs(centerX - e.clientX);
        const distY = Math.abs(centerY - e.clientY);

        if (distX < width / 2 + padding && distY < height / 2 + padding) {
            setIsActive(true);
            setPosition({
                x: (e.clientX - centerX) / magnetStrength,
                y: (e.clientY - centerY) / magnetStrength,
            });
        } else {
            setIsActive(false);
            setPosition({ x: 0, y: 0 });
        }
    };

    const handleMouseLeave = () => {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
    };

    return (
        <div
            ref={magnetRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`inline-block ${className}`}
        >
            <div
                style={{
                    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                    transition: isActive ? 'transform 0.15s ease-out' : 'transform 0.4s ease-in-out',
                }}
            >
                {children}
            </div>
        </div>
    );
};
