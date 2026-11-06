import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './layouts/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import ThreeCanvas from './components/ThreeCanvas';
import { io } from 'socket.io-client';
import { API_URL } from './config/api';

function App() {
    const [settings, setSettings] = useState({
        logoText: 'LE TRUNG NGHIA',
        footerText: '© 2026 Le Trung Nghia. All rights reserved.',
        resumeUrl: '/CV-Le-Trung-Nghia.pdf',
        showHero: true,
        showAbout: true,
        showExperience: true,
        showProjects: true,
        showContact: true,
        themeMode: 'obsidian-teal',
        contactEmail: 'ltn23591@gmail.com',
        contactPhone: '0326405864',
        contactAddress: 'Quận Bình Tân, TP. Hồ Chí Minh',
        githubUrl: 'https://github.com/ltn23591',
        linkedinUrl: 'https://linkedin.com',
        telegramUrl: 'https://t.me/example',
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch(`${API_URL}/api/portfolio/settings`);
                if (res.ok) {
                    const data = await res.json();
                    if (data) setSettings((prev) => ({ ...prev, ...data }));
                }
            } catch {
                // Keep default mock settings
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

    return (
        <div
            className={`min-h-screen overflow-x-clip relative bg-[#080c10] text-[#f0f2f5] font-space ${settings.themeMode}`}
        >
            {settings.themeMode !== 'minimalist-clean' && <ThreeCanvas />}
            <Navbar logoText={settings.logoText} />
            <main>
                {settings.showHero && <Hero settings={settings} />}
                {settings.showAbout && <About />}
                {settings.showExperience && <Experience />}
                {settings.showProjects && <Projects />}
                {settings.showContact && <Contact settings={settings} />}
            </main>
            <footer className="py-8 bg-slate-950 text-center border-t border-white/5">
                <p className="text-sm font-orbitron tracking-wider text-muted-foreground">
                    {settings.footerText}
                </p>
            </footer>
        </div>
    );
}

export default App;
