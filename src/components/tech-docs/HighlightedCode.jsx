import React from 'react';

const HighlightedCode = React.memo(({ code }) => {
    if (!code) return null;

    // 1. Escape HTML characters safely
    let escaped = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // 2. Define the lexical token pattern
    // Group 1: Comments, Group 2: Strings, Group 3: Decorators, Group 4: Numbers, Group 5: Words/Keywords
    const tokenPattern = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(".*?"|'.*?'|`[\s\S]*?`)|(@[a-zA-Z0-9_]+)|(\b\d+\b)|(\b[a-zA-Z_][a-zA-Z0-9_]*\b)/g;

    const keywords = new Set([
        'import', 'from', 'const', 'let', 'var', 'class', 'export', 'default', 'return', 
        'await', 'async', 'new', 'extends', 'private', 'readonly', 'interface', 'type', 
        'implements', 'function', 'constructor', 'try', 'catch', 'finally', 'if', 'else', 
        'for', 'while', 'switch', 'case', 'break', 'continue', 'true', 'false', 'null', 
        'undefined', 'process', 'global', 'module', 'require'
    ]);

    const highlighted = escaped.replace(tokenPattern, (match, comment, string, decorator, number, word) => {
        if (comment) {
            return `<span class="text-slate-500 italic font-mono">${match}</span>`;
        }
        if (string) {
            return `<span class="text-emerald-400 font-medium">${match}</span>`;
        }
        if (decorator) {
            return `<span class="text-rose-400 font-semibold">${match}</span>`;
        }
        if (number) {
            return `<span class="text-amber-400">${match}</span>`;
        }
        if (word && keywords.has(word)) {
            return `<span class="text-sky-400 font-semibold">${match}</span>`;
        }
        return match;
    });

    return (
        <pre className="font-mono text-[11px] text-slate-300 bg-slate-950/80 p-4 rounded-xl border border-white/5 overflow-x-auto select-text leading-relaxed">
            <code dangerouslySetInnerHTML={{ __html: highlighted }} />
        </pre>
    );
});

export default HighlightedCode;
