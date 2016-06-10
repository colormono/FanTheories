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
    var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
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


    // Preloader
    PIXI.loader
        .add([
            "img/logo-mrrobot-rojo.png",
            "img/logo-space.png",
            "img/bg.jpg",
            "img/login/box.png",
            "img/login/elliot.png",
            "img/login/fantheory.png",
            "img/login/unete.png",
            "img/fsociety.png"
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
        grupoSobre = new Container();
        grupoSobre.alpha = 0;
        c.fadeIn(grupoSobre, 120);
        c.slide(grupoSobre, 0, 30, 90);

        // Logo MR.Robot
        logoMrobot = new Sprite( resources["img/logo-mrrobot-rojo.png"].texture );
        logoMrobot.position.x = 30;
        txtEstreno = new PIXI.Text( '////ESTRENO////\nMIÉRCOLES 13 DE JULIO 22HS.', { font: '13px monospace', fill: '#FFFFFF', align: 'left' });
        txtEstreno.position.set(245, 2);

        // Logo Space
        logoSpace = new Sprite( resources["img/logo-space.png"].texture );
        logoSpace.width = 140;
        logoSpace.height = 29.67;
        logoSpace.position.x = width-logoSpace.width-30;

        // Fondo
        grupoFondo = new Container();
        grupoFondo.alpha = 0;
        c.fadeIn(grupoFondo, 60);
        bg = new Sprite( resources["img/bg.jpg"].texture );

        // Rayitas
        rayitas = new Container();
        rayitas2 = new Container();

        // Box
        box = new Sprite( resources["img/login/box.png"].texture );       
        box.anchor.set(0.5);

        // DDOS Script
        ddos = new PIXI.Text( 'ddos.bat', { font: '12px monospace', fill: '#666666', align: 'left' });
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
        loginElliot = new Sprite( resources["img/login/elliot.png"].texture );
        loginElliot.position.y = 50;
        loginElliot.anchor.set(0.5);
        loginElliot.alpha = 0;
        c.fadeIn(loginElliot, 120);
        c.slide(loginElliot, 0, loginElliot.position.y-50, 90);

        // Fun Theory
        loginFunTheroy = new Sprite( resources["img/login/fantheory.png"].texture );
        loginFunTheroy.position.y = -60;
        loginFunTheroy.anchor.set(0.5);
        loginFunTheroy.alpha = 0;
        c.fadeIn(loginFunTheroy, 30);
        c.slide(loginFunTheroy, 0, loginFunTheroy.position.y-10, 90, "smoothstep", true, 0);

        // Glitchear
        grupoLogin.addChild(loginElliot);
        grupoLogin.addChild(loginFunTheroy);
        grupoGlitch.addChild(grupoLogin);

        // Botón login
        loginBtn = new Sprite( resources["img/login/unete.png"].texture );
        loginBtn.anchor.set(0.5);
        t.makeInteractive(loginBtn);
        c.pulse(loginBtn, 60, 0.5);
        stage.addChild(loginBtn);

        loginBtn.over = function(){
            console.log("over");
        };
        loginBtn.out = function(){
            console.log("out");
        };
        loginBtn.tap = function(){
            loginBtn.enabled = false;
            initTeorias();
        };

        // Animar
        state = stateLogin;
    }

    function stateLogin(){
        // Centrar
        grupoLogin.position.set(width/2, height/2);
        loginBtn.position.set( width/2, height/2 + 100 );
        logoSpace.position.x = width-logoSpace.width-30;
    }


    // STATE: teorias
    var grupoTeorias = new Container();
    var borroso = new PIXI.filters.BlurFilter();
    var democracyText;

    function initTeorias(){

        // Disminuir cantidad de cortes
        glitchFilters[1].randomModeOdds = 0.95;

        // Fuck Society
        democracyText = new PIXI.Text('fuck society, our democracy has been hacked.',{ font : '24px Arial', fill : 0x333333, align : 'center'});
        democracyText.position.set( width/2 -democracyText.width/2, height);
        democracyText.rotation = -0.05;
        c.slide(democracyText, democracyText.position.x, height-100, 120);
        grupoGlitch.addChild(democracyText);

        // Teorias
        var lastY = 0;

        //for(var i=0; i<10; i++){
            var teoriaSmall = new Container();

            var teoriaThumb = new Sprite.fromImage('img/photos/photo-01.jpg');
            teoriaThumb.position.set(0, lastY);
            teoriaThumb.width = 480;
            teoriaThumb.height = 319;

            var teoriaTitle = new PIXI.Text('Elliot es un marciano '+i+'.',{ font : '17px monospace', fill : 0xffffff });
            teoriaTitle.position.set( teoriaTitle.position.x+20, lastY+teoriaThumb.height*0.87 );

            var teoriaTitleBg = new PIXI.Graphics();
            teoriaTitleBg.beginFill(negro);
            teoriaTitleBg.lineStyle(1, rojo);
            teoriaTitleBg.drawRect(teoriaTitle.position.x-11, teoriaTitle.position.y-10, teoriaTitle.width+20, teoriaTitle.height+20);
            teoriaTitleBg.endFill();

            var teoriaBorder = new PIXI.Graphics();
            teoriaBorder.beginFill(negro);
            teoriaBorder.lineStyle(1, rojo);
            teoriaBorder.drawRect(teoriaThumb.position.x-1, lastY-1, teoriaThumb.width+2, teoriaThumb.height+2);
            teoriaBorder.endFill();

            //teoriaSmall.filters = [borroso];

            var link = "teoria"+i+".html";

            teoriaSmall.addChild(teoriaBorder);
            teoriaSmall.addChild(teoriaThumb);
            teoriaSmall.addChild(teoriaTitleBg);
            teoriaSmall.addChild(teoriaTitle);

            teoriaSmall.position.x = 30 + Math.random() * (width - teoriaSmall.width - 30);

            // Interactividad
            t.makeInteractive(teoriaThumb);
            var pulseTween = c.pulse(teoriaThumb, 10, 0.5);

            teoriaThumb.over = function(){
                pulseTween.play();
            };
            teoriaThumb.out = function(){
                pulseTween.pause();
            };
            teoriaThumb.tap = function(){
                pulseTween.pause();
                console.log(this);

                $.magnificPopup.open({
                  items: {
                    src: 'img/photos/photo-01.jpg'
                  },
                  type: 'image'

                  // You may add options here, they're exactly the same as for $.fn.magnificPopup call
                  // Note that some settings that rely on click event (like disableOn or midClick) will not work here
                }, 0);
                //teoriaThumb.enabled = false;
            };
           
            grupoTeorias.addChild(teoriaSmall);

            lastY = lastY + teoriaThumb.height + 30;
        //}

        grupoTeorias.position.y = height/2-teoriaSmall.height/2;

        grupoGlitch.addChild(grupoTeorias);

        state = stateTeorias;
    }

    function stateTeorias(){

        // Sale Login
        grupoGlitch.removeChild(grupoLogin);
        stage.removeChild(loginBtn);

        //TweenLite.to(loginFunTheroy, 2, {pixi: { y: -100, scale: 1 }});
        //TweenLite.to(loginBtn, 1, {pixi: { opacity: 0, ease: Expo.easeOut }});

        // Desaparece Elliot
        /*
        if( grupoLogin.alpha > 0 ){
            grupoLogin.alpha -= 0.025;
        } else {
            grupoGlitch.removeChild(grupoLogin);
        }
        */

        count += 0.005;
        var blurAmount = Math.cos(count);
        borroso.blur = blurAmount*5;
    }


    // STATE: teoria
    function initTeoria(){
    }

    function stateTeoria(){
    }


    // STATE: votando
    function initVotando(){
    }

    function stateVotando(){
    }


    // STATE: hacked
    function initHacked(){
    }

    function stateHacked(){
    }


    // Resize Canvas
    function resizeCanvas(){
        if( state === stateLogin ){}
    }


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
        width = window.innerWidth;
        height = window.innerHeight;
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

