(function (utils) {
    'use strict';

    /**
     * A mutable creature
     * @param {*} [options] Initial Values
     * @constructor
     */
    var Creature = function (options) {
        if (!options) {
            options = {};
        }

        this.height = options.height || 10;
        this.width = options.width  || 10;
        this.color = options.color || 'red';
        this.shape = options.shape || 'round';
        this.opacity = options.opacity || 1;
    };

    /**
     * Mutate the creature by mutating one of it's genes
     * @returns {Creature}
     */
    Creature.prototype.mutate = function () {
        var gene = utils.probableFromArray(this.genes, 0.5);

        if (gene) {
            return gene.mutate(this);
        }

        return this;
    };

    /**
     * Spawn a new creature as an offspring of the current creature
     * @returns {Creature}
     */
    Creature.prototype.reproduce = function () {
        var newCreature = new Creature(this);
        newCreature.mutate();
        return newCreature;
    };

    /**
     * Draws the creature to a given element
     * @param {HTMLElement} element Element to draw creatures onto
     * @returns {HTMLElement} The created element
     */
    Creature.prototype.draw = function (element) {
        var creatureElement = document.createElement('div');
        creatureElement.className = 'creature';

        var div = document.createElement('div');
        div.style.height = this.height + 'px';
        div.style.width = this.width + 'px';
        div.style.backgroundColor = this.color;

        creatureElement.appendChild(div);

        if (element) {
            element.appendChild(creatureElement);
        }

        return creatureElement;
    };

    window.Creature = Creature;
} (window.utils));
