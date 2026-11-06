import React, { useState, useEffect } from 'react';
import {
    ExternalLink,
    Github,
    FolderGit2,
    ChevronLeft,
    ChevronRight,
    Maximize2,
    X,
    Trophy,
    CheckCircle2,
    BarChart3,
    Layers,
    Sparkles,
} from 'lucide-react';
import { API_URL } from '../config/api';
import project1Img from '../assets/images/Project1.png';
import project2Img from '../assets/images/Project2.png';
import project3Img from '../assets/images/Project3.png';
import {
    SpotlightCard,
    TiltedCard,
    StarBorder,
    ShinyText,
    BlurText,
    GradientText,
} from '../components/reactbits';

const FALLBACK_IMAGES = [project1Img, project2Img, project3Img];

const DEFAULT_PROJECTS = [
    {
        id: 'sippoint',
        isBest: true,
        title: 'SipPoint — Smart F&B Ordering & POS Ecosystem (Graduation Project)',
        description:
            'Nền tảng chuyển đổi số toàn diện cho chuỗi Cà phê & Trà sữa gồm 3 phân hệ kết nối Realtime qua Socket.io, đối soát ngân hàng SePay IPN tự động và trợ lý AI RAG (Gemini 2.5 Flash).',
        category: 'fullstack',
        images: [project1Img, project2Img],
        metrics: [
            { label: 'Kiến trúc hệ thống', value: '3 Phân hệ' },
            { label: 'Đối soát SePay IPN', value: '< 2 Giây' },
            { label: 'Đồng bộ POS & Bàn', value: 'Realtime' },
            { label: 'Trợ lý AI RAG', value: 'Gemini 2.5' },
        ],
        highlights: [
            'Kiến trúc RESTful API (Node.js, Express, MongoDB, Redis) đồng bộ đơn hàng DINE_IN / TAKEAWAY / DELIVERY và trạng thái sơ đồ bàn thời gian thực qua Socket.io.',
            'Tự động hóa đối soát thanh toán chuyển khoản ngân hàng 100% qua SePay IPN Webhook, tự động kích hoạt đơn PAID và tích điểm hạng hội viên (Đồng, Bạc, Vàng, Kim Cương).',
            'Xây dựng cổng quản trị SipPoint-Portal (React 19, TanStack Query, Shadcn UI, Recharts) quản lý biến thể thực đơn, chiến dịch khuyến mãi, vòng quay Lucky Wheel và xuất báo cáo ExcelJS.',
            'Tích hợp AI Chatbot RAG tư vấn đồ uống thông minh với Google Gemini 2.5 Flash kèm cơ chế fallback OpenAI GPT-4o-mini.',
        ],
        tech: [
            'Node.js',
            'Express.js',
            'MongoDB',
            'Redis',
            'Socket.io',
            'React 19',
            'TanStack Query',
            'SePay Webhook',
            'Gemini AI',
        ],
        github: 'https://github.com/ltn23591/SipPoint-BE',
        live: 'https://github.com/ltn23591/SipPoint-Web-App',
        repos: [
            { label: 'Backend API', url: 'https://github.com/ltn23591/SipPoint-BE' },
            { label: 'Admin Portal', url: 'https://github.com/ltn23591/SipPoint-Portal' },
            { label: 'Web App', url: 'https://github.com/ltn23591/SipPoint-Web-App' },
        ],
    },
    {
        id: 'forever',
        isBest: false,
        title: 'Forever — Nền Tảng Thương Mại Điện Tử Thời Trang (MERN Stack)',
        description:
            'Hệ thống E-Commerce thời trang toàn diện gồm giao diện mua sắm, giỏ hàng đa biến thể (Size/Màu), thanh toán trực tuyến và trang quản trị đơn hàng.',
        category: 'fullstack',
        images: [project2Img],
        metrics: [
            { label: 'Kiến trúc', value: 'MERN Stack' },
            { label: 'Xác thực & RBAC', value: 'JWT Auth' },
            { label: 'Lưu trữ Media', value: 'Cloudinary' },
        ],
        highlights: [
            'Phát triển RESTful API chuẩn mực với Node.js, Express và MongoDB quản lý danh mục sản phẩm, tồn kho theo biến thể và vòng đời đơn hàng.',
            'Triển khai xác thực và phân quyền người dùng/Admin bảo mật bằng JWT, tích hợp lưu trữ hình ảnh sản phẩm trên Cloudinary.',
            'Thiết kế giao diện người dùng mượt mà với React.js & Tailwind CSS, hỗ trợ tìm kiếm, lọc đa tiêu chí và theo dõi trạng thái vận chuyển.',
        ],
        tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'JWT', 'Cloudinary'],
        github: 'https://github.com/ltn23591/Forever',
        live: 'https://github.com/ltn23591/Forever',
        repos: [{ label: 'Fullstack', url: 'https://github.com/ltn23591/Forever' }],
    },
    {
        id: 'fashion-store',
        isBest: false,
        title: 'Website Fashion Store — E-Commerce (Advanced Web Development Course Project)',
        description:
            'Ứng dụng thương mại điện tử xây dựng theo kiến trúc MVC thuần với tính năng tự động phân hạng thành viên, áp dụng Voucher và gửi hóa đơn tự động qua Email.',
        category: 'backend',
        images: [project3Img],
        metrics: [
            { label: 'Kiến trúc cốt lõi', value: 'PHP MVC' },
            { label: 'Hội viên tự động', value: 'User Rank' },
            { label: 'Thông báo đơn', value: 'PHPMailer' },
        ],
        highlights: [
            'Xây dựng bộ khung MVC tự định tuyến (Core Router, Controllers, Models, Views) kết hợp cơ chế xác thực Cookie/Session an toàn.',
            'Phát triển thuật toán tự động xếp hạng thành viên (User Rank) dựa trên lịch sử chi tiêu, áp dụng mã giảm giá (Voucher) và danh sách yêu thích (Favorite).',
            'Tích hợp dịch vụ PHPMailer tự động gửi email xác nhận chi tiết đơn hàng ngay khi đặt thành công và hỗ trợ luồng hủy/cập nhật đơn hàng.',
        ],
        tech: ['PHP MVC', 'MySQL', 'PHPMailer', 'JavaScript', 'Composer', 'REST'],
        github: 'https://github.com/ltn23591/Fashion-Store',
        live: 'https://github.com/ltn23591/Fashion-Store',
        repos: [{ label: 'Source Code', url: 'https://github.com/ltn23591/Fashion-Store' }],
    },
];

