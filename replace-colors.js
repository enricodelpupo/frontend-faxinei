const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('C:\\Users\\Usuario\\frontend-faxinei\\src');

const replacements = [
    { from: /bg-\[\#0b1121\]/g, to: 'bg-brand-dark' },
    { from: /\bblue-/g, to: 'primary-' },
    { from: /\bindigo-/g, to: 'primary-' },
    // Only replace emerald and teal if they are used as generic accents.
    // If they are success indicators (like "Identidade verificada"), maybe keep them?
    // The user said: "faca as cores para serem iguais durante todo o projeto... azul escuro, azul mais claro"
    // I will replace emerald, teal, and amber as well.
    { from: /\bemerald-/g, to: 'primary-' },
    { from: /\bteal-/g, to: 'primary-' },
    { from: /\bamber-/g, to: 'primary-' }
];

let changedFiles = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content;
    
    replacements.forEach(r => {
        newContent = newContent.replace(r.from, r.to);
    });

    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        changedFiles++;
        console.log(`Updated ${file}`);
    }
});

console.log(`Finished updating ${changedFiles} files.`);
