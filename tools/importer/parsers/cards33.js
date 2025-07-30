/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards33)'];

  // Get all direct child <a> elements (each is a card)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));
  const rows = cardLinks.map((cardLink) => {
    // The card structure is: <a> <div grid> <img> <div>...</div> </div> </a>
    // Get the first grid div inside <a>
    const gridDiv = cardLink.querySelector(':scope > div');
    let img = null;
    let textContent = null;
    if (gridDiv) {
      // Get img (first img in grid)
      img = gridDiv.querySelector('img');
      // Get main text container (first div after img)
      // (gridDiv's children: img, then text div)
      const gridChildren = Array.from(gridDiv.children);
      // Find the first div that's not the img
      textContent = gridChildren.find((child) => child !== img && child.tagName === 'DIV');
      // fallback: if not found, try the next sibling of img
      if (!textContent && img && img.nextElementSibling && img.nextElementSibling.tagName === 'DIV') {
        textContent = img.nextElementSibling;
      }
    }
    // fallback: if gridDiv missing, try to get img and textContent directly
    if (!img) {
      img = cardLink.querySelector('img');
    }
    if (!textContent) {
      // fallback: first div after the img in <a>
      const allDivs = Array.from(cardLink.querySelectorAll('div'));
      textContent = allDivs.find(div => div !== gridDiv && div !== img && div.textContent.trim().length > 0);
    }
    // Defensive: if can't find, use empty placeholders
    return [img || document.createElement('span'), textContent || document.createElement('span')];
  });

  const tableCells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
