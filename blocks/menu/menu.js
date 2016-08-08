(function(){
"use strict";

// import
let templateEngine  = window.templateEngine;

/**
 * @class Menu
 * Компонента "Меню"
 */
	class Menu {
	constructor(options) {
		this.el = options.el;
		this.data = options.data;
		this._template = document.querySelector(options.tmpl).innerHTML;

		this.render();
		this.action();
	}

	/**
	 * Создаем HTML
	 * @param {Object|undefined} data
	 */
	render(data) {
		if (data) {
			this.data = data;
		}

		this.el.innerHTML = templateEngine(this._template, this.data);
	}

	/**
	 * Развешиваем события
	 */
	action() {
		this.el.addEventListener('click', this._onClick.bind(this));
	}

	/**
	 * Открывем меню по клику
	 */
	openMenu() {
		this.sweet = this.el.querySelectorAll('.sweet');
		for (let i = 0; i < this.sweet.length; i++) {
			this.sweet[i].classList.toggle('open');
		}
	}

	/**
	 * Добавляем элемент меню
	 * @param {Object} item
	 */
	addItem(item) {
		this.data.items.push(item);
		this.render();
		this.openMenu();
	}

	/**
	 * Удаляем пункт меню из данных
	 * @param  {Object} item
	 */
	removeItem (removedItem) {
		this.data.items = this.data.items.filter((item, index) => {
			return index !== removedItem.index;
		});
		this.render();
	
	}

	/**
	 * Удаления элемента меню
	 * @param  {HTMLElement} item
	 * @private
	 */
	_onRemoveClick(item) {
		let index = parseInt(item.parentNode.dataset.index, 10);

		this.trigger('remove', {
			index
		});
		this.openMenu();
	}
	/**
	 * Клик в любую область меню
	 * @param {Event} event
	 * @private
	 */
	_onClick(event) {

		let item = event.target;

		switch (item.dataset.action) {
			case 'remove':
				this._onRemoveClick(item);
				break;
			case 'open':
				this.openMenu();
				break;
			case 'addItem':
				this.addItem(item);
		}
	}

	/**
	 * Сообщение миру о случившемся
	 * @param {string} name тип события
	 * @param {Object} data объект события
	 */
	trigger (name, data) {
		let widgetEvent = new CustomEvent(name, {
			bubbles: true,
			detail: data
		});

		this.el.dispatchEvent(widgetEvent);
	}
}
		// export
		window.Menu = Menu;
	

})(window);
