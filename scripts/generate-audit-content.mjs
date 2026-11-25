import ts from 'typescript';
import fs from 'node:fs';
const pages = { home: 'Home', about: 'About', membership: 'Membership', events: 'Events', resources: 'Resources', partners: 'Partners', services: 'Services' };
const patches = [];
for (const [page, file] of Object.entries(pages)) {
 const text = fs.readFileSync(`src/pages/${file}.tsx`, 'utf8');
 const source = ts.createSourceFile('x.tsx', text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
 const constants = {};
 for (const statement of source.statements) if (ts.isVariableStatement(statement)) for (const declaration of statement.declarationList.declarations) {
  if (declaration.name.getText(source).endsWith('_DEFAULTS')) {
   const expr = declaration.initializer.getText(source);
   constants[declaration.name.getText(source)] = new Function(`return (${expr})`)();
  }
 }
 for (const match of text.matchAll(/usePageContent\('([^']+)', '([^']+)', ([A-Z_]+_DEFAULTS)/g)) {
  if (constants[match[3]]) patches.push({page, section:match[2], content:constants[match[3]]});
 }
}
for (const file of ['src/components/Layout.tsx', 'src/pages/Privacy.tsx']) {
 const text = fs.readFileSync(file, 'utf8');
 const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
 function visit(node) {
  if (ts.isCallExpression(node) && node.expression.getText(source) === 'usePageContent' && node.arguments[0]?.text === 'site') {
   patches.push({page: 'site', section: node.arguments[1].text, content: new Function(`return (${node.arguments[2].getText(source)})`)()});
  }
  ts.forEachChild(node, visit);
 }
 visit(source);
}
for (const patch of patches) {
 patch.content._hidden = 'false';
 for (const key of Object.keys(patch.content)) { if (!key.startsWith('_')) patch.content[`_hide_${key}`] = 'false'; }
 if (patch.page === 'about' && ['board', 'advisory', 'reports'].includes(patch.section)) patch.content._hidden = 'true';
}
fs.writeFileSync('src/lib/auditContent.json', JSON.stringify(patches,null,2));
