import React from 'react';
import {
    GraduationCap,
    Award,
    Code2,
    Cpu,
    Database,
    Zap,
    ShieldAlert,
    Layers,
    Users,
    CheckCircle2,
    Briefcase,
    Flame,
    Activity,
} from 'lucide-react';
import { API_URL } from '../config/api';
import { SpotlightCard, BlurText, ShinyText, StarBorder } from '../components/reactbits';

const EDUCATION_LIST = [
    {
        degree: 'Cử Nhân Công Nghệ Thông Tin (Kỹ Thuật Phần Mềm)',
        school: 'Đại Học Văn Hiến (VHU)',
        period: 'Chuyên Ngành Kỹ Thuật Phần Mềm',
        gpa: 'Verified Degree',
        highlights: [
            'Tập trung chuyên sâu vào Kỹ thuật phần mềm, Kiến trúc Backend (Node.js, Express, NestJS) và Cơ sở dữ liệu (PostgreSQL, MongoDB, MySQL).',
            'Thực hiện đồ án thực tế Hệ sinh thái F&B thông minh SipPoint (Backend API, Admin POS Portal & Customer Web App).',
            'Hoàn thành kỳ thực tập thực chiến 3 tháng tại Công ty HiAI, phát triển hệ thống ERP & E-Commerce doanh nghiệp (Phú Hòa Food).',
        ],
    },
    {
        degree: 'Kinh Nghiệm Kỹ Thuật & Quy Trình Thực Chiến',
        school: 'Agile / Scrum • GitHub Flow • RESTful API & Realtime Architecture',
        period: 'Thực Chiến Dự Án',
        gpa: '20+ Pull Requests',
        highlights: [
            'Thành thạo quy trình làm việc nhóm với Jira (Task/Bugfix/Feature), nhánh Git tiêu chuẩn và Code Review qua Pull Request.',
            'Thiết kế truy vấn SQL CTE nâng cao cho báo cáo xuất-nhập-tồn, tích hợp cổng thanh toán SePay IPN Webhook và Socket.io Realtime.',
        ],
    },
];

const PERSONAL_STRENGTHS = [
    {
        icon: <Zap className="w-5 h-5 text-primary" />,
        title: 'Tối Ưu Truy Vấn SQL & Hiệu Năng API',
        desc: 'Kinh nghiệm viết SQL CTE tính lũy kế tồn kho, xử lý dữ liệu kiểm kê lớn (Stock-Count) và triển khai Redis caching giảm độ trễ xuống < 100ms.',
    },
    {
        icon: <Layers className="w-5 h-5 text-secondary" />,
        title: 'Kiến Trúc Đa Phân Hệ & Realtime',
        desc: 'Thiết kế hệ sinh thái đồng bộ thời gian thực qua Socket.io giữa Web App khách hàng, màn hình POS thu ngân và cổng quản trị Admin.',
    },
    {
        icon: <ShieldAlert className="w-5 h-5 text-emerald-400" />,
        title: 'Tích Hợp Thanh Toán & Nghiệp Vụ Thực Tế',
        desc: 'Xử lý đối soát ngân hàng tự động qua SePay IPN Webhook, quản lý thuế suất (taxRate), kiểm nhập/xuất kho và phân quyền RBAC.',
    },
    {
        icon: <Users className="w-5 h-5 text-purple-400" />,
        title: 'Chủ Động, Tỉ Mỉ & Bám Sát Nghiệp Vụ',
        desc: 'Xử lý triệt để các edge-case trong quy trình kho/đơn hàng (Jira PHF tasks), viết tài liệu Swagger rõ ràng và phối hợp tốt cùng đội ngũ FE/BE.',
    },
];

