interface ISelect {
  readonly toggleTextClass: string,
  readonly toggleSelectClass: string,
  readonly toggleIconClass: string,
  item: HTMLDivElement | null,
  select: HTMLUListElement | null,
  icon: HTMLSpanElement | null,
  input: HTMLInputElement | null,
  inputText: HTMLSpanElement | null,
  values: NodeListOf<HTMLSpanElement>,
  readonly name: string,
  handle(): void,
  check(): void,
  change(parent: HTMLSpanElement): void,
  removeAllActives(): void,
  selectEvent(): void,
  click(): void,
  checkForUser(): boolean
}

class Select implements ISelect {
  toggleTextClass: string = 'Select__text--active';
  toggleSelectClass: string = 'Select__select--active';
  toggleIconClass: string = 'Select__icon--active';
  item: HTMLDivElement | null;
  select: HTMLUListElement | null;
  icon: HTMLSpanElement | null;
  input: HTMLInputElement | null;
  inputText: HTMLSpanElement | null;
  values: NodeListOf<HTMLSpanElement>;
  readonly name: string;

  constructor(item: HTMLDivElement) {
    this.item = item;
    this.select = this.item.querySelector('[data-id="dz-select"]');
    this.icon = this.item.querySelector('[data-id="dz-icon"]');
    this.input = this.item.querySelector('[data-id="dz-input"]');
    this.inputText = this.item.querySelector('[data-id="dz-inputText"]');
    this.values = this.item.querySelectorAll('[data-id="dz-value"]');
    this.name = `${this.item.dataset.name || '(undefined name)'} select component`;

    this.handle();
  }

  handle(): void {
    if (this.checkForUser()) {
      this.check();
      this.selectEvent();

      this.item!.onclick = this.click.bind(this);
    }
  }

  click(): void {
    this.select!.classList.toggle(this.toggleSelectClass);
    this.icon!.classList.toggle(this.toggleIconClass);
  }

  check(): void {
    let key: HTMLSpanElement, checked: boolean = false;
    for (const item of this.values) {
      if (item.dataset.checked == 'true') {
        checked = true;
        key = item;
      }
    }

    checked ? this.change(key!) : this.change(this.values[0]);
  }

  selectEvent(): void {
    for (const item of this.values) {
      item.onclick = this.change.bind(this, item);
    }
  }

  change(parent: HTMLSpanElement): void {
    this.input!.value = parent.dataset.value!;
    this.inputText!.innerText = parent.innerText;

    this.removeAllActives();
    parent.classList.add(this.toggleTextClass);
  }

  removeAllActives(): void {
    for (const item of this.values) {
      item.classList.remove(this.toggleTextClass);
    }
  }

  checkForUser(): boolean {
    if (!this.item) {
      console.warn('Component is not found!');
      return false;
    }

    if (!this.select) {
      console.warn(`Ul list in ${this.name} is not found!`);
      return false;
    }

    if (!this.icon) {
      console.warn(`Icon in ${this.name} is not found!`);
      return false;
    }

    if (!this.input) {
      console.warn(`Input in ${this.name} is not found!`);
      return false;
    }

    if (!this.inputText) {
      console.warn(`Input text in ${this.name} is not found!`);
      return false;
    }

    if (!this.values.length) {
      console.warn(`Values int ${this.name} are not found!`);
      return false;
    }

    let valueFlag: boolean = false;
    for (const item of this.values) {
      if (!item.dataset.value)
        valueFlag = true;
    }

    if (valueFlag) {
      console.warn(`Value attribute in value of ul list in ${this.name} is not defined!`);
      return false;
    }

    console.info(`${this.name} is ready`);
    return true;
  }
}