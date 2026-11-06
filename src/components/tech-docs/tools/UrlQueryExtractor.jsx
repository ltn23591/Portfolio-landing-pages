import React from 'react';
import { useUrlQuery } from '../hooks/useUrlQuery';

const UrlQueryExtractor = () => {
    const {
        urlInputStr,
        setUrlInputStr
    } = useUrlQuery();

    const renderParams = () => {
        try {
            const url = new URL(urlInputStr);
            const params = [...url.searchParams.entries()];
            if (params.length === 0) {
                return <tr><td colSpan="2" className="p-3 text-center text-slate-500">Không tìm thấy tham số query</td></tr>;
            }
            return params.map(([k, v], idx) => (
                <tr key={idx}>
                    <td className="p-2.5 font-mono text-rose-400 font-semibold">{k}</td>
                    <td className="p-2.5 font-mono text-emerald-400">{v}</td>
                </tr>
            ));
        } catch (e) {
            return <tr><td colSpan="2" className="p-3 text-center text-rose-400">URL không hợp lệ</td></tr>;
        }
    };

    return (
        <div className="space-y-4 text-left">
            <h3 className="text-lg font-bold text-white font-outfit">URL Query Param Extractor</h3>
            <input 
                type="text"
                value={urlInputStr}
                onChange={(e) => setUrlInputStr(e.target.value)}
                className="w-full bg-slate-950 text-white font-mono text-xs p-2.5 rounded-xl border border-white/5 focus:outline-none"
            />
            <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-white/5 rounded-xl overflow-hidden">
                    <thead className="bg-slate-950/80 text-slate-400 font-bold">
                        <tr>
                            <th className="p-2.5">Tham số (Key)</th>
                            <th className="p-2.5">Giá trị (Value)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 bg-slate-900/10">
                        {renderParams()}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UrlQueryExtractor;
