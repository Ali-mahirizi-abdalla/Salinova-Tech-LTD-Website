const fs = require('fs');

const files = [
  'src/pages/Services.jsx',
  'src/pages/Pricing.jsx',
  'src/pages/Industries.jsx',
  'src/pages/Home.jsx',
  'src/pages/Contact.jsx',
  'src/pages/CaseStudies.jsx',
  'src/pages/BlogPost.jsx',
  'src/pages/Blog.jsx',
  'src/pages/Academy.jsx',
  'src/pages/About.jsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('useSEO')) {
    content = content.replace(/import \{ useSEO \} from '\.\.\/hooks\/useSEO';/, "import { SEO } from '../components/SEO';");
    
    const useSEORegex = /useSEO\(\s*(\{[\s\S]*?\})\s*\);/;
    const match = content.match(useSEORegex);
    
    if (match) {
      const objText = match[1];
      const matchIndex = match.index;
      content = content.replace(useSEORegex, '');
      
      const returnIndex = content.indexOf('return (', matchIndex);
      if (returnIndex !== -1) {
        // Find the tag right after `return (`
        // We know it looks like `return (\n    <div...` or `return (\n    <>`
        const tagRegex = /return\s*\(\s*<([a-zA-Z0-9_-]*)([^>]*)>/;
        // We search from returnIndex
        const sliced = content.slice(returnIndex);
        const tagMatch = sliced.match(tagRegex);
        if (tagMatch) {
            const fullMatch = tagMatch[0];
            const p1 = tagMatch[1];
            const p2 = tagMatch[2];
            const replacement = `return (\n    <${p1}${p2}>\n      <SEO {...${objText}} />`;
            content = content.slice(0, returnIndex) + sliced.replace(fullMatch, replacement);
        }
      }
      
      fs.writeFileSync(file, content);
      console.log('Updated ' + file);
    }
  }
});
