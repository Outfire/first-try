(function() {
    "use strict";

    const BASE_URL = 'https://.firebaseio.com/';

    class Model {

         //Конструктор модели
        constructor({resource, id, data = {}}) {
            this.data = data;
            this.resource = resource;
            this.id = id;
        }

         //Геттер для данных модели
        getData() {
            return this.data;
        }

        //Сеттер для данных модели
        setData(data) {
            this.data = data;
        }


         //Загрузка данных с сервера
        fetch(resolve) {
            let req = this._makeRequest('GET', req => {
                let data = this.parse(req.responseText);
                this.data = data;

                resolve(this.getData());
            });

            req.send();

            return req;
        }

        //Сохранение данных на сервере
        save() {
            let req = this._makeRequest('PUT', req => {
                let data = this.parse(req.responseText);
                this.data = data;
            });

            let reqString = JSON.stringify(this.getData());
            req.send(reqString);

            return req;
        }
        
        //Удаляет данные с сервера
        delete(itemId) {
            let req = new XMLHttpRequest();

            req.open('DELETE', BASE_URL + this.resource + '/' + itemId + '.json', false);
            req.send();
        }


        //Создание объекта запроса
        _makeRequest(method, success) {
            let xhr = new XMLHttpRequest();
            let url = this._getUrl();

            xhr.open(method, url, false);

            xhr.onreadystatechange = () => {
                if (xhr.readyState !== 4) return;

                if (xhr.status !== 200) {
                    //TODO: обработать ошибки запроса
                } else {
                    success(xhr);
                }
            };

            return xhr;
        }

        //Выбор URL в зависимости от метода
        _getUrl() {
            let url = `${BASE_URL}/${this.resource}`;

            if (this.id) {
                url += `/${this.id}`;
            }

            return `${url}.json`;
        }

        //Преобразлвание тескта ответа в данные
        parse(responseText) {
            return JSON.parse(responseText);
        }

    }

//export
    window.Model = Model;
})(window);
