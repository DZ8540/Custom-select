# DZ Custom-select

In order to use, it is enough to find the element you need, and then pass it to the class.

## Instruction:
1. Don't remove all data attributes.
2. Your value could has a data-checked attribute.
3. Your values should be in the data-value attribute.
4. Your values could has a data-disabled attribute.
5. Component maintains data-name attribute, to you can set component name.

## Example

### HTML
```html
<div class="Select" tabindex="-1" id="firstSelect" data-name="First select">
  <input type="hidden" data-id="dz-input">

  <div class="Select__inputBlock">
    <span class="Select__input" data-id="dz-inputText"></span>
    <span class="Select__icon">&#9660;</span>
  </div>

  <ul class="Select__list">
    <li class="Select__item">
      <span class="Select__text" data-value="value1">Text 1</span>
    </li>

    <li class="Select__item">
      <span class="Select__text" data-value="value2" data-disabled>Text 2</span>
    </li>
    
    <li class="Select__item">
      <span class="Select__text" data-value="value3" data-checked>Text 3</span>
    </li>
    
    <li class="Select__item">
      <span class="Select__text" data-value="value4">Text 4</span>
    </li>
  </ul>
</div>
```

### JS
```js
let el = document.querySelector(el);
new Select(el);
```

## End
That's all! Enjoy this (☞ﾟヮﾟ)☞ ☜(ﾟヮﾟ☜)
