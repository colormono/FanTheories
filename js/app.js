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
    var app = document.getElementById('app');
    var page = document.getElementById('page');
    var stats = initStats();
    var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var renderer = autoDetectRenderer(width, height);
    app.appendChild(renderer.view);    

    window.randomMode = true;
    window.addEventListener('orientationchange', resize, false);
    window.addEventListener('resize', resize, false);

    // Assets
    var state = stateLogin;
    var stage = new Container();
    var grupoFondo = new Container();
    var fsociety, bg, box;
    var count = 0;
    var loginElliot, loginFunTheroy, loginScript;

    // Filters
    var glitchFilters = [
        // color filters
        {
            name: 'Color',
            filter: new BlueRaiseFilter(),
            isActive: false,
            randomModeOdds: 0.9
        },
        // distorty filters
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

    // Hide page on start
    page.style.visibility = "hidden";

    // Preloader
    PIXI.loader
        .add([
            "img/bg.jpg",
            "img/login/box.png",
            "img/login/elliot.png",
            "img/login/fantheory.png",
            "img/fsociety.png"
        ])
        .on("progress", loadProgressHandler)
        .load(setup);

    function loadProgressHandler(loader, resource){

        //Imprimir que URL está cargando
        console.log('loading: '+resource.url);

        //Imprimir porcentage de carga
        console.log('progress: '+loader.progress+'%');

    }

    // Setup
    function setup(){

        page.style.visibility = "visible";

        // Fondo
        bg = new Sprite( resources["img/bg.jpg"].texture );
        grupoFondo.addChild(bg);

        // DDOS Script
        loginScript = new PIXI.Text( 'ddos.bat', { font: '10px monospace', fill: '#ffffff', align: 'left' }
        );
        loginScript.position.set(30, 120);
        grupoFondo.addChild(loginScript);

        // Elliot
        loginElliot = new Sprite( resources["img/login/elliot.png"].texture );
        grupoFondo.addChild(loginElliot);

        // Rayitas
        var rayitas = new Container();
        for (var i=0; i<16; i++) {
            var rayita = new Graphics();
            rayita.beginFill(0xBB0000, 1);
            rayita.drawRect(Math.random()*width, 85+Math.random()*height*0.85, Math.random()*200, Math.random()*50);
            rayitas.addChild(rayita);
        }
        grupoFondo.addChild(rayitas);

        // Box
        box = new Sprite( resources["img/login/box.png"].texture );       
        box.anchor.set(0.5);
        grupoFondo.addChild(box);

        // Fun Theory
        loginFunTheroy = new Sprite( resources["img/login/fantheory.png"].texture );
        loginFunTheroy.anchor.set(0.5);
        grupoFondo.addChild(loginFunTheroy);

        // fsociety
        fsociety = new Sprite( resources["img/fsociety.png"].texture );
        fsociety.position.set(width/2, height/2);
        fsociety.width = 140;
        fsociety.height = 140;
        fsociety.anchor.set(0.5);
        fsociety.interactive = true;
        fsociety.on('mousedown', onDown);
        fsociety.on('touchstart', onDown);
        stage.addChild(fsociety);

        // Añadir grupo fondo al stage
        stage.addChild(grupoFondo);

        TweenLite.set(loginFunTheroy, { pixi: {
            alpha: 0.85,
            anchor: 0.5,
            scale: 0.7
        }});

        //TweenLite.to(loginFunTheroy, 1, {pixi: { x: 200, scale: 2}});


        // Posiciones para el fondo
        updateGrupoFondo();

        // Loop
        loop();
    }

    // Update grupoFondo
    function updateGrupoFondo(){
        bg.width = width;
        bg.height = height;

        loginElliot.position.set(width/2, height/2);
        loginElliot.anchor.set(0.5);

        loginFunTheroy.position.x = loginElliot.x;
    }

    // Loop
    function loop(){

        // Loop this function 60 fps
        requestAnimationFrame(loop);

        // Update current state
        state();

        // Update stats
        stats.update();

        // Apply Shaders
        applyShaders();

        // Render the stage
        renderer.render(stage);
    }

    // State: login
    function stateLogin(){

        //loginFunTheroy.position.x = 1 + Math.cos(count) * 0.04;
        loginFunTheroy.position.y = loginElliot.y-loginElliot.height*0.14 + Math.sin(count) * 4;

        // 20% de las veces
        if (Math.random() > 0.8) {
            // Alpha para el script
            loginScript.alpha = Math.random()/2;
        }

        // 20% de las veces
        if (Math.random() > 0.98) {
            // Cambair caja de posicion
            box.position.set(Math.random()*width, Math.random()*height);
        }

        // Actualizar cantidad de ataques
        loginScript.text = '//DDOS ATTACKS '+ Math.floor(count) +'\n\n┌─┐┌─┐┌─┐┌─┐┬┌─┐┌┬┐┬ ┬\n├┤ └─┐│ ││  │├┤  │ └┬┘\n└  └─┘└─┘└─┘┴└─┘ ┴  ┴ \n\n@echo off\nmode 67,16\ntitle DDOS Attack\ncolor 05\ncls\necho.\necho ÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ\necho DDOS Bayu Ae\necho ÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ\necho.\nset /p x=Apa-Targer Loe:\necho.\necho ÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ\nping %x%\necho "fuck society, our democracy has been hacked."\n@ping.exe 127.0.0.1 -n 5 -w 1000 > nul\ngoto Next\n:Next\necho.\necho.\necho.\nset /p m=Ip Host:\necho.\nset /p n=Packet Size:\necho.\n:DDOS\ncolor 0c\necho Serang Server %m%\nping %m% -i %n% -t >nul\ngoto DDOS \n\n//DDOS ATTACKS '+ Math.floor(count) +'';

        // Contador
        count += 0.05;
    }

    // State: play
    function statePlay(){

        //Update the sprite's velocity
        fsociety.vx = 1;
        fsociety.vy = 2;

        //Apply the velocity values to the sprite's position to make it move
        fsociety.x += fsociety.vx;
        fsociety.y += fsociety.vy;

        if( fsociety.x > renderer.width ){
            fsociety.x = 0;
        }
        if( fsociety.y > renderer.height ){
            fsociety.y = 0;
        }

    }

    // State: waiting
    function stateWaiting(){
        // Text
        var text = new PIXI.Text('fuck society, our democracy has been hacked.',{ font : '24px Arial', fill : 0xffffff, align : 'center'});
        text.position.set(100,100);
        //text.rotation = Math.random();
        text.rotation = -0.05;
        stage.addChild(text);

        state = statePlay;
    }

    // State: teorias
    function stateTeorias(){
    }

    // State: teoria
    function stateTeoria(){
    }

    // State: votando
    function stateVotando(){
    }

    // State: hacked
    function stateHacked(){
    }

    // User Interactions
    function onDown(eventData) {
        state = stateWaiting;
    }

    // Apply Shaders
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
        grupoFondo.filters = glitchFctiveFilters.length ? glitchFctiveFilters : null;
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
        updateGrupoFondo();
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