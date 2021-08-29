let firstSelect: HTMLDivElement | null = document.querySelector('#firstSelect');
if (firstSelect)
  new Select(firstSelect);
else
  console.warn('Select is not found!');

let secondSelect: HTMLDivElement | null = document.querySelector('#secondSelect');
if (secondSelect)
  new Select(secondSelect);
else
  console.warn('Select is not found!');