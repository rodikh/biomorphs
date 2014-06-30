(function (window, utils) {
    'use strict';

    var Nature = function () {
    };

    Nature.prototype.createCreature = function (Creature, options) {
        this.creature = new Creature(options);
    };

    Nature.prototype.createGeneration = function (generationSize) {
        this.generation = [];
        var i;

        if (!generationSize || typeof generationSize !== 'number') {
            generationSize = 10;
        }

        for (i = 0; i < generationSize; i++) {
            this.generation.push(this.creature.reproduce());
        }

        this.drawGeneration(this.generation, this.creature);

        return this;
    };

    Nature.prototype.creatureSelect = function (event) {
        var index = event.currentTarget.getAttribute('data-index');
        this.creature = this.generation[index];
        this.createGeneration();
        utils.createUrl(this.creature);
    };

    Nature.prototype.drawGeneration = function (generation, parent) {
        var parentElement = document.querySelector('.parent-element');

        while (parentElement.hasChildNodes()) {
            parentElement.removeChild(parentElement.lastChild);
        }

        parent.draw(parentElement);

        var i,
            generationLength = generation.length,
            element = document.querySelector('.creatures');

        while (element.hasChildNodes()) {
            element.removeChild(element.lastChild);
        }

        for (i = 0; i < generationLength; i++) {
            var creatureElement = generation[i].draw(element);
            creatureElement.setAttribute('data-index', i);
            creatureElement.onclick = this.creatureSelect.bind(this);
        }
    };

    window.Nature = Nature;
} (window, window.utils));
