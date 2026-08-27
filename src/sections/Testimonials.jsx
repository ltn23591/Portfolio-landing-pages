import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
    const [testimonials, setTestimonials] = React.useState([
        {
            name: "Sarah Jenkins",
            role: "CTO, FinTech Core",
            content: "Le Trung Nghia delivered our core payments API infrastructure with absolute precision. His implementation of the idempotency layer resolved double-charge issues entirely. A top-tier backend engineer.",
            rating: 5,
            avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80"
        },
        {
            name: "David Miller",
            role: "Product Director, Nexus Labs",
            content: "Nghia is our go-to developer for complex database schemas. He migrated 10M records from MongoDB to PostgreSQL seamlessly. The speed improvements across our dashboards are phenomenal.",
            rating: 5,
            avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
        }
    ]);

    React.useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/portfolio/testimonials');
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) setTestimonials(data);
                }
            } catch (err) {
                console.log('Using default mock values for Testimonials.');
            }
        };
        fetchTestimonials();
    }, []);

    return (
        <section id="testimonials" className="py-28 relative overflow-hidden bg-slate-950/20">
            {/* Background orbs */}
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Title */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-sm font-semibold tracking-wider text-primary uppercase mb-3">Đánh giá</h2>
                    <p className="text-4xl md:text-5xl font-bold font-outfit text-white">
                        Nhận xét từ <span className="font-serif italic font-normal text-slate-300">đối tác</span> & chuyên gia
                    </p>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 rounded-full" />
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((test, idx) => (
                        <div 
                            key={idx}
                            className="glass p-8 rounded-2xl border border-white/5 glow-hover flex flex-col justify-between text-left relative group"
                        >
                            {/* Decorative Quote Icon */}
                            <Quote className="w-10 h-10 text-primary/10 absolute top-6 right-6 group-hover:text-primary/20 transition-colors duration-300" />
                            
                            <div className="space-y-6">
                                {/* Rating Stars */}
                                <div className="flex items-center gap-1">
                                    {[...Array(test.rating)].map((_, sIdx) => (
                                        <Star key={sIdx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>

                                <p className="text-slate-300 text-sm leading-relaxed italic">
                                    "{test.content}"
                                </p>
                            </div>

                            {/* Author Info */}
                            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/5">
                                <img 
                                    src={test.avatarUrl} 
                                    alt={test.name}
                                    className="w-12 h-12 rounded-full border border-primary/20 object-cover"
                                    loading="lazy"
                                />
                                <div>
                                    <h4 className="text-sm font-bold text-white font-outfit">{test.name}</h4>
                                    <p className="text-xs text-muted-foreground">{test.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;