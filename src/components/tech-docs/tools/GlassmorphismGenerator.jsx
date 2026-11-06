import React from 'react';
import { Copy } from 'lucide-react';
import { useGlassmorphism } from '../hooks/useGlassmorphism';

const GlassmorphismGenerator = () => {
    const {
        glassBlur,
        setGlassBlur,
        glassOpacity,
        setGlassOpacity,
        glassBorder,
        setGlassBorder,
        glassRadius,
        setGlassRadius,
        copied,
        cssCode,
        tailwindCode,
        handleCopy
    } = useGlassmorphism();

    return (
        <div className="space-y-4 text-left">
            <h3 className="text-lg font-bold text-white font-outfit">Glassmorphism Generator</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Backdrop Blur: {glassBlur}px</span>
                        </div>
                        <input type="range" min="0" max="40" value={glassBlur} onChange={(e) => setGlassBlur(Number(e.target.value))} className="w-full accent-primary" />
                    </div>
                    <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Opacity: {glassOpacity}</span>
                        </div>
                        <input type="range" min="0.01" max="0.95" step="0.01" value={glassOpacity} onChange={(e) => setGlassOpacity(Number(e.target.value))} className="w-full accent-primary" />
                    </div>
                    <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Border Opacity: {glassBorder}</span>
                        </div>
                        <input type="range" min="0.01" max="0.95" step="0.01" value={glassBorder} onChange={(e) => setGlassBorder(Number(e.target.value))} className="w-full accent-primary" />
                    </div>
                    <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Border Radius: {glassRadius}px</span>
                        </div>
                        <input type="range" min="0" max="50" value={glassRadius} onChange={(e) => setGlassRadius(Number(e.target.value))} className="w-full accent-primary" />
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="relative flex items-center justify-center p-6 rounded-2xl bg-gradient-to-tr from-rose-900/20 to-teal-900/20 overflow-hidden min-h-[160px]">
                        <div className="absolute top-6 left-6 w-12 h-12 bg-rose-500 rounded-full blur-sm" />
                        <div className="absolute bottom-6 right-6 w-16 h-16 bg-teal-400 rounded-full blur-sm" />
                        
                        <div 
                            className="w-40 h-24 relative z-10 flex flex-col items-center justify-center text-xs font-semibold text-white border"
                            style={{
                                backdropFilter: `blur(${glassBlur}px)`,
                                backgroundColor: `rgba(15, 23, 42, ${glassOpacity})`,
                                borderColor: `rgba(255, 255, 255, ${glassBorder})`,
                                borderRadius: `${glassRadius}px`
                            }}
                        >
                            Glass Preview
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="bg-slate-950 p-2.5 rounded-xl border border-white/5 flex justify-between items-start text-[9px] font-mono text-emerald-400 select-all leading-normal">
                            <pre className="whitespace-pre">{cssCode}</pre>
                            <button 
                                onClick={() => handleCopy(cssCode)}
                                className="text-primary hover:underline cursor-pointer shrink-0 ml-2"
                            >
                                {copied ? 'Đã copy' : <Copy size={11} />}
                            </button>
                        </div>
                        <div className="bg-slate-950 p-2.5 rounded-xl border border-white/5 flex justify-between items-center text-[9px] font-mono text-sky-400 select-all">
                            <span className="truncate">{tailwindCode}</span>
                            <button 
                                onClick={() => handleCopy(tailwindCode)}
                                className="text-primary hover:underline cursor-pointer shrink-0 ml-2"
                            >
                                {copied ? 'Đã copy' : <Copy size={11} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlassmorphismGenerator;
