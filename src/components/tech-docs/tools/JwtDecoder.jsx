import React from 'react';
import { useJwtDecoder } from '../hooks/useJwtDecoder';

const JwtDecoder = () => {
    const {
        jwtInput,
        setJwtInput,
        jwtHeader,
        jwtPayload
    } = useJwtDecoder();

    return (
        <div className="space-y-4 text-left">
            <h3 className="text-lg font-bold text-white font-outfit">JWT Decoder</h3>
            <div className="space-y-3">
                <div>
                    <label className="text-xs text-slate-400 block mb-1">Encoded Token</label>
                    <textarea 
                        value={jwtInput}
                        onChange={(e) => setJwtInput(e.target.value)}
                        className="w-full h-20 bg-slate-950 text-slate-300 font-mono text-xs p-3 rounded-xl border border-white/5 focus:border-primary/50 focus:outline-none"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs text-slate-400 block mb-1">Header</label>
                        <pre className="w-full h-40 bg-slate-950 text-sky-400 font-mono text-xs p-3 rounded-xl border border-white/5 overflow-y-auto custom-scrollbar select-text leading-relaxed">
                            {jwtHeader}
                        </pre>
                    </div>
                    <div>
                        <label className="text-xs text-slate-400 block mb-1">Payload</label>
                        <pre className="w-full h-40 bg-slate-950 text-emerald-400 font-mono text-xs p-3 rounded-xl border border-white/5 overflow-y-auto custom-scrollbar select-text leading-relaxed">
                            {jwtPayload}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JwtDecoder;
