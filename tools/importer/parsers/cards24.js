/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as shown in the example
  const headerRow = ['Cards (cards24)'];
  const cells = [headerRow];

  // For each card: two columns, first is the image, second is title & text
  // Each card is an <a> under the root element
  const cards = element.querySelectorAll(':scope > a');

  cards.forEach((card) => {
    // --- FIRST CELL: The image ---
    // Get the card image (inside .utility-aspect-2x3)
    let imageEl = null;
    const aspectContainer = card.querySelector('.utility-aspect-2x3');
    if (aspectContainer) {
      const img = aspectContainer.querySelector('img');
      if (img) imageEl = img;
    }

    // --- SECOND CELL: The text info ---
    // Combine tag, date, and heading into one cell
    const textCell = document.createElement('div');

    // Tag and date row
    const tagRow = card.querySelector('.flex-horizontal');
    if (tagRow) {
      // Reference the actual tagRow element (preserves style & structure)
      textCell.appendChild(tagRow);
    }
    // Heading/title
    const heading = card.querySelector('h3, .h4-heading');
    if (heading) {
      textCell.appendChild(heading);
    }

    cells.push([
      imageEl,
      textCell
    ]);
  });

  // Build the block and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
