/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that defines the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get immediate children of the grid
  const gridChildren = Array.from(grid.children).filter((el) => el.nodeType === 1);
  // We expect two columns: left (content), right (image)
  // The left column is the one with multiple child nodes, the right is the image

  // Find the image element column
  let leftCol = null;
  let rightCol = null;
  if (gridChildren.length === 2) {
    // Heuristic: left col has more text, right col is img
    if (gridChildren[0].querySelector('img')) {
      rightCol = gridChildren[0];
      leftCol = gridChildren[1];
    } else if (gridChildren[1].querySelector('img')) {
      leftCol = gridChildren[0];
      rightCol = gridChildren[1];
    } else {
      leftCol = gridChildren[0];
      rightCol = gridChildren[1];
    }
  } else {
    // fallback: just use array order
    leftCol = gridChildren[0];
    rightCol = gridChildren[1];
  }
  // Defensive: if only one col, put other as null
  if (!leftCol) leftCol = null;
  if (!rightCol) rightCol = null;

  // Construct columns for the table
  const rowCells = [];
  if (leftCol) rowCells.push(leftCol);
  if (rightCol) rowCells.push(rightCol);

  const headerRow = ['Columns (columns27)'];
  const tableArr = [headerRow, rowCells];
  const block = WebImporter.DOMUtils.createTable(tableArr, document);
  element.replaceWith(block);
}
