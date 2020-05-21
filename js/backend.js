(function () {
    window.backend = {
        load: function (onSucces, onError) {
            var URL = 'https://javascript.pages.academy/keksobooking/data';
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.addEventListener('load', function () {
                if (xhr.status === 200 || xhr.status === 302) {
                    onSucces(xhr.response);
                } else {
                    onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
                }
            });
            xhr.addEventListener('error', function () {
                onError('Произошла ошибка соединения');
            });
            xhr.addEventListener('timeout', function () {
                onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
            });

            xhr.open('GET', URL);
            xhr.send();

        },
        save: function (data, onLoad, onError) {
            var URL = 'https://javascript.pages.academy/keksobooking';
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.addEventListener('load', function () {
                if (xhr.status === 200) {
                    onLoad();
                } else {
                    onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
                }
            });
            xhr.addEventListener('error', function () {
                onError('Произошла ошибка соединения');
            });
            xhr.addEventListener('timeout', function () {
                onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
            });
            xhr.open('POST', URL);
            xhr.send(data);
        },
        getError: function (errorMessage) {
            var node = document.createElement('div');
            node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
            node.style.position = 'absolute';
            node.style.left = 0;
            node.style.right = 0;
            node.style.fontSize = '30px';
            node.textContent = errorMessage;
            document.body.insertAdjacentElement('afterbegin', node);
        }
    }
})()