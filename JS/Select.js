class Select {
  toggleTextClass = 'Select__text--active';
  toggleSelectClass = 'Select__select--active';
  toggleIconClass = 'Select__icon--active';

  constructor(item) {
    this.item = item;
    this.select = this.item.querySelector('[data-id="dz-select"]');
    this.icon = this.item.querySelector('[data-id="dz-icon"]');
    this.input = this.item.querySelector('[data-id="dz-input"]');
    this.inputText = this.item.querySelector('[data-id="dz-inputText"]');
    this.values = this.item.querySelectorAll('[data-id="dz-value"]');

    this.handle();
  }

  handle() {
    this.check();
    this.selectEvent();
    this.item.onclick = this.click.bind(this);
  }

  click() {
    this.select.classList.toggle(this.toggleSelectClass);
    this.icon.classList.toggle(this.toggleIconClass);
  }

  check() {
    let key, checked = false;
    for (const item of this.values) {
      if (item.dataset.checked) {
        checked = true;
        key = item;
      }
    }

    checked ? this.change(key) : this.change(this.values[0]);
  }

  selectEvent() {
    for (const item of this.values) {
      item.onclick = this.change.bind(this, item);
    }
  }

  change(parent) {
    let value = parent.dataset.value;
    let text = parent.innerText;
    
    this.input.value = value;
    this.inputText.innerText = text;

    this.removeAllActives();
    parent.classList.add(this.toggleTextClass);
  }

  removeAllActives() {
    for (const item of this.values) {
      item.classList.remove(this.toggleTextClass);
    }
  }
}