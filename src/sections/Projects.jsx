import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, FolderGit2 } from 'lucide-react';

const Projects = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const categories = [
        { id: 'all', label: 'Tất cả Dự án' },
        { id: 'fullstack', label: 'Fullstack' },
        { id: 'backend', label: 'Hệ thống APIs' },
        { id: 'frontend', label: 'Giao diện UI' }
    ];
    const [projectsList, setProjectsList] = useState([
        {
            title: "DevFlow - Dev Community Platform",
            description: "A fullstack developer forum with recommendation systems, reputation scoring, global search, and real-time chat. Architected serverless endpoints and Redis caching layers.",
            category: "fullstack",
            tech: ["React.js", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Redis"],
            github: "https://github.com",
            live: "https://example.com"
        },
        {
            title: "TaskPulse - API Orchestrator",
            description: "A high-performance backend task scheduler and queue dispatcher processing 50k+ daily actions. Developed database locking and queue channels using Laravel and Redis.",
            category: "backend",
            tech: ["Laravel", "PHP", "PostgreSQL", "Redis", "Docker", "Sentry"],
            github: "https://github.com",
            live: "https://example.com"
        },
        {
            title: "RestroPay - Stripe Billing Core",
            description: "Microservice micro-system dedicated to multi-tenant subscriptions and automated invoicing. Designed clean REST endpoints with robust JWT auth and webhook handlers.",
            category: "backend",
            tech: ["Node.js", "TypeScript", "Express", "Stripe API", "PostgreSQL", "Prisma"],
            github: "https://github.com",
            live: "https://example.com"
        }
    ]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/portfolio/projects');
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) setProjectsList(data);
                }
            } catch (err) {
                console.log('Using default mock values for Projects.');
            }
        };
        fetchProjects();
    }, []);

    const filteredProjects = activeFilter === 'all' 
        ? projectsList 
        : projectsList.filter(proj => proj.category === activeFilter);

    return (
        <section id="projects" className="py-28 relative overflow-hidden bg-slate-950/20">
            {/* Background grids */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-sm font-semibold tracking-wider text-primary uppercase mb-3">Sản phẩm</h2>
                    <p className="text-4xl md:text-5xl font-bold font-outfit text-white">
                        Các dự án công nghệ <span className="font-serif italic font-normal text-slate-300">nổi bật</span>
                    </p>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 rounded-full" />
                </div>

                {/* Filter Selector */}
                <div className="flex justify-center mb-12">
                    <div className="glass-pill p-1.5 rounded-full flex flex-wrap gap-1 justify-center max-w-lg">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveFilter(cat.id)}
                                className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                                    activeFilter === cat.id
                                        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                                        : 'text-muted-foreground hover:text-white'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, idx) => (
                        <article 
                            key={idx}
                            className="glass rounded-2xl overflow-hidden border border-white/5 glow-hover flex flex-col justify-between text-left h-full group"
                        >
                            {/* Card Image Cover */}
                            <div className="relative overflow-hidden aspect-video border-b border-white/5">
                                <img 
                                    src={project.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'} 
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                            </div>

                            {/* Card Top / Header */}
                            <div className="p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-primary/40 transition-colors duration-300">
                                        <FolderGit2 className="w-6 h-6 text-primary group-hover:text-secondary transition-colors duration-300" />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-white transition-all duration-300"
                                            title="GitHub Code"
                                        >
                                            <Github className="w-5 h-5" />
                                        </a>
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-primary transition-all duration-300"
                                            title="Live Demo"
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold font-outfit text-white group-hover:text-primary transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>
                            </div>

                            {/* Card Bottom / Badges */}
                            <div className="p-6 pt-0 mt-auto border-t border-white/5 bg-slate-950/20">
                                <div className="flex flex-wrap gap-2 pt-4">
                                    {project.tech.map((t, tIdx) => (
                                        <span
                                            key={tIdx}
                                            className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-900 border border-white/5 text-slate-400"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;