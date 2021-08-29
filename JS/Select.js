"use strict";
class Select {
    constructor(item) {
        this.toggleTextClass = 'Select__text--active';
        this.toggleSelectClass = 'Select__select--active';
        this.toggleIconClass = 'Select__icon--active';
        this.item = item;
        this.select = this.item.querySelector('[data-id="dz-select"]');
        this.icon = this.item.querySelector('[data-id="dz-icon"]');
        this.input = this.item.querySelector('[data-id="dz-input"]');
        this.inputText = this.item.querySelector('[data-id="dz-inputText"]');
        this.values = this.item.querySelectorAll('[data-id="dz-value"]');
        this.name = `${this.item.dataset.name || '(undefined name)'} select component`;
        this.handle();
    }
    handle() {
        if (this.checkForUser()) {
            this.check();
            this.selectEvent();
            this.item.onclick = this.click.bind(this);
        }
    }
    click() {
        this.select.classList.toggle(this.toggleSelectClass);
        this.icon.classList.toggle(this.toggleIconClass);
    }
    check() {
        let key, checked = false;
        for (const item of this.values) {
            if (item.dataset.checked == 'true') {
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
        this.input.value = parent.dataset.value;
        this.inputText.innerText = parent.innerText;
        this.removeAllActives();
        parent.classList.add(this.toggleTextClass);
    }
    removeAllActives() {
        for (const item of this.values) {
            item.classList.remove(this.toggleTextClass);
        }
    }
    checkForUser() {
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
        let valueFlag = false;
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
