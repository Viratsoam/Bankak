function processImage(){
    
    // selcet the image file
    const file = document.querySelector("#uploadFile").files[0];
    
    // check there is file exist or not
    if(!file)
        return;
    
    // create the file reader
    const reader = new FileReader();

    // will get base64 data 
    reader.readAsDataURL(file);

    reader.onload = function(event){
        const imageElement = document.createElement("img");
        // base64 datauri
        imageElement.src = event.target.result;
        
        // here we will get the preview of our actual input image
        document.querySelector("#input").src = event.target.result;

        imageElement.onload = function(e){
            let canvas = document.createElement("canvas");
            // Image one
            let MAX_WIDTH = 100;
    
            // scalesize
            let scaleSize = MAX_WIDTH/e.target.width;
            canvas.width = MAX_WIDTH;
            canvas.height = e.target.height * scaleSize;

            // create the convas context
            let ctx = canvas.getContext("2d");
            ctx.drawImage(e.target,0,0,canvas.width,canvas.height);

            // encoded src file
            let encodedSrc = ctx.canvas.toDataURL(e.target,"image/jpeg");

            // image 2
            MAX_WIDTH = 200;
    
            // scalesize
            scaleSize = MAX_WIDTH/e.target.width;
            canvas.width = MAX_WIDTH;
            canvas.height = e.target.height * scaleSize;

            // create the convas context
            ctx = canvas.getContext("2d");
            ctx.drawImage(e.target,0,0,canvas.width,canvas.height);

            // encoded src file
            let encodedSrc1 = ctx.canvas.toDataURL(e.target,"image/jpeg");

            // preview of our new  resized images
            document.querySelector("#output1").src = encodedSrc;
            document.querySelector('#output2').src = encodedSrc1;

        /*
            Note:-
                Now,we have enconded src url, passing it to the server, we can save it in our database or AWS(cloud)
                in the binary format. or in which format we want to save it,so that we can get it easily.
            
            "USE THESE ENCODED SRC FILE AS PER YOUR CONVENIENCE" 

        */

        }
    }
    
}