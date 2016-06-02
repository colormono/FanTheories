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
    var stats = initStats();
    var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    //var canvas = document.getElementById('canvas');
    var renderer = autoDetectRenderer(width, height);
    document.body.appendChild(renderer.view);    
    window.randomMode = true;
    window.addEventListener('orientationchange', resize, false);
    window.addEventListener('resize', resize, false);

    // Assets
    var state = stateLogin;
    var stage = new Container();
    var grupoFondo = new Container();
    var logo, bg;
    var count = 0;
    var loginElliot, loginFunTheroy;

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

    // Preloader
    PIXI.loader
        .add([
            "img/bg.jpg",
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

        // Fondo
        /*
        bg = new Graphics();
        bg.beginFill(0x000000, 1);
        bg.drawRect(0, 0, width, height);
        grupoFondo.addChild(bg);
        */
        bg = new Sprite( resources["img/bg.jpg"].texture );
        bg.width = width;
        bg.height = height;
        bg.position.set(width/2, height/2);
        bg.anchor.set(0.5);
        grupoFondo.addChild(bg);

        // Logo
        logo = new Sprite( resources["img/fsociety.png"].texture );
        logo.position.set(width/2, height/2);
        logo.width = 140;
        logo.height = 140;
        logo.anchor.set(0.5);
        logo.interactive = true;
        logo.on('mousedown', onDown);
        logo.on('touchstart', onDown);
        grupoFondo.addChild(logo);

        // Elliot
        loginElliot = new Sprite( resources["img/login/elliot.png"].texture );
        loginElliot.position.set(width/2, height/2);
        loginElliot.anchor.set(0.5);
        grupoFondo.addChild(loginElliot);

        // Fun Theory
        loginFunTheroy = new Sprite( resources["img/login/fantheory.png"].texture );
        loginFunTheroy.position.set(loginElliot.x,loginElliot.y-loginElliot.height*0.13);
        loginFunTheroy.anchor.set(0.5);
        grupoFondo.addChild(loginFunTheroy);

        // Añadir grupo fondo al stage
        stage.addChild(grupoFondo);


        // Loop
        loop();
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
        count += 0.05;
    }

    // State: play
    function statePlay(){

        //Update the sprite's velocity
        logo.vx = 1;
        logo.vy = 2;

        //Apply the velocity values to the sprite's position to make it move
        logo.x += logo.vx;
        logo.y += logo.vy;

        if( logo.x > renderer.width ){
            logo.x = 0;
        }
        if( logo.y > renderer.height ){
            logo.y = 0;
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

        bg.width = width;
        bg.height = height;

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