const ProjectDetailModal = ({ project, onClose }) => {
    const [currentIdx, setCurrentIdx] = useState(0);
    if (!project) return null;

    const images =
        project.images && project.images.length > 0 ? project.images : [project1Img];
    const metrics =
        project.metrics && project.metrics.length > 0
            ? project.metrics
            : [
                  { label: 'Hiệu suất API', value: '< 100ms' },
                  { label: 'Độ ổn định', value: '99.9%' },
                  { label: 'Kiến trúc', value: 'Scalable' },
              ];
    const highlights =
        project.highlights && project.highlights.length > 0
            ? project.highlights
            : [project.description || project.shortSummary];

    return (
        <div
            className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-6 overflow-y-auto animate-fade-in-up"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-4xl rounded-3xl bg-[#0b1118] border border-primary/30 shadow-2xl overflow-hidden my-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Top Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-slate-900/80 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-xs font-orbitron uppercase tracking-widest text-primary font-bold">
                            PROJECT DETAIL // KẾT QUẢ NỔI BẬT
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        aria-label="Đóng chi tiết dự án"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 md:p-8 space-y-7 max-h-[82vh] overflow-y-auto text-left">
                    {/* Image Showcase - Hiển thị đầy đủ không bị cắt cho cả giao diện Mobile & Desktop */}
                    <div className="relative rounded-2xl overflow-hidden bg-[#070b10] border border-white/10 flex items-center justify-center min-h-[260px] sm:min-h-[360px] md:min-h-[460px] max-h-[580px] p-2 sm:p-4">
                        {/* Background mờ theo ảnh để tạo chiều sâu và đồng nhất không gian */}
                        <div
                            className="absolute inset-0 bg-cover bg-center blur-2xl opacity-25 scale-110 pointer-events-none"
                            style={{ backgroundImage: `url(${images[currentIdx]})` }}
                        />

                        {/* Ảnh hiển thị trọn vẹn 100% kích thước (Mobile dọc lẫn Desktop ngang) */}
                        <img
                            src={images[currentIdx]}
                            alt={project.title}
                            className="relative z-10 max-h-[250px] sm:max-h-[350px] md:max-h-[520px] w-auto max-w-full object-contain mx-auto rounded-xl shadow-2xl transition-all duration-300"
                        />

                        {/* Bộ đếm ảnh khi có nhiều hình */}
                        {images.length > 1 && (
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/10 text-[11px] font-orbitron text-slate-300 shadow-md">
                                {currentIdx + 1} / {images.length}
                            </div>
                        )}

                        {images.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setCurrentIdx((prev) =>
                                            prev === 0 ? images.length - 1 : prev - 1
                                        )
                                    }
                                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-950/85 text-white hover:bg-primary hover:text-slate-950 transition-all cursor-pointer border border-white/10 shadow-lg"
                                    aria-label="Ảnh trước"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setCurrentIdx((prev) =>
                                            prev === images.length - 1 ? 0 : prev + 1
                                        )
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-950/85 text-white hover:bg-primary hover:text-slate-950 transition-all cursor-pointer border border-white/10 shadow-lg"
                                    aria-label="Ảnh tiếp theo"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Title & Links */}
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <span className="text-xs font-orbitron uppercase tracking-wider text-secondary">
                                Danh mục: {project.category}
                            </span>
                            <h3 className="text-2xl md:text-3xl font-bold font-orbitron text-white mt-1">
                                {project.title}
                            </h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            {Array.isArray(project.repos) && project.repos.length > 0 ? (
                                project.repos.map((r, rIdx) => (
                                    <a
                                        key={rIdx}
                                        href={r.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-orbitron text-white transition-all"
                                    >
                                        <Github className="w-4 h-4 text-primary" />{' '}
                                        {r.label || 'GitHub'}
                                    </a>
                                ))
                            ) : (
                                project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-orbitron text-white transition-all"
                                    >
                                        <Github className="w-4 h-4 text-primary" /> Source Code
                                    </a>
                                )
                            )}
                            {project.live && project.live !== project.github && (
                                <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-slate-950 font-bold text-sm font-orbitron hover:bg-primary-hover transition-all"
                                >
                                    <ExternalLink className="w-4 h-4" /> Live Demo
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Key Metrics Grid (Chỉ để kết quả nổi bật) */}
                    <div>
                        <h4 className="text-xs font-orbitron uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-primary" /> Chỉ Số & Kết Quả Đạt Được
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {metrics.map((m, idx) => (
                                <div
                                    key={idx}
                                    className="p-4 rounded-2xl bg-slate-900/90 border border-primary/25"
                                >
                                    <div className="text-xl font-bold font-orbitron text-primary">
                                        {m.value}
                                    </div>
                                    <div className="text-xs text-muted-foreground font-space mt-1">
                                        {m.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Concise Technical Highlights */}
                    <div>
                        <h4 className="text-xs font-orbitron uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                            <Layers className="w-4 h-4 text-secondary" /> Điểm Nhấn Kỹ Thuật Cốt Lõi
                        </h4>
                        <ul className="space-y-2.5 text-sm text-slate-200 font-space">
                            {highlights.map((item, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5"
                                >
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tech Stack */}
                    <div>
                        <h4 className="text-xs font-orbitron uppercase tracking-wider text-slate-400 mb-3">
                            Công Nghệ Sử Dụng
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {(project.tech || []).map((t, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 rounded-lg bg-slate-900 border border-white/10 text-xs font-orbitron text-teal-300"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProjectCard = ({ project, onSelectDetail }) => {
    const images =
        project.images && project.images.length > 0 ? project.images : [project2Img];
    const metrics =
        project.metrics && project.metrics.length > 0
            ? project.metrics
            : [
                  { label: 'Latency', value: '< 90ms' },
                  { label: 'Uptime', value: '99.9%' },
              ];

    return (
        <TiltedCard maxTilt={5} className="h-full">
            <SpotlightCard className="h-full flex flex-col justify-between group">
                <div className="flex flex-col flex-1">
                    {/* Cover Image - Hiển thị ảnh đầy đủ không bị xén */}
                    <div
                        onClick={() => onSelectDetail(project)}
                        className="relative h-52 w-full overflow-hidden bg-slate-950 border-b border-white/10 cursor-pointer flex items-center justify-center p-2 group shrink-0"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center blur-lg opacity-25 scale-110 pointer-events-none"
                            style={{ backgroundImage: `url(${images[0]})` }}
                        />
                        <img
                            src={images[0]}
                            alt={project.title}
                            className="relative z-10 max-h-full max-w-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1219] via-transparent to-transparent opacity-60 pointer-events-none" />

                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onSelectDetail(project);
                            }}
                            className="absolute top-3 right-3 z-20 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-primary/40 text-xs font-orbitron text-primary flex items-center gap-1.5 hover:bg-primary hover:text-slate-950 transition-all cursor-pointer shadow-md"
                        >
                            <Maximize2 className="w-3.5 h-3.5" /> Chi Tiết
                        </button>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex flex-col flex-1 justify-between text-left space-y-4">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="p-2.5 bg-white/5 rounded-xl border border-white/10">
                                    <FolderGit2 className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex items-center gap-2">
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                                            title="Source Code"
                                        >
                                            <Github className="w-4 h-4" />
                                        </a>
                                    )}
                                    {project.live && (
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-primary transition-colors"
                                            title="Live Demo"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold font-orbitron text-white group-hover:text-primary transition-colors min-h-[3.5rem] line-clamp-2 leading-snug flex items-center">
                                    {project.title}
                                </h3>
                                <p className="text-xs text-muted-foreground font-space mt-2 line-clamp-2 min-h-[2.25rem] leading-relaxed">
                                    {project.shortSummary || project.description}
                                </p>
                            </div>
                        </div>

                        {/* Compact Key Metrics inside Card - Aligned horizontally at identical baseline */}
                        <div className="grid grid-cols-2 gap-2 pt-2 mt-auto">
                            {metrics.slice(0, 2).map((m, idx) => (
                                <div
                                    key={idx}
                                    className="px-3 py-2 rounded-xl bg-slate-900/90 border border-white/5 flex flex-col justify-center min-h-[3.75rem]"
                                >
                                    <div className="text-sm font-bold font-orbitron text-emerald-400">
                                        {m.value}
                                    </div>
                                    <div className="text-[11px] text-muted-foreground font-space truncate">
                                        {m.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Card Footer: Tech & Detail Trigger */}
                <div className="px-6 pb-6 pt-3 border-t border-white/5 flex flex-col gap-3">
                    <div className="flex flex-wrap gap-1.5 min-h-[2rem] items-center">
                        {(project.tech || []).slice(0, 5).map((t, tIdx) => (
                            <span
                                key={tIdx}
                                className="text-[10px] font-orbitron px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 border border-white/5"
                            >
                                {t}
                            </span>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={() => onSelectDetail(project)}
                        className="w-full py-2.5 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-slate-950 border border-primary/30 text-xs font-orbitron font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                        Xem Kết Quả Chi Tiết
                    </button>
                </div>
            </SpotlightCard>
        </TiltedCard>
    );
};

const Projects = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);
    const [projectsList, setProjectsList] = useState(DEFAULT_PROJECTS);

    const categories = [
        { id: 'all', label: 'Tất Cả Dự Án' },
        { id: 'fullstack', label: 'Fullstack' },
        { id: 'backend', label: 'Backend & API' },
    ];

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch(`${API_URL}/api/portfolio/projects`);
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) {
                        const enriched = data.map((item, idx) => {
                            const matchedDefault = DEFAULT_PROJECTS.find((d) =>
                                item.title?.toLowerCase().includes(d.id.split('-')[0])
                            );
                            const fallback =
                                matchedDefault ||
                                DEFAULT_PROJECTS[idx % DEFAULT_PROJECTS.length];
                            return {
                                ...item,
                                isBest: Boolean(item.isBest),
                                images:
                                    item.images && item.images.length > 0
                                        ? item.images
                                        : fallback.images || [
                                              FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length],
                                          ],
                                metrics:
                                    item.metrics && item.metrics.length > 0
                                        ? item.metrics
                                        : fallback.metrics,
                                highlights:
                                    item.highlights && item.highlights.length > 0
                                        ? item.highlights
                                        : fallback.highlights || [item.description],
                            };
                        });
                        setProjectsList(enriched);
                    }
                }
            } catch {
                // Keep default projects
            }
        };
        fetchProjects();
    }, []);

    const bestProject = projectsList.find((p) => p.isBest) || projectsList[0];
    const filteredProjects =
        activeFilter === 'all'
            ? projectsList
            : projectsList.filter((p) => p.category === activeFilter);

    return (
        <section id="projects" className="py-24 relative overflow-hidden bg-background">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 space-y-20">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-block mb-3">
                        <ShinyText
                            text="04 // BEST PROJECT & FEATURED WORKS"
                            speed={3}
                            className="text-xs font-orbitron font-bold tracking-widest uppercase"
                        />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold font-orbitron text-white text-center flex justify-center">
                        <BlurText text="Dự Án Công Nghệ Tiêu Biểu" delay={60} className="justify-center text-center" />
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-5 rounded-full" />
                </div>

                {/* PART 7: BEST PROJECT (DỰ ÁN NỔI BẬT NHẤT + KẾT QUẢ ĐỘT PHÁ) */}
                {bestProject && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2.5">
                            <Trophy className="w-5 h-5 text-amber-400" />
                            <span className="text-sm font-orbitron font-bold uppercase tracking-wider text-amber-400">
                                Best Project // Dự Án Tâm Đắc Nhất
                            </span>
                        </div>

                        <StarBorder className="w-full" speed="6s">
                            <SpotlightCard className="p-6 md:p-10 text-left">
                                <div className="grid lg:grid-cols-12 gap-8 items-center">
                                    {/* Left Image - Hiển thị nguyên vẹn ảnh Mobile lẫn Desktop */}
                                    <div
                                        onClick={() => setSelectedProject(bestProject)}
                                        className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-white/10 min-h-[260px] sm:min-h-[320px] md:min-h-[380px] cursor-pointer group bg-slate-950 flex items-center justify-center p-3"
                                    >
                                        {/* Hiệu ứng nền mờ đồng màu tạo chiều sâu sang trọng */}
                                        <div
                                            className="absolute inset-0 bg-cover bg-center blur-xl opacity-25 scale-110 pointer-events-none"
                                            style={{
                                                backgroundImage: `url(${
                                                    (bestProject.images && bestProject.images[0]) ||
                                                    project1Img
                                                })`,
                                            }}
                                        />

                                        {/* Ảnh sản phẩm hiển thị đầy đủ không bị xén mép */}
                                        <img
                                            src={
                                                (bestProject.images && bestProject.images[0]) ||
                                                project1Img
                                            }
                                            alt={bestProject.title}
                                            className="relative z-10 max-h-[240px] sm:max-h-[300px] md:max-h-[360px] w-auto max-w-full object-contain rounded-xl shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />

                                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
                                            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-orbitron font-bold">
                                                ★ FEATURED FLAGSHIP
                                            </span>
                                            <span className="px-3 py-1 rounded-full bg-slate-950/80 text-xs font-orbitron text-primary border border-primary/30">
                                                Click xem chi tiết
                                            </span>
                                        </div>
                                    </div>

                                    {/* Right Outcomes & Metrics */}
                                    <div className="lg:col-span-6 space-y-5">
                                        <div>
                                            <h3 className="text-2xl md:text-3xl font-bold font-orbitron text-white">
                                                <GradientText>{bestProject.title}</GradientText>
                                            </h3>
                                            <p className="text-sm text-muted-foreground font-space mt-2">
                                                {bestProject.shortSummary || bestProject.description}
                                            </p>
                                        </div>

                                        {/* Highlighted Metrics */}
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {(bestProject.metrics || DEFAULT_PROJECTS[0].metrics).map(
                                                (m, i) => (
                                                    <div
                                                        key={i}
                                                        className="p-3 rounded-xl bg-slate-900/90 border border-primary/25"
                                                    >
                                                        <div className="text-base md:text-lg font-bold font-orbitron text-primary">
                                                            {m.value}
                                                        </div>
                                                        <div className="text-[11px] text-muted-foreground font-space mt-0.5">
                                                            {m.label}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>

                                        {/* Key Bullet Results */}
                                        <ul className="space-y-2 text-xs md:text-sm text-slate-300 font-space">
                                            {(
                                                bestProject.highlights ||
                                                DEFAULT_PROJECTS[0].highlights
                                            ).map((h, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                                    <span>{h}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Actions */}
                                        <div className="flex flex-wrap items-center gap-3 pt-2">
                                            <button
                                                type="button"
                                                onClick={() => setSelectedProject(bestProject)}
                                                className="px-5 py-2.5 rounded-xl bg-primary text-slate-950 font-orbitron font-bold text-xs uppercase tracking-wider hover:bg-primary-hover transition-all cursor-pointer"
                                            >
                                                Chi Tiết Kết Quả
                                            </button>
                                            {bestProject.github && (
                                                <a
                                                    href={bestProject.github}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-orbitron text-white transition-all"
                                                >
                                                    <Github className="w-4 h-4" /> GitHub
                                                </a>
                                            )}
                                            {bestProject.live && (
                                                <a
                                                    href={bestProject.live}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-orbitron text-primary transition-all"
                                                >
                                                    <ExternalLink className="w-4 h-4" /> Live Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </StarBorder>
                    </div>
                )}

                {/* PART 5 & 6: ALL PROJECTS + PROJECT DETAIL MODAL */}
                <div className="space-y-10">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <h3 className="text-2xl font-bold font-orbitron text-white">
                            Danh Sách Dự Án Đã Thực Hiện
                        </h3>

                        {/* Filter Selector */}
                        <div className="glass-pill p-1.5 rounded-full flex flex-wrap gap-1 justify-center">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveFilter(cat.id)}
                                    className={`px-4 py-2 text-xs font-orbitron font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                                        activeFilter === cat.id
                                            ? 'bg-gradient-to-r from-primary to-secondary text-slate-950 font-bold shadow-md'
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
                            <ProjectCard
                                key={idx}
                                project={project}
                                onSelectDetail={setSelectedProject}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Project Detail Modal */}
            <ProjectDetailModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
};

export default Projects;
