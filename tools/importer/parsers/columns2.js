/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing all major columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // We expect three logical columns as per the visual grouping in the example
  // 1. Left (main feature block), 2. Middle (2 stacked cards), 3. Right (vertical link list)

  const gridChildren = Array.from(grid.children);

  // Column 1: the first grid child, a link block
  let col1 = '';
  if (gridChildren[0]) {
    // Reference the link block directly (extract the <a> as is)
    col1 = gridChildren[0];
  }

  // Column 2: the second grid child, a wrapper (div) containing two stacked card links
  let col2 = '';
  if (gridChildren[1]) {
    // Reference each card link inside this wrapper
    const links = Array.from(gridChildren[1].querySelectorAll(':scope > a'));
    col2 = links.length === 1 ? links[0] : links;
  }

  // Column 3: the third grid child, a wrapper for multiple vertical links (with dividers)
  let col3 = '';
  if (gridChildren[2]) {
    // Reference all children as an array (keeps link blocks and dividers in order)
    const col3nodes = Array.from(gridChildren[2].childNodes).filter(node => {
      // Keep <a> and divider elements, and any meaningful text nodes
      return (
        (node.nodeType === Node.ELEMENT_NODE && (node.tagName === 'A' || node.classList.contains('divider')))
        || (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0)
      );
    });
    col3 = col3nodes.length === 1 ? col3nodes[0] : col3nodes;
  }

  // Table header row: exactly one cell, as per the example
  const headerRow = ['Columns (columns2)'];
  // Content row: 3 cells for 3 columns
  const contentRow = [col1, col2, col3];
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Fix the header row to have only a single <th> that spans all 3 columns
  const ths = table.querySelectorAll('th');
  if (ths.length === 1) {
    ths[0].setAttribute('colspan', '3');
  }

  element.replaceWith(table);
}
