import React, { useState, useEffect } from 'react';
import { Calendar, Briefcase, CheckCircle2, TrendingUp } from 'lucide-react';
import { API_URL } from '../config/api';
import { SpotlightCard, ShinyText, BlurText } from '../components/reactbits';

const Experience = () => {
    const [experiences, setExperiences] = useState([
        {
            role: 'Software Engineer Intern',
            company: 'Công ty HiAI — Dự Án Hệ Thống ERP & E-Commerce Phú Hòa Food (phf-api & phf-ui-web)',
            period: '04/2026 - 07/2026',
            achievements: [
                'Hoàn thành 20+ Jira Tasks & PRs (PHF-765..972)',
                'Tối ưu SQL CTE Báo cáo Tồn kho',
                'Xử lý tải lớn Kiểm kê kho (Stock-Count)',
            ],
            description: [
                '[Backend - PHF-765 & PHF-769]: Thiết kế API Báo cáo Xuất-Nhập-Tồn (Inventory Report) và tối ưu câu truy vấn SQL CTE tính lũy kế tồn đầu kỳ (Opening Stock) chính xác theo khoảng thời gian.',
                '[Backend - PHF-932, PHF-869, PHF-966]: Nâng giới hạn payload & transaction timeout cho nghiệp vụ Kiểm kê kho dữ liệu lớn; lưu ảnh minh chứng khi tồn thực tế bằng 0 và chống trùng kho khi tạo phiếu xuất nội bộ.',
                '[Backend - PHF-963, PHF-922, PHF-924]: Ánh xạ thuế suất (taxRate) vào đơn mua hàng (PO); chuẩn hóa URL ảnh sản phẩm (toPublicStorageUrl) và cập nhật bộ đếm số lượng Role active.',
                '[Frontend - PHF-965, PHF-934, PHF-967, PHF-923]: Đồng bộ danh sách PO sau khi kiểm nhập kho; kiểm soát chế độ chỉnh sửa phiếu chuyển kho (Warehouse Transfer) và tích hợp tìm kiếm ẩn trên TanStack Table.',
            ],
            skills: [
                'Node.js',
                'TypeScript',
                'PostgreSQL (SQL CTE)',
                'React / Next.js',
                'TanStack Table',
                'RESTful API',
                'Git Flow',
            ],
        },
        {
            role: 'Lead Fullstack Developer (Đồ Án & Dự Án Thực Tế)',
            company: 'Hệ Sinh Thái SipPoint F&B & E-Commerce (Forever, Fashion-Store)',
            period: '2024 - 2026',
            achievements: [
                'Kiến trúc 3 phân hệ (BE, POS Portal, Web App)',
                'Tự động đối soát SePay IPN < 2s',
                'Tích hợp Gemini 2.5 Flash RAG',
            ],
            description: [
                'Thiết kế và phát triển toàn diện hệ sinh thái SipPoint (SipPoint-BE, SipPoint-Portal, SipPoint-Web-App) với Node.js, Express, MongoDB, Redis và Socket.io thời gian thực.',
                'Triển khai luồng thanh toán QR và đối soát tự động qua SePay IPN Webhook, hệ thống tích điểm hội viên 4 cấp bậc và vòng quay may mắn có cấu hình xác suất.',
                'Xây dựng các nền tảng thương mại điện tử Forever (MERN Stack) và Fashion-Store (PHP MVC & MySQL) với đầy đủ tính năng giỏ hàng, Voucher, xếp hạng User và gửi hóa đơn PHPMailer.',
            ],
            skills: [
                'Express.js',
                'MongoDB',
                'Redis',
                'Socket.io',
                'React 19',
                'SePay Webhook',
                'MySQL',
            ],
        },
    ]);

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const res = await fetch(`${API_URL}/api/portfolio/experience`);
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) setExperiences(data);
                }
            } catch {
                // Keep default mock values
            }
        };
        fetchExperience();
    }, []);

    return (
        <section id="experience" className="py-24 relative bg-background overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-block mb-3">
                        <ShinyText
                            text="03 // WORK EXPERIENCE & ACHIEVEMENTS"
                            speed={3}
                            className="text-xs font-orbitron font-bold tracking-widest uppercase"
                        />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold font-orbitron text-white text-center flex justify-center">
                        <BlurText text="Kinh Nghiệm Làm Việc" delay={60} className="justify-center text-center" />
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-5 rounded-full" />
                    <p className="text-muted-foreground font-space mt-4 text-base">
                        Quá trình công tác và những thành tựu định lượng đạt được trong thực tế
                    </p>
                </div>

                {/* Vertical Timeline */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Center Line on Desktop / Left Line on Mobile */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent md:-translate-x-1/2" />

                    <div className="space-y-12">
                        {experiences.map((exp, idx) => {
                            const isEven = idx % 2 === 0;
                            const achievements = exp.achievements || [
                                'Tối ưu hiệu suất hệ thống',
                                'Đảm bảo tiến độ & chất lượng',
                            ];

                            return (
                                <div
                                    key={idx}
                                    className={`relative flex flex-col md:flex-row items-start ${
                                        isEven ? 'md:flex-row-reverse' : ''
                                    }`}
                                >
                                    {/* Timeline Node */}
                                    <div className="absolute left-4 md:left-1/2 top-8 -translate-x-1/2 z-20">
                                        <div className="w-5 h-5 rounded-full bg-slate-950 border-2 border-primary ring-4 ring-primary/20 flex items-center justify-center">
                                            <span className="w-2 h-2 rounded-full bg-primary" />
                                        </div>
                                    </div>

                                    {/* Content Card */}
                                    <div
                                        className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                                            isEven ? 'md:pl-10' : 'md:pr-10'
                                        }`}
                                    >
                                        <SpotlightCard className="p-6 md:p-8 text-left">
                                            <div className="flex flex-col gap-7">
                                            {/* Role & Period Header */}
                                            <div className="space-y-3 pb-5 border-b border-white/10">
                                                <div className="flex flex-wrap items-center justify-between gap-2">
                                                    <h3 className="text-xl font-bold font-orbitron text-white flex items-center gap-2">
                                                        <Briefcase className="w-4 h-4 text-primary shrink-0" />
                                                        {exp.role}
                                                    </h3>
                                                    <span className="inline-flex items-center gap-1.5 text-xs font-orbitron font-semibold px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        {exp.period}
                                                    </span>
                                                </div>
                                                <p className="text-sm font-semibold text-teal-400 font-space">
                                                    {exp.company}
                                                </p>
                                            </div>

                                            {/* Key Quantifiable Achievements */}
                                            <div className="space-y-3.5">
                                                <span className="text-[11px] font-orbitron uppercase tracking-wider text-slate-400 block">
                                                    Thành tựu nổi bật:
                                                </span>
                                                <div className="flex flex-wrap gap-2.5">
                                                    {achievements.map((ach, aIdx) => (
                                                        <span
                                                            key={aIdx}
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-space font-medium leading-relaxed"
                                                        >
                                                            <TrendingUp className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                                                            {ach}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Concise Bullet Points with Distinct Spacing */}
                                            <div className="space-y-3.5">
                                                <span className="text-[11px] font-orbitron uppercase tracking-wider text-slate-400 block">
                                                    Đóng góp & giải pháp kỹ thuật:
                                                </span>
                                                <ul className="space-y-3 text-sm text-slate-300 font-space">
                                                    {(Array.isArray(exp.description)
                                                        ? exp.description
                                                        : [exp.description]
                                                    ).map((bullet, bIdx) => (
                                                        <li
                                                            key={bIdx}
                                                            className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/25 transition-colors"
                                                        >
                                                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                                            <span className="leading-relaxed">{bullet}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Skills Tags */}
                                            <div className="pt-6 border-t border-white/10 space-y-3.5">
                                                <span className="text-[11px] font-orbitron uppercase tracking-wider text-slate-400 block">
                                                    Công nghệ & Kỹ năng áp dụng:
                                                </span>
                                                <div className="flex flex-wrap gap-2.5">
                                                    {(exp.skills || []).map((s, sIdx) => (
                                                        <span
                                                            key={sIdx}
                                                            className="text-[11px] font-orbitron font-semibold uppercase tracking-wider text-slate-300 px-2.5 py-1 rounded-md bg-slate-900 border border-white/10"
                                                        >
                                                            {s}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            </div>
                                        </SpotlightCard>
                                    </div>

                                    <div className="hidden md:block md:w-1/2" />
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