const About = () => {
    const [aboutData, setAboutData] = React.useState({
        title: 'Nền Tảng Học Vấn & Thế Mạnh Cốt Lõi',
        bio1: 'Tôi là Lập trình viên Backend & Fullstack có kinh nghiệm thực chiến phát triển các hệ thống ERP doanh nghiệp (Quản lý Kho, Đơn hàng, Kiểm kê) và nền tảng F&B / E-Commerce thời gian thực với Node.js, Express, NestJS, React, PostgreSQL, MongoDB và Redis.',
        bio2: 'Cử Nhân Công Nghệ Thông Tin (Kỹ Thuật Phần Mềm) — Đại Học Văn Hiến (VHU)',
        philosophy:
            'Code sạch không chỉ để máy chạy, mà để đồng đội dễ dàng phát triển tiếp. Hệ thống tốt là hệ thống dữ liệu chính xác và vận hành ổn định.',
        statExp: '6+ Tháng',
        statProjects: '5+ Hệ thống',
        statSatisfaction: '< 100ms',
        statOpenSource: '99.95% Uptime',
    });

    const [skillsList, setSkillsList] = React.useState([
        { category: 'Backend', skillName: 'Node.js' },
        { category: 'Backend', skillName: 'Express.js' },
        { category: 'Backend', skillName: 'NestJS' },
        { category: 'Backend', skillName: 'TypeScript' },
        { category: 'Backend', skillName: 'Socket.io / WebSockets' },
        { category: 'Frontend', skillName: 'React 19' },
        { category: 'Frontend', skillName: 'Next.js' },
        { category: 'Frontend', skillName: 'Tailwind CSS v4' },
        { category: 'Frontend', skillName: 'TanStack Query & Table' },
        { category: 'Frontend', skillName: 'Zustand / Shadcn UI' },
        { category: 'Database', skillName: 'PostgreSQL (SQL CTE)' },
        { category: 'Database', skillName: 'MongoDB (Mongoose)' },
        { category: 'Database', skillName: 'MySQL' },
        { category: 'Database', skillName: 'Redis (ioredis)' },
        { category: 'Database', skillName: 'Prisma ORM' },
    ]);

    React.useEffect(() => {
        const fetchAbout = async () => {
            try {
                const res = await fetch(`${API_URL}/api/portfolio/about`);
                if (res.ok) {
                    const data = await res.json();
                    if (data) setAboutData((prev) => ({ ...prev, ...data }));
                }
            } catch {
                // Keep default mock values
            }
        };

        const fetchSkills = async () => {
            try {
                const res = await fetch(`${API_URL}/api/portfolio/skills`);
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) setSkillsList(data);
                }
            } catch {
                // Keep default mock values
            }
        };

        fetchAbout();
        fetchSkills();
    }, []);

    const stats = [
        {
            icon: <Briefcase className="w-5 h-5 text-primary" />,
            value: aboutData.statExp || '6+ Tháng',
            label: 'Kinh Nghiệm Thực Chiến',
        },
        {
            icon: <Flame className="w-5 h-5 text-orange-400" />,
            value: aboutData.statProjects || '5+ Hệ thống',
            label: 'Hệ Thống Đã Triển Khai',
        },
        {
            icon: <Zap className="w-5 h-5 text-secondary" />,
            value: aboutData.statSatisfaction || '< 100ms',
            label: 'Độ Trễ API Trung Bình',
        },
        {
            icon: <Activity className="w-5 h-5 text-emerald-400" />,
            value: aboutData.statOpenSource || '99.95% Uptime',
            label: 'Độ Ổn Định Vận Hành',
        },
    ];

    const categoriesMap = {
        Backend: { icon: <Cpu className="w-5 h-5 text-primary" /> },
        Frontend: { icon: <Code2 className="w-5 h-5 text-secondary" /> },
        Database: { icon: <Database className="w-5 h-5 text-emerald-400" /> },
    };

    const categories = Object.keys(categoriesMap).map((catName) => ({
        title: catName,
        icon: categoriesMap[catName].icon,
        skills: skillsList
            .filter((s) => {
                if (catName === 'Backend') return s.category === 'Backend' || s.category === 'Hệ thống Backend';
                if (catName === 'Frontend') return s.category === 'Frontend' || s.category === 'Tích hợp Frontend';
                if (catName === 'Database') return s.category === 'Database' || s.category === 'Cơ sở dữ liệu & Caching' || s.category === 'Cơ sở dữ liệu';
                return s.category === catName;
            })
            .map((s) => s.skillName),
    }));

    return (
        <section id="about" className="py-24 relative overflow-hidden bg-background">
            <div className="container mx-auto px-6 relative z-10 space-y-20">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-block mb-3">
                        <ShinyText
                            text="02 & 03 // EDUCATION & PERSONAL SKILLS"
                            speed={3}
                            className="text-xs font-orbitron font-bold tracking-widest uppercase"
                        />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold font-orbitron text-white text-center flex justify-center">
                        <BlurText
                            text={aboutData.title || 'Học Vấn & Kỹ Năng Cá Nhân'}
                            delay={60}
                            className="justify-center text-center"
                        />
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-5 rounded-full" />
                    <p className="text-muted-foreground font-space mt-5 text-base md:text-lg leading-relaxed">
                        {aboutData.bio1}
                    </p>
                </div>

                {/* Dynamic 4 Stats Cards (statExp, statProjects, statSatisfaction, statOpenSource) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                    {stats.map((st, idx) => (
                        <SpotlightCard key={idx} className="p-6 text-left">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-white/5 border border-white/10 shrink-0">
                                    {st.icon}
                                </div>
                                <div>
                                    <div className="text-xl md:text-2xl font-bold font-orbitron text-white">
                                        {st.value}
                                    </div>
                                    <div className="text-xs text-muted-foreground font-space mt-0.5">
                                        {st.label}
                                    </div>
                                </div>
                            </div>
                        </SpotlightCard>
                    ))}
                </div>

                {/* PART 2: EDUCATION (HỌC VẤN BẢN THÂN) */}
                <div className="space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                            <GraduationCap className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                            <h3 className="text-2xl font-bold font-orbitron text-white">
                                2. Học Vấn & Đào Tạo Chuyên Môn
                            </h3>
                            <p className="text-xs text-muted-foreground font-space">
                                {aboutData.bio2 || 'Nền tảng đào tạo chính quy và kinh nghiệm làm việc nhóm'}
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {EDUCATION_LIST.map((edu, idx) => (
                            <SpotlightCard key={idx} className="p-7 text-left">
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                                    <span className="px-3 py-1 rounded-full text-xs font-orbitron font-semibold bg-primary/15 text-primary border border-primary/30">
                                        {edu.period}
                                    </span>
                                    <span className="text-xs font-orbitron font-semibold text-emerald-400 flex items-center gap-1">
                                        <Award className="w-4 h-4" /> {edu.gpa}
                                    </span>
                                </div>
                                <h4 className="text-lg md:text-xl font-bold font-orbitron text-white mb-1">
                                    {edu.degree}
                                </h4>
                                <p className="text-sm font-semibold text-secondary font-space mb-4">
                                    {edu.school}
                                </p>
                                <ul className="space-y-2.5 text-sm text-muted-foreground font-space">
                                    {edu.highlights.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2.5">
                                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>

                {/* PART 3: PERSONAL SKILLS & STRENGTHS (ĐIỂM MẠNH & KỸ NĂNG CÁ NHÂN) */}
                <div className="grid lg:grid-cols-12 gap-10 items-start">
                    {/* Left: Điểm Mạnh Bản Thân (Core Strengths) */}
                    <div className="lg:col-span-6 space-y-6 text-left">
                        <div>
                            <h3 className="text-2xl font-bold font-orbitron text-white">
                                3. Điểm Mạnh Bản Thân
                            </h3>
                            <p className="text-sm text-muted-foreground font-space mt-1">
                                Thế mạnh giải quyết bài toán thực tế trong dự án
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {PERSONAL_STRENGTHS.map((str, idx) => (
                                <SpotlightCard key={idx} className="p-5 flex flex-col justify-between">
                                    <div className="space-y-3">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                            {str.icon}
                                        </div>
                                        <h4 className="text-base font-bold font-orbitron text-white leading-snug">
                                            {str.title}
                                        </h4>
                                        <p className="text-xs text-muted-foreground font-space leading-relaxed">
                                            {str.desc}
                                        </p>
                                    </div>
                                </SpotlightCard>
                            ))}
                        </div>

                        {/* Engineering Philosophy Quote */}
                        <StarBorder className="w-full" speed="6s">
                            <div className="p-5 text-left">
                                <p className="text-xs font-orbitron uppercase tracking-wider text-primary mb-1">
                                    Triết lý làm việc
                                </p>
                                <p className="text-sm text-slate-300 font-space italic">
                                    "{aboutData.philosophy}"
                                </p>
                            </div>
                        </StarBorder>
                    </div>

                    {/* Right: Kỹ Năng Công Nghệ (Technical Skills Matrix) */}
                    <div className="lg:col-span-6 space-y-6 text-left">
                        <div>
                            <h3 className="text-2xl font-bold font-orbitron text-white">
                                Kỹ Năng Chuyên Môn
                            </h3>
                            <p className="text-sm text-muted-foreground font-space mt-1">
                                Công nghệ, ngôn ngữ và công cụ áp dụng trong các dự án thực tế
                            </p>
                        </div>

                        <div className="space-y-4">
                            {categories.map((cat, idx) => (
                                <SpotlightCard key={idx} className="p-5 space-y-3.5">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                                            {cat.icon}
                                        </div>
                                        <h4 className="font-bold font-orbitron text-white text-sm tracking-wide">
                                            {cat.title}
                                        </h4>
                                    </div>
                                    <div className="flex flex-wrap gap-2.5">
                                        {cat.skills.map((skill, sIdx) => (
                                            <span
                                                key={sIdx}
                                                className="px-3.5 py-1.5 text-xs font-medium font-space rounded-lg bg-slate-900/90 text-slate-200 border border-white/10 hover:border-primary/50 hover:text-primary transition-colors duration-200"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </SpotlightCard>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
