import { useState, useEffect } from 'react';

export const useSvg2React = () => {
    const [svgInput, setSvgInput] = useState('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg>');
    const [svgOutput, setSvgOutput] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!svgInput.trim()) {
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

    const handleCopy = () => {
        navigator.clipboard.writeText(svgOutput);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return {
        svgInput,
        setSvgInput,
        svgOutput,
        copied,
        handleCopy
    };
};
