'use strict';

(function () {
    var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
    var preview = document.querySelector('.notice__userpic');

    var FileChooser = function (target) {
        this.target = target;
    };

    FileChooser.prototype.upload = function (files, dest) {
        dest = files;
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

    var avatarChooser = new FileChooser(document.querySelector('.upload input[type=file]'))

    avatarChooser.target.addEventListener('change', function () {
        avatarChooser.upload(avatarChooser.target.files, window.avatars);
    });


    var AvatarDropZone = function (target) {
        this.zone = target;
        this.deafaultDash = this.zone.style.border;
        this.dragDash = "dashed 1px #ff5635";
    };

    AvatarDropZone.prototype = Object.create(FileChooser.prototype);

    AvatarDropZone.prototype.defaultAction = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
    };

    AvatarDropZone.prototype.setFiles = function (evt) {
        this.files = evt.dataTransfer.files;
    };

    AvatarDropZone.prototype.dragover = function (evt) {
        this.defaultAction(evt);
        this.zone.style.border = this.dragDash;
    };

    AvatarDropZone.prototype.drop = function (evt) {
        this.defaultAction(evt);
        this.zone.style.border = this.deafaultDash;
        this.setFiles(evt);
        this.upload(this.files, window.avatars);
    };

    AvatarDropZone.prototype.dragleave = function () {
        this.style.border = this.deafaultDash;
    };

    var avatarDrop = new AvatarDropZone(document.querySelector('.drop-zone'))

    avatarDrop.zone.addEventListener('dragover', function (evt) {
        avatarDrop.dragover(evt);
    });

    avatarDrop.zone.addEventListener('drop', function (evt) {
        avatarDrop.drop(evt);
    });

    avatarDrop.zone.addEventListener('dragleave', function () {
        avatarDrop.dragleave();
    });

    var PhotosDropZone = function (target) {
        this.container = target;
        this.input = this.container.querySelector('input');
        this.zone = this.container.querySelector('label');
        this.deafaultDash = this.zone.style.border;
        this.dragDash = "dashed 1px #ff5635";
    };

    PhotosDropZone.prototype = Object.create(AvatarDropZone.prototype);

    PhotosDropZone.prototype.upload = function (files) {
        window.photos = files;

        for (var i = 0; i < files.length; i++) {
            var fileName = files[i].name.toLowerCase();
            var matches = FILE_TYPES.some(function (it) {
                return fileName.endsWith(it);
            });

            if (matches) {
                var reader = new FileReader();
                var container = this.container;
                reader.addEventListener('load', function () {
                    var div = document.createElement('div');
                    div.classList.add("form__photo")
                    var img = document.createElement('img');
                    img.src = reader.result;
                    div.addEventListener('click', function () {
                        div.remove();
                    });
                    div.appendChild(img);
                    container.appendChild(div);
                });
                reader.readAsDataURL(files[i]);
            };
        }

    };

    var photoDrop = new PhotosDropZone(document.querySelector('.form__photo-container'))
    console.log(photoDrop.zone);

    photoDrop.input.addEventListener('change', function () {
        photoDrop.upload(photoDrop.input.files);
    });

    photoDrop.zone.addEventListener('dragover', function (evt) {
        photoDrop.dragover(evt);
    });

    photoDrop.zone.addEventListener('drop', function (evt) {
        photoDrop.drop(evt);
    });

    photoDrop.zone.addEventListener('dragleave', function () {
        photoDrop.dragleave();
    });

})();


