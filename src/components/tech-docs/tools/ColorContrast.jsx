import React from 'react';
import { useColorContrast } from '../hooks/useColorContrast';

const ColorContrast = () => {
    const {
        textColor,
        setTextColor,
        bgColor,
        setBgColor,
        ratio,
        normalAA,
        normalAAA,
        largeAA,
        largeAAA
    } = useColorContrast();

    return (
        <div className="space-y-4 text-left">
            <h3 className="text-lg font-bold text-white font-outfit">Color & Contrast Checker</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs text-slate-400 block mb-1">Text Color</label>
                            <input 
                                type="color" 
                                value={textColor} 
                                onChange={(e) => setTextColor(e.target.value)} 
                                className="w-full h-10 rounded border border-white/10 bg-transparent cursor-pointer" 
                            />
                            <span className="text-[10px] text-slate-500 font-mono mt-1 block text-center">{textColor.toUpperCase()}</span>
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 block mb-1">Background Color</label>
                            <input 
                                type="color" 
                                value={bgColor} 
                                onChange={(e) => setBgColor(e.target.value)} 
                                className="w-full h-10 rounded border border-white/10 bg-transparent cursor-pointer" 
                            />
                            <span className="text-[10px] text-slate-500 font-mono mt-1 block text-center">{bgColor.toUpperCase()}</span>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
                        <div className="flex justify-between text-xs border-b border-white/5 pb-1">
                            <span className="text-slate-400">Contrast Ratio:</span>
                            <span className="font-bold text-teal-400">{ratio.toFixed(2)}:1</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
                            <div>
                                <span className="text-slate-500 block">Normal Text (AA):</span>
                                <span className={`font-bold ${normalAA === 'PASS' ? 'text-emerald-400' : 'text-rose-500'}`}>{normalAA}</span>
                            </div>
                            <div>
                                <span className="text-slate-500 block">Normal Text (AAA):</span>
                                <span className={`font-bold ${normalAAA === 'PASS' ? 'text-emerald-400' : 'text-rose-500'}`}>{normalAAA}</span>
                            </div>
                            <div>
                                <span className="text-slate-500 block">Large Text (AA):</span>
                                <span className={`font-bold ${largeAA === 'PASS' ? 'text-emerald-400' : 'text-rose-500'}`}>{largeAA}</span>
                            </div>
                            <div>
                                <span className="text-slate-500 block">Large Text (AAA):</span>
                                <span className={`font-bold ${largeAAA === 'PASS' ? 'text-emerald-400' : 'text-rose-500'}`}>{largeAAA}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-white/10 min-h-[180px] transition-colors" style={{ backgroundColor: bgColor }}>
                    <span className="text-xl font-bold mb-2 font-outfit" style={{ color: textColor }}>
                        Aa Bb Cc
                    </span>
                    <span className="text-xs text-center leading-normal" style={{ color: textColor }}>
                        The quick brown fox jumps over the lazy dog.
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ColorContrast;
