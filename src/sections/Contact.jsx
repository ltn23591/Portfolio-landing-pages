import React, { useState } from 'react';
import Button from '../components/Button';
import { Mail, MapPin, Phone, Send, Github, Linkedin, MessageSquare } from 'lucide-react';
import { API_URL } from '../config/api';
import { SpotlightCard, ShinyText, BlurText, Magnet } from '../components/reactbits';

const Contact = ({ settings }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const contactEmail = settings?.contactEmail || 'ltn23591@gmail.com';
    const contactPhone = settings?.contactPhone || '0326405864';
    const contactAddress = settings?.contactAddress || 'Quận Bình Tân, TP. Hồ Chí Minh';
    const githubUrl = settings?.githubUrl || 'https://github.com/ltn23591';
    const linkedinUrl = settings?.linkedinUrl || 'https://linkedin.com';
    const telegramUrl = settings?.telegramUrl || 'https://t.me/example';

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg('');
        try {
            const response = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                setFormSubmitted(true);
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setFormSubmitted(false), 4000);
            } else {
                const error = Array.isArray(data.message)
                    ? data.message.join(', ')
                    : data.message || 'Có lỗi xảy ra';
                setErrorMsg(error);
            }
        } catch {
            setErrorMsg(
                `Không thể kết nối đến máy chủ. Vui lòng liên hệ trực tiếp qua SĐT hoặc Email.`
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="contact" className="py-24 relative overflow-hidden bg-background border-t border-border/40">
            {/* Backdrop glow */}
            <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-secondary/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 left-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Title */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-block mb-3">
                        <ShinyText
                            text="05 // CONTACT FOR WORK"
                            speed={3}
                            className="text-xs font-orbitron font-bold tracking-widest uppercase"
                        />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold font-orbitron text-white text-center flex justify-center">
                        <BlurText text="Thông Tin Liên Hệ Công Việc" delay={60} className="justify-center text-center" />
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-5 rounded-full" />
                </div>

                <div className="grid lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
                    {/* Left Column: Direct Phone, Email & Social Links */}
                    <div className="lg:col-span-5 space-y-6 text-left">
                        <div className="space-y-3">
                            <h3 className="text-2xl font-bold font-orbitron text-white">
                                Kênh Liên Lạc Trực Tiếp
                            </h3>
                            <p className="text-muted-foreground font-space text-sm leading-relaxed">
                                Sẵn sàng trao đổi về cơ hội hợp tác phát triển phần mềm, vị trí Backend / Fullstack Engineer hoặc tư vấn kiến trúc hệ thống.
                            </p>
                        </div>

                        {/* Contact Cards */}
                        <div className="space-y-4 pt-2">
                            {[
                                {
                                    icon: <Phone className="w-5 h-5 text-primary" />,
                                    title: 'Số Điện Thoại / Zalo',
                                    value: contactPhone,
                                    href: `tel:${contactPhone.replace(/\s+/g, '')}`,
                                },
                                {
                                    icon: <Mail className="w-5 h-5 text-secondary" />,
                                    title: 'Email Công Việc',
                                    value: contactEmail,
                                    href: `mailto:${contactEmail}`,
                                },
                                {
                                    icon: <MapPin className="w-5 h-5 text-emerald-400" />,
                                    title: 'Khu Vực Làm Việc',
                                    value: contactAddress,
                                    href: null,
                                },
                            ].map((item, idx) => (
                                <SpotlightCard key={idx} className="p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-white/5 rounded-xl border border-white/10 shrink-0">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <span className="text-xs text-muted-foreground font-orbitron uppercase tracking-wider block">
                                                {item.title}
                                            </span>
                                            {item.href ? (
                                                <a
                                                    href={item.href}
                                                    className="text-sm md:text-base font-bold font-space text-white hover:text-primary transition-colors"
                                                >
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <span className="text-sm md:text-base font-bold font-space text-white">
                                                    {item.value}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </SpotlightCard>
                            ))}
                        </div>

                        {/* Social Profiles */}
                        <div className="pt-4 space-y-3">
                            <span className="text-xs font-orbitron font-bold uppercase tracking-wider text-muted-foreground block">
                                Trang Mạng Xã Hội & Hồ Sơ Kỹ Thuật
                            </span>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    { icon: <Github className="w-5 h-5" />, label: 'GitHub', href: githubUrl },
                                    { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', href: linkedinUrl },
                                    { icon: <MessageSquare className="w-5 h-5" />, label: 'Telegram', href: telegramUrl },
                                ].map((soc, idx) => (
                                    <Magnet key={idx} padding={20} magnetStrength={4}>
                                        <a
                                            href={soc.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="px-4 py-2.5 rounded-xl glass border border-white/10 hover:border-primary/50 text-xs font-orbitron font-semibold text-slate-200 hover:text-primary flex items-center gap-2 transition-all duration-300"
                                        >
                                            {soc.icon}
                                            <span>{soc.label}</span>
                                        </a>
                                    </Magnet>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Quick Message Form */}
                    <div className="lg:col-span-7">
                        <SpotlightCard className="p-8 md:p-10 text-left">
                            <h3 className="text-xl font-bold font-orbitron text-white mb-6">
                                Gửi Tin Nhắn Nhanh
                            </h3>

                            {formSubmitted ? (
                                <div className="py-12 text-center space-y-4">
                                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                                        <Send className="w-7 h-7" />
                                    </div>
                                    <h4 className="text-2xl font-bold font-orbitron text-white">
                                        Đã Gửi Tin Nhắn!
                                    </h4>
                                    <p className="text-muted-foreground font-space max-w-md mx-auto">
                                        Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi lại bạn trong thời gian sớm nhất.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5 font-space">
                                    {errorMsg && (
                                        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm">
                                            {errorMsg}
                                        </div>
                                    )}

                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-xs font-orbitron uppercase tracking-wider text-slate-300 block">
                                                Họ và Tên
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="Nguyễn Văn A"
                                                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary transition-colors text-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-orbitron uppercase tracking-wider text-slate-300 block">
                                                Địa chỉ Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="email@company.com"
                                                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary transition-colors text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-orbitron uppercase tracking-wider text-slate-300 block">
                                            Tiêu đề công việc
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Hợp tác dự án / Tuyển dụng Kỹ sư Backend"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary transition-colors text-sm"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-orbitron uppercase tracking-wider text-slate-300 block">
                                            Nội dung trao đổi
                                        </label>
                                        <textarea
                                            rows={4}
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Nhập nội dung chi tiết công việc hoặc yêu cầu dự án..."
                                            className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary transition-colors text-sm resize-none"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        className="w-full font-orbitron"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Đang Gửi...' : 'Gửi Tin Nhắn Liên Hệ'}
                                        <Send className="w-4 h-4 ml-2" />
                                    </Button>
                                </form>
                            )}
                        </SpotlightCard>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
