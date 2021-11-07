"use strict";
class Select {
    constructor(item) {
        this.toggleSelectClass = 'Select--active';
        this.toggleTextClass = 'Select__text--active';
        this._item = item;
        this._input = this._item.querySelector('[data-id="dz-input"]');
        this._inputText = this._item.querySelector('[data-id="dz-inputText"]');
        this._values = this._item.querySelectorAll('[data-value]');
        this.name = `${this._item.dataset.name || '(undefined name)'} select component`;
        console.log(this._values);
        this._handle();
    }
    _handle() {
        try {
            this._checkForUser();
            this._check();
            this._selectEvent();
            this._setEventsForSelect();
        }
        catch (err) {
            console.warn(err.message);
        }
    }
    _check() {
        let key, checked = false;
        for (let item of this._values) {
            if (item.dataset.checked != undefined) {
                checked = true;
                key = item;
            }
        }
        checked ? this._change(key) : this._change(this._values[0]);
    }
    _selectEvent() {
        for (let item of this._values) {
            item.onclick = this._change.bind(this, item);
        }
    }
    _setEventsForSelect() {
        this._item.onclick = this._clickHandler.bind(this);
        this._item.onblur = this._removeActive.bind(this);
    }
    _clickHandler() {
        if (this._item.classList.contains(this.toggleSelectClass))
            this._removeActive();
        else
            this._addActive();
    }
    _change(parent) {
        this._input.value = parent.dataset.value;
        this._inputText.innerText = parent.innerText;
        this._removeAllActives();
        parent.classList.add(this.toggleTextClass);
    }
    _removeAllActives() {
        for (let item of this._values) {
            item.classList.remove(this.toggleTextClass);
        }
    }
    _addActive() {
        this._item.classList.add(this.toggleSelectClass);
    }
    _removeActive() {
        this._item.classList.remove(this.toggleSelectClass);
    }
    _checkForUser() {
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
