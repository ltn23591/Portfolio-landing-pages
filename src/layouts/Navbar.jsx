import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { Menu, X } from 'lucide-react';

const Navbar = ({ logoText = 'LE TRUNG NGHIA' }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    const navLinks = [
        { href: '#about', id: 'about', label: 'Về Tôi' },
        { href: '#projects', id: 'projects', label: 'Dự Án' },
        { href: '#experience', id: 'experience', label: 'Kinh Nghiệm' },
        { href: '#testimonials', id: 'testimonials', label: 'Đánh Giá' },
        { href: '#contact', id: 'contact', label: 'Liên Hệ' },
        { href: '#tech-docs', id: 'tech-docs', label: 'Tài Liệu' },
        { href: '#tech-docs-toolbox', id: 'tech-docs-toolbox', label: 'Công Cụ Dev' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (window.location.hash.startsWith('#tech-docs')) {
                setActiveSection(window.location.hash.replace('#', ''));
                return;
            }
            setIsScrolled(window.scrollY > 30);
            
            // Check active section (filter out tech-docs which has no DOM element on homepage)
            const sections = navLinks
                .filter(l => !l.id.startsWith('tech-docs'))
                .map(link => document.getElementById(link.id));
            let current = 'hero';
            
            const scrollPosition = window.scrollY + 200;
            
            for (const section of sections) {
                if (section && scrollPosition >= section.offsetTop) {
                    current = section.id;
                }
            }
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e, href) => {
        if (href.startsWith('#tech-docs') || window.location.hash.startsWith('#tech-docs')) {
            setIsMobileMenuOpen(false);
            if (href.startsWith('#tech-docs')) {
                window.location.hash = href;
            } else {
                window.location.href = '/' + href;
            }
            return;
        }
        e.preventDefault();
        const targetId = href.replace('#', '');
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            setIsMobileMenuOpen(false);
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };

    const isTechDocsPage = typeof window !== 'undefined' && window.location.hash.startsWith('#tech-docs');

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isScrolled || isTechDocsPage
                    ? 'py-4 bg-slate-950/90 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
                    : 'py-6 bg-transparent'
            }`}
        >
            <nav className="container mx-auto px-6 flex items-center justify-between">
                <a
                    className="text-2xl font-bold tracking-tight text-white hover:text-primary transition-all duration-300 font-outfit uppercase"
                    href="#"
                    onClick={(e) => handleNavClick(e, '#root')}
                >
                    {logoText}<span className="text-primary animate-pulse-glow">.</span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-2">
                    <div className="glass-pill flex items-center rounded-full px-2 py-1.5 gap-1">
                        {navLinks.map((link, index) => (
                            <a
                                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                                    activeSection === link.id
                                        ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/20'
                                        : 'text-muted-foreground hover:text-white border border-transparent'
                                }`}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                key={index}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* CTA BTN */}
                <div className="hidden md:block">
                    <Button 
                        size="sm" 
                        variant="glass"
                        onClick={(e) => handleNavClick(e, '#contact')}
                    >
                        Trò Chuyện Ngay
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                    className="md:hidden p-2 text-foreground cursor-pointer focus:outline-none"
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={24} className="text-primary" /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden glass-strong absolute top-full left-0 right-0 border-b border-border/50 animate-fade-in-up">
                    <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
                        {navLinks.map((link, index) => (
                            <a
                                className={`text-lg py-2 border-b border-border/10 transition-colors duration-300 ${
                                    activeSection === link.id ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-white'
                                }`}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                key={index}
                            >
                                {link.label}
                            </a>
                        ))}
                        <Button 
                            size="default" 
                            variant="primary"
                            className="mt-2 w-full"
                            onClick={(e) => handleNavClick(e, '#contact')}
                        >
                            Trò Chuyện Ngay
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
