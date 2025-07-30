/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout inside the section (usually has 2 children: left=text, right=image)
  let grid = element.querySelector('.w-layout-grid');
  let columns = [];
  if (grid) {
    // Use all grid children as columns
    columns = Array.from(grid.children);
  } else {
    // Fallback to .container direct children if grid not found
    const container = element.querySelector('.container');
    if (container) {
      columns = Array.from(container.children);
    }
  }
  // As a last fallback, use direct children
  if (!columns.length) {
    columns = Array.from(element.children);
  }
  // Only take first two columns for the table, if there are more
  columns = columns.slice(0,2);
  // For each column, collect all text and element nodes to preserve all content
  const contentRow = columns.map(col => {
    if (!col) return '';
    // If the node has no children, just use itself
    if (!col.childNodes || !col.childNodes.length) return col;
    // Otherwise, include all non-empty nodes (retaining structure)
    return Array.from(col.childNodes).filter(node => {
      // nodeType 1 = element, 3 = text
      if(node.nodeType === 3) {
        return node.textContent && node.textContent.trim() !== '';
      }
      return true;
    });
  });
  // Header row as required
  const headerRow = ['Columns (columns15)'];
  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  // Replace the original element
  element.replaceWith(table);
}
