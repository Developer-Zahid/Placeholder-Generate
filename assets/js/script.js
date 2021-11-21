let canvas = document.getElementById("imageCanvas");
let ctx = canvas.getContext("2d");
let fileInput = document.querySelector("#file");

var _URL = window.URL || window.webkitURL;

/* After Input Select Function */
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

/* Create and Update Canvas Width Height & Size Function */
function convertCanvas(color, width, height) {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#969696";
    ctx.font =  width/20 + "px 'Montserrat', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(width + "x" + height , width/2, height/2);
};

/* Create Data URI from Canvas Function */
function getDataUri(){
    var pngUrl = canvas.toDataURL();
    $(".btn--download").attr("href", pngUrl);
};

/* Uninspectable Function */
document.onkeydown = (e)=>{
    const inspectTool = e.charCode || e.keyCode;
    if(inspectTool == 123 || inspectTool == 85 || inspectTool == 83 || inspectTool == 77 || inspectTool == 73 || inspectTool == 67){
        e.preventDefault();
    }
}