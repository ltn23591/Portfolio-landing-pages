import React from 'react';
import { useStringCase } from '../hooks/useStringCase';

const StringCaseConverter = () => {
    const {
        caseInputText,
        setCaseInputText,
        convertStringCase
    } = useStringCase();

    return (
        <div className="space-y-4 text-left">
            <h3 className="text-lg font-bold text-white font-outfit">String Case Converter</h3>
            <div className="space-y-3">
                <div>
                    <label className="text-xs text-slate-400 block mb-1">Input String</label>
                    <input 
                        type="text"
                        value={caseInputText}
                        onChange={(e) => setCaseInputText(e.target.value)}
                        className="w-full bg-slate-950 text-white font-mono text-xs p-2.5 rounded-xl border border-white/5 focus:outline-none"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">camelCase</span>
                        <span className="text-xs text-emerald-400 font-mono select-all">{convertStringCase(caseInputText, 'camel') || '//'}</span>
                    </div>
                    <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">snake_case</span>
                        <span className="text-xs text-emerald-400 font-mono select-all">{convertStringCase(caseInputText, 'snake') || '//'}</span>
                    </div>
                    <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">PascalCase</span>
                        <span className="text-xs text-emerald-400 font-mono select-all">{convertStringCase(caseInputText, 'pascal') || '//'}</span>
                    </div>
                    <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">kebab-case</span>
                        <span className="text-xs text-emerald-400 font-mono select-all">{convertStringCase(caseInputText, 'kebab') || '//'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StringCaseConverter;
