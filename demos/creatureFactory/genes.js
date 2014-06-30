(function (window, utils) {
    'use strict';

    var colorGene = {
        probability: 0.2,
        bases: ['red', 'blue', 'green', 'yellow', 'purple', 'pink'],
        mutate: function (input) {
            var randomBase = utils.randomFromArray(this.bases);

            input.color = randomBase;
        }
    };

    var heightGene = {
        probability: 0.8,
        bases: [10, 20, 30, 40],
        mutate: function (input) {
            var randomBase = utils.randomFromArray(this.bases);

            input.height = randomBase;
        }
    };

    var widthGene = {
        probability: 0.8,
        bases: [10, 20, 30, 40],
        mutate: function (input) {
            var randomBase = utils.randomFromArray(this.bases);

            input.width = randomBase;
        }
    };


    window.genes = {
        colorGene: colorGene,
        heightGene: heightGene,
        widthGene: widthGene
    };

} (window, window.utils));
