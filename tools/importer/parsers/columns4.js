/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children that represent columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, we want to collect ALL its direct children (images, text, links, etc.)
  const cells = columns.map(col => {
    // Gather all children nodes (elements and text)
    const content = Array.from(col.childNodes).filter(node => {
      // Keep elements and non-empty text
      return node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim());
    });
    // If only one element (for example, just an image), return it directly
    if (content.length === 1) {
      return content[0];
    }
    // If multiple pieces of content, return as an array (to be appended together in cell)
    return content;
  });

  // Compose the table: first row is header (single cell), second is array of columns
  const tableRows = [
    ['Columns (columns4)'],
    cells
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}