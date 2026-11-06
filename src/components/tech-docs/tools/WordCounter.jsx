import React from 'react';
import { useWordCounter } from '../hooks/useWordCounter';

const WordCounter = () => {
    const {
        wordText,
        setWordText,
        wordCount,
        charCount,
        sentenceCount,
        readingTime
    } = useWordCounter();

    return (
        <div className="space-y-4 text-left">
            <h3 className="text-lg font-bold text-white font-outfit">Text & Word Counter</h3>
            <textarea 
                value={wordText}
                onChange={(e) => setWordText(e.target.value)}
                className="w-full h-32 bg-slate-950 text-slate-300 font-sans text-xs p-3 rounded-xl border border-white/5 focus:border-primary/50 focus:outline-none"
            />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 text-center">
                    <span className="text-[10px] text-slate-500 block uppercase">Từ</span>
                    <span className="text-sm font-bold text-white mt-1 block font-outfit">{wordCount}</span>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 text-center">
                    <span className="text-[10px] text-slate-500 block uppercase">Ký tự</span>
                    <span className="text-sm font-bold text-white mt-1 block font-outfit">{charCount}</span>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 text-center">
                    <span className="text-[10px] text-slate-500 block uppercase">Câu</span>
                    <span className="text-sm font-bold text-white mt-1 block font-outfit">{sentenceCount}</span>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 text-center">
                    <span className="text-[10px] text-slate-500 block uppercase">Số phút đọc</span>
                    <span className="text-sm font-bold text-white mt-1 block font-outfit">{readingTime}</span>
                </div>
            </div>
        </div>
    );
};

export default WordCounter;
