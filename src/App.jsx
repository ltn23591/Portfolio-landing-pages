import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './layouts/Navbar';
import About from './sections/About';
import Contact from './sections/Contact';
import Experience from './sections/Experience';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Testimonials from './sections/Testimonials';
import TechDocs from './sections/TechDocs';
import ThreeCanvas from './components/ThreeCanvas';
import { io } from 'socket.io-client';
import { API_URL } from './config/api';

function App() {
    const [currentView, setCurrentView] = useState('home');
    const [settings, setSettings] = useState({
        logoText: 'LE TRUNG NGHIA',
        footerText: '© 2026 Le Trung Nghia. All rights reserved.',
        resumeUrl: '#',
        showHero: true,
        showAbout: true,
        showProjects: true,
        showExperience: true,
        showTestimonials: true,
        showContact: true,
        themeMode: 'obsidian-teal',
        contactEmail: 'letrungnghia.dev@gmail.com',
        contactPhone: '+84 987 654 321',
        contactAddress: 'TP. Hồ Chí Minh, Việt Nam',
        githubUrl: 'https://github.com',
        linkedinUrl: 'https://linkedin.com',
        telegramUrl: 'https://t.me/example'
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch(`${API_URL}/api/portfolio/settings`);
                if (res.ok) {
                    const data = await res.json();
                    if (data) setSettings(data);
                }
            } catch (err) {
                console.log('Using default mock settings.');
            }
        };
        fetchSettings();
    }, []);

    useEffect(() => {
        const socket = io(API_URL);
        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        const handleHashChange = () => {
            if (window.location.hash.startsWith('#tech-docs')) {
                setCurrentView('tech-docs');
            } else {
                setCurrentView('home');
            }
        };
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange(); // Initial check
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return (
        <div className={`min-h-screen overflow-x-clip relative bg-[#080c10] text-[#f0f2f5] ${settings.themeMode}`}>
            {settings.themeMode !== 'minimalist-clean' && <ThreeCanvas />}
            <Navbar logoText={settings.logoText} />
            {currentView === 'tech-docs' ? (
                <TechDocs />
            ) : (
                <main>
                    {settings.showHero && <Hero />}
                    {settings.showAbout && <About />}
                    {settings.showProjects && <Projects />}
                    {settings.showExperience && <Experience />}
                    {settings.showTestimonials && <Testimonials />}
                    {settings.showContact && <Contact settings={settings} />}
                </main>
            )}
            <footer className="py-8 bg-slate-950 text-center border-t border-white/5">
                <p className="text-sm text-muted-foreground">{settings.footerText}</p>
            </footer>
        </div>
    );
}

export default App;
