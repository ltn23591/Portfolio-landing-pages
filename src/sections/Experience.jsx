import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Briefcase, ChevronRight } from 'lucide-react';
import { API_URL } from '../config/api';

const Experience = () => {
    const sectionRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [experiences, setExperiences] = useState([
        {
            role: "Senior Backend Engineer",
            company: "TechVibe Solutions",
            period: "2024 - Present",
            description: [
                "Led a team of 4 developers to re-architect a legacy PHP monolith into a distributed NestJS/PostgreSQL microservices framework, boosting transaction velocity by 40%.",
                "Built and maintained core billing workflows integrating Stripe and Paypal with webhook automation.",
                "Optimized database indexing and implemented Redis cluster caching to decrease average API query latency to <120ms."
            ],
            skills: ["NestJS", "TypeScript", "PostgreSQL", "Redis", "Stripe API", "AWS"]
        },
        {
            role: "Software Developer",
            company: "Nexus Software Hub",
            period: "2022 - 2024",
            description: [
                "Designed and implemented high-volume APIs using Laravel and MySQL for enterprise CRM tools.",
                "Crafted responsive administrative layouts using React.js and Tailwind CSS with JWT authorization.",
                "Set up GitHub Actions pipelines for automated unit testing and containerized builds with Docker."
            ],
            skills: ["Laravel", "PHP", "React.js", "MySQL", "Docker", "CI/CD"]
        }
    ]);

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const res = await fetch(`${API_URL}/api/portfolio/experience`);
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) setExperiences(data);
                }
            } catch (err) {
                console.log('Using default mock values for Experience.');
            }
        };
        fetchExperience();
    }, []);

    // Calculate sticky scroll progress (0 to 1) inside pinned section
    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const totalDist = rect.height - windowHeight;
            if (totalDist <= 0) return;

            const currentDist = -rect.top;
            const p = Math.min(Math.max(currentDist / totalDist, 0), 1);
            setScrollProgress(p);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const totalItems = experiences.length;
    // Step height between items
    const stepHeight = 440;
    // Map scrollProgress [0, 0.9] to card range [0, 1] so cards finish scrolling at 90% progress
    const activeScroll = Math.min(scrollProgress / 0.9, 1);
    const baseOffset = (totalItems > 1 ? ((totalItems - 1) * stepHeight) / 2 : 0) - 220;
    const translateY = baseOffset - (activeScroll * (totalItems - 1) * stepHeight);

    // Calculate smooth exit fade-out as section ends (92% to 100% scroll)
    const stageOpacity = scrollProgress > 0.92 ? Math.max(0, (1 - scrollProgress) / 0.08) : 1;

    // Calculate the index of the card closest to the scroll position
    let activeIndex = 0;
    let minDiff = Infinity;
    experiences.forEach((exp, idx) => {
        const activeP = totalItems > 1 ? idx / (totalItems - 1) : 0;
        const diff = Math.abs(activeScroll - activeP);
        if (diff < minDiff) {
            minDiff = diff;
            activeIndex = idx;
        }
    });

    return (
        <section
            ref={sectionRef}
            id="experience"
            className="relative bg-background mb-[15vh]"
            style={{ height: `${Math.max(totalItems * 130, 320)}vh` }}
        >
            {/* Sticky Viewport Container */}
            <div 
                className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-x-clip transition-opacity duration-300 pointer-events-auto"
            >
                {/* Background ambient lighting */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

                <div className="container mx-auto px-4 md:px-6 relative z-10 w-full flex flex-col h-full justify-between py-10">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto shrink-0 pt-2">
                        <h2 className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">Kinh nghiệm</h2>
                        <p className="text-3xl md:text-5xl font-bold font-outfit text-white">
                            Lịch sử <span className="font-serif italic font-normal text-slate-300">làm việc</span> và phát triển
                        </p>
                        <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
                    </div>

                    {/* Interactive Reel Timeline Stage */}
                    <div className="relative flex-1 max-w-5xl mx-auto w-full my-auto flex items-center justify-center">
                        {/* Static Vertical Center Axis */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2 hidden md:block" />
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/10 md:hidden" />

                        {/* Active Laser Beam Fill Line */}
                        <div
                            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-teal-400 to-secondary -translate-x-1/2 transition-all duration-300 shadow-[0_0_12px_rgba(20,184,166,0.8)] z-10"
                            style={{
                                height: `${scrollProgress * 100}%`
                            }}
                        />

                        {/* Moving Reel Track Container */}
                        <div
                            className="w-full transition-transform duration-300 ease-out z-20 space-y-20"
                            style={{
                                transform: `translateY(${translateY}px)`
                            }}
                        >
                {experiences.map((exp, idx) => {
                    const isActive = idx === activeIndex;
                    const isEven = idx % 2 === 0;

                    return (
                        <div
                            key={idx}
                            className={`relative flex flex-col md:flex-row items-center transition-all duration-500 ${isEven ? 'md:flex-row-reverse' : ''
                                }`}
                        >
                            {/* Timeline Node */}
                            <div className="absolute left-6 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30">
                                <div className={`w-7 h-7 rounded-full bg-slate-950 border-2 transition-all duration-500 flex items-center justify-center ${isActive
                                        ? 'border-primary ring-4 ring-primary/40 shadow-xl shadow-primary/60 scale-125'
                                        : 'border-white/20 opacity-40 scale-90'
                                    }`}>
                                    <span className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${isActive ? 'bg-primary animate-ping' : 'bg-white/30'
                                        }`} />
                                </div>
                            </div>

                            {/* Card Wrapper */}
                            <div className={`w-full md:w-1/2 pl-12 md:pl-0 transition-all duration-500 ${isEven ? 'md:pl-12' : 'md:pr-12'
                                } ${isActive
                                    ? 'opacity-100 scale-105 z-30'
                                    : 'opacity-50 scale-95 z-10 pointer-events-none'
                                }`}>
                                <div className={`glass p-6 md:p-8 rounded-2xl border text-left space-y-4 transition-all duration-500 ${isActive
                                        ? 'border-primary/50 shadow-2xl shadow-primary/20 bg-slate-900/80'
                                        : 'border-white/5 bg-slate-950/40'
                                    }`}>
                                                {/* Meta Header */}
                                                <div className="flex flex-wrap items-center justify-between gap-2">
                                                    <div className="space-y-1">
                                                        <h3 className="text-xl font-bold font-outfit text-white flex items-center gap-2">
                                                            <Briefcase className="w-4 h-4 text-primary" />
                                                            {exp.role}
                                                        </h3>
                                                        <p className="text-sm font-semibold text-teal-400">{exp.company}</p>
                                                    </div>
                                                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-slate-900 border border-white/5 text-muted-foreground">
                                                        <Calendar className="w-3 h-3 text-secondary" />
                                                        {exp.period}
                                                    </span>
                                                </div>

                                                {/* Bullet Points */}
                                                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-none">
                                                    {exp.description.map((bullet, bIdx) => (
                                                        <li key={bIdx} className="flex items-start gap-2">
                                                            <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-1" />
                                                            <span>{bullet}</span>
                                                        </li>
                                                    ))}
                                                </ul>

                                                {/* Skills */}
                                                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                                                    {exp.skills.map((s, sIdx) => (
                                                        <span
                                                            key={sIdx}
                                                            className="text-[10px] font-bold uppercase tracking-wider text-slate-300 px-2 py-0.5 rounded bg-slate-900 border border-white/5"
                                                        >
                                                            {s}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="hidden md:block w-1/2" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Scroll Indicator Prompt */}
                    <div className="shrink-0 text-center pb-2">
                        <div className="inline-flex items-center gap-2 text-xs text-muted-foreground/80 font-mono bg-white/5 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span>Cuộn chuột để kéo Timeline ({Math.round(scrollProgress * 100)}%)</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;