(function (utils) {
    'use strict';

    var colorGene = {
        probability: 0.2,
        bases: ['red', 'blue', 'green', 'yellow', 'purple', 'pink'],
        mutate: function (input) {
            input.color = utils.randomFromArray(this.bases);;
        }
    };

    var heightGene = {
        probability: 0.8,
        bases: [10, 20, 30, 40],
        mutate: function (input) {
            input.height = utils.randomFromArray(this.bases);
        }
    };

    var widthGene = {
        probability: 0.8,
        bases: [10, 20, 30, 40],
        mutate: function (input) {
            input.width = utils.randomFromArray(this.bases);
        }
    };


    window.genes = {
        colorGene: colorGene,
        heightGene: heightGene,
        widthGene: widthGene
    };

} (window.utils));
