(function (utils, CreatureRenderer) {
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

        this.eyeSize = options.eyeSize || 15;                   // 11, 15, 19
        this.eyeColor = options.eyeColor || 'blue';
        this.behavior = options.behavior || 'indifferent';      // following, ignoring, indifferent
        this.earSize = options.earSize || 0.3;                  // 0.1, 0.3, 0.5
        this.whiskersLength = options.whiskersLength || 40;     // 30, 40, 50
        this.whiskersCurve = 0;
        this.earsOffset = 0;

        Object.defineProperty(this, 'drawable', {
            value: new CreatureRenderer(this),
            writable: true,
            configurable: true,
            enumerable: false // so that json.stringify doesn't hash this
        });
    };

    /**
     * Manages the drawable object
     * @param ctx Canvas context
     * @returns {HTMLCanvasElement} the canvas element
     */
    Creature.prototype.draw = function (ctx) {
        if (this.drawable.ctx === undefined) {
            this.drawable.init(ctx);
        } else {
            this.drawable.draw();
        }

        return ctx.canvas;
    };

    /**
     * Mutate the creature by mutating one of it's genes
     * @returns {Creature}
     */
    Creature.prototype.mutate = function () {
        var gene = utils.probableFromArray(this.genes, 0.5);

        if (!gene) {
            return this;
        }

        if (typeof gene.mutate === 'function') {
            return gene.mutate(this);
        } else if (gene.mutateProp) {
            this[gene.mutateProp] = utils.randomFromArray(gene.bases);
        }

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
     * cleans up all event listeners and collects garbage
     */
    Creature.prototype.kill = function () {
        this.drawable.kill();
    };

    window.Creature = Creature;
} (window.utils, window.CreatureRenderer));
