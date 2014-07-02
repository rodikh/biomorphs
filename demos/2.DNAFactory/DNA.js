(function (window, utils) {
    'use strict';
    /**
     * A DNA simulation
     * @param {[*]} genes list of mutable genes
     * @param {{}} [options]
     * @constructor
     */
    var DNA = function (genes, options) {

        if (options === undefined) {
            options = {};
        }

        this.genes = genes;

        var generationSize = options.generationSize || 10,
            propagateParent = options.propagateParent || true;

        /**
         * Returns the input with a random mutation from one of the genes.
         * @param {*} input Object to mutate
         * @returns {*} Mutated object
         */
        this.mutate = function (input) {
            var gene = utils.probableFromArray(this.genes);

            return gene.mutate(input);
        };

        /**
         * Creates a number of mutated copies of the parent object
         * @param {*} parent Original object to create a generation from
         * @returns {Array} List of mutant children
         */
        this.createGeneration = function (parent) {
            var generation = [],
                i;

            for (i = 0; i < generationSize; i++) {
                generation.push(this.mutate(parent));
            }

            if (propagateParent) {
                generation.push(parent);
            }

            return generation;
        };

        /**
         * Calculates the survivability of the child
         * Survivability is resemblance to the target object
         * @param {*} input Object to calculate the survivability of
         * @param {*} target Target object of resemblance
         * @returns {number} The survivability index of the input
         */
        function calculateSurvivability(input, target) {
            var survivability,
                i,
                inputLength = input.length;

            // decreases survivability the bigger the length difference is
            survivability = -Math.abs(input.length - target.length);

            for (i = 0; i < inputLength; i++) {
                if (input[i] === target[i]) {
                    survivability++;
                }
            }

            return survivability;
        }

        /**
         * Returns the child with the highest survivability of a given generation
         * @param {[*]} generation
         * @param {*} target Target to calculate survivability from
         * @returns {*}
         */
        function artificiallySelect(generation, target) {
            var i,
                generationLength = generation.length,
                matchIndex = 0,
                maxMatch = -Infinity;

            for (i = 0; i < generationLength; i++) {
                var survivability = calculateSurvivability(generation[i], target);
                if (survivability > maxMatch) {
                    maxMatch = survivability;
                    matchIndex = i;
                }
            }

            return generation[matchIndex];
        }

        /**
         * Attempts to evolve a source object into a target object using mutations and artificial selection
         * @param {*} source Object to evolve
         * @param {*} target Object to evolve to
         * @returns {bool} Success or failure to evolve
         */
        this.evolve = function (source, target) {
            var mutant = source,
                generationCount = 0;

            while (mutant !== target) {
                generationCount++;
                var generation = this.createGeneration(mutant);
                mutant = artificiallySelect(generation, target);

                if (generationCount > 2000) {
                    utils.log('Too many generations, exiting');
                    return false;
                }
            }
            utils.log('successfully evolved ' + source + ' into ' + target + ' in ' + generationCount + ' generations');
            return true;
        };
    };

    window.DNA = DNA;
} (window, window.utils));
