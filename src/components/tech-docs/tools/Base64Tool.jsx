import React from 'react';
import { Copy, Check } from 'lucide-react';
import { useBase64Tool } from '../hooks/useBase64Tool';

const Base64Tool = () => {
    const {
        base64Input,
        setBase64Input,
        base64Output,
        base64DecodeMode,
        setBase64DecodeMode,
        copied,
        handleCopy
    } = useBase64Tool();

    return (
        <div className="space-y-4 text-left">
            <h3 className="text-lg font-bold text-white font-outfit">Base64 Text Encoder / Decoder</h3>
            <div className="flex items-center gap-4 mb-2">
                <button 
                    onClick={() => setBase64DecodeMode(false)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        !base64DecodeMode ? 'bg-primary border-primary text-slate-950' : 'bg-slate-950/60 border-white/5 text-slate-400'
                    }`}
                >
                    Mã hoá (Encode)
                </button>
                <button 
                    onClick={() => setBase64DecodeMode(true)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        base64DecodeMode ? 'bg-primary border-primary text-slate-950' : 'bg-slate-950/60 border-white/5 text-slate-400'
                    }`}
                >
                    Giải mã (Decode)
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-xs text-slate-400 block mb-1">Input Text</label>
                    <textarea 
                        value={base64Input}
                        onChange={(e) => setBase64Input(e.target.value)}
                        className="w-full h-40 bg-slate-950 text-slate-300 font-mono text-xs p-3 rounded-xl border border-white/5 focus:border-primary/50 focus:outline-none"
                    />
                </div>
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-xs text-slate-400">Output Text</label>
                        {base64Output && (
                            <button 
                                onClick={handleCopy}
                                className="text-xs text-primary flex items-center gap-1 cursor-pointer hover:underline"
                            >
                                {copied ? <Check size={12} /> : <Copy size={12} />}
                                {copied ? 'Đã sao chép' : 'Sao chép'}
                            </button>
                        )}
                    </div>
                    <pre className="w-full h-40 bg-slate-950 text-emerald-400 font-mono text-xs p-3 rounded-xl border border-white/5 overflow-y-auto custom-scrollbar select-text leading-relaxed">
                        {base64Output || '// Kết quả biến đổi sẽ xuất hiện ở đây'}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default Base64Tool;
