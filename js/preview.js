'use strict';

(function () {
    var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

    var fileChooser = document.querySelector('.upload input[type=file]');
    var dropArea = document.querySelector('.drop-zone');
    var preview = document.querySelector('.notice__userpic');

    function upload(files) {
        var file = files[0];
        var fileName = file.name.toLowerCase();

        var matches = FILE_TYPES.some(function (it) {
            return fileName.endsWith(it);
        });

        if (matches) {
            var reader = new FileReader();
            reader.addEventListener('load', function () {
                preview.src = reader.result;
            });
            reader.readAsDataURL(file);
        };
    };

    console.log(upload);

    dropArea.addEventListener('dragover', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy';
        dropArea.style.border = "dashed 1px #ff5635"
    });

    dropArea.addEventListener('drop', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        window.avatars = evt.dataTransfer.files;
        dropArea.style.border = "dashed 1px #c7c7c7"
        upload(window.avatars);
    });

    dropArea.addEventListener('dragleave', function () {
        dropArea.style.border = "dashed 1px #c7c7c7"
    });

    fileChooser.addEventListener('change', function () {
        upload(fileChooser.files);
    });
})();


