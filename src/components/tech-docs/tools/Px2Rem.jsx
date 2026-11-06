import React from 'react';
import { usePx2Rem } from '../hooks/usePx2Rem';

const Px2Rem = () => {
    const {
        basePx,
        setBasePx,
        pxVal,
        remVal,
        handlePxChange,
        handleRemChange
    } = usePx2Rem();

    return (
        <div className="space-y-4 text-left">
            <h3 className="text-lg font-bold text-white font-outfit">PX ↔ REM Converter</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-950/60 border border-white/5">
                <div>
                    <label className="text-xs text-slate-400 block mb-1">Base Font Size (px)</label>
                    <input 
                        type="number"
                        value={basePx}
                        onChange={(e) => setBasePx(Number(e.target.value))}
                        className="w-full bg-slate-900 text-white font-mono text-xs p-2.5 rounded-xl border border-white/10 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="text-xs text-slate-400 block mb-1">Pixels (px)</label>
                    <input 
                        type="number"
                        value={pxVal}
                        onChange={(e) => handlePxChange(Number(e.target.value))}
                        className="w-full bg-slate-900 text-white font-mono text-xs p-2.5 rounded-xl border border-white/10 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="text-xs text-slate-400 block mb-1">REM (rem)</label>
                    <input 
                        type="number"
                        step="0.01"
                        value={remVal}
                        onChange={(e) => handleRemChange(Number(e.target.value))}
                        className="w-full bg-slate-900 text-white font-mono text-xs p-2.5 rounded-xl border border-white/10 focus:outline-none"
                    />
                </div>
            </div>
        </div>
    );
};

export default Px2Rem;
