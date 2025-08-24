#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const REPO_ROOT = '/mnt/nvme0n1p4/git/github/rdeforest/ThunderMountain';

// Recursively find all markdown files
function findMarkdownFiles(dir, files = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory() && !entry.name.startsWith('.')) {
            findMarkdownFiles(fullPath, files);
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
            files.push(fullPath);
        }
    }
    
    return files;
}

// Extract relative links from markdown content
function extractRelativeLinks(content, filePath) {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const links = [];
    let match;
    
    while ((match = linkRegex.exec(content)) !== null) {
        const linkPath = match[2];
        // Only check relative links (not http://, https://, etc.)
        if (!linkPath.match(/^[a-z]+:\/\//i) && !linkPath.startsWith('#')) {
            // Remove any anchor fragments
            const cleanPath = linkPath.split('#')[0];
            if (cleanPath) {
                links.push({
                    text: match[1],
                    path: cleanPath,
                    line: content.substring(0, match.index).split('\n').length
                });
            }
        }
    }
    
    return links;
}

// Check if a link target exists
function checkLink(sourceFile, link) {
    const sourceDir = path.dirname(sourceFile);
    const targetPath = path.resolve(sourceDir, link.path);
    
    if (!fs.existsSync(targetPath)) {
        // Calculate what the correct path should be
        const relativePath = path.relative(REPO_ROOT, targetPath);
        const sourceDirRelative = path.relative(REPO_ROOT, sourceDir);
        
        return {
            source: path.relative(REPO_ROOT, sourceFile),
            line: link.line,
            text: link.text,
            brokenPath: link.path,
            targetPath: relativePath,
            suggestion: calculateCorrectPath(sourceFile, targetPath)
        };
    }
    
    return null;
}

// Try to find the correct relative path
function calculateCorrectPath(sourceFile, intendedTarget) {
    const sourceDir = path.dirname(sourceFile);
    const targetRelativeToRepo = path.relative(REPO_ROOT, intendedTarget);
    
    // Check if the file exists elsewhere in the repo
    const possiblePath = path.join(REPO_ROOT, targetRelativeToRepo);
    if (fs.existsSync(possiblePath)) {
        return path.relative(sourceDir, possiblePath);
    }
    
    // Try without the first directory level (common mistake)
    const parts = targetRelativeToRepo.split(path.sep);
    if (parts.length > 1) {
        const alternativePath = path.join(REPO_ROOT, ...parts.slice(1));
        if (fs.existsSync(alternativePath)) {
            return path.relative(sourceDir, alternativePath);
        }
    }
    
    return null;
}

// Main function
function main() {
    console.log('Checking for broken links in Thunder Mountain repository...\n');
    
    const mdFiles = findMarkdownFiles(REPO_ROOT);
    const brokenLinks = [];
    
    for (const file of mdFiles) {
        const content = fs.readFileSync(file, 'utf8');
        const links = extractRelativeLinks(content, file);
        
        for (const link of links) {
            const result = checkLink(file, link);
            if (result) {
                brokenLinks.push(result);
            }
        }
    }
    
    if (brokenLinks.length === 0) {
        console.log('✅ No broken links found!');
    } else {
        console.log(`❌ Found ${brokenLinks.length} broken link(s):\n`);
        
        for (const broken of brokenLinks) {
            console.log(`File: ${broken.source}`);
            console.log(`Line ${broken.line}: [${broken.text}]`);
            console.log(`  Broken: ${broken.brokenPath}`);
            if (broken.suggestion) {
                console.log(`  ✅ Suggested fix: ${broken.suggestion}`);
            } else {
                console.log(`  ⚠️  Target doesn't exist: ${broken.targetPath}`);
            }
            console.log();
        }
        
        // Ask if user wants to auto-fix
        if (brokenLinks.some(b => b.suggestion)) {
            console.log('\nWould you like to automatically fix the links with suggestions? (y/n)');
            
            process.stdin.once('data', (data) => {
                if (data.toString().trim().toLowerCase() === 'y') {
                    autoFix(brokenLinks.filter(b => b.suggestion));
                }
                process.exit(brokenLinks.length);
            });
            return;
        }
    }
    
    process.exit(brokenLinks.length);
}

// Auto-fix broken links
function autoFix(brokenLinks) {
    const fileUpdates = {};
    
    // Group by source file
    for (const broken of brokenLinks) {
        if (!fileUpdates[broken.source]) {
            fileUpdates[broken.source] = [];
        }
        fileUpdates[broken.source].push({
            from: broken.brokenPath,
            to: broken.suggestion
        });
    }
    
    // Update each file
    for (const [file, updates] of Object.entries(fileUpdates)) {
        const fullPath = path.join(REPO_ROOT, file);
        let content = fs.readFileSync(fullPath, 'utf8');
        
        for (const update of updates) {
            // Replace the broken path with the suggestion
            const regex = new RegExp(`\\]\\(${update.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g');
            content = content.replace(regex, `](${update.to})`);
        }
        
        fs.writeFileSync(fullPath, content);
        console.log(`✅ Fixed ${updates.length} link(s) in ${file}`);
    }
}

// Run the script
main();