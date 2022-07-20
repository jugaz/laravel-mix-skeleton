 
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

mixMultiple('./src/styles/', "sass", "scss", "./styles");
mixMultiple('./src/scripts/', "js", "js", "./scripts");


mix
    .options({
        terser: {
            extractComments: false,
        },
        // processCssUrls: false
         
    })
   
    .setPublicPath("./docs")
    .setResourceRoot("./docs")
    
    .browserSync({
        proxy: false,
        port:'8080',
        open: false,
        server: {
            baseDir: "./docs",
            index: "index.html",
            serveStaticOptions: {
                extensions: ["html,css"]
            }
        }
    })

    .disableNotifications()
