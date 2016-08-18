(function() {
    "use strict";

    let templateEngine  = window.templateEngine;

    class Form {

        constructor(opts) {
            this.el = opts.el;
            this.data = opts.data;
            this._template = document.querySelector(opts.tmpl).innerHTML;

            this.render();
            this.action();
        }


        //Создаем HTML
        render() {
            this.el.innerHTML = templateEngine(this._template, this.data);
        }



        //Получение элемента формы по имени
        getField(name) {
            return this.el.querySelector(`[name="${name}"]`);
        }


        //Сообщение миру о случившемся
        trigger(name, data) {
            let widgetEvent = new CustomEvent(name, {
                bubbles: true,
                detail: data
            });

            this.el.dispatchEvent(widgetEvent);
        }

        //Развешиваем события
        action() {
            this.el.addEventListener('submit', this._onSubmit.bind(this));
        }



        //Отправка данных формы
        _onSubmit(event) {
            event.preventDefault();

            this.trigger('add', {
                href: this.getField('href').value,
                anchor: this.getField('anchor').value
            });

            event.target.reset();
        }
        
        

    }
//export
    window.Form = Form;
})(window);


