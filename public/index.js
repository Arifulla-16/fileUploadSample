var fsrc = document.getElementById("file");
var isrc = document.getElementById("upimg");
var fval = document.getElementById("fval");

var iSec = document.getElementById("imgSec");

var reader = new FileReader();
var k ;

fsrc.addEventListener("change",(e)=>{
    const selectedFile = fsrc.files[0];
    if (selectedFile) {
        reader.addEventListener("loadend",(e)=>{
            k=e.target.result;
            var newItem;
            if(k.slice(5,10)=="image"){
                newItem = document.createElement("img");
                newItem.setAttribute("style","height:150px;" );
                newItem.setAttribute("src",k);
                newItem.setAttribute("alt",file.name);
                isrc.appendChild(newItem);
            }
            else if(k.slice(5,10)=="video"){
                newItem = document.createElement("video");
                newItem.setAttribute("style","height:150px;width:268px;" );
                newItem.setAttribute("src",k);
                newItem.setAttribute("controls","");
                isrc.appendChild(newItem);
            }
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
        var newItem;
        console.log(file.data.slice(5,10));
        if(file.data.slice(5,10)=="image"){
            newItem = document.createElement("img");
            newItem.setAttribute("style","height:150px;" );
            newItem.setAttribute("src",file.data);
            newItem.setAttribute("id",file._id);
            newItem.setAttribute("alt",file.name);
            newItem.setAttribute("class","dbimg");
            iSec.appendChild(newItem);
        }
        else if(file.data.slice(5,10)=="video"){
            newItem = document.createElement("video");
            newItem.setAttribute("style","height:150px;width:268px;" );
            newItem.setAttribute("src",file.data);
            newItem.setAttribute("id",file._id);
            newItem.setAttribute("controls","");
            newItem.setAttribute("class","dbimg");
            iSec.appendChild(newItem);
        }
    });
}

logFiles();
