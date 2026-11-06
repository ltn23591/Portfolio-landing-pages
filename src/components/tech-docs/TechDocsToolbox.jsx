import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { toolsList } from './constants/techDocs.constants';

import JsonFormatter from './tools/JsonFormatter';
import JwtDecoder from './tools/JwtDecoder';
import Base64Tool from './tools/Base64Tool';
import BoxShadowGenerator from './tools/BoxShadowGenerator';
import GlassmorphismGenerator from './tools/GlassmorphismGenerator';
import Svg2React from './tools/Svg2React';
import Px2Rem from './tools/Px2Rem';
import ColorContrast from './tools/ColorContrast';
import RegexTester from './tools/RegexTester';
import StringCaseConverter from './tools/StringCaseConverter';
import Image2Base64 from './tools/Image2Base64';
import WordCounter from './tools/WordCounter';
import UrlQueryExtractor from './tools/UrlQueryExtractor';

const TechDocsToolbox = () => {
    const [selectedToolCategory, setSelectedToolCategory] = useState('all');
    const [selectedTool, setSelectedTool] = useState('json');


    const renderActiveTool = () => {
        switch (selectedTool) {
            case 'json': return <JsonFormatter />;
            case 'jwt': return <JwtDecoder />;
            case 'base64': return <Base64Tool />;
            case 'box-shadow': return <BoxShadowGenerator />;
            case 'glassmorphism': return <GlassmorphismGenerator />;
            case 'svg2react': return <Svg2React />;
            case 'px2rem': return <Px2Rem />;
            case 'color-contrast': return <ColorContrast />;
            case 'regex-tester': return <RegexTester />;
            case 'string-case': return <StringCaseConverter />;
            case 'image2base64': return <Image2Base64 />;
            case 'word-counter': return <WordCounter />;
            case 'url-query': return <UrlQueryExtractor />;
            default: return <div className="text-slate-500">Vui lòng chọn một công cụ</div>;
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            {/* Tools Sidebar selector */}
            <div className="lg:col-span-4 space-y-4">
                <div className="p-4 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 px-1">Danh Mục</h3>
                    <div className="grid grid-cols-2 gap-1.5 mb-4">
                        {['all', 'general', 'design', 'data'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedToolCategory(cat)}
                                className={`py-1.5 px-3 rounded-xl text-xs transition-all cursor-pointer capitalize ${selectedToolCategory === cat ? 'bg-primary text-slate-950 font-semibold' : 'bg-slate-950/60 text-slate-400 hover:text-white'
                                    }`}
                            >
                                {cat === 'all' ? 'Tất cả' : cat === 'general' ? 'Chung' : cat === 'design' ? 'Design' : 'Dữ liệu'}
                            </button>
                        ))}
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
                                        className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${selectedTool === tool.id
                                                ? 'border-primary/40 bg-primary/10 shadow-inner'
                                                : 'border-white/5 hover:border-white/20 bg-slate-950/40'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-xl bg-slate-900 border border-white/5 ${tool.color}`}>
                                                <Icon size={16} />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-semibold text-white font-outfit">{tool.name}</h4>
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
                        {renderActiveTool()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechDocsToolbox;
