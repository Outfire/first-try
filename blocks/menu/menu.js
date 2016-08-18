(function(){
"use strict";

// import
let templateEngine  = window.templateEngine;

	class Menu {
	constructor(options) {
		this.el = options.el;
		this.data = options.data;
		this._template = document.querySelector(options.tmpl).innerHTML;

		this.render();
		this.action();
	}


	//Создаем HTML
	render(data) {
		if (data) {
			this.data = data;
		}

		this.el.innerHTML = templateEngine(this._template, this.data);
	}

	//Развешиваем события
	action() {
		this.el.addEventListener('click', this._onClick.bind(this));
	}

	//Открывем меню по клику
	openMenu() {
		this.sweet = this.el.querySelectorAll('.sweet');
		for (let i = 0; i < this.sweet.length; i++) {
			this.sweet[i].classList.toggle('open');
		}
	}


	//Добавляем элемент меню
	addItem(item) {
		this.data.items.push(item);
		this.render();
		this.openMenu();
	}


	//Удаляем пункт меню из данных
	removeItem (removedItem) {
		this.data.items = this.data.items.filter((item, index) => {
			return index !== removedItem.index;
		});
		this.render();
	
	}

	//Удаления элемента меню
	_onRemoveClick(item) {
		let index = parseInt(item.parentNode.dataset.index, 10);

		this.trigger('remove', {
			index
		});
		this.openMenu();
	}

	//Клик в любую область меню
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


	//Сообщение о случившемся
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
