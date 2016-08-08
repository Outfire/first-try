(function() {
    "use strict";

    const BASE_URL = 'https://outfirelearnjs.firebaseio.com/';

    /**
     * Модель данных меню
     * @class Model
     */


    class Model {
        /**
         * Конструктор модели
         * @param  {Objcet} options
         * @param  {string} options.resource
         */
        constructor({resource, id, data = {}}) {
            this.data = data;
            this.resource = resource;
            this.id = id;
        }

        /**
         * Геттер для данных модели
         * @return {Object}
         */
        getData() {
            return this.data;
        }

        /**
         * Сеттер для данных модели
         * @param {Object} data
         */
        setData(data) {
            this.data = data;
        }

        /**
         * Загрузка данных с сервера
         * @param  {Function} resolve
         * @return {XMLHttpRequest}
         */
        fetch(resolve) {
            let req = this._makeRequest('GET', req => {
                let data = this.parse(req.responseText);
                this.data = data;

                resolve(this.getData());
            });

            req.send();

            return req;
        }

        /**
         * Сохранение данных на сервере
         * @param  {Function} resolve
         * @return {XMLHttpRequest}
         */
        save() {
            let req = this._makeRequest('PUT', req => {
                let data = this.parse(req.responseText);
                this.data = data;
            });

            let reqString = JSON.stringify(this.getData());
            req.send(reqString);

            return req;
        }
        
        /**
         * Удаляет данные с сервера
         * @param  {Object} itemId
         * @return {XMLHttpRequest}
         */
        delete(itemId) {
            let req = new XMLHttpRequest();

            req.open('DELETE', BASE_URL + this.resource + '/' + itemId + '.json', false);
            req.send();
        }

        /**
         * Создание объекта запроса
         * @param {string} method - HTTP method
         * @param {Function} success - callback
         * @return {XMLHttpRequest}
         */
        _makeRequest(method, success) {
            let xhr = new XMLHttpRequest();
            let url = this._getUrl();

            xhr.open(method, url, false);

            xhr.onreadystatechange = () => {
                if (xhr.readyState !== 4) return;

                if (xhr.status !== 200) {
                    //TODO: обаботать ошибки запроса
                } else {
                    success(xhr);
                }
            };

            return xhr;
        }

        /**
         * Выбор URL в зависимости от метода
         * @param  {string} [method]
         * @return {string}
         */
        _getUrl() {
            let url = `${BASE_URL}/${this.resource}`;

            if (this.id) {
                url += `/${this.id}`;
            }

            return `${url}.json`;
        }

        /**
         * Преобразлвание тескта отвева в данные
         * @param {string} responseText
         * @return {Object}
         */
        parse(responseText) {
            return JSON.parse(responseText);
        }

    }

//export
    window.Model = Model;
})(window);
