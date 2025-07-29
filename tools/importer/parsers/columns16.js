/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  
  // Get all column wrappers (immediate children of the grid)
  const columns = Array.from(grid.children);

  // For each column, gather ALL meaningful content (not just images)
  const cells = columns.map(col => {
    // We'll just collect ALL direct children content regardless of wrapper class.
    // If only one child and it's a wrapper (e.g. .utility-aspect-2x3), flatten it
    let contents = [];
    if (col.children.length === 1 && col.children[0].children.length > 0) {
      // Flatten one level deeper
      contents = Array.from(col.children[0].children);
    } else if (col.children.length > 0) {
      contents = Array.from(col.children);
    }
    
    // If the column is empty (edge case), use an empty string so the cell exists
    if (contents.length === 0) return '';
    // If only one item, return it directly, else return array
    return contents.length === 1 ? contents[0] : contents;
  });

  // Compose the block table
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns16)'],
    cells
  ], document);
  
  // Replace the original element
  element.replaceWith(table);
}
