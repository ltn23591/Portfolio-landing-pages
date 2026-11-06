import React from 'react';
import { Upload, Copy, Check } from 'lucide-react';
import { useImage2Base64 } from '../hooks/useImage2Base64';

const Image2Base64 = () => {
    const {
        base64Image,
        copied,
        handleImageChange,
        handleCopy
    } = useImage2Base64();

    return (
        <div className="space-y-4 text-left">
            <h3 className="text-lg font-bold text-white font-outfit">Image to Base64 Data URI</h3>
            <div className="space-y-4">
                <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer bg-slate-950/40 hover:bg-slate-950/80 transition-all">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 text-slate-500 mb-2" />
                            <p className="text-xs text-slate-400 font-medium">Tải lên hình ảnh tại đây</p>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                </div>
                {base64Image && (
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-400">Base64 Output String</span>
                            <button 
                                onClick={handleCopy}
                                className="text-xs text-primary flex items-center gap-1 cursor-pointer hover:underline"
                            >
                                {copied ? <Check size={12} /> : <Copy size={12} />}
                                {copied ? 'Đã sao chép' : 'Sao chép'}
                            </button>
                        </div>
                        <textarea 
                            readOnly
                            value={base64Image}
                            className="w-full h-24 bg-slate-950 text-slate-400 font-mono text-[10px] p-2.5 rounded-xl border border-white/5 focus:outline-none overflow-y-auto custom-scrollbar"
                        />
                        <div className="mt-2 flex justify-center">
                            <img src={base64Image} alt="Base64 Preview" className="max-h-24 rounded border border-white/10 object-contain" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Image2Base64;
