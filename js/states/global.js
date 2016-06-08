// Global
var grupoFondo = new Container();
var rayitas = new Container();
var bg, box;
var grupoSobre = new Container();
var logoMrobot, logoSpace;

function initGlobal(){

    // Fondo
    bg = new Sprite( resources["img/bg.jpg"].texture );
    grupoFondo.addChild(bg);

    // Rayitas
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

    // Añadir grupo al stage
    grupoGlitch.addChild(grupoFondo);

    // Añadir grupo de Glitches al stage        
    stage.addChild(grupoGlitch);

    // Iniciar login
    initLogin();

    // Start Loop
    loop();
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
            for (var i=0; i<16; i++) {
                var rayita = new Graphics();
                rayita.beginFill(0xBB0000, 1);
                rayita.drawRect(Math.random()*width, 85+Math.random()*height*0.85, Math.random()*200, Math.random()*50);
                rayitas.addChild(rayita);
            }
            grupoFondo.addChild(rayitas);
        }
    }
}