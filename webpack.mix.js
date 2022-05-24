 
let fs = require('fs');
let mix = require('laravel-mix');
mix.pug = require('laravel-mix-pug-recursive');




function mixMultiple  (folder, method, srcExt, outputExt)  {
    const paths = fs.readdirSync(folder);
    for (let i = 0; i < paths.length; i++) {
        if (paths[i].indexOf('.' + srcExt) > 0 && paths[i].charAt(0) !== '_') {
            const file_path = folder + paths[i];
            mix[method](file_path, outputExt);
            
        }
    }
}

mixMultiple('./frontend/src/static/styles/', "sass", "scss", "./styles");
mixMultiple('./frontend/src/static/scripts/', "js", "js", "./scripts");


mix
    .options({
        processCssUrls: false
         
    })
   

    .pug('./frontend/src/templates/**/*.pug', './docs/',  {
        excludePath: __dirname+'/frontend/src/templates'
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
