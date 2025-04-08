export async function createStaticFile(Component,filePath) {
  const pageName = getPageName(filePath);
  const outdir = join(".vercel", "output", "static");
  await fs.ensureDir(outdir);
 
  await generateClientBundle({ filePath, outdir, pageName });
  
  return fs.writeFileSync(
    path.join(outdir, `${pageName}.html`),
    `<!DOCTYPE html>
      ...
      <body>
        <div id="root">${ReactDOMServer.renderToString(React.createElement(Component) )}</div>
        <script src="${pageName}.bundle.js" defer></script>
      </body>`
  );
}
