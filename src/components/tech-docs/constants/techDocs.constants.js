import {
    Palette, FileCode, ShieldAlert, Globe, Database, Wrench, Sparkles, Code,
    FileJson, Shield, RefreshCw, Box, Sliders, Ruler, TestTube, Type,
    Image as ImageIcon, BarChart3, Link
} from 'lucide-react';

export const getCategoryIcon = (category) => {
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

export const toolsList = [
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
