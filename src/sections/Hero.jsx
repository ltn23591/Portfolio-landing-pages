import React from 'react';
import Button from '../components/Button';
import { ArrowRight, Download, Github, Linkedin, Mail, Terminal, ShieldCheck, Cpu } from 'lucide-react';
import { API_URL } from '../config/api';
import avatarImg from '../assets/images/Avatar.jpg';
import { ShinyText, BlurText, GradientText, DecryptedText, TiltedCard, SpotlightCard, Magnet } from '../components/reactbits';

const PARTICLES = [
    { left: '8%', top: '18%', duration: '12s', delay: '0.5s' },
    { left: '22%', top: '75%', duration: '16s', delay: '1.2s' },
    { left: '38%', top: '14%', duration: '14s', delay: '2.4s' },
    { left: '54%', top: '82%', duration: '18s', delay: '0.8s' },
    { left: '68%', top: '24%', duration: '15s', delay: '3.1s' },
    { left: '84%', top: '65%', duration: '13s', delay: '1.7s' },
    { left: '91%', top: '28%', duration: '17s', delay: '2.9s' },
    { left: '15%', top: '46%', duration: '19s', delay: '0.3s' },
];

const Hero = ({ settings }) => {
    const cvUrl =
        settings?.resumeUrl && settings.resumeUrl !== '#'
            ? settings.resumeUrl
            : '/CV-Le-Trung-Nghia.pdf';

    const [heroData, setHeroData] = React.useState({
        tagline: 'Software Engineer',
        title: 'LÊ TRUNG NGHĨA',
        subtitle: 'Kiến trúc Hệ thống Backend & Fullstack Hiệu Năng Cao',
        description:
            'Sinh viên năm cuối chuyên ngành Kỹ thuật Phần mềm tại Đại học Văn Hiến (VHU) với 3 tháng kinh nghiệm thực tập thực chiến tại Công ty HiAI (Dự án ERP & E-Commerce Phú Hòa Food: phf-api & phf-ui-web). Chuyên sâu về Backend Node.js, Express, NestJS và cơ sở dữ liệu MySQL, MongoDB, PostgreSQL.',
        githubUrl: 'https://github.com/ltn23591',
        linkedinUrl: 'https://linkedin.com',
        emailUrl: 'mailto:ltn23591@gmail.com',
        avatarUrl: '',
    });

    const [statsData, setStatsData] = React.useState({
        statExp: '6+ Tháng',
        statProjects: '5+ Hệ thống',
        statSatisfaction: '< 100ms',
        statOpenSource: '99.95% Uptime',
    });

    React.useEffect(() => {
        const fetchHeroAndStats = async () => {
            try {
                const [heroRes, aboutRes] = await Promise.all([
                    fetch(`${API_URL}/api/portfolio/hero`),
                    fetch(`${API_URL}/api/portfolio/about`),
                ]);

                if (heroRes.ok) {
                    const data = await heroRes.json();
                    if (data) {
                        setHeroData((prev) => ({
                            ...prev,
                            tagline: data.tagline || prev.tagline,
                            title: data.title || prev.title,
                            description: data.description || prev.description,
                            githubUrl: data.githubUrl || prev.githubUrl,
                            linkedinUrl: data.linkedinUrl || prev.linkedinUrl,
                            emailUrl: data.emailUrl
                                ? data.emailUrl.startsWith('mailto:')
                                    ? data.emailUrl
                                    : `mailto:${data.emailUrl}`
                                : prev.emailUrl,
                            avatarUrl: data.avatarUrl || '',
                        }));
                    }
                }

                if (aboutRes.ok) {
                    const about = await aboutRes.json();
                    if (about) {
                        setStatsData((prev) => ({
                            statExp: about.statExp || prev.statExp,
                            statProjects: about.statProjects || prev.statProjects,
                            statSatisfaction: about.statSatisfaction || prev.statSatisfaction,
                            statOpenSource: about.statOpenSource || prev.statOpenSource,
                        }));
                    }
                }
            } catch {
                // Keep default values when offline
            }
        };
        fetchHeroAndStats();
    }, []);

    const handleScrollToSection = (e, id) => {
        e.preventDefault();
        const target = document.getElementById(id);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section id="hero" className="relative min-h-screen flex items-center overflow-hidden mesh-gradient-1 pt-24 pb-16">
            {/* Grid Pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            {/* Glowing Orbs */}
            <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />

            {/* Drift Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {PARTICLES.map((p, i) => (
                    <div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full bg-primary/35"
                        style={{
                            left: p.left,
                            top: p.top,
                            animation: `float-slow ${p.duration} ease-in-out infinite`,
                            animationDelay: p.delay,
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    {/* Left Column: 1. Introduce (Title & Short Bio) */}
                    <div className="lg:col-span-7 space-y-7 text-left animate-fade-in-up">
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border-primary/30 text-sm font-medium tracking-wider uppercase">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
                            </span>
                            <ShinyText text={heroData.tagline} speed={3} className="font-orbitron text-xs font-bold" />
                        </div>

                        {/* Title */}
                        <div className="space-y-4">
                            <p className="text-xs md:text-sm font-orbitron uppercase tracking-[0.25em] text-primary">
                                <DecryptedText text="// FULLSTACK & BACKEND ENGINEER" speed={30} />
                            </p>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-orbitron tracking-tight text-white leading-[1.15]">
                                <BlurText text="XIN CHÀO, TÔI LÀ" delay={70} className="block text-slate-200 text-2xl sm:text-3xl mb-2 justify-start" />
                                <GradientText className="font-orbitron font-black tracking-wide">
                                    {heroData.title}
                                </GradientText>
                            </h1>
                            <h2 className="text-xl sm:text-2xl font-orbitron font-semibold text-slate-300">
                                {heroData.subtitle}
                            </h2>
                            <p className="text-base md:text-lg text-muted-foreground max-w-2xl font-space leading-relaxed">
                                {heroData.description}
                            </p>
                        </div>

                        {/* Quick Highlight Pills synced with About stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl pt-1">
                            {[
                                { label: 'Kinh nghiệm', value: statsData.statExp },
                                { label: 'Dự án thực chiến', value: statsData.statProjects },
                                { label: 'Độ trễ API TB', value: statsData.statSatisfaction },
                                {
                                    label: statsData.statOpenSource?.toLowerCase().includes('uptime') ? 'Uptime / Ổn định' : 'Độ ổn định',
                                    value: statsData.statOpenSource?.replace(/\s*uptime/i, '').trim() || statsData.statOpenSource,
                                },
                            ].map((item, idx) => (
                                <SpotlightCard key={idx} className="p-3 sm:p-3.5 text-left flex flex-col justify-center">
                                    <div className="text-sm sm:text-base md:text-lg font-orbitron font-bold text-primary whitespace-nowrap">
                                        {item.value}
                                    </div>
                                    <div className="text-xs text-muted-foreground font-space mt-0.5 truncate">
                                        {item.label}
                                    </div>
                                </SpotlightCard>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 items-center pt-2">
                            <Magnet padding={30} magnetStrength={4}>
                                <Button
                                    size="lg"
                                    variant="primary"
                                    onClick={(e) => handleScrollToSection(e, 'projects')}
                                >
                                    Xem Dự Án Nổi Bật <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Magnet>

                            <Magnet padding={30} magnetStrength={4}>
                                <a
                                    href={cvUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download="CV-Le-Trung-Nghia.pdf"
                                    className="inline-flex items-center justify-center rounded-full font-orbitron font-medium transition-all duration-300 px-8 py-4 text-sm border border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary group cursor-pointer"
                                >
                                    <Download className="w-4 h-4 mr-2 text-primary group-hover:text-white" />
                                    Tải CV (PDF)
                                </a>
                            </Magnet>
                        </div>

                        {/* Social Profile Connections */}
                        <div className="pt-2 flex items-center gap-4">
                            <span className="text-xs font-orbitron font-semibold text-muted-foreground uppercase tracking-wider">
                                Liên kết cá nhân:
                            </span>
                            <div className="flex items-center gap-3">
                                {[
                                    { icon: <Github className="w-5 h-5" />, href: heroData.githubUrl, label: 'GitHub' },
                                    { icon: <Linkedin className="w-5 h-5" />, href: heroData.linkedinUrl, label: 'LinkedIn' },
                                    { icon: <Mail className="w-5 h-5" />, href: heroData.emailUrl, label: 'Email' },
                                ].map((soc, idx) => (
                                    <Magnet key={idx} padding={20} magnetStrength={3}>
                                        <a
                                            href={soc.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={soc.label}
                                            className="w-10 h-10 rounded-full glass border-border hover:border-primary/50 text-muted-foreground hover:text-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
                                        >
                                            {soc.icon}
                                        </a>
                                    </Magnet>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Personal Portrait Card (React Bits TiltedCard) */}
                    <div className="lg:col-span-5 relative animate-fade-in-up delay-200 flex justify-center">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl blur-3xl -z-10" />

                        <TiltedCard className="w-full max-w-md" maxTilt={7}>
                            <SpotlightCard className="p-5 rounded-3xl border border-primary/30 shadow-2xl">
                                {/* Top Cyber Bar */}
                                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                                        <span className="text-xs font-orbitron tracking-wider text-slate-300 uppercase">
                                            ID: LTN-DEV
                                        </span>
                                    </div>
                                    <span className="text-[11px] font-mono text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                                        Available for Hire
                                    </span>
                                </div>

                                {/* Personal Image Frame */}
                                <div className="relative rounded-2xl overflow-hidden aspect-[4/4.5] bg-slate-900 border border-white/10 group">
                                    <img
                                        src={heroData.avatarUrl || avatarImg}
                                        alt="Lê Trung Nghĩa - Software Engineer"
                                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#080c10] via-transparent to-transparent opacity-80" />

                                    {/* Bottom Overlay Info inside Image */}
                                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                                        <div>
                                            <p className="text-xs font-orbitron text-primary uppercase tracking-widest">
                                                Software Engineer
                                            </p>
                                            <h3 className="text-xl font-orbitron font-bold text-white">
                                                Lê Trung Nghĩa
                                            </h3>
                                        </div>
                                        <div className="p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-primary/30 text-primary">
                                            <Cpu className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>

                                {/* Tech Stack Footer inside Portrait Card */}
                                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-muted-foreground font-space">
                                    <span className="flex items-center gap-1.5 text-slate-300">
                                        <Terminal className="w-3.5 h-3.5 text-primary" />
                                        Node.js • Express • NestJS • React • SQL
                                    </span>
                                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                                        <ShieldCheck className="w-4 h-4" /> Verified
                                    </span>
                                </div>
                            </SpotlightCard>
                        </TiltedCard>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
