import React from 'react';
import { Calendar, Briefcase, ChevronRight } from 'lucide-react';

const Experience = () => {
    const [experiences, setExperiences] = React.useState([
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

    React.useEffect(() => {
        const fetchExperience = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/portfolio/experience');
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

    return (
        <section id="experience" className="py-28 relative overflow-hidden bg-background">
            {/* Design accents */}
            <div className="absolute top-1/3 left-10 w-72 h-72 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Title */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-sm font-semibold tracking-wider text-primary uppercase mb-3">Kinh nghiệm</h2>
                    <p className="text-4xl md:text-5xl font-bold font-outfit text-white">
                        Lịch sử <span className="font-serif italic font-normal text-slate-300">làm việc</span> và phát triển
                    </p>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 rounded-full" />
                </div>

                {/* Timeline Wrapper */}
                <div className="max-w-4xl mx-auto relative">
                    {/* Vertical Center Line */}
                    <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent -translate-x-1/2 hidden md:block" />
                    <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary to-transparent md:hidden" />

                    {/* Timeline Nodes */}
                    <div className="space-y-16 md:space-y-24">
                        {experiences.map((exp, idx) => {
                            const isEven = idx % 2 === 0;
                            return (
                                <div 
                                    key={idx}
                                    className={`relative flex flex-col md:flex-row items-stretch ${
                                        isEven ? 'md:flex-row-reverse' : ''
                                    }`}
                                >
                                    {/* Timeline Glow Indicator Node */}
                                    <div className="absolute left-6 md:left-1/2 top-6 -translate-x-1/2 z-20">
                                        <div className="w-5 h-5 rounded-full bg-slate-950 border-2 border-primary flex items-center justify-center shadow-lg shadow-primary/30">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                        </div>
                                    </div>

                                    {/* Content Card Wrapper (Left/Right side) */}
                                    <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                                        isEven ? 'md:pl-12' : 'md:pr-12'
                                    }`}>
                                        <div 
                                            className="glass p-6 md:p-8 rounded-2xl border border-white/5 glow-hover text-left space-y-4 relative"
                                        >
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

                                            {/* Description points */}
                                            <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-none">
                                                {exp.description.map((bullet, bIdx) => (
                                                    <li key={bIdx} className="flex items-start gap-2">
                                                        <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-1" />
                                                        <span>{bullet}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Skills highlights */}
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

                                    {/* Empty column spacer to maintain grid alignment (Desktop) */}
                                    <div className="hidden md:block w-1/2" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;