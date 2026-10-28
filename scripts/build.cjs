#!/usr/bin/env node
'use strict';

// Render editable Markdown into HTML. GitHub Pages serves the committed result;
// visitors do not need JavaScript, external fonts, or a build.
const fs = require('node:fs');
const path = require('node:path');
const { marked } = require('../static/js/marked.min.js');
const yaml = require('../static/js/js-yaml.min.js');
const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const config = yaml.load(read('contents/config.yml'));
const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));
marked.use({ mangle: false, headerIds: false });
const content = {};
for (const section of ['home', 'publications', 'research', 'education', 'experience', 'awards']) {
  content[section.toUpperCase()] = marked.parse(read(`contents/${section}.md`));
}
const fields = {
  PAGE_TITLE: 'title', META_DESCRIPTION: 'description', NAME: 'name',
  NAME_ZH: 'name_chinese', SITE_URL: 'site_url', EMAIL: 'email',
  GITHUB_URL: 'github_url', CV_URL: 'cv_url', CV_VERSION: 'cv_version',
  UPDATED: 'updated', YEAR: 'year'
};
for (const [token, key] of Object.entries(fields)) {
  if (config[key] === undefined) throw new Error(`Missing config key: ${key}`);
  content[token] = escape(config[key]);
}
if (!fs.existsSync(path.join(root, config.cv_url))) throw new Error(`Missing CV: ${config.cv_url}`);
content.PERSON_JSON = JSON.stringify({
  '@context': 'https://schema.org', '@type': 'Person', name: config.name,
  alternateName: config.name_chinese, url: config.site_url,
  image: `${config.site_url}static/assets/img/jingxuan-li-northwestern.jpg`,
  jobTitle: 'Second-year PhD Student in Statistics and Data Science',
  affiliation: { '@type': 'CollegeOrUniversity', name: 'Northwestern University' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of California, Los Angeles' },
  sameAs: [config.github_url]
}).replace(/</g, '\\u003c');
const html = read('layout.html').replace(/\{\{([A-Z_]+)\}\}/g, (match, token) => {
  if (!(token in content)) throw new Error(`Unknown template token: ${token}`);
  return content[token];
});
if (process.argv.includes('--check')) {
  if (!fs.existsSync(path.join(root, 'index.html')) || read('index.html') !== html) {
    console.error('index.html is out of date. Run: node scripts/build.cjs');
    process.exitCode = 1;
  } else console.log('index.html matches the source content.');
} else {
  fs.writeFileSync(path.join(root, 'index.html'), html);
  console.log('Built index.html from contents/ and layout.html.');
}
