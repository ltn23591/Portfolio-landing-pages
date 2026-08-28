import React from 'react';
import Button from '../components/Button';
import { ArrowRight, Download, Github, Linkedin, Mail, Server } from 'lucide-react';
import { API_URL } from '../config/api';

const Hero = () => {
    const [heroData, setHeroData] = React.useState({
        tagline: "Software Engineer & Backend Specialist",
        title: "Crafting high-performance backend solutions",
        description: "Hi, I'm Le Trung Nghia. I architect scalable backend systems, design intuitive APIs, and develop premium fullstack applications using React, Node.js, Laravel, and TypeScript.",
        githubUrl: "https://github.com",
        linkedinUrl: "https://linkedin.com",
        emailUrl: "mailto:contact@example.com"
    });

    React.useEffect(() => {
        const fetchHero = async () => {
            try {
                const res = await fetch(`${API_URL}/api/portfolio/hero`);
                if (res.ok) {
                    const data = await res.json();
                    if (data) {
                        setHeroData({
                            tagline: data.tagline,
                            title: data.title,
                            description: data.description,
                            githubUrl: data.githubUrl || "https://github.com",
                            linkedinUrl: data.linkedinUrl || "https://linkedin.com",
                            emailUrl: data.emailUrl ? (data.emailUrl.startsWith('mailto:') || data.emailUrl.includes('@') ? (data.emailUrl.startsWith('mailto:') ? data.emailUrl : `mailto:${data.emailUrl}`) : data.emailUrl) : "mailto:contact@example.com"
                        });
                    }
                }
            } catch (err) {
                console.log('Using default mock values for Hero section.');
            }
        };
        fetchHero();
    }, []);

    const handleScrollToContact = (e) => {
        e.preventDefault();
        const target = document.getElementById('contact');
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="hero" className="relative min-h-screen flex items-center overflow-hidden mesh-gradient-1 pt-24">
            {/* Grid Pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            {/* Glowing Orbs */}
            <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />

            {/* Drift Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full bg-primary/30"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float-slow ${10 + Math.random() * 15}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-20 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    {/* Left Column: Text & CTAs (7 cols on lg) */}
                    <div className="lg:col-span-7 space-y-8 text-left animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 text-primary text-sm font-semibold tracking-wide">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                            </span>
                            {heroData.tagline}
                        </div>

                        {/* Title */}
                        <div className="space-y-4">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-outfit tracking-tight text-white leading-[1.1]">
                                {heroData.title.includes('high-performance') ? (
                                    <>
                                        Crafting <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-400 to-secondary glow-text">
                                            high-performance
                                        </span>
                                        <br />
                                        backend solutions with <br />
                                        <span className="font-serif italic font-normal text-slate-300">
                                            engineering precision.
                                        </span>
                                    </>
                                ) : (
                                    heroData.title
                                )}
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-xl font-outfit font-light leading-relaxed">
                                {heroData.description}
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 items-center">
                            <Button 
                                size="lg" 
                                variant="primary"
                                onClick={handleScrollToContact}
                            >
                                Hợp Tác Ngay <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                            
                            <Button 
                                size="lg" 
                                variant="outline"
                                className="group"
                            >
                                <Download className="w-4 h-4 mr-2 text-primary group-hover:text-white" />
                                Tải CV
                            </Button>
                        </div>

                        {/* Social Profile Connections */}
                        <div className="pt-4 flex items-center gap-4">
                            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Kết nối:</span>
                            <div className="flex items-center gap-3">
                                {[
                                    { icon: <Github className="w-5 h-5" />, href: heroData.githubUrl, label: "GitHub" },
                                    { icon: <Linkedin className="w-5 h-5" />, href: heroData.linkedinUrl, label: "LinkedIn" },
                                    { icon: <Mail className="w-5 h-5" />, href: heroData.emailUrl, label: "Email" }
                                ].map((soc, idx) => (
                                    <a
                                        key={idx}
                                        href={soc.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={soc.label}
                                        className="w-10 h-10 rounded-full glass border-border hover:border-primary/50 text-muted-foreground hover:text-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
                                    >
                                        {soc.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Premium Mock Terminal/IDE Sandbox (5 cols on lg) */}
                    <div className="lg:col-span-5 relative animate-fade-in-up delay-200">
                        {/* Decorative glow backing */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-2xl blur-3xl -z-10" />
                        
                        {/* Terminal Box */}
                        <div className="glass rounded-2xl overflow-hidden shadow-2xl border border-white/10 glow-hover">
                            {/* Window Header */}
                            <div className="bg-slate-900/60 px-4 py-3 border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                                </div>
                                <span className="text-xs text-muted-foreground font-mono flex items-center gap-1.5">
                                    <Server className="w-3 h-3 text-primary" /> server.ts — Node.js
                                </span>
                                <span className="w-8" />
                            </div>

                            {/* Code Area */}
                            <div className="p-6 font-mono text-sm text-left overflow-x-auto space-y-2 bg-[#0c1219]/90">
                                <div>
                                    <span className="text-pink-400">import</span> express <span className="text-pink-400">from</span> <span className="text-teal-300">'express'</span>;
                                </div>
                                <div>
                                    <span className="text-pink-400">import</span> &#123; Database &#125; <span className="text-pink-400">from</span> <span className="text-teal-300">'@db/postgres'</span>;
                                </div>
                                <div className="text-muted-foreground/60">// Initialize application core</div>
                                <div>
                                    <span className="text-pink-400">const</span> app = <span className="text-cyan-400">express</span>();
                                </div>
                                <div>
                                    <span className="text-pink-400">const</span> db = <span className="text-pink-400">new</span> <span className="text-amber-300">Database</span>();
                                </div>
                                <br />
                                <div>
                                    app.<span className="text-cyan-400">use</span>(express.<span className="text-cyan-400">json</span>());
                                </div>
                                <br />
                                <div className="text-muted-foreground/60">// Premium API Endpoint</div>
                                <div>
                                    app.<span className="text-cyan-400">get</span>(<span className="text-teal-300">"/api/v1/engineer"</span>, (req, res) =&gt; &#123;
                                </div>
                                <div className="pl-4">
                                    res.<span className="text-cyan-400">json</span>(&#123;
                                </div>
                                <div className="pl-8 text-slate-300">
                                    name: <span className="text-teal-300">"Le Trung Nghia"</span>,
                                </div>
                                <div className="pl-8 text-slate-300">
                                    title: <span className="text-teal-300">"Backend Developer"</span>,
                                </div>
                                <div className="pl-8 text-slate-300">
                                    tech: [<span className="text-teal-300">"Node.js"</span>, <span className="text-teal-300">"React"</span>, <span className="text-teal-300">"Laravel"</span>],
                                </div>
                                <div className="pl-8 text-slate-300">
                                    uiUxProMax: <span className="text-amber-400">true</span>,
                                </div>
                                <div className="pl-8 text-slate-300">
                                    status: <span className="text-teal-300">"Ready to build"</span>
                                </div>
                                <div className="pl-4">
                                    &#125;);
                                </div>
                                <div>
                                    &#125;);
                                </div>
                                <br />
                                <div className="text-muted-foreground/60">// Start Server listener</div>
                                <div>
                                    app.<span className="text-cyan-400">listen</span>(<span className="text-purple-400">8080</span>, () =&gt; &#123;
                                </div>
                                <div className="pl-4 text-emerald-400">
                                    console.<span className="text-cyan-400">log</span>(<span className="text-teal-300">"🚀 Server online at port 8080"</span>);
                                </div>
                                <div>
                                    &#125;);
                                </div>
                            </div>
                            
                            {/* Terminal Footer */}
                            <div className="bg-slate-900/40 px-4 py-2 border-t border-white/5 flex items-center justify-between text-xs text-muted-foreground font-mono">
                                <span>UTF-8</span>
                                <span>TypeScript (v5.1.0)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
