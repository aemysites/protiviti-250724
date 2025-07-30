/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid container (columns block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Collect possible columns: Info, Contact List, Image
  let textBlock = null;
  let contactList = null;
  let img = null;

  // The children are in order: info div, ul, img, each is a column
  // Get all immediate children
  const gridChildren = Array.from(grid.children);
  gridChildren.forEach(child => {
    if (child.tagName === 'DIV' && !textBlock) {
      textBlock = child;
    } else if (child.tagName === 'UL' && !contactList) {
      contactList = child;
    } else if (child.tagName === 'IMG' && !img) {
      img = child;
    }
  });

  // Column 1: info and contact list (if available)
  const leftColContent = [];
  if (textBlock) leftColContent.push(textBlock);
  if (contactList) leftColContent.push(contactList);

  // Column 2: image (if available)
  const rightColContent = [];
  if (img) rightColContent.push(img);

  // Build table rows for the block
  const headerRow = ['Columns (columns18)'];
  const contentRow = [leftColContent, rightColContent];

  // Create the columns table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
