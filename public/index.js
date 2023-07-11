var fsrc = document.getElementById("file");
var isrc = document.getElementById("img");
var fval = document.getElementById("fval");

var iSec = document.getElementById("imgSec");

var reader = new FileReader();
var k ;

fsrc.addEventListener("change",(e)=>{
    const selectedFile = fsrc.files[0];
    if (selectedFile) {
        reader.addEventListener("loadend",(e)=>{
            k=e.target.result;
            isrc.setAttribute("src",k);
            fval.setAttribute("value",k);
            isrc.style.display="inherit";
        });
      reader.readAsDataURL(selectedFile);
    }
});

var imgSni = '<img src="" alt="preview" id="img" style=" display:none;height:150px; ">'; 

async function logFiles() {
    const response = await fetch("https://fus.onrender.com/files");
    const files = await response.json();
    console.log(response);
    files.forEach(file => {
        console.log(file);
        var newImg = document.createElement("img");
        newImg.setAttribute("style","height:150px;" );
        newImg.setAttribute("src",file.data);
        newImg.setAttribute("id",file.id);
        newImg.setAttribute("alt",file.name);
        newImg.setAttribute("class","dbimg");
        iSec.appendChild(newImg);
    });
}

logFiles();
