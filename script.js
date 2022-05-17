


window.onload = function() { 




  var filterButton = document.getElementById('filterButton');
  var withoutButton = document.getElementById('withoutButton');
  var canvas;
  var context;

  var image = document.getElementById('SourceImage');

  canvas = document.getElementById('Canvas');
  context = canvas.getContext('2d');

  canvas.width = image.width;
  canvas.height = image.height;


  context.drawImage(image, 0, 0);


  var imageData;


  filterButton.addEventListener('click', async function () {
    console.time('Function #1');

    imageData = context.getImageData(0, 0, canvas.width, canvas.height);

      
          var info = {
            'env': asmLibraryArg,
            'wasi_snapshot_preview1': asmLibraryArg,
          };


        let response = await fetch('Cplus.wasm');
        let bytes = await response.arrayBuffer();
        let wasmObj = await WebAssembly.instantiate(bytes, info);
        wasmExports = wasmObj.instance.exports;
        console.log(wasmExports);

        var ddd =  wasmExports.doubleValues(imageData.data, imageData.data.length);
    
    
    

        context.putImageData(imageData, 0, 0);
       console.timeEnd('Function #1')
       
  });


  withoutButton.addEventListener('click', function () {
    console.time('Function #2');

     imageData = context.getImageData(0, 0, canvas.width, canvas.height);


        for (var i = 0; i < imageData.data.length; i += 4) {

            ////Brown1 Filter
            if (imageData.data[i] < 100) {
                imageData.data[i] = 255;
                imageData.data[i + 1] = 255;
                imageData.data[i + 2] = 255;
            }

            if (imageData.data[i] != 255) {
                imageData.data[i] = 0;
                imageData.data[i + 1] = 0;
                imageData.data[i + 2] = 0; 
            }
            else {
                imageData.data[i] = 255;
                imageData.data[i + 1] = 255;
                imageData.data[i + 2] = 255;
            }

            if (imageData.data[i] == 255) {
                imageData.data[i] = 0;
                imageData.data[i + 1] = 0;
                imageData.data[i + 2] = 0;
            }
            else {
                imageData.data[i] = 255;
                imageData.data[i + 1] = 255;
                imageData.data[i + 2] = 255;
            }
        }

     context.putImageData(imageData, 0, 0);
     console.timeEnd('Function #2')
       
  });

}
