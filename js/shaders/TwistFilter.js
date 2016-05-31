/**
 * @author Matt Smith http://gun.net.au @ktingvoar
 */

var PIXI_GLITCH = PIXI_GLITCH || {};

PIXI_GLITCH.TwistFilter = function () {
    PIXI.AbstractFilter.call(this);

    this.passes = [this];

    this.uniforms = {
        rand: {type: '1f', value: 0.5},
        timer: {type: '1f', value: 0},
        val2: {type: '1f', value: 5},
        val3: {type: '1f', value: 55},
        dimensions: {type: '4fv', value: [0, 0, 0, 0]}
    };

    this.fragmentSrc = [
        'precision mediump float;',
        'uniform sampler2D uSampler;',
        'uniform float rand;',
        'uniform float timer;',
        'uniform float val2;',
        'uniform float val3;',
        'uniform vec4 dimensions;',
        'varying vec2 vTextureCoord;',
        'void main (void)',
        '{',
        '   float trueWidth = dimensions.x;',
        '   float trueHeight = dimensions.y;',
        '   vec2 pos = vTextureCoord * vec2(dimensions);',
        '   vec2 texCoord = vec2(max(3.0, min(float(trueWidth), pos.x + sin(pos.y / (153.25 * rand * rand) * rand + rand * val2 + timer * 3.0) * val3)), max(3.0, min(float(trueHeight), pos.y + cos(pos.x/(251.57 * rand * rand) * rand + rand * val2 + timer * 2.4) * val3)- 3.0));',
        '   vec4 col = texture2D(uSampler, texCoord / vec2(dimensions));',
        '   gl_FragColor.rgba = col.rgba;',
        '}'
    ];

};

PIXI_GLITCH.TwistFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
PIXI_GLITCH.TwistFilter.prototype.constructor = PIXI_GLITCH.TwistFilter;

Object.defineProperty(PIXI_GLITCH.TwistFilter.prototype, 'rand', {
    get: function() {
        return this.uniforms.rand.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.rand.value = value;
    }
});

Object.defineProperty(PIXI_GLITCH.TwistFilter.prototype, 'timer', {
    get: function() {
        return this.uniforms.timer.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.timer.value = value;
    }
});

Object.defineProperty(PIXI_GLITCH.TwistFilter.prototype, 'val2', {
    get: function() {
        return this.uniforms.val2.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.val2.value = value;
    }
});

Object.defineProperty(PIXI_GLITCH.TwistFilter.prototype, 'val3', {
    get: function() {
        return this.uniforms.val3.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.val3.value = value;
    }
});

