import React from 'react';
import { Copy, Check } from 'lucide-react';
import { useSvg2React } from '../hooks/useSvg2React';

const Svg2React = () => {
    const {
        svgInput,
        setSvgInput,
        svgOutput,
        copied,
        handleCopy
    } = useSvg2React();

    return (
        <div className="space-y-4 text-left">
            <h3 className="text-lg font-bold text-white font-outfit">SVG to React Component</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-xs text-slate-400 block mb-1">Raw SVG Input</label>
                    <textarea 
                        value={svgInput}
                        onChange={(e) => setSvgInput(e.target.value)}
                        className="w-full h-56 bg-slate-950 text-slate-300 font-mono text-xs p-3 rounded-xl border border-white/5 focus:border-primary/50 focus:outline-none"
                    />
                </div>
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-xs text-slate-400">React Functional Component</label>
                        {svgOutput && (
                            <button 
                                onClick={handleCopy}
                                className="text-xs text-primary flex items-center gap-1 cursor-pointer hover:underline"
                            >
                                {copied ? <Check size={12} /> : <Copy size={12} />}
                                {copied ? 'Đã sao chép' : 'Sao chép'}
                            </button>
                        )}
                    </div>
                    <pre className="w-full h-56 bg-slate-950 text-sky-400 font-mono text-xs p-3 rounded-xl border border-white/5 overflow-y-auto custom-scrollbar select-text leading-relaxed">
                        {svgOutput || '// Mã component sẽ xuất hiện ở đây'}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default Svg2React;
