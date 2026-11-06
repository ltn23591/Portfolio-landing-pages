import React from 'react';
import { Copy, Check } from 'lucide-react';
import { useJsonFormatter } from '../hooks/useJsonFormatter';

const JsonFormatter = () => {
    const {
        jsonInput,
        setJsonInput,
        jsonOutput,
        jsonError,
        copied,
        handleCopy
    } = useJsonFormatter();

    return (
        <div className="space-y-4 text-left">
            <h3 className="text-lg font-bold text-white font-outfit">JSON Formatter & Validator</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-xs text-slate-400 block mb-1">Input JSON</label>
                    <textarea 
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        className="w-full h-64 bg-slate-950 text-slate-300 font-mono text-xs p-3 rounded-xl border border-white/5 focus:border-primary/50 focus:outline-none custom-scrollbar"
                    />
                </div>
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-xs text-slate-400">Formatted Output</label>
                        {jsonOutput && (
                            <button 
                                onClick={handleCopy}
                                className="text-xs text-primary flex items-center gap-1 cursor-pointer hover:underline"
                            >
                                {copied ? <Check size={12} /> : <Copy size={12} />}
                                {copied ? 'Đã sao chép' : 'Sao chép'}
                            </button>
                        )}
                    </div>
                    {jsonError ? (
                        <div className="w-full h-64 bg-rose-950/20 text-rose-400 font-mono text-xs p-3 rounded-xl border border-rose-500/20 overflow-y-auto">
                            {jsonError}
                        </div>
                    ) : (
                        <pre className="w-full h-64 bg-slate-950 text-emerald-400 font-mono text-xs p-3 rounded-xl border border-white/5 overflow-y-auto custom-scrollbar select-text leading-relaxed">
                            {jsonOutput || '// Kết quả định dạng sẽ xuất hiện ở đây'}
                        </pre>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JsonFormatter;
