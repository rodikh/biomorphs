(function (CreatureRenderer, dat) {
    'use strict';

    var canvas = document.querySelector('#creature1');
    var ctx = canvas.getContext('2d');

    var cat = {
        eyes: {
            size: 15,        // 11, 15, 19
            color: '#ffaa11'
        },
        behavior: {
            interested: 'following' // following, ignoring, indifferent
        },
        ears: {
            size: 0.3, // 0.1, 0.3, 0.5
            offset: 0
        },
        whiskers: {
            length: 40, // 30, 40, 50
            curve: 0
        }
    };

    var renderer = new CreatureRenderer(ctx, cat);

    window.renderer = renderer;
    window.cat = cat;

    renderer.draw();
} (window.CreatureRenderer, window.dat));
