/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Table (no header)'];
  const rows = [headerRow];

  // Get all direct children with class 'divider'
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));
  // Defensive: handle if element itself is a divider and there are no children
  if (dividers.length === 0 && element.classList.contains('divider')) {
    dividers.push(element);
  }

  // For each Q&A pair (each divider block)
  dividers.forEach(divider => {
    // Each divider has a grid with heading and text
    const grid = divider.querySelector('.w-layout-grid');
    if (grid) {
      // Q: heading, A: answer
      const question = grid.querySelector('.h4-heading');
      const answer = grid.querySelector('.rich-text');
      // Only add row if at least one is found
      if (question && answer) {
        // Reference existing elements, not clones
        rows.push([[question, answer]]);
      }
    }
  });

  // Only create table if at least one data row was added
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
