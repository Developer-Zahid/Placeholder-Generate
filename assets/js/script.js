

var _URL = window.URL || window.webkitURL;

$("#file").change(function(e) {
    var file, img;
    if ((file = this.files[0])) {
        img = new Image();
        img.onload = function() {
            let generatedURL = "https://via.placeholder.com/" + this.width + "x" + this.height;
            // $('.drow').append('<canvas id="myCanvas">Your browser does not support the HTML5 canvas tag.</canvas>'); 
            $("#myCanvas").attr("width", this.width);
            $("#myCanvas").attr("height", this.height);
            amarImage(generatedURL);
            
            function download_image(){
                var notunCanvas = document.getElementById("myCanvas");
                // draw to canvas...
                notunCanvas.toBlob(function(blob) {
                    saveAs(blob, "pretty image.png");
                });
            }
        };
        img.setAttribute('crossorigin', 'anonymous');
        img.onerror = function() {
            alert( "not a valid file: " + file.type);
        };
        img.src = _URL.createObjectURL(file);
    }
});

function amarImage(imageURL){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var notunImage = new Image();
    notunImage.src = imageURL;
    notunImage.onload = function() {
        ctx.drawImage(notunImage, 0, 0);
    }
}

// function download_image(){
//     var notunCanvas = document.getElementById("myCanvas");
//     var image = notunCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
//     var link = document.createElement('a');
//     link.download = "placeholder.png";
//     link.href = image;
//     link.innerHTML = "Download";
//     link.click()
// }
