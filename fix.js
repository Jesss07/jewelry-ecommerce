const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        let filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(filePath));
        } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
            results.push(filePath);
        }
    });
    return results;
}

const files = walk('./src');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    if (content.includes("'http://localhost:5000/api")) {
        content = content.replace(/'http:\/\/localhost:5000\/api([^']*)'/g, '`${process.env.NEXT_PUBLIC_API_URL}$1`');
        changed = true;
    }

    if (content.includes("`http://localhost:5000/api")) {
        content = content.replace(/`http:\/\/localhost:5000\/api/g, '`${process.env.NEXT_PUBLIC_API_URL}');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated: ' + file);
    }
});
console.log('Done');
