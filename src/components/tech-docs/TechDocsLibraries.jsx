import React, { useState, useEffect } from 'react';
import { Search, BookOpen, ChevronRight, Copy, Check, Info } from 'lucide-react';
import { API_URL } from '../../config/api';
import HighlightedCode from './HighlightedCode';
import { MarkdownDescription } from './MarkdownRenderer';

const TechDocsLibraries = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [libCategoryFilter, setLibCategoryFilter] = useState('all');
    const [libraries, setLibraries] = useState([]);
    const [selectedLib, setSelectedLib] = useState(null);
    const [libLang, setLibLang] = useState('ts'); // 'ts' or 'js'
    const [copied, setCopied] = useState(false);

    // Fetch Libraries Catalog
    useEffect(() => {
        const fetchLibraries = async () => {
            try {
                const res = await fetch(`${API_URL}/api/portfolio/libraries`);
                if (res.ok) {
                    const data = await res.json();
                    setLibraries(data || []);
                    if (data && data.length > 0) {
                        setSelectedLib(data[0]);
                        setLibLang(data[0].codeTs ? 'ts' : 'js');
                    }
                }
            } catch (err) {
                console.error("Lỗi tải libraries:", err);
            }
        };
        fetchLibraries();
    }, []);

    const filteredLibraries = libraries.filter(lib => {
        const matchesSearch = lib.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              lib.desc?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCat = libCategoryFilter === 'all' || lib.category?.toLowerCase() === libCategoryFilter.toLowerCase();
        return matchesSearch && matchesCat;
    });

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up text-left">
            {/* Libraries Sidebar */}
            <div className="lg:col-span-4 space-y-4">
                <div className="p-4 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl">
                    <div className="relative mb-4">
                        <Search className="absolute top-1/2 left-3.5 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                            type="text" 
                            placeholder="Tìm kiếm thư viện..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-950 text-xs rounded-xl border border-white/5 text-slate-300 focus:outline-none focus:border-primary/50"
                        />
                    </div>
                    
                    <div className="flex gap-1.5 overflow-x-auto pb-2 mb-3 max-w-full custom-scrollbar">
                        {['all', 'frontend', 'backend', 'database'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setLibCategoryFilter(cat)}
                                className={`py-1 px-2.5 rounded-lg text-[10px] uppercase font-bold tracking-wider shrink-0 transition-all cursor-pointer ${
                                    libCategoryFilter === cat ? 'bg-primary text-slate-950 font-semibold' : 'bg-slate-950/60 text-slate-400 hover:text-white'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-1.5 max-h-[50vh] overflow-y-auto custom-scrollbar">
                        {filteredLibraries.length === 0 ? (
                            <div className="text-center py-6 text-xs text-slate-500">
                                Không tìm thấy thư viện nào
                            </div>
                        ) : (
                            filteredLibraries.map(lib => (
                                <button
                                    key={lib.id}
                                    onClick={() => {
                                        setSelectedLib(lib);
                                        setLibLang(lib.codeTs ? 'ts' : 'js');
                                    }}
                                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                                        selectedLib?.id === lib.id
                                            ? 'border-primary/40 bg-primary/10 shadow-inner'
                                            : 'border-white/5 hover:border-white/20 bg-slate-950/40'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-xl bg-slate-900 border border-white/5 text-primary">
                                            <BookOpen size={16} />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-white font-outfit">{lib.name}</h4>
                                            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mt-0.5">{lib.category}</span>
                                        </div>
                                    </div>
                                    <ChevronRight size={14} className="text-slate-500" />
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Library Code Viewer IDE Mockup */}
            <div className="lg:col-span-8">
                {selectedLib ? (
                    <div className="rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl overflow-hidden flex flex-col h-full justify-between">
                        {/* IDE Tab Header */}
                        <div className="bg-slate-950 px-4 py-3 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1.5 mr-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                </div>
                                <div className="flex gap-1">
                                    {selectedLib.codeTs && (
                                        <button 
                                            onClick={() => setLibLang('ts')}
                                            className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold cursor-pointer transition-all ${
                                                libLang === 'ts' ? 'bg-slate-900 border border-white/5 text-sky-400' : 'text-slate-500 hover:text-slate-300'
                                            }`}
                                        >
                                            {selectedLib.filename || 'config.ts'}
                                        </button>
                                    )}
                                    {selectedLib.codeJs && (
                                        <button 
                                            onClick={() => setLibLang('js')}
                                            className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold cursor-pointer transition-all ${
                                                libLang === 'js' ? 'bg-slate-900 border border-white/5 text-amber-400' : 'text-slate-500 hover:text-slate-300'
                                            }`}
                                        >
                                            {selectedLib.filename ? selectedLib.filename.replace('.ts', '.js') : 'config.js'}
                                        </button>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => handleCopy(libLang === 'ts' ? selectedLib.codeTs : selectedLib.codeJs)}
                                className="text-[10px] font-bold text-primary flex items-center gap-1 hover:underline cursor-pointer"
                            >
                                {copied ? <Check size={12} /> : <Copy size={12} />}
                                {copied ? 'Đã sao chép' : 'Copy code'}
                            </button>
                        </div>

                        {/* IDE Editor view */}
                        <div className="p-4 bg-slate-950/20 flex-1 overflow-auto custom-scrollbar min-h-[300px]">
                            <HighlightedCode code={libLang === 'ts' ? selectedLib.codeTs : selectedLib.codeJs} />
                        </div>

                        {/* Library Description footer block */}
                        <div className="p-5 bg-slate-950/60 border-t border-white/5">
                            <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5 select-none">
                                <Info size={14} className="text-primary" /> Mô tả Thư viện
                            </h4>
                            <MarkdownDescription text={selectedLib.desc} />
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center p-8 text-center text-slate-500 border border-white/5 rounded-3xl bg-slate-900/40">
                        Chọn một thư viện ở thanh bên để xem hướng dẫn cấu hình
                    </div>
                )}
            </div>
        </div>
    );
};

export default TechDocsLibraries;
