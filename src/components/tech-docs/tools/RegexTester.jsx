import React from 'react';
import { useRegexTester } from '../hooks/useRegexTester';

const RegexTester = () => {
    const {
        regexPattern,
        setRegexPattern,
        regexText,
        setRegexText,
        regexResult
    } = useRegexTester();

    return (
        <div className="space-y-4 text-left">
            <h3 className="text-lg font-bold text-white font-outfit">Regex Tester & Explainer</h3>
            <div className="space-y-3">
                <div>
                    <label className="text-xs text-slate-400 block mb-1">Regex Pattern</label>
                    <input 
                        type="text"
                        value={regexPattern}
                        onChange={(e) => setRegexPattern(e.target.value)}
                        className="w-full bg-slate-950 text-rose-400 font-mono text-xs p-2.5 rounded-xl border border-white/5 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="text-xs text-slate-400 block mb-1">Test Text</label>
                    <textarea 
                        value={regexText}
                        onChange={(e) => setRegexText(e.target.value)}
                        className="w-full h-20 bg-slate-950 text-slate-300 font-mono text-xs p-3 rounded-xl border border-white/5 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="text-xs text-slate-400 block mb-1">Results</label>
                    <pre className="w-full h-24 bg-slate-950 text-emerald-400 font-mono text-xs p-3 rounded-xl border border-white/5 overflow-y-auto custom-scrollbar select-text leading-relaxed">
                        {regexResult || '// Kết quả khớp sẽ xuất hiện ở đây'}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default RegexTester;
