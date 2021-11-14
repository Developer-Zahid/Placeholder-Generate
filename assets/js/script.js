let canvas = document.getElementById("imageCanvas");
let ctx = canvas.getContext("2d");
let fileInput = document.querySelector("#file");

var _URL = window.URL || window.webkitURL;

$("#file").change(function(e) {
    var file, img;
    if ((file = this.files[0])) {
        img = new Image();
        img.onload = function() {
            $("#imageCanvas").attr("width", this.width);
            $("#imageCanvas").attr("height", this.height);
            let canvasWidth = canvas.width;
            let canvasHeight = canvas.height;
            convertCanvas($('#color').val(), canvasWidth, canvasHeight);
            getDataUri();
            $('#color').change(function(){
                convertCanvas($(this).val(), canvasWidth, canvasHeight);
                getDataUri();
            });
            let fileName = fileInput.files[0].name;
            $(".btn--download").attr("download", fileName);
            $(".uploader__action").fadeIn(500);
        };
        img.onerror = function() {
            alert( "not a valid file: " + file.type);
        };
        img.src = _URL.createObjectURL(file);
    }
});

function convertCanvas(color, width, height) {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#969696";
    ctx.font =  width/20 + "px 'Montserrat', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(width + "x" + height , width/2, height/2);
};

function getDataUri(){
    var pngUrl = canvas.toDataURL();
    $(".btn--download").attr("href", pngUrl);
};