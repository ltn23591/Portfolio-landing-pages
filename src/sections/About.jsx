import React from 'react';
import { Award, Briefcase, Code2, Cpu, Database, Flame, Globe } from 'lucide-react';

const About = () => {
    const [aboutData, setAboutData] = React.useState({
        title: "Who is Le Trung Nghia?",
        bio1: "I am a software engineer focused on developing robust and high-performing server architectures. With a strong foundation in modern Javascript frameworks and Laravel backend ecosystem, I enjoy solving complex architectural challenges like database optimization, custom authentication systems, and real-time socket connections.",
        bio2: "Over the years, I've had the opportunity to build production systems that cater to fast response times, integrate third-party payment gateways, and establish clean CI/CD development loops.",
        philosophy: "Writing clean, readable code is not just a standard; it's a commitment to future maintainability. I build backends that sleep soundly under high concurrent requests.",
        statExp: "4+ Years",
        statProjects: "35+",
        statSatisfaction: "99%",
        statOpenSource: "15+"
    });
    
    const [skillsList, setSkillsList] = React.useState([
        { category: 'Backend Core', skillName: 'Node.js' },
        { category: 'Backend Core', skillName: 'Express' },
        { category: 'Backend Core', skillName: 'NestJS' },
        { category: 'Backend Core', skillName: 'Laravel (PHP)' },
        { category: 'Backend Core', skillName: 'TypeScript' },
        { category: 'Frontend Integration', skillName: 'React.js' },
        { category: 'Frontend Integration', skillName: 'Tailwind CSS' },
        { category: 'Frontend Integration', skillName: 'Next.js' },
        { category: 'Databases & Caching', skillName: 'PostgreSQL' },
        { category: 'Databases & Caching', skillName: 'MongoDB' },
        { category: 'Databases & Caching', skillName: 'Redis' },
        { category: 'DevOps & Tools', skillName: 'Docker' },
        { category: 'DevOps & Tools', skillName: 'Git/GitHub' },
        { category: 'DevOps & Tools', skillName: 'AWS' }
    ]);

    React.useEffect(() => {
        const fetchAbout = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/portfolio/about');
                if (res.ok) {
                    const data = await res.json();
                    if (data) setAboutData(data);
                }
            } catch (err) {
                console.log('Using default mock values for About section.');
            }
        };

        const fetchSkills = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/portfolio/skills');
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) setSkillsList(data);
                }
            } catch (err) {
                console.log('Using default mock values for Skills list.');
            }
        };

        fetchAbout();
        fetchSkills();
    }, []);

    const stats = [
        { icon: <Briefcase className="w-6 h-6 text-primary" />, value: aboutData.statExp, label: "Professional Experience" },
        { icon: <Flame className="w-6 h-6 text-orange-400" />, value: aboutData.statProjects, label: "Projects Completed" },
        { icon: <Award className="w-6 h-6 text-emerald-400" />, value: aboutData.statSatisfaction, label: "Client Satisfaction" },
        { icon: <Globe className="w-6 h-6 text-secondary" />, value: aboutData.statOpenSource, label: "Open Source Contribs" }
    ];

    const categoriesMap = {
        'Backend Core': { icon: <Cpu className="w-5 h-5 text-primary" /> },
        'Frontend Integration': { icon: <Code2 className="w-5 h-5 text-secondary" /> },
        'Databases & Caching': { icon: <Database className="w-5 h-5 text-emerald-400" /> },
        'DevOps & Tools': { icon: <Globe className="w-5 h-5 text-purple-400" /> }
    };

    const categories = Object.keys(categoriesMap).map(catName => ({
        title: catName,
        icon: categoriesMap[catName].icon,
        skills: skillsList.filter(s => s.category === catName).map(s => s.skillName)
    })).filter(cat => cat.skills.length > 0);

    return (
        <section id="about" className="py-28 relative overflow-hidden bg-background">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-sm font-semibold tracking-wider text-primary uppercase mb-3">Giới thiệu</h2>
                    <p className="text-4xl md:text-5xl font-bold font-outfit text-white">
                        Engineering with <span className="font-serif italic font-normal text-slate-300">reliability</span> and scalability in mind
                    </p>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 rounded-full" />
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Left Column: Stats Cards Grid (5 cols) */}
                    <div className="lg:col-span-5 grid sm:grid-cols-2 gap-6 animate-fade-in-up">
                        {stats.map((stat, idx) => (
                            <div 
                                key={idx} 
                                className="glass p-6 rounded-2xl border border-white/5 glow-hover flex flex-col items-start text-left space-y-4"
                            >
                                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                                    {stat.icon}
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold font-outfit text-white tracking-tight">{stat.value}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                                </div>
                            </div>
                        ))}

                        {/* Extra developer philosophy card stretching full width */}
                        {aboutData.philosophy && (
                            <div className="sm:col-span-2 glass p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-primary/5 to-transparent text-left space-y-2">
                                <h4 className="text-md font-semibold text-white flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    Triết Lý Làm Việc
                                </h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    "{aboutData.philosophy}"
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Bio & Tech Stack list (7 cols) */}
                    <div className="lg:col-span-7 space-y-8 text-left animate-fade-in-up delay-200">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold font-outfit text-white">
                                {aboutData.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {aboutData.bio1}
                            </p>
                            {aboutData.bio2 && (
                                <p className="text-muted-foreground leading-relaxed">
                                    {aboutData.bio2}
                                </p>
                            )}
                        </div>

                        {/* Tech Stack Categories Grid */}
                        {categories.length > 0 && (
                            <div className="space-y-6">
                                <h4 className="text-lg font-bold font-outfit text-white tracking-wide border-b border-border/50 pb-2">
                                    Bộ Công Cụ Chuyên Môn
                                </h4>
                                
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {categories.map((cat, idx) => (
                                        <div key={idx} className="space-y-3">
                                            <h5 className="text-sm font-semibold text-white flex items-center gap-2">
                                                {cat.icon}
                                                {cat.title}
                                            </h5>
                                            <div className="flex flex-wrap gap-2">
                                                {cat.skills.map((skill, sIdx) => (
                                                    <span 
                                                        key={sIdx} 
                                                        className="px-3 py-1 text-xs font-medium rounded-full bg-slate-900 border border-white/5 text-slate-300 hover:border-primary/40 hover:text-primary transition-all duration-300"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;