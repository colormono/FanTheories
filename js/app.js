'use strict';
(function () {

    // Aliases
    var autoDetectRenderer = PIXI.autoDetectRenderer,
        loader = PIXI.loader,
        resources = PIXI.loader.resources,
        Sprite = PIXI.Sprite,
        Texture = PIXI.Texture,
        Graphics = PIXI.Graphics,
        Container = PIXI.Container;

    // Globals
    var preload = document.getElementById('preload');
    var app = document.getElementById('app');
    var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)-3;
    var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)-3;
    var renderer = autoDetectRenderer(width, height);
    app.appendChild(renderer.view);    
    
    window.randomMode = true;
    window.addEventListener('orientationchange', resize, false);
    window.addEventListener('resize', resize, false);

    // Assets
    var stage = new Container();
    var grupoGlitch = new Container();
    var state = stateLoading;
    var rojo = 0xED0532;
    var negro = 0x000000;

    var assetsFolder = "wp-content/themes/mrrobot/";

    // Preloader
    PIXI.loader
        .add([
            assetsFolder+"img/logo-mrrobot-rojo.png",
            assetsFolder+"img/logo-space.png",
            assetsFolder+"img/bg.jpg",
            assetsFolder+"img/login/box.png",
            assetsFolder+"img/login/elliot.png",
            assetsFolder+"img/login/fantheory.png",
            assetsFolder+"img/login/unete.png",
            assetsFolder+"img/teorias/fsociety.png"
        ])
        .on("progress", loadProgressHandler)
        .load(setup);

    function loadProgressHandler(loader, resource){

        //Imprimir porcentage de carga
        //preload.innerHTML = 'cargando: '+ Math.floor(loader.progress) +'%';
        $('#preload span').html('cargando: '+ Math.floor(loader.progress) +'%');
        //console.log('loading: '+resource.url);
        //console.log('progress: '+loader.progress+'%');
    }

    // Loading screen
    function stateLoading(){
        
    }

    // Load JSON
    var dbJSON, http_request;
    function loadJSON(){
        //var data_file = "data.json";
        //var data_file = "http://localhost:8888/websites/wordpress/?json=get_posts&order=ASC";
        var data_file = "http://socialsnacksandbox.com/mrrobot/wordpress/?json=get_posts&order=ASC";
        http_request = new XMLHttpRequest();
        try{
            // Opera 8.0+, Firefox, Chrome, Safari
            http_request = new XMLHttpRequest();
        } catch (e) {
            // Internet Explorer Browsers
            try{
                http_request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try{
                    http_request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    // Something went wrong
                    alert("Your browser broke!");
                    return false;
                }
            }
        }        
        
        http_request.open("GET", data_file, true);
        http_request.send();

        return http_request;
    }


    // Setup
    var stats, count=0, t, c, pointer;
    var grupoFondo, bg, box, rayitas, rayitas2, ddos;
    var grupoSobre, logoMrobot, logoSpace, txtEstreno;

    function setup(){

        // Remove preloader
        $('#preload').remove();

        // Init stats
        stats = initStats();

        // Tweening (https://github.com/kittykatattack/charm)
        c = new Charm(PIXI);

        // Make the pointer (https://github.com/kittykatattack/tink)
        t = new Tink(PIXI, renderer.view);
        pointer = t.makePointer();

        // Sobre (Header)
        //https://github.com/noprotocol/gsap-pixi-plugin
        grupoSobre = new Container();
        TweenLite.set(grupoSobre, { pixi: {
            alpha: 0,
            y: -30
        }});
        TweenLite.to(grupoSobre, 2, {pixi: { y: 30, alpha: 1 }, delay: 2});

        // Logo MR.Robot
        logoMrobot = new Sprite( resources[assetsFolder+"img/logo-mrrobot-rojo.png"].texture );
        logoMrobot.position.x = 30;
        txtEstreno = new PIXI.Text( '////ESTRENO////\nJUEVES 14 DE JULIO 23HS.', { font: '12px Hack', fill: '#FFFFFF', align: 'left' });
        txtEstreno.position.set(245, 2);

        // Logo Space
        logoSpace = new Sprite( resources[assetsFolder+"img/logo-space.png"].texture );
        logoSpace.width = 140;
        logoSpace.height = 29.67;
        logoSpace.position.x = width-logoSpace.width-30;

        // Fondo
        grupoFondo = new Container();
        grupoFondo.alpha = 0;
        c.fadeIn(grupoFondo, 600);
        bg = new Sprite( resources[assetsFolder+"img/bg.jpg"].texture );

        // Rayitas
        rayitas = new Container();
        rayitas2 = new Container();

        // Box
        box = new Sprite( resources[assetsFolder+"img/login/box.png"].texture );       
        box.anchor.set(0.5);

        // DDOS Script
        ddos = new PIXI.Text( 'ddos.bat', { font: '12px Hack', fill: '#666666', align: 'left' });
        ddos.position.set(30, 90);

        // Añadir fondo al stage
        grupoFondo.addChild(bg);
        grupoFondo.addChild(rayitas);
        grupoFondo.addChild(box);
        grupoFondo.addChild(ddos);
        grupoGlitch.addChild(grupoFondo);
        stage.addChild(grupoGlitch);

        // Añadir grupoSobre al stage
        grupoSobre.addChild(logoMrobot);
        grupoSobre.addChild(txtEstreno);
        grupoSobre.addChild(logoSpace);
        stage.addChild(grupoSobre);

        // Iniciar secuencia
        initLogin();

        // Start Loop
        loop();
    }

    // Loop
    function loop(){

        // Loop this function 60 fps
        requestAnimationFrame(loop);

        // Updates
        updateGlobal();
        c.update(); // Charm
        t.update(); // Tink
        state(); // State
        stats.update(); // Stats

        // Apply Shaders
        applyShaders();

        // Render the stage
        renderer.render(stage);
    }


    function updateGlobal(){
        // Centrar fondo
        bg.width = width;
        bg.height = height;

        // Cambiar caja de posicion el 2% de las veces
        if (Math.random() > 0.98) {
            box.position.set(Math.random()*width, Math.random()*height);

            // Cambiar rayitas el 50% de las veces
            if (Math.random() > 0.5) {

                // Rayitas
                rayitas.removeChildren();
                for (var i=0; i<5; i++) {
                    var rayita = new Graphics();
                    rayita.beginFill(rojo, 1);
                    rayita.drawRect(Math.random()*width, 85+Math.random()*height*0.85, Math.random()*200, Math.random()*50);
                    rayitas.addChild(rayita);
                }
                grupoFondo.addChild(rayitas);
            } else {
                // Rayitas
                rayitas2.removeChildren();
                for (var i=0; i<5; i++) {
                    var rayita = new Graphics();
                    rayita.beginFill(rojo, 1);
                    rayita.drawRect(Math.random()*width, 85+Math.random()*height*0.85, Math.random()*200, Math.random()*50);
                    rayitas2.addChild(rayita);
                }
                grupoFondo.addChild(rayitas2);                
            }
        }

        // Script
        ddos.text = '//DDOS ATTACKS '+ Math.floor(count) +'\n\n┌─┐┌─┐┌─┐┌─┐┬┌─┐┌┬┐┬ ┬\n├┤ └─┐│ ││  │├┤  │ └┬┘\n└  └─┘└─┘└─┘┴└─┘ ┴  ┴ \n\n@echo off\nmode 67,16\ntitle DDOS Attack\ncolor 05\ncls\necho.\necho ÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ\necho DDOS Bayu Ae\necho ÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ\necho.\nset /p x=Apa-Targer Loe:\necho.\necho ÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ\nping %x%\necho "fuck society, our democracy has been hacked."\n@ping.exe 127.0.0.1 -n 5 -w 1000 > nul\ngoto Next\n:Next\necho.\necho.\necho.\nset /p m=Ip Host:\necho.\nset /p n=Packet Size:\necho.\n:DDOS\ncolor 0c\necho Serang Server %m%\nping %m% -i %n% -t >nul\ngoto DDOS \n\n//DDOS ATTACKS '+ Math.floor(count) +'';
        if (Math.random() > 0.8) {
            ddos.alpha = Math.random()/2;
        }
        count += 1;
    }


    // STATE: login
    var grupoLogin, loginElliot, loginFunTheroy, loginBtn;

    function initLogin(){
        grupoLogin = new Container();

        // Elliot
        loginElliot = new Sprite( resources[assetsFolder+"img/login/elliot.png"].texture );
        loginElliot.position.y = 50;
        loginElliot.anchor.set(0.5);
        loginElliot.alpha = 0;
        c.fadeIn(loginElliot, 120);
        c.slide(loginElliot, 0, loginElliot.position.y-50, 90);

        // Fun Theory
        loginFunTheroy = new Sprite( resources[assetsFolder+"img/login/fantheory.png"].texture );
        loginFunTheroy.position.y = -60;
        loginFunTheroy.anchor.set(0.5);
        loginFunTheroy.alpha = 0;
        c.fadeIn(loginFunTheroy, 30);
        c.slide(loginFunTheroy, 0, loginFunTheroy.position.y-10, 90, "smoothstep", true, 0);

        // Glitchear
        grupoLogin.addChild(loginElliot);
        grupoLogin.addChild(loginFunTheroy);
        grupoLogin.position.set(width/2, height/2);
        grupoGlitch.addChild(grupoLogin);

        // Botón login
        loginBtn = new Sprite( resources[assetsFolder+"img/login/unete.png"].texture );
        loginBtn.anchor.set(0.5);
        loginBtn.position.set( Math.floor(width/2), Math.floor(height/2) + 200 );
        TweenLite.set(loginBtn, { pixi: {
            alpha: 0,
            y: Math.floor(height/2) + 200
        }});
        //var loginBtnAnim = c.pulse(loginBtn, 60, 0.5);        
        //loginBtnAnim.play();
        t.makeInteractive(loginBtn);
        stage.addChild(loginBtn);

        loginBtn.over = function(){
            //console.log("over");
        };
        loginBtn.out = function(){
            //console.log("out");
        };
        loginBtn.tap = function(){
            loginBtn.enabled = false;
            //loginBtnAnim.pause();
            outLogin();
        };

        // Animar
        state = loopLogin;
    }

    function loopLogin(){
        TweenLite.to(loginBtn, 2, {pixi: { y: Math.floor(height/2) + 100, alpha: 1 }, delay: 2});
    }

    function outLogin(){
        TweenLite.to(loginBtn, 1, {pixi: { alpha: 0 } });
        TweenLite.to(loginBtn, 1, {pixi: { alpha: 0 } });
        TweenLite.to(grupoLogin, 2, {pixi: { y: grupoLogin.position.y+50, alpha: 0 }, onComplete: endLogin });
    }

    function endLogin(){
        grupoGlitch.removeChild(grupoLogin);
        stage.removeChild(loginBtn);

        initTeorias();
    }


    // STATE: teorias
    var grupoTeorias = new Container();
    var teoriaDestacada = new Container();

    var teorias = []; // Arreglo vacío para las teorías

    var borroso = new PIXI.filters.BlurFilter();
    var democracyText, fsocietyLogo;

    function createTeoria(id, x, y, w, h, title, thumb, url){

        var teoriaSmall = new Container();

        var teoriaThumb = new Sprite.fromImage(thumb);
        teoriaThumb.interactive = true;
        teoriaThumb.buttonMode = true;
        teoriaThumb.position.set(0, 0);
        teoriaThumb.width = w;
        teoriaThumb.height = h;
        teoriaThumb.link = url;
        teoriaThumb.on('mouseup', openModal);
        teoriaThumb.on('touchend', openModal);

        var teoriaTitle = new PIXI.Text(title,{ font : '12px Hack', fill : 0xffffff });
        teoriaTitle.position.set( 20, h-35 );

        var teoriaTitleBg = new PIXI.Graphics();
        teoriaTitleBg.beginFill(negro);
        teoriaTitleBg.lineStyle(1, rojo);
        teoriaTitleBg.drawRect(teoriaTitle.position.x-10, teoriaTitle.position.y-10, teoriaTitle.width+20, teoriaTitle.height+20);
        teoriaTitleBg.endFill();

        var teoriaBorder = new PIXI.Graphics();
        teoriaBorder.beginFill(negro);
        teoriaBorder.lineStyle(1, rojo);
        teoriaBorder.drawRect(-1, -1, w+2, h+2);
        teoriaBorder.endFill();

        //teoriaSmall.filters = [borroso];
        teoriaSmall.addChild(teoriaBorder);
        teoriaSmall.addChild(teoriaThumb);
        teoriaSmall.addChild(teoriaTitleBg);
        teoriaSmall.addChild(teoriaTitle);

        teoriaSmall.position.set(x, y);

        if( id == 0 ){
            var teoriaDestacadaTitle = new PIXI.Text('Teoría destacada',{ font : '18px Hack', fill : 0x000000 });
            teoriaDestacadaTitle.position.set( x+20, y-15 );

            var teoriaDestacadaTitleBg = new PIXI.Graphics();
            teoriaDestacadaTitleBg.beginFill(rojo);
            teoriaDestacadaTitleBg.drawRect(teoriaDestacadaTitle.position.x-10, teoriaDestacadaTitle.position.y-10, teoriaDestacadaTitle.width+20, teoriaDestacadaTitle.height+20);
            teoriaDestacadaTitleBg.endFill();

            teoriaDestacada.addChild(teoriaSmall);
            teoriaDestacada.addChild(teoriaDestacadaTitleBg);
            teoriaDestacada.addChild(teoriaDestacadaTitle);
        } else {
            grupoTeorias.addChild(teoriaSmall);
        }

        teorias.push(teoriaSmall);
    }

    function openModal(){
        //console.log(this);
        //console.log(this.link);

        $.magnificPopup.open({
            items: {
                src: this.link,
            },
            type: 'ajax',
            tLoading: 'Loading...',
            tError: 'File hacked.',
            alignTop: true,
            overflowY: 'scroll',
            closeOnBgClick: false,
            closeOnContentClick: false,
            removalDelay: 300,
            mainClass: 'mfp-fade',
            callbacks: {
                open: function() {
                },
                afterClose: function() {
                    teoriaDestacada.visible = true;
                    grupoTeorias.visible = true;
                },
                parseAjax: function(mfpResponse) {
                    mfpResponse.data = $(mfpResponse.data).find('#single');
                    //console.log('Ajax content loaded:', mfpResponse);
                },
                ajaxContentAdded: function() {
                    // Ajax content is loaded and appended to DOM
                    teoriaDestacada.visible = false;
                    grupoTeorias.visible = false;
                    //console.log(this.content);
                }
            }
        }, 0);
        //teoriaThumb.enabled = false;
    };

    function initTeorias(){

        // Disminuir cantidad de cortes
        glitchFilters[1].randomModeOdds = 0.95;

        // Leyenda de Fuck Society
        //democracyText = new PIXI.Text('fuck society, our democracy has been hacked.',{ font : '24px Arial', fill : 0x333333, align : 'center'});
        democracyText = new PIXI.Text('TENER EL CONTROL ES UNA ILUSIÓN',{ font : '24px Arial', fill : 0x333333, align : 'center'});
        democracyText.position.set( width/2 -democracyText.width/2, height);
        democracyText.rotation = -0.05;
        c.slide(democracyText, democracyText.position.x, height-100, 120);
        grupoGlitch.addChild(democracyText);

        // Fsociety Logo
        fsocietyLogo = new Sprite( resources[assetsFolder+"img/teorias/fsociety.png"].texture );
        fsocietyLogo.position.set(width/2,height/2);
        fsocietyLogo.anchor.set(0.5);
        fsocietyLogo.alpha = 0;
        c.fadeIn(fsocietyLogo, 600);
        c.slide(fsocietyLogo, width/2, fsocietyLogo.position.y-10, 90, "smoothstep", true, 0);
        grupoGlitch.addChild(fsocietyLogo);
        
        // Si se cargó el JSON, cargar Teorias
        loadJSON();
        http_request.onreadystatechange = function(){
            if ( http_request.readyState == 4 ){

                // Parse JSON data
                dbJSON = JSON.parse(http_request.responseText);
                //console.log(dbJSON.teorias.length);
                //console.log(dbJSON.teorias[1].title);

                // Crear teoría destacada
                // createTeoria(id, x, y, w, h, title, thumb, url);
                createTeoria(0, 50, 170, 480, 320, dbJSON.posts[0].title, dbJSON.posts[0].thumbnail_images.full.url, dbJSON.posts[0].url);

                // Crear teorías
                for(var i=1; i<dbJSON.posts.length; i++){
                    //var titleTemp = dbJSON.teorias[i].title;
                    //var thumbTemp = dbJSON.teorias[i].thumb;
                    //var urlTemp = dbJSON.teorias[i].url;

                    var titleTemp = dbJSON.posts[i].title;
                    var thumbTemp = dbJSON.posts[i].thumbnail_images.full.url;
                    var urlTemp = dbJSON.posts[i].url;
                    console.log(titleTemp +" "+ thumbTemp +" "+ urlTemp);

                    var xTemp = width/2 + Math.random()*(width/2-380-50);
                    var yTemp = (250+30)*i;
                    createTeoria(i, xTemp, yTemp, 380, 253, titleTemp, thumbTemp, urlTemp);
                }
            
                TweenLite.set(grupoTeorias, { pixi: { alpha: 0, y: height/2-200 }});
                TweenLite.to(grupoTeorias, 2, {pixi: { y: -160, alpha: 1 }, delay: 1});
                grupoGlitch.addChild(grupoTeorias);

                TweenLite.set(teoriaDestacada, { pixi: { alpha: 0, y: -160 }});
                TweenLite.to(teoriaDestacada, 2, {pixi: { y: 0, alpha: 1 }, delay: 1});
                grupoGlitch.addChild(teoriaDestacada);

                state = loopTeorias;
            }

        }
    }


    function loopTeorias(){

        // Mover Leyenda
        if (Math.random() > 0.99) {
            democracyText.position.set( Math.random()*width - democracyText.width, Math.random()*height - democracyText.height);
        }
    }


    // Resize Canvas
    function resizeCanvas(width, height){
        // Global
        logoSpace.position.x = width-logoSpace.width-30;            

        // State specific
        if( state === loopLogin ){
            grupoLogin.position.set(width/2, height/2);
            loginBtn.position.set( width/2, height/2 + 100 );
        } else if( state === loopTeorias ){
        }
    }


    // Basic Scroll
    //http://www.javascriptkit.com/javatutors/onmousewheel.shtml
    //https://www.sitepoint.com/html5-javascript-mouse-wheel/
    if (document.addEventListener) {
        document.addEventListener("mousewheel", MouseWheelHandler, false); // IE9, Chrome, Safari, Opera
        document.addEventListener("DOMMouseScroll", MouseWheelHandler, false); // Firefox
    }
    else document.attachEvent("onmousewheel", MouseWheelHandler); // IE 6/7/8

    function MouseWheelHandler(e) {
        var e = window.event || e; // old IE support
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

        if( state == loopTeorias ){
            grupoTeorias.position.y = Math.max( (grupoTeorias.height*-1), Math.min( -160, grupoTeorias.position.y+(30 * delta) ));
        }

        return false;
    }

    // Zynga Scroll
    //https://gist.github.com/iamdustan/158f4c7a6c28434f3192#file-ui-js-L145-L230


    // Filters (Shaders)
    var glitchFilters = [
        {
            name: 'Color',
            filter: new BlueRaiseFilter(),
            isActive: false,
            randomModeOdds: 0.9
        },
        {
            name: 'Cortes',
            filter: new CutSliderFilter(),
            values: [{name: 'rand', min: 0, max: 20}, {name: 'val1', min: 0, max: 700}, {name: 'val2', min: 0, max: 100} ],
            isActive: false,
            randomModeOdds: 0.6
        },
        {
            name: 'Ruido',
            filter: new NoiseFilter(),
            useAutoRand: true,
            values: [{name: 'strength', min: .0, max: 0.2}],
            isActive: false,
            randomModeOdds: 0.3
        }
    ];

    function applyShaders(){

        var item = null;

        // values that the filters might require updating on each step
        for (var i = 0; i < glitchFilters.length; i++) {
            item = glitchFilters[i];
            if (item.useAutoRand) {
                item.filter.rand = Math.random();
            }
        }

        // a very clumsy demo mode
        if (window.randomMode) {
            if (Math.random() > 0.95) {
                for (var i = 0; i < glitchFilters.length; i++) {
                    item = glitchFilters[i];
                    item.isActive = Math.random() > item.randomModeOdds;
                }
                onIsActiveChange();
            }
            for (var i = 0; i < glitchFilters.length; i++) {
                item = glitchFilters[i];
                if (item.isActive && item.values) {
                    for (var j = 0; j < item.values.length; j++) {
                        var value = item.values[j];
                        if (Math.random() > 0.9) {
                            item.filter[value.name] = randomBetween(value.min, value.max);
                        }
                    }
                }
            }
        }
    }


    // GUI
    var gui = new dat.GUI({ autoPlace: false });
    var guiContainer = document.getElementById('gui');
    guiContainer.appendChild(gui.domElement);

    gui.add(window, 'randomMode').onChange(onrandomModeChange);
    for (var i = 0; i < glitchFilters.length; i++) {
        var item = glitchFilters[i];
        var folder = gui.addFolder(item.name);
        folder.add(item, 'isActive').listen().onChange(onIsActiveChange);
        if (item.values) {
            for (var j = 0; j < item.values.length; j++) {
                var valueItem = item.values[j];
                folder.add(item.filter, valueItem.name, valueItem.min, valueItem.max).listen();
            }
        }
    }

    // GUI: Activar filtro
    function onIsActiveChange() {
        var glitchFctiveFilters = [];
        for (var i = 0; i < glitchFilters.length; i++) {
            var item = glitchFilters[i];
            if (item.isActive) {
                glitchFctiveFilters.push(item.filter);
            }
        }
        grupoGlitch.filters = glitchFctiveFilters.length ? glitchFctiveFilters : null;
    }

    // GUI: Modo Random
    function onrandomModeChange(value) {
        if (!value) {
            for (var i = 0; i < glitchFilters.length; i++) {
                var item = glitchFilters[i];
                item.isActive = false;
            }
            onIsActiveChange();
        }
    }

    // GUI: Rango Random
    function randomBetween(lower, upper, round) {
        var range = upper - lower;
        var rnd = Math.random() * range;
        var result = lower + rnd;
        if (round) {
            result = Math.round(result);
        }
        return result;
    }

    // Resize canvas
    function resize() {
        width = window.innerWidth-3;
        height = window.innerHeight-3;
        resizeCanvas(width, height);
        renderer.resize(width, height);
    }

    // Framerate stats
    function initStats() {

        var stats = new Stats();

        stats.setMode(0); // 0: fps, 1: ms

        // Align top-left
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.bottom = '0px';

        document.getElementById("stats").appendChild(stats.domElement);

        return stats;
    }

}());

$(document).ready(function() {

    $('.simple-ajax-popup-align-top').magnificPopup({
        type: 'ajax',
        alignTop: true,
        overflowY: 'scroll' // as we know that popup content is tall we set scroll overflow by default to avoid jump
    });

    $('.simple-ajax-popup').magnificPopup({
        type: 'ajax'
    });

    $('.popup-modal').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#username',
        modal: true
    });
    
});