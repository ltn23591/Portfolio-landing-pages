import React, { useState, useEffect } from 'react';
import { 
    Terminal, Code2, Database, Copy, Check, Sparkles, BookOpen, ArrowLeft, Search, Code, FileCode, 
    Info, Wrench, RefreshCw, FileJson, ShieldAlert, Palette, Ruler, Box, TestTube, Type, 
    Image as ImageIcon, BarChart3, Link, Sliders, Eye, Upload, FileText, Cpu, Layers, ShieldCheck, Key, Table, CheckCircle2, Package, Flame, Server, Activity, Lock, Zap, FileSpreadsheet, Globe, ChevronRight, HelpCircle, ExternalLink, Shield, FolderTree
} from 'lucide-react';

// Custom High-Fidelity Inline Markdown Parser
const parseInlineMarkdown = (text) => {
    if (!text) return '';
    let html = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white font-outfit">$1</strong>');
    html = html.replace(/`(.*?)`/g, '<code class="bg-slate-950/80 border border-white/10 text-rose-400 px-1.5 py-0.5 rounded font-mono text-[11px] font-semibold mx-0.5">$1</code>');
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

// Block-level Markdown Parser for library description
const renderMarkdownDescription = (text) => {
    if (!text) return null;
    
    // Normalize newlines and split into lines
    const lines = text.split('\n');
    
    return (
        <div className="space-y-3 text-[11px] leading-relaxed text-slate-400 max-h-[160px] overflow-y-auto custom-scrollbar select-text pr-1">
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
                            <span className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0 select-none" />
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
};

// 100% Robust Syntax Highlighter using a single-pass tokenizer
const HighlightedCode = ({ code }) => {
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
};

const TechDocs = () => {
    const [activeTab, setActiveTab] = useState('libraries'); // default to libraries (Tài Liệu)
    const [copiedId, setCopiedId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedToolCategory, setSelectedToolCategory] = useState('all');
    const [selectedTool, setSelectedTool] = useState('json');

    // Libraries catalog states
    const [libraries, setLibraries] = useState([]);
    const [selectedLib, setSelectedLib] = useState(null);
    const [libLang, setLibLang] = useState('ts'); // 'ts' or 'js'
    const [libCategoryFilter, setLibCategoryFilter] = useState('all');

    // Tool states
    const [jsonInput, setJsonInput] = useState('{\n  "name": "Le Trung Nghia",\n  "role": "Backend Specialist",\n  "skills": ["NestJS", "Node.js", "TypeScript"],\n  "isAvailable": true\n}');
    const [jsonOutput, setJsonOutput] = useState('');
    const [jsonError, setJsonError] = useState('');
    
    const [jwtInput, setJwtInput] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkxlIFRydW5nIE5naGlhIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
    const [jwtHeader, setJwtHeader] = useState('');
    const [jwtPayload, setJwtPayload] = useState('');
    
    const [base64Input, setBase64Input] = useState('Hello from Portfolio Pro Max!');
    const [base64Output, setBase64Output] = useState('');
    const [base64DecodeMode, setBase64DecodeMode] = useState(false);

    const [shadowX, setShadowX] = useState(0);
    const [shadowY, setShadowY] = useState(12);
    const [shadowBlur, setShadowBlur] = useState(30);
    const [shadowSpread, setShadowSpread] = useState(-5);
    const [shadowColor, setShadowColor] = useState('#e11d48');
    const [shadowRadius, setShadowRadius] = useState(16);

    const [glassBlur, setGlassBlur] = useState(16);
    const [glassOpacity, setGlassOpacity] = useState(0.2);
    const [glassBorder, setGlassBorder] = useState(0.15);
    const [glassRadius, setGlassRadius] = useState(20);

    const [svgInput, setSvgInput] = useState('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg>');
    const [svgOutput, setSvgOutput] = useState('');

    const [basePx, setBasePx] = useState(16);
    const [pxVal, setPxVal] = useState(24);
    const [remVal, setRemVal] = useState(1.5);

    const [textColor, setTextColor] = useState('#ffffff');
    const [bgColor, setBgColor] = useState('#0ea5e9');

    const [regexPattern, setRegexPattern] = useState('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
    const [regexText, setRegexText] = useState('Liên hệ: info@portfolio.vn hoặc nghia.dev@gmail.com');
    const [regexResult, setRegexResult] = useState('');

    const [caseInputText, setCaseInputText] = useState('nestjs backend architecture');
    const [base64Image, setBase64Image] = useState('');
    const [wordText, setWordText] = useState('Le Trung Nghia - NestJS Backend Specialist với kinh nghiệm thiết kế kiến trúc Microservices, TypeORM, Prisma và PostgreSQL.');
    const [urlInputStr, setUrlInputStr] = useState('https://nghia.dev/api/v1/nestjs?module=auth&version=2&debug=true');

    const [extensions, setExtensions] = useState([]);
    
    const getCategoryIcon = (category) => {
        switch (category?.toLowerCase()) {
            case 'theme': return Palette;
            case 'formatter': return FileCode;
            case 'linter': return ShieldAlert;
            case 'git': return Globe;
            case 'database': return Database;
            case 'utility': return Wrench;
            case 'ai': return Sparkles;
            default: return Code;
        }
    };

    const handleCopy = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const toolsList = [
        { id: 'json', name: 'JSON Formatter', cat: 'general', icon: FileJson, color: 'text-rose-500', desc: 'Định dạng và kiểm định cú pháp JSON' },
        { id: 'jwt', name: 'JWT Decoder', cat: 'general', icon: Shield, color: 'text-amber-500', desc: 'Giải mã JWT payload dạng JSON trực quan' },
        { id: 'base64', name: 'Base64 Text Encoder', cat: 'general', icon: RefreshCw, color: 'text-emerald-500', desc: 'Mã hoá và giải mã chuỗi Base64' },
        { id: 'box-shadow', name: 'Box Shadow & Radius Visualizer', cat: 'design', icon: Box, color: 'text-indigo-400', desc: 'Kéo thả tạo hiệu ứng đổ bóng mượt' },
        { id: 'glassmorphism', name: 'Glassmorphism Generator', cat: 'design', icon: Sliders, color: 'text-teal-400', desc: 'Tạo hiệu ứng kính mờ & mã Tailwind/CSS' },
        { id: 'svg2react', name: 'SVG sang React Component', cat: 'design', icon: Code, color: 'text-sky-400', desc: 'Chuyển SVG thô thành Component React' },
        { id: 'px2rem', name: 'PX ↔ REM Converter', cat: 'design', icon: Ruler, color: 'text-amber-400', desc: 'Quy đổi kích thước Pixel và REM siêu tốc' },
        { id: 'color-contrast', name: 'Color & Contrast Checker', cat: 'design', icon: Palette, color: 'text-rose-400', desc: 'Kiểm tra độ tương phản màu chuẩn WCAG' },
        { id: 'regex-tester', name: 'Regex Tester & Explainer', cat: 'data', icon: TestTube, color: 'text-purple-400', desc: 'Thử nghiệm Regex realtime kèm mẫu thông dụng' },
        { id: 'string-case', name: 'String Case Converter', cat: 'data', icon: Type, color: 'text-emerald-400', desc: 'Đổi kiểu chữ camelCase, snake_case, PASCAL' },
        { id: 'image2base64', name: 'Image sang Base64 Data URI', cat: 'data', icon: ImageIcon, color: 'text-blue-400', desc: 'Đổi ảnh thành chuỗi mã hoá Data URI' },
        { id: 'word-counter', name: 'Text & Word Counter', cat: 'data', icon: BarChart3, color: 'text-amber-300', desc: 'Đếm từ, ký tự và thời gian đọc bài' },
        { id: 'url-query', name: 'URL Query Param Extractor', cat: 'data', icon: Link, color: 'text-cyan-400', desc: 'Mã hóa URL và tách tham số Query String' },
    ];

    useEffect(() => {
        const handleHash = () => {
            const hash = window.location.hash;
            if (hash === '#tech-docs-nestjs') {
                setActiveTab('nestjs-hub');
            } else if (hash === '#tech-docs-nodejs') {
                setActiveTab('nodejs-hub');
            } else if (hash === '#tech-docs-toolbox') {
                setActiveTab('toolbox');
            } else if (hash === '#tech-docs' || hash === '') {
                setActiveTab('libraries');
            }
        };
        handleHash();
        window.addEventListener('hashchange', handleHash);
        return () => window.removeEventListener('hashchange', handleHash);
    }, []);

    // Load Libraries Catalog
    useEffect(() => {
        const fetchLibraries = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/portfolio/libraries');
                if (res.ok) {
                    const data = await res.json();
                    setLibraries(data);
                    if (data.length > 0) {
                        setSelectedLib(data[0]);
                        setLibLang(data[0].codeTs ? 'ts' : 'js');
                    }
                }
            } catch (err) {
                console.error("Lỗi tải libraries:", err);
            }
        };
        fetchLibraries();
    }, []);

    // Load VS Code extensions
    useEffect(() => {
        const fetchExtensions = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/portfolio/extensions');
                if (res.ok) {
                    const data = await res.json();
                    setExtensions(data);
                }
            } catch (err) {
                console.error("Lỗi tải extensions:", err);
            }
        };
        fetchExtensions();
    }, []);

    useEffect(() => {
        if (!jsonInput.trim()) {
            setJsonOutput('');
            setJsonError('');
            return;
        }
        try {
            const parsed = JSON.parse(jsonInput);
            setJsonOutput(JSON.stringify(parsed, null, 2));
            setJsonError('');
        } catch (e) {
            setJsonError(e.message);
        }
    }, [jsonInput]);

    useEffect(() => {
        if (!jwtInput.trim()) {
            setJwtHeader('');
            setJwtPayload('');
            return;
        }
        const parts = jwtInput.split('.');
        if (parts.length >= 2) {
            try {
                const head = atob(parts[0].replace(/-/g, '+').replace(/_/g, '/'));
                const pay = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
                setJwtHeader(JSON.stringify(JSON.parse(head), null, 2));
                setJwtPayload(JSON.stringify(JSON.parse(pay), null, 2));
            } catch (e) {
                setJwtHeader('Lỗi giải mã: Token không hợp lệ');
                setJwtPayload('Lỗi giải mã: Token không hợp lệ');
            }
        } else {
            setJwtHeader('Token JWT phải gồm 3 phần phân tách bởi dấu chấm');
            setJwtPayload('Token JWT phải gồm 3 phần phân tách bởi dấu chấm');
        }
    }, [jwtInput]);

    useEffect(() => {
        if (!base64Input) {
            setBase64Output('');
            return;
        }
        try {
            if (base64DecodeMode) {
                setBase64Output(atob(base64Input));
            } else {
                setBase64Output(btoa(base64Input));
            }
        } catch (e) {
            setBase64Output('Lỗi: ' + e.message);
        }
    }, [base64Input, base64DecodeMode]);

    useEffect(() => {
        if (!svgInput) {
            setSvgOutput('');
            return;
        }
        let clean = svgInput.replace(/class=/g, 'className=');
        clean = clean.replace(/stroke-width=/g, 'strokeWidth=');
        clean = clean.replace(/stroke-linecap=/g, 'strokeLinecap=');
        clean = clean.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
        clean = clean.replace(/fill-rule=/g, 'fillRule=');
        clean = clean.replace(/clip-rule=/g, 'clipRule=');
        
        const componentCode = `import React from 'react';\n\nexport const CustomIcon = (props) => {\n  return (\n    ${clean.split('\n').join('\n    ')}\n  );\n};`;
        setSvgOutput(componentCode);
    }, [svgInput]);

    const handlePxChange = (val) => {
        setPxVal(val);
        setRemVal(Number((val / basePx).toFixed(4)));
    };
    const handleRemChange = (val) => {
        setRemVal(val);
        setPxVal(Number((val * basePx).toFixed(2)));
    };

    useEffect(() => {
        if (!regexPattern || !regexText) {
            setRegexResult('');
            return;
        }
        try {
            const re = new RegExp(regexPattern, 'g');
            const matches = [...regexText.matchAll(re)];
            if (matches.length > 0) {
                setRegexResult(`Tìm thấy ${matches.length} kết quả khớp:\n` + matches.map((m, i) => `${i + 1}: "${m[0]}"`).join('\n'));
            } else {
                setRegexResult('Không tìm thấy kết quả khớp');
            }
        } catch (e) {
            setRegexResult('Lỗi cú pháp Regex: ' + e.message);
        }
    }, [regexPattern, regexText]);

    const convertStringCase = (text, type) => {
        if (!text) return '';
        const words = text.toLowerCase().split(/[^a-zA-Z0-9]/).filter(Boolean);
        switch (type) {
            case 'camel':
                return words.map((w, i) => i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)).join('');
            case 'snake':
                return words.join('_');
            case 'pascal':
                return words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
            case 'kebab':
                return words.join('-');
            default:
                return text;
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBase64Image(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Filter libraries matching search and category selection
    const filteredLibraries = libraries.filter(lib => {
        const matchesSearch = lib.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              (lib.desc && lib.desc.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = libCategoryFilter === 'all' || lib.category.toLowerCase() === libCategoryFilter.toLowerCase();
        return matchesSearch && matchesCategory;
    });

    return (
        <section id="tech-docs" className="relative py-24 border-t border-white/5 bg-slate-950 overflow-hidden select-none">
            {/* Background elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow delay-300" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs text-primary font-bold uppercase tracking-wider mb-4">
                        <Terminal size={14} />
                        Developer Workspace
                    </div>
                    <h2 className="text-4xl font-bold font-outfit mb-4 text-white">
                        Tài Liệu & <span className="text-gradient bg-gradient-to-r from-primary to-secondary">Công Cụ Dev</span>
                    </h2>
                    <p className="text-muted-foreground">
                        Hệ sinh thái cẩm nang lập trình kết hợp bộ công cụ trực tuyến tương tác giúp tăng tốc độ thiết kế UI/UX và xử lý cấu trúc dữ liệu backend.
                    </p>
                </div>

                {/* Navigation tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-10 max-w-4xl mx-auto">
                    <button
                        onClick={() => setActiveTab('libraries')}
                        className={`flex items-center gap-2 px-5 py-3 rounded-2xl border transition-all cursor-pointer font-medium ${
                            activeTab === 'libraries'
                                ? 'bg-primary border-primary text-slate-950 font-semibold shadow-lg shadow-primary/20'
                                : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white'
                        }`}
                    >
                        <BookOpen size={18} />
                        Tài Liệu
                    </button>
                    <button
                        onClick={() => setActiveTab('toolbox')}
                        className={`flex items-center gap-2 px-5 py-3 rounded-2xl border transition-all cursor-pointer font-medium ${
                            activeTab === 'toolbox'
                                ? 'bg-primary border-primary text-slate-950 font-semibold shadow-lg shadow-primary/20'
                                : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white'
                        }`}
                    >
                        <Wrench size={18} />
                        Công Cụ Dev
                    </button>
                    <button
                        onClick={() => setActiveTab('nestjs-hub')}
                        className={`flex items-center gap-2 px-5 py-3 rounded-2xl border transition-all cursor-pointer font-medium ${
                            activeTab === 'nestjs-hub'
                                ? 'bg-primary border-primary text-slate-950 font-semibold shadow-lg shadow-primary/20'
                                : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white'
                        }`}
                    >
                        <Cpu size={18} />
                        NestJS Master Hub
                    </button>
                    <button
                        onClick={() => setActiveTab('nodejs-hub')}
                        className={`flex items-center gap-2 px-5 py-3 rounded-2xl border transition-all cursor-pointer font-medium ${
                            activeTab === 'nodejs-hub'
                                ? 'bg-primary border-primary text-slate-950 font-semibold shadow-lg shadow-primary/20'
                                : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white'
                        }`}
                    >
                        <Server size={18} />
                        Node.js Hub
                    </button>
                    <button
                        onClick={() => setActiveTab('extensions')}
                        className={`flex items-center gap-2 px-5 py-3 rounded-2xl border transition-all cursor-pointer font-medium ${
                            activeTab === 'extensions'
                                ? 'bg-primary border-primary text-slate-950 font-semibold shadow-lg shadow-primary/20'
                                : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white'
                        }`}
                    >
                        <Sliders size={18} />
                        VS Code Extensions
                    </button>
                </div>

                {/* Content rendering based on active tab */}
                <div className="max-w-6xl mx-auto">
                    {/* Tab 0: Libraries Catalog */}
                    {activeTab === 'libraries' && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up">
                            {/* Libraries Sidebar */}
                            <div className="lg:col-span-4 space-y-4">
                                <div className="p-4 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl">
                                    <div className="relative mb-4">
                                        <Search className="absolute top-1/2 left-3.5 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <input 
                                            type="text" 
                                            placeholder="Tìm kiếm thư viện..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 bg-slate-950 text-xs rounded-xl border border-white/5 text-slate-300 focus:outline-none focus:border-primary/50"
                                        />
                                    </div>
                                    
                                    <div className="flex gap-1.5 overflow-x-auto pb-2 mb-3 max-w-full custom-scrollbar">
                                        {['all', 'frontend', 'backend', 'database'].map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => setLibCategoryFilter(cat)}
                                                className={`py-1 px-2.5 rounded-lg text-[10px] uppercase font-bold tracking-wider shrink-0 transition-all cursor-pointer ${
                                                    libCategoryFilter === cat ? 'bg-primary text-slate-950' : 'bg-slate-950/60 text-slate-400 hover:text-white'
                                                }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="space-y-1.5 max-h-[50vh] overflow-y-auto custom-scrollbar">
                                        {filteredLibraries.length === 0 ? (
                                            <div className="text-center py-6 text-xs text-slate-500">
                                                Không tìm thấy thư viện nào
                                            </div>
                                        ) : (
                                            filteredLibraries.map(lib => (
                                                <button
                                                    key={lib.id}
                                                    onClick={() => {
                                                        setSelectedLib(lib);
                                                        setLibLang(lib.codeTs ? 'ts' : 'js');
                                                    }}
                                                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                                                        selectedLib?.id === lib.id
                                                            ? 'border-primary/40 bg-primary/10 shadow-inner'
                                                            : 'border-white/5 hover:border-white/20 bg-slate-950/40'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 rounded-xl bg-slate-900 border border-white/5 text-primary">
                                                            <BookOpen size={16} />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-xs font-bold text-white font-outfit">{lib.name}</h4>
                                                            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mt-0.5">{lib.category}</span>
                                                        </div>
                                                    </div>
                                                    <ChevronRight size={14} className="text-slate-500" />
                                                </button>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Library Code Viewer IDE Mockup */}
                            <div className="lg:col-span-8">
                                {selectedLib ? (
                                    <div className="rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl overflow-hidden flex flex-col h-full justify-between">
                                        {/* IDE Tab Header */}
                                        <div className="bg-slate-950 px-4 py-3 border-b border-white/5 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="flex gap-1.5 mr-2">
                                                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                                                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                                </div>
                                                <div className="flex gap-1">
                                                    {selectedLib.codeTs && (
                                                        <button 
                                                            onClick={() => setLibLang('ts')}
                                                            className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold cursor-pointer transition-all ${
                                                                libLang === 'ts' ? 'bg-slate-900 border border-white/5 text-sky-400' : 'text-slate-500 hover:text-slate-300'
                                                            }`}
                                                        >
                                                            {selectedLib.filename || 'config.ts'}
                                                        </button>
                                                    )}
                                                    {selectedLib.codeJs && (
                                                        <button 
                                                            onClick={() => setLibLang('js')}
                                                            className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold cursor-pointer transition-all ${
                                                                libLang === 'js' ? 'bg-slate-900 border border-white/5 text-amber-400' : 'text-slate-500 hover:text-slate-300'
                                                            }`}
                                                        >
                                                            {selectedLib.filename ? selectedLib.filename.replace('.ts', '.js') : 'config.js'}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleCopy(libLang === 'ts' ? selectedLib.codeTs : selectedLib.codeJs, 'lib-code')}
                                                className="text-[10px] font-bold text-primary flex items-center gap-1 hover:underline cursor-pointer"
                                            >
                                                {copiedId === 'lib-code' ? <Check size={12} /> : <Copy size={12} />}
                                                {copiedId === 'lib-code' ? 'Đã sao chép' : 'Copy code'}
                                            </button>
                                        </div>

                                        {/* IDE Editor view */}
                                        <div className="p-4 bg-slate-950/20 flex-1 overflow-auto custom-scrollbar min-h-[300px]">
                                            <HighlightedCode code={libLang === 'ts' ? selectedLib.codeTs : selectedLib.codeJs} />
                                        </div>

                                        {/* Library Description footer block */}
                                        <div className="p-5 bg-slate-950/60 border-t border-white/5">
                                            <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5 select-none">
                                                <Info size={14} className="text-primary" /> Mô tả Thư viện
                                            </h4>
                                            {renderMarkdownDescription(selectedLib.desc)}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center p-12 text-center rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl">
                                        <FolderTree size={48} className="text-slate-600 mb-4" />
                                        <h3 className="text-sm font-bold text-white">Chưa có thư viện nào</h3>
                                        <p className="text-xs text-slate-500 mt-1">Vui lòng khởi tạo thư viện trong Admin Portal của bạn.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Tab 1: Interactive Dev Toolbox */}
                    {activeTab === 'toolbox' && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Tools Sidebar selector */}
                            <div className="lg:col-span-4 space-y-4">
                                <div className="p-4 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 px-1">Danh Mục</h3>
                                    <div className="grid grid-cols-2 gap-1.5 mb-4">
                                        <button 
                                            onClick={() => setSelectedToolCategory('all')}
                                            className={`py-1.5 px-3 rounded-xl text-xs transition-all cursor-pointer ${
                                                selectedToolCategory === 'all' ? 'bg-primary text-slate-950 font-semibold' : 'bg-slate-950/60 text-slate-400 hover:text-white'
                                            }`}
                                        >
                                            Tất cả
                                        </button>
                                        <button 
                                            onClick={() => setSelectedToolCategory('general')}
                                            className={`py-1.5 px-3 rounded-xl text-xs transition-all cursor-pointer ${
                                                selectedToolCategory === 'general' ? 'bg-primary text-slate-950 font-semibold' : 'bg-slate-950/60 text-slate-400 hover:text-white'
                                            }`}
                                        >
                                            Chung
                                        </button>
                                        <button 
                                            onClick={() => setSelectedToolCategory('design')}
                                            className={`py-1.5 px-3 rounded-xl text-xs transition-all cursor-pointer ${
                                                selectedToolCategory === 'design' ? 'bg-primary text-slate-950 font-semibold' : 'bg-slate-950/60 text-slate-400 hover:text-white'
                                            }`}
                                        >
                                            Design
                                        </button>
                                        <button 
                                            onClick={() => setSelectedToolCategory('data')}
                                            className={`py-1.5 px-3 rounded-xl text-xs transition-all cursor-pointer ${
                                                selectedToolCategory === 'data' ? 'bg-primary text-slate-950 font-semibold' : 'bg-slate-950/60 text-slate-400 hover:text-white'
                                            }`}
                                        >
                                            Dữ liệu
                                        </button>
                                    </div>
                                    <div className="space-y-1.5 max-h-[50vh] overflow-y-auto custom-scrollbar">
                                        {toolsList
                                            .filter(t => selectedToolCategory === 'all' || t.cat === selectedToolCategory)
                                            .map(tool => {
                                                const Icon = tool.icon;
                                                return (
                                                    <button
                                                        key={tool.id}
                                                        onClick={() => setSelectedTool(tool.id)}
                                                        className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                                                            selectedTool === tool.id
                                                                ? 'border-primary/40 bg-primary/10 shadow-inner'
                                                                : 'border-white/5 hover:border-white/20 bg-slate-950/40'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className={`p-2 rounded-xl bg-slate-900 border border-white/5 ${tool.color}`}>
                                                                <Icon size={16} />
                                                            </div>
                                                            <div>
                                                                <h4 className="text-xs font-semibold text-white">{tool.name}</h4>
                                                                <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{tool.desc}</p>
                                                            </div>
                                                        </div>
                                                        <ChevronRight size={14} className="text-slate-500" />
                                                    </button>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* Main Active Tool playground */}
                            <div className="lg:col-span-8">
                                <div className="p-6 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl h-full flex flex-col justify-between">
                                    <div>
                                        {/* JSON Formatter */}
                                        {selectedTool === 'json' && (
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-bold text-white font-outfit">JSON Formatter & Validator</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="text-xs text-slate-400 block mb-1">Input JSON</label>
                                                        <textarea 
                                                            value={jsonInput}
                                                            onChange={(e) => setJsonInput(e.target.value)}
                                                            className="w-full h-64 bg-slate-950 text-slate-300 font-mono text-xs p-3 rounded-xl border border-white/5 focus:border-primary/50 focus:outline-none custom-scrollbar"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-between items-center mb-1">
                                                            <label className="text-xs text-slate-400">Formatted Output</label>
                                                            {jsonOutput && (
                                                                <button 
                                                                    onClick={() => handleCopy(jsonOutput, 'json-out')}
                                                                    className="text-xs text-primary flex items-center gap-1 cursor-pointer hover:underline"
                                                                >
                                                                    {copiedId === 'json-out' ? <Check size={12} /> : <Copy size={12} />}
                                                                    {copiedId === 'json-out' ? 'Đã sao chép' : 'Sao chép'}
                                                                </button>
                                                            )}
                                                        </div>
                                                        {jsonError ? (
                                                            <div className="w-full h-64 bg-rose-950/20 text-rose-400 font-mono text-xs p-3 rounded-xl border border-rose-500/20 overflow-y-auto">
                                                                {jsonError}
                                                            </div>
                                                        ) : (
                                                            <pre className="w-full h-64 bg-slate-950 text-emerald-400 font-mono text-xs p-3 rounded-xl border border-white/5 overflow-y-auto custom-scrollbar select-text">
                                                                {jsonOutput || '// Kết quả định dạng sẽ xuất hiện ở đây'}
                                                            </pre>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* JWT Decoder */}
                                        {selectedTool === 'jwt' && (
                                            <div className="space-y-4">
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
                                                            <pre className="w-full h-40 bg-slate-950 text-sky-400 font-mono text-xs p-3 rounded-xl border border-white/5 overflow-y-auto custom-scrollbar select-text">
                                                                {jwtHeader}
                                                            </pre>
                                                        </div>
                                                        <div>
                                                            <label className="text-xs text-slate-400 block mb-1">Payload</label>
                                                            <pre className="w-full h-40 bg-slate-950 text-emerald-400 font-mono text-xs p-3 rounded-xl border border-white/5 overflow-y-auto custom-scrollbar select-text">
                                                                {jwtPayload}
                                                            </pre>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Base64 Text */}
                                        {selectedTool === 'base64' && (
                                            <div className="space-y-4">
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
                                                                    onClick={() => handleCopy(base64Output, 'base64-copy')}
                                                                    className="text-xs text-primary flex items-center gap-1 cursor-pointer hover:underline"
                                                                >
                                                                    {copiedId === 'base64-copy' ? <Check size={12} /> : <Copy size={12} />}
                                                                    {copiedId === 'base64-copy' ? 'Đã sao chép' : 'Sao chép'}
                                                                </button>
                                                            )}
                                                        </div>
                                                        <pre className="w-full h-40 bg-slate-950 text-emerald-400 font-mono text-xs p-3 rounded-xl border border-white/5 overflow-y-auto select-text">
                                                            {base64Output}
                                                        </pre>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Box Shadow & Radius */}
                                        {selectedTool === 'box-shadow' && (
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-bold text-white font-outfit">Box Shadow & Radius Visualizer</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-3">
                                                        <div>
                                                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                                                <span>Offset X: {shadowX}px</span>
                                                            </div>
                                                            <input type="range" min="-50" max="50" value={shadowX} onChange={(e) => setShadowX(Number(e.target.value))} className="w-full accent-primary" />
                                                        </div>
                                                        <div>
                                                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                                                <span>Offset Y: {shadowY}px</span>
                                                            </div>
                                                            <input type="range" min="-50" max="50" value={shadowY} onChange={(e) => setShadowY(Number(e.target.value))} className="w-full accent-primary" />
                                                        </div>
                                                        <div>
                                                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                                                <span>Blur Radius: {shadowBlur}px</span>
                                                            </div>
                                                            <input type="range" min="0" max="100" value={shadowBlur} onChange={(e) => setShadowBlur(Number(e.target.value))} className="w-full accent-primary" />
                                                        </div>
                                                        <div>
                                                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                                                <span>Spread Radius: {shadowSpread}px</span>
                                                            </div>
                                                            <input type="range" min="-50" max="50" value={shadowSpread} onChange={(e) => setShadowSpread(Number(e.target.value))} className="w-full accent-primary" />
                                                        </div>
                                                        <div>
                                                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                                                <span>Border Radius: {shadowRadius}px</span>
                                                            </div>
                                                            <input type="range" min="0" max="60" value={shadowRadius} onChange={(e) => setShadowRadius(Number(e.target.value))} className="w-full accent-primary" />
                                                        </div>
                                                        <div>
                                                            <label className="text-xs text-slate-400 block mb-1">Shadow Color</label>
                                                            <input type="color" value={shadowColor} onChange={(e) => setShadowColor(e.target.value)} className="w-full h-8 rounded border border-white/10 bg-transparent cursor-pointer" />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950/60 border border-white/5 min-h-[250px]">
                                                        <div 
                                                            className="w-32 h-32 bg-slate-900 border border-white/10 flex items-center justify-center text-xs font-semibold text-slate-300"
                                                            style={{
                                                                borderRadius: `${shadowRadius}px`,
                                                                boxShadow: `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}`
                                                            }}
                                                        >
                                                            Preview
                                                        </div>
                                                        <div className="w-full mt-4 bg-slate-950 p-2.5 rounded-xl border border-white/5 flex justify-between items-center text-[10px] font-mono text-emerald-400 select-all">
                                                            <span>box-shadow: {shadowX}px {shadowY}px {shadowBlur}px {shadowSpread}px {shadowColor};</span>
                                                            <button 
                                                                onClick={() => handleCopy(`box-shadow: ${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor};`, 'copy-shadow')}
                                                                className="text-primary hover:underline cursor-pointer ml-2 shrink-0"
                                                            >
                                                                {copiedId === 'copy-shadow' ? 'Đã copy' : <Copy size={12} />}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Glassmorphism */}
                                        {selectedTool === 'glassmorphism' && (
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-bold text-white font-outfit">Glassmorphism Generator</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-3">
                                                        <div>
                                                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                                                <span>Backdrop Blur: {glassBlur}px</span>
                                                            </div>
                                                            <input type="range" min="0" max="40" value={glassBlur} onChange={(e) => setGlassBlur(Number(e.target.value))} className="w-full accent-primary" />
                                                        </div>
                                                        <div>
                                                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                                                <span>Opacity: {glassOpacity}</span>
                                                            </div>
                                                            <input type="range" min="0.01" max="0.95" step="0.01" value={glassOpacity} onChange={(e) => setGlassOpacity(Number(e.target.value))} className="w-full accent-primary" />
                                                        </div>
                                                        <div>
                                                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                                                <span>Border Opacity: {glassBorder}</span>
                                                            </div>
                                                            <input type="range" min="0.01" max="0.95" step="0.01" value={glassBorder} onChange={(e) => setGlassBorder(Number(e.target.value))} className="w-full accent-primary" />
                                                        </div>
                                                        <div>
                                                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                                                <span>Border Radius: {glassRadius}px</span>
                                                            </div>
                                                            <input type="range" min="0" max="50" value={glassRadius} onChange={(e) => setGlassRadius(Number(e.target.value))} className="w-full accent-primary" />
                                                        </div>
                                                    </div>
                                                    <div className="relative flex items-center justify-center p-6 rounded-2xl bg-gradient-to-tr from-rose-900/20 to-teal-900/20 overflow-hidden min-h-[220px]">
                                                        <div className="absolute top-6 left-6 w-16 h-16 bg-rose-500 rounded-full blur-sm" />
                                                        <div className="absolute bottom-6 right-6 w-20 h-20 bg-teal-400 rounded-full blur-sm animate-float" />
                                                        
                                                        <div 
                                                            className="w-40 h-28 relative z-10 flex flex-col items-center justify-center text-xs font-semibold text-white border"
                                                            style={{
                                                                backdropFilter: `blur(${glassBlur}px)`,
                                                                backgroundColor: `rgba(15, 23, 42, ${glassOpacity})`,
                                                                borderColor: `rgba(255, 255, 255, ${glassBorder})`,
                                                                borderRadius: `${glassRadius}px`
                                                            }}
                                                        >
                                                            Glass Preview
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* SVG to React */}
                                        {selectedTool === 'svg2react' && (
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-bold text-white font-outfit">SVG to React Component</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="text-xs text-slate-400 block mb-1">Raw SVG Input</label>
                                                        <textarea 
                                                            value={svgInput}
                                                            onChange={(e) => setSvgInput(e.target.value)}
                                                            className="w-full h-48 bg-slate-950 text-slate-300 font-mono text-xs p-3 rounded-xl border border-white/5 focus:border-primary/50 focus:outline-none"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-between items-center mb-1">
                                                            <label className="text-xs text-slate-400">React Functional Component</label>
                                                            {svgOutput && (
                                                                <button 
                                                                    onClick={() => handleCopy(svgOutput, 'svg-out')}
                                                                    className="text-xs text-primary flex items-center gap-1 cursor-pointer hover:underline"
                                                                >
                                                                    {copiedId === 'svg-out' ? <Check size={12} /> : <Copy size={12} />}
                                                                    {copiedId === 'svg-out' ? 'Đã sao chép' : 'Sao chép'}
                                                                </button>
                                                            )}
                                                        </div>
                                                        <pre className="w-full h-48 bg-slate-950 text-emerald-400 font-mono text-xs p-3 rounded-xl border border-white/5 overflow-y-auto select-text">
                                                            {svgOutput}
                                                        </pre>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* PX to REM */}
                                        {selectedTool === 'px2rem' && (
                                            <div className="space-y-4">
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
                                        )}

                                        {/* Color Contrast */}
                                        {selectedTool === 'color-contrast' && (
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-bold text-white font-outfit">Color & Contrast Checker</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-3">
                                                        <div>
                                                            <label className="text-xs text-slate-400 block mb-1">Text Color</label>
                                                            <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-full h-8 rounded border border-white/10 bg-transparent cursor-pointer" />
                                                        </div>
                                                        <div>
                                                            <label className="text-xs text-slate-400 block mb-1">Background Color</label>
                                                            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-8 rounded border border-white/10 bg-transparent cursor-pointer" />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-center justify-center p-6 rounded-2xl border border-white/5" style={{ backgroundColor: bgColor }}>
                                                        <span className="text-lg font-bold mb-2" style={{ color: textColor }}>
                                                            Aa Bb Cc
                                                        </span>
                                                        <span className="text-xs" style={{ color: textColor }}>
                                                            The quick brown fox jumps over the lazy dog.
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Regex Tester */}
                                        {selectedTool === 'regex-tester' && (
                                            <div className="space-y-4">
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
                                                        <pre className="w-full h-24 bg-slate-950 text-emerald-400 font-mono text-xs p-3 rounded-xl border border-white/5 overflow-y-auto select-text">
                                                            {regexResult}
                                                        </pre>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Case Converter */}
                                        {selectedTool === 'string-case' && (
                                            <div className="space-y-4">
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
                                                    <div className="grid grid-cols-2 gap-3 pt-2">
                                                        <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5">
                                                            <span className="text-[10px] text-slate-500 block uppercase font-bold">camelCase</span>
                                                            <span className="text-xs text-emerald-400 font-mono select-all">{convertStringCase(caseInputText, 'camel')}</span>
                                                        </div>
                                                        <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5">
                                                            <span className="text-[10px] text-slate-500 block uppercase font-bold">snake_case</span>
                                                            <span className="text-xs text-emerald-400 font-mono select-all">{convertStringCase(caseInputText, 'snake')}</span>
                                                        </div>
                                                        <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5">
                                                            <span className="text-[10px] text-slate-500 block uppercase font-bold">PascalCase</span>
                                                            <span className="text-xs text-emerald-400 font-mono select-all">{convertStringCase(caseInputText, 'pascal')}</span>
                                                        </div>
                                                        <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5">
                                                            <span className="text-[10px] text-slate-500 block uppercase font-bold">kebab-case</span>
                                                            <span className="text-xs text-emerald-400 font-mono select-all">{convertStringCase(caseInputText, 'kebab')}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Image to Base64 */}
                                        {selectedTool === 'image2base64' && (
                                            <div className="space-y-4">
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
                                                                    onClick={() => handleCopy(base64Image, 'img-base64')}
                                                                    className="text-xs text-primary flex items-center gap-1 cursor-pointer hover:underline"
                                                                >
                                                                    {copiedId === 'img-base64' ? <Check size={12} /> : <Copy size={12} />}
                                                                    {copiedId === 'img-base64' ? 'Đã sao chép' : 'Sao chép'}
                                                                </button>
                                                            </div>
                                                            <textarea 
                                                                readOnly
                                                                value={base64Image}
                                                                className="w-full h-24 bg-slate-950 text-slate-400 font-mono text-[10px] p-2.5 rounded-xl border border-white/5 focus:outline-none overflow-y-auto"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Word Counter */}
                                        {selectedTool === 'word-counter' && (
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-bold text-white font-outfit">Text & Word Counter</h3>
                                                <textarea 
                                                    value={wordText}
                                                    onChange={(e) => setWordText(e.target.value)}
                                                    className="w-full h-32 bg-slate-950 text-slate-300 font-sans text-xs p-3 rounded-xl border border-white/5 focus:border-primary/50 focus:outline-none"
                                                />
                                                <div className="grid grid-cols-4 gap-3">
                                                    <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 text-center">
                                                        <span className="text-[10px] text-slate-500 block uppercase">Từ</span>
                                                        <span className="text-sm font-bold text-white mt-1 block">{wordText ? wordText.trim().split(/\s+/).length : 0}</span>
                                                    </div>
                                                    <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 text-center">
                                                        <span className="text-[10px] text-slate-500 block uppercase">Ký tự</span>
                                                        <span className="text-sm font-bold text-white mt-1 block">{wordText.length}</span>
                                                    </div>
                                                    <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 text-center">
                                                        <span className="text-[10px] text-slate-500 block uppercase">Câu</span>
                                                        <span className="text-sm font-bold text-white mt-1 block">{wordText ? wordText.split(/[.!?]+/).filter(Boolean).length : 0}</span>
                                                    </div>
                                                    <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 text-center">
                                                        <span className="text-[10px] text-slate-500 block uppercase">Số phút đọc</span>
                                                        <span className="text-sm font-bold text-white mt-1 block">{wordText ? Math.ceil(wordText.trim().split(/\s+/).length / 200) : 0}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* URL Extractor */}
                                        {selectedTool === 'url-query' && (
                                            <div className="space-y-4">
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
                                                            {(() => {
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
                                                            })()}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab 2: NestJS Master Hub */}
                    {activeTab === 'nestjs-hub' && (
                        <div className="space-y-8 animate-fade-in-up">
                            {/* Introduction card */}
                            <div className="p-6 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl">
                                <h3 className="text-xl font-bold font-outfit text-white mb-2 flex items-center gap-2">
                                    <Cpu className="text-rose-400" /> NestJS Enterprise Architecture Hub
                                </h3>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    NestJS là một framework xây dựng ứng dụng Server-side Node.js hiệu năng cao, dễ mở rộng nhờ kiến trúc Dependency Injection vững chắc kết hợp chặt chẽ với TypeScript và OOP.
                                </p>
                            </div>

                            {/* Section 1: Standard clean folder structure */}
                            <div className="p-6 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2 border-b border-white/5 pb-2">
                                    <FileCode size={16} /> 1. Cấu trúc Thư mục Dự án Chuẩn (Clean Architecture)
                                </h4>
                                <p className="text-xs text-slate-300">
                                    Kiến trúc khuyên dùng cho các dự án NestJS ở quy mô doanh nghiệp giúp phân tách rõ ràng trách nhiệm giữa controller, business logic và database:
                                </p>
                                <pre className="font-mono text-[11px] text-slate-400 bg-slate-950 p-4 rounded-xl border border-white/5 leading-relaxed overflow-x-auto select-text">
{`src/
├── common/                  # Các bộ lọc dùng chung toàn hệ thống
│   ├── decorators/          # Custom Decorators (@CurrentUser, @Public,...)
│   ├── filters/             # Exception Filters (HttpExceptionFilter)
│   ├── guards/              # Route Guards (JwtAuthGuard, RolesGuard)
│   └── interceptors/        # Interceptors (TransformInterceptor)
├── controllers/             # Nơi tiếp nhận Request và gửi phản hồi
│   ├── auth.controller.ts
│   └── users.controller.ts
├── db/                      # Cấu hình Database & Entity / Migration
│   ├── entities/            # ORM Entities (user.entity.ts, project.entity.ts)
│   └── seeds/               # Dữ liệu khởi tạo (seeders)
├── services/                # Nơi xử lý Nghiệp vụ Logic chính
│   ├── auth.service.ts
│   └── users.service.ts
├── modules/                 # Đóng gói logic theo từng phân hệ chức năng
│   ├── auth.module.ts
│   └── users.module.ts
├── app.module.ts            # Root Module chính của ứng dụng
└── main.ts                  # Điểm khởi chạy (Entrypoint) ứng dụng`}
                                </pre>
                            </div>

                            {/* Section 2: Core Decorators list with descriptions */}
                            <div className="p-6 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2 border-b border-white/5 pb-2">
                                    <Sparkles size={16} /> 2. Hướng dẫn chi tiết các Decorators trong NestJS
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
                                        <span className="text-xs font-bold text-primary block">@Controller('path')</span>
                                        <p className="text-[11px] text-slate-400">Đánh dấu một class là Controller để xử lý các HTTP Requests đi vào endpoint được chỉ định.</p>
                                        <span className="text-[10px] font-mono text-slate-500 block">Ví dụ: @Controller('auth') mapping sang /auth</span>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
                                        <span className="text-xs font-bold text-primary block">@Injectable()</span>
                                        <p className="text-[11px] text-slate-400">Khai báo một class là Provider trong IoC Container, cho phép NestJS tự động quản lý vòng đời và Inject Service vào Constructor.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
                                        <span className="text-xs font-bold text-primary block">@Get() / @Post() / @Put() / @Delete()</span>
                                        <p className="text-[11px] text-slate-400">Ánh xạ phương thức của class sang các HTTP Methods tương ứng để xử lý request.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
                                        <span className="text-xs font-bold text-primary block">@Body() / @Query() / @Param()</span>
                                        <p className="text-[11px] text-slate-400">Tách xuất trực tiếp dữ liệu từ HTTP Request: Body payload, URL Query strings, hoặc Route Params.</p>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <span className="text-xs font-bold text-slate-300 block mb-2">Code mẫu Controller DTO & Service Injection</span>
                                    <HighlightedCode code={`import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';\nimport { UsersService } from '../services/users.service';\nimport { CreateUserDto } from '../dto/create-user.dto';\nimport { JwtAuthGuard } from '../common/guards/jwt-auth.guard';\n\n@Controller('users')\nexport class UsersController {\n  // Inject UsersService qua constructor (Dependency Injection)\n  constructor(private readonly usersService: UsersService) {}\n\n  @Post('register')\n  async register(@Body() createUserDto: CreateUserDto) {\n    // Lấy dữ liệu body đã được validate tự động qua CreateUserDto\n    return this.usersService.create(createUserDto);\n  }\n\n  @Get(':id')\n  @UseGuards(JwtAuthGuard) // Bảo vệ endpoint bằng JWT Auth Guard\n  async findOne(@Param('id') id: string) {\n    return this.usersService.findById(id);\n  }\n}`} />
                                </div>
                            </div>

                            {/* Section 3: class-validator detailed guide */}
                            <div className="p-6 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2 border-b border-white/5 pb-2">
                                    <ShieldCheck size={16} /> 3. Xác thực Dữ liệu đầu vào (class-validator)
                                </h4>
                                <p className="text-xs text-slate-300">
                                    class-validator giúp cấu hình kiểm tra tính toàn vẹn của payload trước khi đi vào controller bằng cách định nghĩa các decorator validation ngay trong class DTO.
                                </p>
                                <HighlightedCode code={`import { IsString, IsNotEmpty, IsEmail, MinLength, IsOptional, IsEnum } from 'class-validator';\n\nexport enum UserRole {\n  ADMIN = 'admin',\n  USER = 'user'\n}\n\nexport class CreateUserDto {\n  @IsNotEmpty({ message: 'Tên không được bỏ trống' })\n  @IsString()\n  name: string;\n\n  @IsEmail({}, { message: 'Định dạng email không hợp lệ' })\n  email: string;\n\n  @IsString()\n  @MinLength(6, { message: 'Mật khẩu tối thiểu phải từ 6 ký tự' })\n  password: string;\n\n  @IsOptional() // Không bắt buộc\n  @IsEnum(UserRole, { message: 'Quyền tài khoản không hợp lệ' })\n  role?: UserRole;\n}`} />
                            </div>

                            {/* Section 4: Production main.ts Configuration */}
                            <div className="p-6 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2 border-b border-white/5 pb-2">
                                    <Shield size={16} /> 4. Cấu hình main.ts đạt chuẩn Production Doanh Nghiệp
                                </h4>
                                <p className="text-xs text-slate-300">
                                    Tệp `main.ts` là điểm khởi chạy chính của NestJS. Cần tích hợp bảo mật, CORS, Global Exception Filters và Validation Pipe để vận hành ổn định:
                                </p>
                                <HighlightedCode code={`import { NestFactory } from '@nestjs/core';\nimport { AppModule } from './app.module';\nimport { ValidationPipe } from '@nestjs/common';\nimport helmet from 'helmet';\n\nasync function bootstrap() {\n  // Tạo instance ứng dụng từ AppModule chính\n  const app = await NestFactory.create(AppModule);\n\n  // 1. Tích hợp Helmet để đặt các HTTP Headers bảo mật chống XSS, Clickjacking\n  app.use(helmet());\n\n  // 2. Kích hoạt Global ValidationPipe để kiểm soát DTO đầu vào tự động\n  app.useGlobalPipes(new ValidationPipe({\n    whitelist: true,            // Tự động lược bỏ các trường không định nghĩa trong DTO\n    forbidNonWhitelisted: true, // Trả về lỗi 400 Bad Request nếu gửi trường ngoài DTO\n    transform: true,            // Tự động convert kiểu dữ liệu (vd: string sang number)\n  }));\n\n  // 3. Cấu hình CORS để chỉ cho phép Client tin cậy truy vấn API\n  app.enableCors({\n    origin: process.env.CLIENT_URL || 'http://localhost:5173',\n    credentials: true,\n  });\n\n  // 4. Lắng nghe trên cổng chỉ định\n  const port = process.env.PORT || 3000;\n  await app.listen(port);\n  console.log(\`🚀 Server NestJS đang hoạt động tại cổng: \${port}\`);\n}\nbootstrap();`} />
                            </div>
                        </div>
                    )}

                    {/* Tab 3: Node.js Hub */}
                    {activeTab === 'nodejs-hub' && (
                        <div className="space-y-8 animate-fade-in-up">
                            {/* Introduction card */}
                            <div className="p-6 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl">
                                <h3 className="text-xl font-bold font-outfit text-white mb-2 flex items-center gap-2">
                                    <Server className="text-teal-400" /> Node.js Core Deep-dive Hub
                                </h3>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Nắm vững kiến trúc phần cứng của Node.js: Xử lý I/O phi đồng bộ đơn luồng, Buffer/Stream tối ưu bộ nhớ, cơ chế đa tiến trình (Cluster) và đa luồng (Worker Threads) để giải quyết các bài toán tải nặng.
                                </p>
                            </div>

                            {/* Section 1: Event Loop details */}
                            <div className="p-6 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-teal-400 flex items-center gap-2 border-b border-white/5 pb-2">
                                    <Activity size={16} /> 1. Cơ chế Event Loop & Microtask Queues
                                </h4>
                                <p className="text-xs text-slate-300">
                                    Event Loop vận hành liên tục qua các pha để xử lý callbacks phi đồng bộ. Microtask Queue (`process.nextTick` và `Promise.then`) luôn được ưu tiên thực thi ngay sau mỗi pha trước khi chuyển sang pha kế tiếp.
                                </p>
                                <pre className="font-mono text-[11px] text-slate-400 bg-slate-950 p-4 rounded-xl border border-white/5 leading-relaxed overflow-x-auto select-text">
{`┌───────────────────────────────────────────┐
│                 Timers                    │ ◄── setTimeout(), setInterval()
└─────────────────────┬─────────────────────┘
                      ▼
┌───────────────────────────────────────────┐
│            Pending Callbacks              │ ◄── Lỗi mạng TCP, I/O bị trì hoãn
└─────────────────────┬─────────────────────┘
                      ▼
┌───────────────────────────────────────────┐
│                 Poll                      │ ◄── Truy vấn dữ liệu mới, I/O file, kết nối socket
└─────────────────────┬─────────────────────┘
                      ▼
┌───────────────────────────────────────────┐
│                 Check                     │ ◄── setImmediate()
└─────────────────────┬─────────────────────┘
                      ▼
┌───────────────────────────────────────────┐
│            Close Callbacks                │ ◄── socket.on('close'), stream.close()
└───────────────────────────────────────────┘
 [Lưu ý] Microtask Queue (Promise / nextTick) được xả sạch ngay lập tức giữa mỗi pha!`}
                                </pre>
                            </div>

                            {/* Section 2: Buffer & Streams with code template */}
                            <div className="p-6 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-teal-400 flex items-center gap-2 border-b border-white/5 pb-2">
                                    <Layers size={16} /> 2. Xử lý File lớn với Buffer & Stream (Tối ưu RAM)
                                </h4>
                                <p className="text-xs text-slate-300">
                                    Đọc tệp tin lớn bằng `fs.readFileSync` sẽ nạp toàn bộ tệp vào RAM, gây tràn bộ nhớ khi ứng dụng chịu tải cao. Stream giúp truyền tệp theo từng phần nhỏ (Chunks) thông qua bộ đệm Buffer:
                                </p>
                                <HighlightedCode code={`import fs from 'node:fs';\nimport { Transform } from 'node:stream';\n\n// 1. Tạo Read Stream để đọc file theo từng Chunk nhỏ\nconst readStream = fs.createReadStream('./large-input.log', {\n  highWaterMark: 64 * 1024 // Đọc mỗi lần tối đa 64KB (Buffer size)\n});\n\n// 2. Tạo Write Stream ghi dữ liệu ra file mới\nconst writeStream = fs.createWriteStream('./large-output.log');\n\n// 3. Tạo Transform Stream để lọc dữ liệu trực tiếp trong quá trình truyền tải\nconst uppercaseTransform = new Transform({\n  transform(chunk, encoding, callback) {\n    // Chuyển đổi ký tự trong chunk sang chữ hoa\n    const upperChunk = chunk.toString().toUpperCase();\n    this.push(upperChunk);\n    callback();\n  }\n});\n\n// 4. Pipe các stream lại với nhau: Đọc -> Biến đổi -> Ghi file\nreadStream\n  .pipe(uppercaseTransform)\n  .pipe(writeStream)\n  .on('finish', () => {\n    console.log('⚡ Đã lọc và sao chép tệp tin dung lượng lớn thành công bằng Stream!');\n  });`} />
                            </div>

                            {/* Section 3: Cluster and Worker Threads split */}
                            <div className="p-6 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-teal-400 flex items-center gap-2 border-b border-white/5 pb-2">
                                    <Zap size={16} /> 3. Đa Tiến Trình (Cluster) vs Đa Luồng (Worker Threads)
                                </h4>
                                <p className="text-xs text-slate-300">
                                    - <strong className="text-white">Cluster</strong>: Nhân bản ứng dụng Node.js thành nhiều Process chạy song song trên các nhân CPU khác nhau để phân chia tải kết nối HTTP (Load balancing). Các tiến trình tách biệt bộ nhớ tuyệt đối.<br />
                                    - <strong className="text-white">Worker Threads</strong>: Chạy nhiều luồng tính toán CPU (nhã mã hoá, xử lý ảnh) trên cùng một tiến trình, chia sẻ chung không gian bộ nhớ RAM để tối ưu hiệu năng.
                                </p>
                                <div className="space-y-4">
                                    <div>
                                        <span className="text-xs font-bold text-slate-300 block mb-2">Code mẫu: Tối ưu Cluster cho Server HTTP</span>
                                        <HighlightedCode code={`import cluster from 'node:cluster';\nimport http from 'node:http';\nimport os from 'node:os';\n\nif (cluster.isPrimary) {\n  const numCPUs = os.availableParallelism(); // Đếm số nhân CPU thực tế của máy chủ\n  console.log(\`主 Master Process: \${process.pid} đang thiết lập \${numCPUs} tiến trình con...\`);\n\n  // Nhân bản (Fork) tiến trình dựa trên số nhân CPU\n  for (let i = 0; i < numCPUs; i++) {\n    cluster.fork();\n  }\n\n  // Tự động hồi sinh tiến trình con nếu có lỗi đột ngột crash\n  cluster.on('exit', (worker, code, signal) => {\n    console.log(\`❌ Worker \${worker.process.pid} đã tắt. Đang tự động hồi sinh...\`);\n    cluster.fork();\n  });\n} else {\n  // Các tiến trình Worker chia sẻ cổng mạng 8080 để chia tải kết nối HTTP\n  http.createServer((req, res) => {\n    res.writeHead(200);\n    res.end(\`⚡ Phản hồi từ Tiến trình con (Worker Process ID): \${process.pid}\\n\`);\n  }).listen(8080);\n}`} />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-slate-300 block mb-2">Code mẫu: Worker Thread tính toán CPU nặng</span>
                                        <HighlightedCode code={`import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';\n\nif (isMainThread) {\n  // Khởi tạo luồng phụ và truyền dữ liệu đầu vào cần tính toán\n  const worker = new Worker(new URL(import.meta.url), {\n    workerData: { num: 40 }\n  });\n\n  // Lắng nghe kết quả trả về từ luồng phụ\n  worker.on('message', (result) => {\n    console.log(\`⚡ Kết quả số Fibonacci thứ 40 tính toán từ Luồng Phụ: \${result}\`);\n  });\n\n  worker.on('error', (err) => console.error(err));\n} else {\n  // Hàm đệ quy tính toán Fibonacci - Tải nặng chặn CPU\n  function fibonacci(n) {\n    if (n < 2) return n;\n    return fibonacci(n - 1) + fibonacci(n - 2);\n  }\n\n  const input = workerData.num;\n  const output = fibonacci(input);\n  \n  // Gửi trả kết quả về Luồng Chính\n  parentPort.postMessage(output);\n}`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab 4: VS Code Extensions */}
                    {activeTab === 'extensions' && (
                        <div className="space-y-6 animate-fade-in-up">
                            <div className="p-6 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl">
                                <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-3">
                                    <h3 className="text-xl font-bold font-outfit text-white">
                                        🔌 Khuyên Dùng VS Code Extensions
                                    </h3>
                                    <span className="text-xs text-primary font-bold uppercase tracking-wider bg-primary/5 px-2.5 py-1 rounded-full border border-primary/20">
                                        {extensions.length} Extensions
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {extensions.map((ext) => {
                                        const ExtIcon = getCategoryIcon(ext.category);
                                        return (
                                            <div key={ext.id} className="p-4 rounded-2xl border border-white/5 bg-slate-950/40 hover:border-primary/20 hover:bg-slate-900/20 transition-all flex flex-col justify-between">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className="p-2 rounded-xl bg-slate-900 border border-white/5 text-primary">
                                                            <ExtIcon size={16} />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-xs font-bold text-white font-outfit">{ext.name}</h4>
                                                            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                                                                {ext.category}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                                                        {ext.description}
                                                    </p>
                                                </div>
                                                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                                                    <span className="text-[10px] font-mono text-slate-500">
                                                        {ext.extensionId}
                                                    </span>
                                                    <button 
                                                        onClick={() => handleCopy(`ext install ${ext.extensionId}`, `ext-${ext.id}`)}
                                                        className="text-[10px] text-primary flex items-center gap-1 hover:underline cursor-pointer font-bold"
                                                    >
                                                        {copiedId === `ext-${ext.id}` ? <CheckCircle2 size={10} /> : <Terminal size={10} />}
                                                        {copiedId === `ext-${ext.id}` ? 'Đã copy lệnh install' : 'Copy lệnh'}
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TechDocs;