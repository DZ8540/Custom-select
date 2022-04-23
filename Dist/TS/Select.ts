class SelectHeader {
  public readonly name: string;
  public readonly toggleSelectClass: string = 'Select--active';
  public readonly activeTextClass: string = 'Select__text--active';
  public readonly disableTextClass: string = 'Select__text--disabled';

  protected _item: HTMLDivElement | null;
  protected _text: HTMLSpanElement | null;

  constructor(item: HTMLDivElement) {
    this._item = item;
    this._text = this._item!.querySelector('[data-id="dz-inputText"]');
    this.name = `${this._item!.dataset.name || '(undefined name)'} select component`;

    this._headerHandle();
  }

  protected _headerSetText({ innerHTML }: HTMLSpanElement): void {
    this._text!.innerHTML = innerHTML;
  }

  private _headerHandle(): void {
    try {
      this._headerCheckForUser();

      this._headerSetEvents();
    } catch (err: any | Error) {
      console.warn(err.message);
    }
  }

  private _headerSetEvents(): void {
    this._item!.onclick = this._headerClickHandler.bind(this);
    this._item!.onblur = this._headerRemoveActive.bind(this);
  }

  private _headerClickHandler(): void {
    if (this._item!.classList.contains(this.toggleSelectClass))
      this._headerRemoveActive();
    else
      this._headerAddActive();
  }

  private _headerAddActive(): void {
    this._item!.classList.add(this.toggleSelectClass);
  }

  private _headerRemoveActive(): void {
    this._item!.classList.remove(this.toggleSelectClass);
  }

  private _headerCheckForUser(): void {
    if (!this._item)
      throw new Error('Component is not found!');

    if (!this._text)
      throw new Error(`Input text in ${this.name} is not found!`);
  }
}

export class Select extends SelectHeader {
  protected _input: HTMLInputElement | null;
  protected _values: NodeListOf<HTMLSpanElement>;

  constructor(item: HTMLDivElement) {
    super(item);

    this._input = this._item!.querySelector('[data-id="dz-input"]');
    this._values = this._item!.querySelectorAll('[data-value]');

    this._handle();
  }

  private _handle(): void {
    try {
      this._checkForUser();

      this._findChecked();
      this._findDisabled();

      this._setClickHandler();
    } catch (err: any | Error) {
      console.warn(err.message);
    }
  }

  protected _findChecked(): void {
    for (let item of this._values) {
      if (item.dataset.checked !== undefined && item.dataset.disabled === undefined) {
        this._set(item); 
        return;
      }
    }

    for (let i = 0; i < this._values.length; i++) {
      if (this._values[i].dataset.disabled === undefined) {
        this._set(this._values[i]);
        return;
      }
    }
  }

  protected _findDisabled(): void {
    for (let item of this._values) {
      if (item.dataset.disabled !== undefined)
        item.classList.add(this.disableTextClass);
    }
  }

  protected _setClickHandler(): void {
    for (let item of this._values) {
      if (item.dataset.disabled === undefined)
        item.onclick = this._clickHandler.bind(this, item);
    }
  }

  protected _clickHandler(el: HTMLSpanElement): void {
    let active = el;
    this._reset();

    this._set(active);
  }

  protected _reset(): void {
    for (let item of this._values) {
      this._unset(item);
    }
  }

  protected _setValue({ dataset }: HTMLSpanElement): void {
    this._input!.value = dataset.value!;
    this._input!.dispatchEvent(new Event('change'));
  }

  protected _set(el: HTMLSpanElement): void {
    if (el.dataset.disabled === undefined) {
      el.classList.add(this.activeTextClass);
      el.dataset.checked = '';

      this._headerSetText(el);
      this._setValue(el);
    }
  }

  protected _unset(el: HTMLSpanElement): void {
    el.classList.remove(this.activeTextClass);
    el.dataset.checked = undefined;
  }

  protected _checkForUser(): void {
    if (!this._input)
      throw new Error(`Input in ${this.name} is not found!`);

    if (!this._values.length)
      throw new Error(`Values in ${this.name} are not found!`);

    console.info(`${this.name} is ready`);
  }
}

export default Select;