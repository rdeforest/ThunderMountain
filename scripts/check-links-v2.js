#!/usr/bin/env node
// Fixed version of check-links.js with better path resolution

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.dirname(__dirname);

// Build file map first for efficient lookups
const allFiles = [];
const fileMap = new Map();

function scanDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory() && !entry.name.startsWith('.')) {
            scanDirectory(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
            allFiles.push(fullPath);
            const basename = path.basename(fullPath);
            if (!fileMap.has(basename)) {
                fileMap.set(basename, []);
            }
            fileMap.get(basename).push(fullPath);
        }
    }
}

// Extract links from markdown
function extractLinks(content) {
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const links = [];
    let match;
    
    while ((match = regex.exec(content)) !== null) {
        const url = match[2];
        if (!url.match(/^[a-z]+:\/\//i) && !url.startsWith('#')) {
            links.push({
                text: match[1],
                url: url.split('#')[0],
                line: content.substring(0, match.index).split('\n').length
            });
        }
    }
    return links;
}

// Find best matching file
function findBestMatch(fromFile, targetName) {
    const candidates = fileMap.get(targetName);
    if (!candidates || candidates.length === 0) return null;
    
    const fromDir = path.dirname(fromFile);
    let bestPath = null;
    let bestScore = Infinity;
    
    for (const candidate of candidates) {
        const relative = path.relative(fromDir, candidate);
        // Prefer paths with fewer ../ and shorter overall
        const score = (relative.match(/\.\./g) || []).length * 100 + relative.length;
        
        if (score < bestScore) {
            bestScore = score;
            bestPath = relative;
        }
    }
    
    return bestPath;
}

// Main check
console.log('🔍 Scanning for broken links...\n');
scanDirectory(REPO_ROOT);

const broken = [];
const fixable = [];

for (const file of allFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const links = extractLinks(content);
    
    for (const link of links) {
        const targetPath = path.resolve(path.dirname(file), link.url);
        
        if (!fs.existsSync(targetPath)) {
            const relativeFile = path.relative(REPO_ROOT, file);
            const targetName = path.basename(link.url);
            const suggestion = findBestMatch(file, targetName);
            
            const issue = {
                file: relativeFile,
                line: link.line,
                text: link.text,
                broken: link.url,
                suggestion: suggestion
            };
            
            broken.push(issue);
            if (suggestion) fixable.push(issue);
        }
    }
}

// Report findings
if (broken.length === 0) {
    console.log('✅ No broken links found!');
    process.exit(0);
}

console.log(`Found ${broken.length} broken link(s):\n`);

for (const b of broken) {
    console.log(`📄 ${b.file}:${b.line}`);
    console.log(`   [${b.text}](${b.broken})`);
    if (b.suggestion) {
        console.log(`   ✅ Fix: ${b.suggestion}`);
    } else {
        console.log(`   ❌ No matching file found`);
    }
    console.log();
}

// Offer to fix
if (fixable.length > 0) {
    console.log(`Can auto-fix ${fixable.length} links. Fix them? (y/n)`);
    
    process.stdin.once('data', (input) => {
        if (input.toString().trim().toLowerCase() === 'y') {
            // Group by file
            const byFile = {};
            for (const fix of fixable) {
                if (!byFile[fix.file]) byFile[fix.file] = [];
                byFile[fix.file].push(fix);
            }
            
            // Apply fixes
            for (const [file, fixes] of Object.entries(byFile)) {
                const fullPath = path.join(REPO_ROOT, file);
                let content = fs.readFileSync(fullPath, 'utf8');
                
                for (const fix of fixes) {
                    const escaped = fix.broken.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    const regex = new RegExp(`\\]\\(${escaped}\\)`, 'g');
                    content = content.replace(regex, `](${fix.suggestion})`);
                }
                
                fs.writeFileSync(fullPath, content);
                console.log(`✅ Fixed ${fixes.length} links in ${file}`);
            }
        }
        process.exit(broken.length);
    });
} else {
    process.exit(broken.length);
}