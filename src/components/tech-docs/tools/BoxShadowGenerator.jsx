import React from 'react';
import { Copy } from 'lucide-react';
import { useBoxShadow } from '../hooks/useBoxShadow';

const BoxShadowGenerator = () => {
    const {
        shadowX,
        setShadowX,
        shadowY,
        setShadowY,
        shadowBlur,
        setShadowBlur,
        shadowSpread,
        setShadowSpread,
        shadowColor,
        setShadowColor,
        shadowRadius,
        setShadowRadius,
        copied,
        codeString,
        handleCopy
    } = useBoxShadow();

    return (
        <div className="space-y-4 text-left">
            <h3 className="text-lg font-bold text-white font-outfit">Box Shadow & Radius Visualizer</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Offset X: {shadowX}px</span>
                        </div>
                        <input type="range" min="-50" max="50" value={shadowX} onChange={(e) => setShadowX(Number(e.target.value))} className="w-full accent-primary" />
                    </div>
                    <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Offset Y: {shadowY}px</span>
                        </div>
                        <input type="range" min="-50" max="50" value={shadowY} onChange={(e) => setShadowY(Number(e.target.value))} className="w-full accent-primary" />
                    </div>
                    <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Blur Radius: {shadowBlur}px</span>
                        </div>
                        <input type="range" min="0" max="100" value={shadowBlur} onChange={(e) => setShadowBlur(Number(e.target.value))} className="w-full accent-primary" />
                    </div>
                    <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Spread Radius: {shadowSpread}px</span>
                        </div>
                        <input type="range" min="-50" max="50" value={shadowSpread} onChange={(e) => setShadowSpread(Number(e.target.value))} className="w-full accent-primary" />
                    </div>
                    <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Border Radius: {shadowRadius}px</span>
                        </div>
                        <input type="range" min="0" max="60" value={shadowRadius} onChange={(e) => setShadowRadius(Number(e.target.value))} className="w-full accent-primary" />
                    </div>
                    <div>
                        <label className="text-xs text-slate-400 block mb-1">Shadow Color</label>
                        <input type="color" value={shadowColor} onChange={(e) => setShadowColor(e.target.value)} className="w-full h-8 rounded border border-white/10 bg-transparent cursor-pointer" />
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950/60 border border-white/5 min-h-[250px]">
                    <div 
                        className="w-32 h-32 bg-slate-900 border border-white/10 flex items-center justify-center text-xs font-semibold text-slate-300"
                        style={{
                            borderRadius: `${shadowRadius}px`,
                            boxShadow: `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}`
                        }}
                    >
                        Preview
                    </div>
                    <div className="w-full mt-4 bg-slate-950 p-2.5 rounded-xl border border-white/5 flex justify-between items-center text-[10px] font-mono text-emerald-400 select-all">
                        <span>{codeString}</span>
                        <button 
                            onClick={handleCopy}
                            className="text-primary hover:underline cursor-pointer ml-2 shrink-0"
                        >
                            {copied ? 'Đã copy' : <Copy size={12} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoxShadowGenerator;
