import React, { useState, useEffect } from 'react';
import { Terminal, BookOpen, Wrench, Cpu, Server, Sliders } from 'lucide-react';

import TechDocsLibraries from '../components/tech-docs/TechDocsLibraries';
import TechDocsToolbox from '../components/tech-docs/TechDocsToolbox';
import NestJSHub from '../components/tech-docs/NestJSHub';
import NodeJSHub from '../components/tech-docs/NodeJSHub';
import VSCodeExtensions from '../components/tech-docs/VSCodeExtensions';

const TechDocs = () => {
    const [activeTab, setActiveTab] = useState('libraries'); // default to libraries (Tài Liệu)

    useEffect(() => {
        const handleHash = () => {
            const hash = window.location.hash;
            if (hash === '#tech-docs-nestjs') {
                setActiveTab('nestjs-hub');
            } else if (hash === '#tech-docs-nodejs') {
                setActiveTab('nodejs-hub');
            } else if (hash === '#tech-docs-toolbox') {
                setActiveTab('toolbox');
            } else if (hash === '#tech-docs' || hash === '') {
                setActiveTab('libraries');
            }
        };
        handleHash();
        window.addEventListener('hashchange', handleHash);
        return () => window.removeEventListener('hashchange', handleHash);
    }, []);

    return (
        <section id="tech-docs" className="relative py-24 border-t border-white/5 bg-[#080c10] overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs text-primary font-bold uppercase tracking-wider mb-4">
                        <Terminal size={14} />
                        Developer Workspace
                    </div>
                    <h2 className="text-4xl font-bold font-outfit mb-4 text-white">
                        Tài Liệu & <span className="text-gradient bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400">Công Cụ Dev</span>
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        Hệ sinh thái cẩm nang lập trình kết hợp bộ công cụ trực tuyến tương tác giúp tăng tốc độ thiết kế UI/UX và xử lý cấu trúc dữ liệu backend.
                    </p>
                </div>

                {/* Navigation tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-10 max-w-4xl mx-auto">
                    <button
                        onClick={() => {
                            window.location.hash = '#tech-docs';
                            setActiveTab('libraries');
                        }}
                        className={`flex items-center gap-2 px-5 py-3 rounded-2xl border transition-all cursor-pointer font-medium text-xs ${
                            activeTab === 'libraries'
                                ? 'bg-primary border-primary text-slate-950 font-semibold shadow-lg shadow-primary/20'
                                : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white'
                        }`}
                    >
                        <BookOpen size={16} />
                        Tài Liệu
                    </button>
                    <button
                        onClick={() => {
                            window.location.hash = '#tech-docs-toolbox';
                            setActiveTab('toolbox');
                        }}
                        className={`flex items-center gap-2 px-5 py-3 rounded-2xl border transition-all cursor-pointer font-medium text-xs ${
                            activeTab === 'toolbox'
                                ? 'bg-primary border-primary text-slate-950 font-semibold shadow-lg shadow-primary/20'
                                : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white'
                        }`}
                    >
                        <Wrench size={16} />
                        Công Cụ Dev
                    </button>
                    <button
                        onClick={() => {
                            window.location.hash = '#tech-docs-nestjs';
                            setActiveTab('nestjs-hub');
                        }}
                        className={`flex items-center gap-2 px-5 py-3 rounded-2xl border transition-all cursor-pointer font-medium text-xs ${
                            activeTab === 'nestjs-hub'
                                ? 'bg-primary border-primary text-slate-950 font-semibold shadow-lg shadow-primary/20'
                                : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white'
                        }`}
                    >
                        <Cpu size={16} />
                        NestJS Master Hub
                    </button>
                    <button
                        onClick={() => {
                            window.location.hash = '#tech-docs-nodejs';
                            setActiveTab('nodejs-hub');
                        }}
                        className={`flex items-center gap-2 px-5 py-3 rounded-2xl border transition-all cursor-pointer font-medium text-xs ${
                            activeTab === 'nodejs-hub'
                                ? 'bg-primary border-primary text-slate-950 font-semibold shadow-lg shadow-primary/20'
                                : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white'
                        }`}
                    >
                        <Server size={16} />
                        Node.js Hub
                    </button>
                    <button
                        onClick={() => setActiveTab('extensions')}
                        className={`flex items-center gap-2 px-5 py-3 rounded-2xl border transition-all cursor-pointer font-medium text-xs ${
                            activeTab === 'extensions'
                                ? 'bg-primary border-primary text-slate-950 font-semibold shadow-lg shadow-primary/20'
                                : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white'
                        }`}
                    >
                        <Sliders size={16} />
                        VS Code Extensions
                    </button>
                </div>

                {/* Content rendering based on active tab */}
                <div className="max-w-6xl mx-auto">
                    {activeTab === 'libraries' && <TechDocsLibraries />}
                    {activeTab === 'toolbox' && <TechDocsToolbox />}
                    {activeTab === 'nestjs-hub' && <NestJSHub />}
                    {activeTab === 'nodejs-hub' && <NodeJSHub />}
                    {activeTab === 'extensions' && <VSCodeExtensions />}
                </div>
            </div>
        </section>
    );
};

export default TechDocs;