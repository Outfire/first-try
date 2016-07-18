(function () {
'use strict';

//import
let Menu = window.Menu;
let Form = window.Form;
let Model = window.Model;

	let menu = new Menu({
		el: document.querySelector('.js-menu'),
		tmpl: '#menu',
		data: {
			title: 'WHAT I WANT',
			items:  [
				{
					"href": "www.pizza.com",
					"anchor": "pizza"
				},
				{
					"href": "www.donuts.com",
					"anchor": "donuts"
				},
				{
					"href": "www.icecream.com",
					"anchor": "icecreamm"
				}
			]
		}
	});

	let model = new Model({
		data: {},
		resource: 'menu',
		id: '-KMdze1C0oW40AIvXBfe'
	});

	let form = new Form({
		el: document.querySelector('.js-form'),
		tmpl: '#form'
	});

	menu.el.addEventListener('remove', function (event) {
		menu.removeItem(event.detail);
		model.setData(menu.data);
		model.save();
	});

	form.el.addEventListener('add', function (event) {
		menu.addItem(event.detail);
		model.setData(menu.data);
		model.save(); // сохранить на сервере
	});



	model.fetch(menu.render.bind(menu));

	window.model = model;
	window.menu = menu;

})();