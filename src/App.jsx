import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './layouts/Navbar';
import About from './sections/About';
import Contact from './sections/Contact';
import Experience from './sections/Experience';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Testimonials from './sections/Testimonials';

function App() {
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
                const res = await fetch('http://localhost:3000/api/portfolio/settings');
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

    return (
        <div className={`min-h-screen overflow-x-hidden ${settings.themeMode}`}>
            <Navbar logoText={settings.logoText} />
            <main>
                {settings.showHero && <Hero />}
                {settings.showAbout && <About />}
                {settings.showProjects && <Projects />}
                {settings.showExperience && <Experience />}
                {settings.showTestimonials && <Testimonials />}
                {settings.showContact && <Contact settings={settings} />}
            </main>
            <footer className="py-8 bg-slate-950 text-center border-t border-white/5">
                <p className="text-sm text-muted-foreground">{settings.footerText}</p>
            </footer>
        </div>
    );
}

export default App;
