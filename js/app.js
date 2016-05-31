'use strict';
(function () {

    window.addEventListener('orientationchange', resize, false);
    window.addEventListener('resize', resize, false);

    // Aliases
    var autoDetectRenderer = PIXI.autoDetectRenderer,
        loader = PIXI.loader,
        resources = PIXI.loader.resources,
        Sprite = PIXI.Sprite,
        TextureCache = PIXI.utils.TextureCache,
        Texture = PIXI.Texture,
        Rectangle = PIXI.Rectangle;

    // Globals
    window.randomMode = true;
    var stats = initStats();
    var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    //var canvas = document.getElementById('canvas');
    var renderer = PIXI.autoDetectRenderer(width, height);
    document.body.appendChild(renderer.view);
    var stage = new PIXI.Container();
    var state = play;

    // Filters
    var glitchFilters = [
        // color glitchFilters
        {
            name: 'BlueRaise',
            filter: new BlueRaiseFilter(),
            isActive: false,
            randomModeOdds: 0.9
        },
        // distorty glitchFilters
        {
            name: 'CutSlider',
            filter: new CutSliderFilter(),
            values: [{name: 'rand', min: 0, max: 20}, {name: 'val1', min: 0, max: 700}, {name: 'val2', min: 0, max: 100} ],
            isActive: false,
            randomModeOdds: 0.6
        },
        {
            name: 'Noise',
            filter: new NoiseFilter(),
            useAutoRand: true,
            values: [{name: 'strength', min: 0, max: 0.5}],
            isActive: false,
            randomModeOdds: 0.5
        }
    ];

    // GUI
    var gui = new dat.GUI();
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

    function onIsActiveChange() {
        var glitchFctiveFilters = [];
        for (var i = 0; i < glitchFilters.length; i++) {
            var item = glitchFilters[i];
            if (item.isActive) {
                glitchFctiveFilters.push(item.filter);
            }
        }
        stage.filters = glitchFctiveFilters.length ? glitchFctiveFilters : null;
    }

    function onrandomModeChange(value) {
        if (!value) {
            for (var i = 0; i < glitchFilters.length; i++) {
                var item = glitchFilters[i];
                item.isActive = false;
            }
            onIsActiveChange();
        }
    }

    function randomBetween(lower, upper, round) {
        var range = upper - lower;
        var rnd = Math.random() * range;
        var result = lower + rnd;
        if (round) {
            result = Math.round(result);
        }
        return result;
    }

    // Loader
    PIXI.loader
        .add([
            "img/baddie.png",
            "img/diamond.png",
            "img/dude.png",
            "img/firstaid.png",
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

    // Assets
    var logo;
    var bg;



    function setup(){

        console.log("setup");

        // Fondo
        bg = new PIXI.Graphics();
        bg.beginFill(0x000000, 1);
        bg.drawRect(0, 0, width, height);
        stage.addChild(bg);


        //Crear estrella
        logo = new Sprite( resources["img/fsociety.png"].texture );
        
        //Posicion inicial
        logo.position.set(200,150);
        logo.width = 140;
        logo.height = 140;
        logo.anchor.set(0.5);
        logo.rotation = 0;

        //Agregar al stage
        stage.addChild(logo);

        // logot the game loop
        gameLoop();
    }


    function gameLoop(){

        // Loop this function 60 fps
        requestAnimationFrame(gameLoop);

        // Update current state
        state();

        // Update stats
        stats.update();

        // Render the stage
        renderer.render(stage);
    }


    function play(){

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

    function resize() {
        //w = window.innerWidth - 16;
        //h = window.innerHeight - 16;
        width = window.innerWidth;
        height = window.innerHeight;
        renderer.resize(width, height);
    }

    function initStats() {

        var stats = new Stats();

        stats.setMode(0); // 0: fps, 1: ms

        // Align top-left
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '100px';

        document.getElementById("Stats-output").appendChild(stats.domElement);

        return stats;
    }

}());