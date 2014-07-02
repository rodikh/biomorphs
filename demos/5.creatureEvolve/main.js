(function (utils, genes, Creature, Nature) {
    'use strict';

        function createCreatureFromHash() {
            var queryCreature = utils.getHashValue('creature');
            if (queryCreature) {
                var decoded = JSON.parse(atob(queryCreature));
                nature.createCreature(Creature, decoded);
                nature.createGeneration();
            }
        }

        // If history state changed, reload creature
        window.onpopstate = function () {
            createCreatureFromHash();
        };

        // configure the creature's genes
        Creature.prototype.genes = [genes.eyeColor, genes.eyeSize, genes.behavior, genes.earSize, genes.whiskersLength];

        var nature = new Nature();

        // create creature either from url params or from defaults
        if (utils.getHashValue('creature')) {
            createCreatureFromHash();
        } else {
            nature.createCreature(Creature);
            nature.createGeneration();
        }

} (window.utils, window.genes, window.Creature, window.Nature));
