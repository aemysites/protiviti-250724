/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header: block name exactly as specified
  const headerRow = ['Hero (hero39)'];

  // 2. Background image: handle missing image gracefully
  let bgImg = element.querySelector('img.cover-image') || null;
  const imgRow = [bgImg ? bgImg : ''];

  // 3. Main content: heading(s), paragraph(s), call-to-action(s)
  let contentCellContent = [];

  // Get the content container (where text and cta are)
  // It's the .container within the header's grid
  let grid = element.querySelector('.w-layout-grid.grid-layout');
  let contentCol = null;
  if (grid) {
    // Find all children (no querySelectorAll on the element itself)
    let gridChildren = Array.from(grid.children);
    // Choose the column that is NOT holding the image (the one with h1, text, etc.)
    contentCol = gridChildren.find(div => div.querySelector('h1')) ||
                 gridChildren.find(div => div.querySelector('h2, h3, p, a')) ||
                 null;
  }

  if (contentCol) {
    // There is usually a nested grid or stack
    let possibleGrid = contentCol.querySelector('.w-layout-grid') || contentCol;
    // Heading: h1, h2, h3 (capture all for possible subheading)
    possibleGrid.querySelectorAll('h1, h2, h3').forEach(h => contentCellContent.push(h));

    // Paragraphs and subheading (could be in .flex-vertical)
    let flex = possibleGrid.querySelector('.flex-vertical') || possibleGrid;
    flex.querySelectorAll('p').forEach(p => contentCellContent.push(p));

    // CTA(s): any <a> with button/primary classes
    flex.querySelectorAll('a.button, a.w-button, .button-group a').forEach(a => {
      if (!contentCellContent.includes(a)) contentCellContent.push(a);
    });
  } else {
    // Fallback: search entire element for main content
    element.querySelectorAll('h1, h2, h3, p, a.button, a.w-button').forEach(el => contentCellContent.push(el));
  }

  const contentRow = [contentCellContent.length ? contentCellContent : ''];

  // Compose the table: 1 column, 3 rows
  const cells = [headerRow, imgRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
