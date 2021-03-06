"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
class SelectHeader {
    constructor(item) {
        this.toggleSelectClass = 'Select--active';
        this.activeTextClass = 'Select__text--active';
        this.disableTextClass = 'Select__text--disabled';
        this._item = item;
        this._text = this._item.querySelector('[data-id="dz-inputText"]');
        this.name = `${this._item.dataset.name || '(undefined name)'} select component`;
        this._headerHandle();
    }
    _headerSetText({ innerHTML }) {
        this._text.innerHTML = innerHTML;
    }
    _headerHandle() {
        try {
            this._headerCheckForUser();
            this._headerSetEvents();
        }
        catch (err) {
            console.warn(err.message);
        }
    }
    _headerSetEvents() {
        this._item.onclick = this._headerClickHandler.bind(this);
        this._item.onblur = this._headerRemoveActive.bind(this);
    }
    _headerClickHandler() {
        if (this._item.classList.contains(this.toggleSelectClass))
            this._headerRemoveActive();
        else
            this._headerAddActive();
    }
    _headerAddActive() {
        this._item.classList.add(this.toggleSelectClass);
    }
    _headerRemoveActive() {
        this._item.classList.remove(this.toggleSelectClass);
    }
    _headerCheckForUser() {
        if (!this._item)
            throw new Error('Component is not found!');
        if (!this._text)
            throw new Error(`Input text in ${this.name} is not found!`);
    }
}
class Select extends SelectHeader {
    constructor(item) {
        super(item);
        this._input = this._item.querySelector('[data-id="dz-input"]');
        this._values = this._item.querySelectorAll('[data-value]');
        this._handle();
    }
    _handle() {
        try {
            this._checkForUser();
            this._findChecked();
            this._findDisabled();
            this._setClickHandler();
        }
        catch (err) {
            console.warn(err.message);
        }
    }
    _findChecked() {
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
    _findDisabled() {
        for (let item of this._values) {
            if (item.dataset.disabled !== undefined)
                item.classList.add(this.disableTextClass);
        }
    }
    _setClickHandler() {
        for (let item of this._values) {
            if (item.dataset.disabled === undefined)
                item.onclick = this._clickHandler.bind(this, item);
        }
    }
    _clickHandler(el) {
        let active = el;
        this._reset();
        this._set(active);
    }
    _reset() {
        for (let item of this._values) {
            this._unset(item);
        }
    }
    _setValue({ dataset }) {
        this._input.value = dataset.value;
        this._input.dispatchEvent(new Event('change'));
    }
    _set(el) {
        if (el.dataset.disabled === undefined) {
            el.classList.add(this.activeTextClass);
            el.dataset.checked = '';
            this._headerSetText(el);
            this._setValue(el);
        }
    }
    _unset(el) {
        el.classList.remove(this.activeTextClass);
        el.dataset.checked = undefined;
    }
    _checkForUser() {
        if (!this._input)
            throw new Error(`Input in ${this.name} is not found!`);
        if (!this._values.length)
            throw new Error(`Values in ${this.name} are not found!`);
        console.info(`${this.name} is ready`);
    }
}
exports.Select = Select;
exports.default = Select;
