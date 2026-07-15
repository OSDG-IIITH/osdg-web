import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Ensure target directories exist
const targetStaticDir = path.resolve('static/fedora-install-guide');
const targetAssetsDir = path.join(targetStaticDir, 'assets');
const targetRoutesDir = path.resolve('src/routes/fedora-install-guide');

fs.mkdirSync(targetAssetsDir, { recursive: true });
fs.mkdirSync(targetRoutesDir, { recursive: true });

const localTypstFile = path.join(targetStaticDir, 'fedora.typ');

// Verify local typst file exists
if (!fs.existsSync(localTypstFile)) {
	console.error(`Error: local Typst file not found at ${localTypstFile}`);
	console.error('Please place the fedora.typ guide file inside static/fedora-install-guide/');
	process.exit(1);
}

console.log(`Using local source file: ${localTypstFile}`);

// Compile the local Typst file to HTML using pandoc
const tempHtmlPath = path.join(targetRoutesDir, 'temp_content.html');
try {
	console.log(`Running pandoc compilation on: ${localTypstFile}`);
	execSync(`pandoc -f typst -t html "${localTypstFile}" -o "${tempHtmlPath}"`, { stdio: 'inherit' });
} catch (err) {
	console.error('Failed to compile typst file with pandoc:', err);
	process.exit(1);
}

// 5. Read temp html, adjust asset paths, and write to content.html
let htmlContent = fs.readFileSync(tempHtmlPath, 'utf8');

// Clean up temp file
fs.unlinkSync(tempHtmlPath);

// Replace relative asset paths with absolute static paths
// e.g. src="assets/image.png" -> src="/fedora-install-guide/assets/image.png"
htmlContent = htmlContent.replace(/src=["']assets\/(.*?)["']/g, 'src="/fedora-install-guide/assets/$1"');

// Generate Heading Numbers and Table of Contents
let h2Counter = 0;
let h3Counter = 0;
let h4Counter = 0;
const headings = [];

htmlContent = htmlContent.replace(/<(h[2-4])\b([^>]*?)>([\s\S]*?)<\/h[2-4]>/gi, (match, tag, attrs, content) => {
	const level = parseInt(tag.substring(1));
	const cleanText = content.replace(/<[^>]+>/g, '').trim();
	
	let prefix = '';
	if (cleanText !== 'Table of Contents') {
		if (level === 2) {
			h2Counter++;
			h3Counter = 0;
			h4Counter = 0;
			prefix = `${h2Counter}. `;
		} else if (level === 3 && h2Counter > 0) {
			h3Counter++;
			h4Counter = 0;
			prefix = `${h2Counter}.${h3Counter} `;
		} else if (level === 4 && h3Counter > 0) {
			h4Counter++;
			prefix = `${h2Counter}.${h3Counter}.${h4Counter} `;
		}
	}
	
	let idMatch = attrs.match(/id=["'](.*?)["']/);
	let id = '';
	if (idMatch) {
		id = idMatch[1];
	} else {
		id = cleanText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
		let baseId = id;
		let num = 1;
		while (headings.some(h => h.id === id)) {
			id = `${baseId}-${num}`;
			num++;
		}
	}
	
	let newAttrs = attrs;
	if (!idMatch) {
		newAttrs = ` id="${id}"` + attrs;
	}
	
	headings.push({
		level,
		id,
		text: cleanText,
		prefix
	});
	
	return `<${tag}${newAttrs}>${prefix}${content}</${tag}>`;
});

// Build TOC HTML
function buildTocHtml(headings) {
	let html = '<nav class="toc-nav"><ul class="toc-level-2">';
	let stack = [2];
	let first = true;

	for (const h of headings) {
		if (h.text === 'Table of Contents') continue;
		
		const level = h.level;
		
		if (level > stack[stack.length - 1]) {
			while (level > stack[stack.length - 1]) {
				const nextLvl = stack[stack.length - 1] + 1;
				html += `\n<ul class="toc-level-${nextLvl}">`;
				stack.push(nextLvl);
			}
			html += `\n<li><a href="#${h.id}">${h.prefix}${h.text}</a>`;
		} else if (level < stack[stack.length - 1]) {
			while (level < stack[stack.length - 1]) {
				html += '</li>\n</ul>';
				stack.pop();
			}
			html += `</li>\n<li><a href="#${h.id}">${h.prefix}${h.text}</a>`;
		} else {
			if (first) {
				html += `<li><a href="#${h.id}">${h.prefix}${h.text}</a>`;
				first = false;
			} else {
				html += `</li>\n<li><a href="#${h.id}">${h.prefix}${h.text}</a>`;
			}
		}
	}
	
	while (stack.length > 1) {
		html += '</li>\n</ul>';
		stack.pop();
	}
	html += '</li>\n</ul></nav>';
	return html;
}

const tocHtml = buildTocHtml(headings);
htmlContent = htmlContent.replace(
	/<h2\b[^>]*?>Table of Contents<\/h2>/gi,
	`<h2>Table of Contents</h2>\n${tocHtml}`
);

const outputHtmlPath = path.join(targetRoutesDir, 'content.html');
fs.writeFileSync(outputHtmlPath, htmlContent, 'utf8');
console.log(`Successfully compiled and wrote content to ${outputHtmlPath}`);
