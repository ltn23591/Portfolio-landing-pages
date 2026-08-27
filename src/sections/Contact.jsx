import React, { useState } from 'react';
import Button from '../components/Button';
import { Mail, MapPin, Phone, Send, Github, Linkedin, MessageSquare } from 'lucide-react';

const Contact = ({ settings }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const contactEmail = settings?.contactEmail || "letrungnghia.dev@gmail.com";
    const contactPhone = settings?.contactPhone || "+84 987 654 321";
    const contactAddress = settings?.contactAddress || "TP. Hồ Chí Minh, Việt Nam";
    const githubUrl = settings?.githubUrl || "https://github.com";
    const linkedinUrl = settings?.linkedinUrl || "https://linkedin.com";
    const telegramUrl = settings?.telegramUrl || "https://t.me/example";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg('');
        try {
            const response = await fetch('http://localhost:3000/api/contact', {
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
                    : (data.message || 'Có lỗi xảy ra');
                setErrorMsg(error);
            }
        } catch (error) {
            setErrorMsg('Không thể kết nối đến máy chủ. Vui lòng kiểm tra xem backend đang chạy tại http://localhost:3000');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="contact" className="py-28 relative overflow-hidden bg-background border-t border-border/40">
            {/* Backdrop glow */}
            <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-secondary/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 left-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Title */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-sm font-semibold tracking-wider text-primary uppercase mb-3">Liên Hệ</h2>
                    <p className="text-4xl md:text-5xl font-bold font-outfit text-white">
                        Hãy cùng kiến tạo những điều <span className="font-serif italic font-normal text-slate-300">phi thường</span>
                    </p>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 rounded-full" />
                </div>

                <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
                    {/* Left Column: Contact Cards info (5 cols) */}
                    <div className="lg:col-span-5 space-y-6 text-left animate-fade-in-up">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold font-outfit text-white">
                                Thông Tin Liên Hệ
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Bạn đang có ý tưởng dự án thú vị, cần tối ưu hóa hệ thống backend, hay đơn giản muốn trò chuyện về kỹ thuật? Hãy gửi tin nhắn cho tôi.
                            </p>
                        </div>

                        {/* Cards contact items */}
                        <div className="space-y-4 pt-4">
                            {[
                                { icon: <Mail className="w-5 h-5 text-primary" />, title: "Gửi email trực tiếp", value: contactEmail, href: `mailto:${contactEmail}` },
                                { icon: <Phone className="w-5 h-5 text-secondary" />, title: "Điện thoại hoặc Zalo", value: contactPhone, href: `tel:${contactPhone.replace(/\s+/g, '')}` },
                                { icon: <MapPin className="w-5 h-5 text-emerald-400" />, title: "Địa chỉ hiện tại", value: contactAddress, href: null }
                            ].map((item, idx) => (
                                <div 
                                    key={idx} 
                                    className="glass p-4 rounded-xl border border-white/5 flex items-center gap-4 hover:border-primary/20 transition-all duration-300"
                                >
                                    <div className="p-3 bg-white/5 rounded-lg border border-white/10 shrink-0">
                                        {item.icon}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold text-muted-foreground">{item.title}</p>
                                        {item.href ? (
                                            <a href={item.href} className="text-sm font-semibold text-white hover:text-primary transition-colors block truncate">
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className="text-sm font-semibold text-white truncate">{item.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social profiles banner */}
                        <div className="pt-6 space-y-3">
                            <p className="text-sm font-bold text-white uppercase tracking-wider">Theo dõi tôi:</p>
                            <div className="flex items-center gap-3">
                                {[
                                    { icon: <Github className="w-5 h-5" />, href: githubUrl, label: "GitHub" },
                                    { icon: <Linkedin className="w-5 h-5" />, href: linkedinUrl, label: "LinkedIn" },
                                    { icon: <MessageSquare className="w-5 h-5" />, href: telegramUrl, label: "Telegram" }
                                ].map((soc, idx) => (
                                    <a
                                        key={idx}
                                        href={soc.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={soc.label}
                                        className="w-11 h-11 rounded-full glass border border-white/5 hover:border-primary/50 text-muted-foreground hover:text-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
                                    >
                                        {soc.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Modern Glassmorphic Form (7 cols) */}
                    <div className="lg:col-span-7 animate-fade-in-up delay-200">
                        <div className="glass p-8 md:p-10 rounded-2xl border border-white/5 relative glow-hover">
                            {formSubmitted && (
                                <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm z-30 flex flex-col items-center justify-center text-center p-6 rounded-2xl animate-fade-in-up">
                                    <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary text-primary flex items-center justify-center mb-4">
                                        <Send className="w-6 h-6 animate-pulse" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Gửi thành công!</h3>
                                    <p className="text-muted-foreground max-w-xs">
                                        Cảm ơn bạn đã liên hệ. Tôi sẽ đọc và phản hồi tin nhắn của bạn sớm nhất có thể.
                                    </p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {errorMsg && (
                                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm text-left">
                                        {errorMsg}
                                    </div>
                                )}
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Name Field */}
                                    <div className="relative group text-left">
                                        <label htmlFor="name" className="text-xs font-semibold text-slate-300 uppercase tracking-wide block mb-2">Họ và Tên</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            disabled={isLoading}
                                            className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                            placeholder="Nguyễn Văn A"
                                        />
                                    </div>

                                    {/* Email Field */}
                                    <div className="relative group text-left">
                                        <label htmlFor="email" className="text-xs font-semibold text-slate-300 uppercase tracking-wide block mb-2">Địa chỉ Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            disabled={isLoading}
                                            className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                            placeholder="nguyenvana@example.com"
                                        />
                                    </div>
                                </div>

                                {/* Subject Field */}
                                <div className="relative group text-left">
                                    <label htmlFor="subject" className="text-xs font-semibold text-slate-300 uppercase tracking-wide block mb-2">Tiêu đề</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isLoading}
                                        className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="Hợp tác phát triển dự án"
                                    />
                                </div>

                                {/* Message Field */}
                                <div className="relative group text-left">
                                    <label htmlFor="message" className="text-xs font-semibold text-slate-300 uppercase tracking-wide block mb-2">Nội dung tin nhắn</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isLoading}
                                        rows={5}
                                        className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="Mô tả yêu cầu dự án hoặc phản hồi của bạn..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <Button 
                                    type="submit" 
                                    size="lg" 
                                    variant="primary" 
                                    className="w-full group"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Đang gửi tin nhắn...' : 'Gửi tin nhắn bảo mật'}
                                    <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;