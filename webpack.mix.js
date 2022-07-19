 
let fs = require('fs');
let mix = require('laravel-mix');




function mixMultiple  (folder, method, srcExt, outputExt)  {
    const paths = fs.readdirSync(folder);
    for (let i = 0; i < paths.length; i++) {
        if (paths[i].indexOf('.' + srcExt) > 0 && paths[i].charAt(0) !== '_') {
            const file_path = folder + paths[i];
            if(srcExt == "scss") {

                mix[method](file_path, outputExt);
              }
            else {
                mix[method](file_path, outputExt).vue({ version: 3 });
            }
            
        }
    }
}

mixMultiple('./frontend/src/styles/', "sass", "scss", "./styles");
mixMultiple('./frontend/src/scripts/', "js", "js", "./scripts");


mix
    .options({
        terser: {
            extractComments: false,
        },
        // processCssUrls: false
         
    })
   

   
    .setPublicPath('./docs/')
    
    .browserSync({
        proxy: false,
        port:'8080',
        server: {
            baseDir: "./docs/",
            serveStaticOptions: {
                extensions: ["html,css"]
            }
        }
    })

    .disableNotifications()
