(function (window) {
    'use strict';

    var Nature = function (options) {

        if (options === undefined) {
            options = {};
        }

        var bases = options.bases || 'abcdefghijklmnopqrstuvwxyz';
        var generationSize = options.generationSize || 10;

        /**
         * Returns a random base character from the list of genetic bases
         * @returns {string} Random base character
         */
        function getRandomBase() {
            var randomIndex = Math.floor(Math.random() * bases.length);

            return bases[randomIndex];
        }

        /**
         * Returns the input with a random mutation by changing a random character in the passed string
         * @param {string} input String to mutate
         * @returns {string} Mutated string
         */
        function mutate (input) {
            var randomIndex = Math.floor(Math.random() * (input.length)),
                output = input.substr(0, randomIndex) + getRandomBase() + input.substr(randomIndex + 1);

            return output;
        }

        /**
         * Creates a number of mutated copies of the parent string
         * @param {string} parent Original string to create a generation from
         * @returns {Array} List of mutant children
         */
        function createGeneration(parent) {
            var generation = [],
                i;

            generation.push(parent);
            for (i = 0; i < generationSize; i++) {
                generation.push(mutate(parent));
            }

            return generation;
        }

        /**
         * Calculates the survivability of the child
         * Survivability is resemblance to the target string
         * @param {string} input String to calculate the survivability of
         * @returns {number} The survivability index of the input
         */
        function calculateSurvivability(input, target) {
            var survivability = 0,
                i,
                inputLength = input.length;

            for (i = 0; i <inputLength; i++) {
                if (input[i] === target[i]) {
                    survivability++;
                }
            }

            return survivability;
        }

        /**
         * Returns the child with the highest survivability of a given generation
         * @param {[string]} generation
         * @param {string} target
         * @returns {string}
         */
        function artificiallySelect(generation, target) {
            var i,
                generationLength = generation.length,
                matchIndex = 0,
                maxMatch = 0;

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
         * Attempts to evolve a source string into a target string using mutations and artificial selection
         * @param {string} source String to evolve
         * @param {string} target String to evolve to
         * @returns {bool} Success or failure to evolve
         */
        this.evolve = function (source, target) {
            var mutant = source,
                generationCount = 0;

            if (source.length !== target.length) {
                console.error('Cannot evolve into a string of different length YET');
                return false;
            }

            while (mutant !== target) {
                generationCount++;
                var generation = createGeneration(mutant);
                mutant = artificiallySelect(generation, target);
                console.log('survivor', mutant);

                if (generationCount > 1000) {
                    console.error('Too many generations, exiting')
                    return false;
                }
            }
            console.log('successfully evolved ' + source + ' into ' + target + ' in ' + generationCount + ' generations');
            return true;
        };
    };

    window.Nature = Nature;
} (window));