(function() {
    "use strict";

    let templateEngine  = window.templateEngine;
    /**
     * @class Form
     * Компонента "Форма"
     */
    class Form {

        /**
         * @constructor
         * @param  {Object} opts
         */
        constructor(opts) {
            this.el = opts.el;
            this.data = opts.data;
            this._template = document.querySelector(opts.tmpl).innerHTML;

            this.render();
            this.action();
        }

        /**
         * Создаем HTML
         */
        render() {
            this.el.innerHTML = templateEngine(this._template, this.data);
        }


        /**
         * Получение элемента формы по имени
         * @param  {string} name
         * @return {HTMLElement}
         */
        getField(name) {
            return this.el.querySelector(`[name="${name}"]`);
        }

        /**
         * Сообщение миру о случившемся
         * @param {string} name тип события
         * @param {Object} data объект события
         */
        trigger(name, data) {
            let widgetEvent = new CustomEvent(name, {
                bubbles: true,
                detail: data
            });

            this.el.dispatchEvent(widgetEvent);
        }

        /**
         * Развешиваем события
         */
        action() {
            this.el.addEventListener('submit', this._onSubmit.bind(this));
        }


        /**
         * Отправка данных формы
         * @param {Event} event
         * @private
         */
        _onSubmit(event) {
            event.preventDefault();

            this.trigger('add', {

                anchor: this.getField('anchor').value
            });

            event.target.reset();
        }
        
        

    }
//export
    window.Form = Form;
})(window);


