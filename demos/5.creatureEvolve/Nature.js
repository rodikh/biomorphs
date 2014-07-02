(function (utils) {
    'use strict';

    /**
     * An object that manages creatures and their evolution
     * @constructor
     */
    var Nature = function () {
    };

    /**
     * Create a new creature from the given constructor
     * @param {function} Creature A creature constructor function
     * @param options
     * @returns {Nature}
     */
    Nature.prototype.createCreature = function (Creature,  options) {
        this.creature = new Creature(options);

        return this;
    };

    /**
     * Creates a generation of offspring from the stored creature.
     * @param {number} [generationSize] Number of offspring to spawn
     * @returns {Nature}
     */
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

    /**
     * Click handler for a drawn creature
     * @param {event} event Click event, used to find index of creature
     */
    Nature.prototype.creatureSelect = function (event) {
        var index = event.currentTarget.getAttribute('data-index');
        this.creature = this.generation[index];
        this.createGeneration();
        utils.hashUrl('creature', this.creature);
    };

    /**
     * Draws the given generation to an HTML element
     * @param {[Creature]} generation Generation to draw
     * @param {Creature} parent Parent of generation.
     */
    Nature.prototype.drawGeneration = function (generation, parent) {
        var parentElement = document.querySelector('.parent-element');

        while (parentElement.hasChildNodes()) {
            parentElement.removeChild(parentElement.lastChild);
        }

        var canvas = document.createElement('canvas');
        parentElement.appendChild(canvas);
        canvas.width = 150;
        canvas.height = 150;
        var ctx = canvas.getContext('2d');
        parent.draw(ctx);
        var i,
            generationLength = generation.length,
            element = document.querySelector('.creatures');

        while (element.hasChildNodes()) {
            element.removeChild(element.lastChild);
        }

        var creatureElement;

        for (i = 0; i < generationLength; i++) {
            canvas = document.createElement('canvas');
            element.appendChild(canvas);
            canvas.width = 150;
            canvas.height = 150;
            ctx = canvas.getContext('2d');
            creatureElement = generation[i].draw(ctx);
            creatureElement.setAttribute('data-index', i + '');
            creatureElement.onclick = this.creatureSelect.bind(this);
        }
    };

    window.Nature = Nature;
} (window.utils));
