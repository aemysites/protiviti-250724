/* global WebImporter */
export default function parse(element, { document }) {
  // Safety: ensure we are dealing with the expected structure
  // Find the .grid-layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = grid.querySelectorAll(':scope > div');
  if (gridChildren.length < 2) return;

  // First child: background image div
  const imageContainer = gridChildren[0];
  let backgroundImg = null;
  // Find the first <img> inside imageContainer
  backgroundImg = imageContainer.querySelector('img');

  // Second child: content div
  const contentContainer = gridChildren[1];
  // Find the main content wrapper (typical for hero: heading and cta)
  // Use the first element with a heading (e.g., h1) as our contentBlock
  let contentBlock = null;
  const possibleContent = contentContainer.querySelector('.utility-margin-bottom-6rem');
  if (possibleContent && (possibleContent.querySelector('h1') || possibleContent.querySelector('h2') || possibleContent.querySelector('h3'))) {
    contentBlock = possibleContent;
  } else if (contentContainer.querySelector('h1, h2, h3, h4, h5, h6, p, a, button')) {
    // fallback: wrap all children into a div
    const div = document.createElement('div');
    Array.from(contentContainer.childNodes).forEach((node) => div.appendChild(node));
    contentBlock = div;
  } else {
    // fallback: empty
    contentBlock = document.createElement('div');
  }

  // Construct the table cells array as per the spec/example
  const cells = [
    ['Hero (hero28)'], // exact header
    [backgroundImg ? backgroundImg : ''],
    [contentBlock]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
