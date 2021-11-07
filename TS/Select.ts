class Select {
  public readonly toggleSelectClass: string = 'Select--active';
  public readonly toggleTextClass: string = 'Select__text--active';
  public readonly name: string;

  protected _item: HTMLDivElement | null;
  protected _input: HTMLInputElement | null;
  protected _inputText: HTMLSpanElement | null;
  protected _values: NodeListOf<HTMLSpanElement>;

  constructor(item: HTMLDivElement) {
    this._item = item;
    this._input = this._item.querySelector('[data-id="dz-input"]');
    this._inputText = this._item.querySelector('[data-id="dz-inputText"]');
    this._values = this._item.querySelectorAll('[data-value]');
    this.name = `${this._item.dataset.name || '(undefined name)'} select component`;

    this._handle();
  }

  protected _handle(): void {
    try {
      this._checkForUser()

      this._check();
      this._selectEvent();

      this._setEventsForSelect();
    } catch (err: any | Error) {
      console.warn(err.message);
    }
  }

  protected _check(): void {
    let key: HTMLSpanElement, checked: boolean = false;

    for (let item of this._values) {
      if (item.dataset.checked != undefined) {
        checked = true;
        key = item;
      }
    }

    checked ? this._change(key!) : this._change(this._values[0]);
  }

  protected _selectEvent(): void {
    for (let item of this._values) {
      item.onclick = this._change.bind(this, item);
    }
  }

  protected _setEventsForSelect(): void {
    this._item!.onclick = this._clickHandler.bind(this);
    this._item!.onblur = this._removeActive.bind(this);
  }

  protected _clickHandler(): void {
    if (this._item!.classList.contains(this.toggleSelectClass))
      this._removeActive();
    else
      this._addActive();
  }

  protected _change(parent: HTMLSpanElement): void {
    this._input!.value = parent.dataset.value!;
    this._inputText!.innerText = parent.innerText;

    this._removeAllActives();
    parent.classList.add(this.toggleTextClass);
  }

  protected _removeAllActives(): void {
    for (let item of this._values) {
      item.classList.remove(this.toggleTextClass);
    }
  }

  protected _addActive(): void {
    this._item!.classList.add(this.toggleSelectClass);
  }

  protected _removeActive(): void {
    this._item!.classList.remove(this.toggleSelectClass);
  }

  protected _checkForUser(): void {
    if (!this._item)
      throw new Error('Component is not found!');

    if (!this._input)
      throw new Error(`Input in ${this.name} is not found!`);

    if (!this._inputText)
      throw new Error(`Input text in ${this.name} is not found!`);

    if (!this._values.length)
      throw new Error(`Values int ${this.name} are not found!`);

    for (let item of this._values) {
      if (!item.dataset.value)
        throw new Error(`Value attribute in value of ul list in ${this.name} is not defined!`);
    }
    console.info(`${this.name} is ready`);
  }
}