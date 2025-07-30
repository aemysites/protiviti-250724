/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract a card's image (if present), heading, and description
  function parseCard(cardEl) {
    // Find the first image inside the card (if any)
    const img = cardEl.querySelector('img');

    // Heading: look for the first heading tag inside the card
    let heading = cardEl.querySelector('h1, h2, h3, h4, h5, h6');

    // Description: either .paragraph-sm or the next sibling after heading
    let desc = null;
    if (heading && heading.nextElementSibling && heading.nextElementSibling.classList.contains('paragraph-sm')) {
      desc = heading.nextElementSibling;
    } else {
      desc = cardEl.querySelector('.paragraph-sm');
    }

    // Compose the text cell: heading (if present), then description (if present)
    const textCell = [];
    if (heading) textCell.push(heading);
    if (desc && desc !== heading) textCell.push(desc);

    // Ensure at least one of the cells is present; if neither, return an empty row
    if (!img && textCell.length === 0) return null;

    return [img ? img : '', textCell.length ? textCell : ''];
  }

  // Find all tab panes with grid-layouts inside (each tab is a group of cards)
  const tabPanes = element.querySelectorAll('[role="tabpanel"] .w-layout-grid');

  // Always start with the header row as in example
  const cells = [["Cards (cards23)"]];

  tabPanes.forEach(grid => {
    // Each grid has direct <a> children: each is a card
    const cards = grid.querySelectorAll(':scope > a');
    cards.forEach(card => {
      const row = parseCard(card);
      if (row) cells.push(row);
    });
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
