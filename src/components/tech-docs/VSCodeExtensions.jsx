import React, { useState, useEffect } from 'react';
import { 
    Terminal, Palette, FileCode, ShieldAlert, Globe, Database, Wrench, Sparkles, Code, CheckCircle2 
} from 'lucide-react';
import { API_URL } from '../../config/api';

const VSCodeExtensions = () => {
    const [extensions, setExtensions] = useState([]);
    const [copiedId, setCopiedId] = useState(null);

    useEffect(() => {
        const fetchExtensions = async () => {
            try {
                const res = await fetch(`${API_URL}/api/portfolio/extensions`);
                if (res.ok) {
                    const data = await res.json();
                    setExtensions(data || []);
                }
            } catch (err) {
                console.error('Error fetching extensions:', err);
            }
        };
        fetchExtensions();
    }, []);

    const getCategoryIcon = (category) => {
        switch (category?.toLowerCase()) {
            case 'theme': return Palette;
            case 'formatter': return FileCode;
            case 'linter': return ShieldAlert;
            case 'git': return Globe;
            case 'database': return Database;
            case 'utility': return Wrench;
            case 'ai': return Sparkles;
            default: return Code;
        }
    };

    const handleCopy = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="space-y-6 animate-fade-in-up text-left">
            <div className="p-6 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl">
                <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-3">
                    <h3 className="text-xl font-bold font-outfit text-white">
                        🔌 Khuyên Dùng VS Code Extensions
                    </h3>
                    <span className="text-xs text-primary font-bold uppercase tracking-wider bg-primary/5 px-2.5 py-1 rounded-full border border-primary/20">
                        {extensions.length} Extensions
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {extensions.map((ext) => {
                        const ExtIcon = getCategoryIcon(ext.category);
                        return (
                            <div key={ext.id} className="p-4 rounded-2xl border border-white/5 bg-slate-950/40 hover:border-primary/20 hover:bg-slate-900/20 transition-all flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 rounded-xl bg-slate-900 border border-white/5 text-primary">
                                            <ExtIcon size={16} />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-white font-outfit">{ext.name}</h4>
                                            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                                                {ext.category}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                                        {ext.desc || ext.description}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                                    <span className="text-[10px] font-mono text-slate-500">
                                        {ext.extensionId}
                                    </span>
                                    <button 
                                        onClick={() => handleCopy(`ext install ${ext.extensionId}`, `ext-${ext.id}`)}
                                        className="text-[10px] text-primary flex items-center gap-1 hover:underline cursor-pointer font-bold"
                                    >
                                        {copiedId === `ext-${ext.id}` ? <CheckCircle2 size={10} /> : <Terminal size={10} />}
                                        {copiedId === `ext-${ext.id}` ? 'Đã copy lệnh install' : 'Copy lệnh'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default VSCodeExtensions;
