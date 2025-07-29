/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as required
  const headerRow = ['Columns (columns11)'];

  // Grab the main .container, which holds the two main grid layouts
  const mainContainer = element.querySelector('.container');
  if (!mainContainer) return;

  // Find the first grid: left is heading, right is intro/author/button
  const mainGrid = mainContainer.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  let firstLeft = null;
  let firstRight = null;
  if (mainGrid) {
    const cols = mainGrid.querySelectorAll(':scope > div');
    // Defensive: only proceed if there are at least two columns
    if (cols.length >= 2) {
      // Left: eyebrow and h1 (headline)
      firstLeft = cols[0];
      // Right: everything else (desc, author info, read more)
      firstRight = cols[1];
    }
  }

  // Find the second grid: images
  const imageGrid = mainContainer.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let img1 = null, img2 = null;
  if (imageGrid) {
    const imageCells = imageGrid.querySelectorAll('.utility-aspect-1x1');
    if (imageCells.length >= 2) {
      img1 = imageCells[0].querySelector('img');
      img2 = imageCells[1].querySelector('img');
    }
  }

  // If any main content is missing, avoid breaking output
  if (!firstLeft || !firstRight || !img1 || !img2) return;

  // The structure: header row, then a row for the two main columns, then a row for the two images
  const rows = [
    headerRow,
    [firstLeft, firstRight],
    [img1, img2],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
