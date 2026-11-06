import React from 'react';

export const parseInlineMarkdown = (text) => {
    if (!text) return '';
    let html = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white font-outfit">$1</strong>');
    html = html.replace(/`(.*?)`/g, '<code class="bg-slate-950/80 border border-white/10 text-rose-400 px-1.5 py-0.5 rounded font-mono text-[11px] font-semibold mx-0.5">$1</code>');
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

export const MarkdownDescription = React.memo(({ text }) => {
    if (!text) return null;
    
    const lines = text.split('\n');
    
    return (
        <div className="space-y-3 text-[11px] leading-relaxed text-slate-400 max-h-[160px] overflow-y-auto custom-scrollbar select-text pr-1 text-left">
            {lines.map((line, idx) => {
                const trimmed = line.trim();
                if (!trimmed) return null;
                
                // 1. Headers (e.g. ## Title)
                if (trimmed.startsWith('##')) {
                    const headerText = trimmed.replace(/^##\s*/, '');
                    return (
                        <h5 key={idx} className="text-xs font-bold text-white mt-4 mb-1.5 font-outfit flex items-center gap-1.5 border-b border-white/5 pb-1 select-none">
                            {parseInlineMarkdown(headerText)}
                        </h5>
                    );
                }
                
                // 2. Bullet list items (e.g. - item or * item)
                if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
                    const bulletText = trimmed.replace(/^[-*]\s*/, '');
                    return (
                        <div key={idx} className="flex items-start gap-2 pl-2">
                            <span className="w-1 h-1 rounded-full bg-teal-400 mt-1.5 shrink-0 select-none" />
                            <span>{parseInlineMarkdown(bulletText)}</span>
                        </div>
                    );
                }
                
                // 3. Regular paragraph
                return (
                    <p key={idx}>
                        {parseInlineMarkdown(trimmed)}
                    </p>
                );
            })}
        </div>
    );
});
