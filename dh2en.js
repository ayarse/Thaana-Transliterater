/*
	Transliterate Thaana

	This algorithm transliterates Thaana script to Roman characters (Latin)

	This work is licensed under GPL v2
	___________________

	Ayaz, 2014
	Based on the work of Kailash Nadh - http://nadh.in
*/

var dh2en = function(input) {
    var _vowels = {
        "ަ": "a",
        "ާ": "aa",
        "ި": "i",
        "ީ": "ee",
        "ު": "u",
        "ޫ": "oo",
        "ެ": "e",
        "ޭ": "ey",
        "ޮ": "o",
        "ޯ": "oa",
        "ް": ""
    };

    var _compounds = {};

    var _alif_compounds = {
        "އަ": "a",
        "އާ": "aa",
        "އި": "i",
        "އީ": "ee",
        "އު": "u",
        "އޫ": "oo",
        "އެ": "e",
        "އޭ": "ey",
        "އޮ": "o",
        "އޯ": "oa"
    };

    var _consonants = {
        "ހ": "h",
        "ށ": "sh",
        "ނ": "n",
        "ރ": "r",
        "ބ": "b",
        "ޅ": "lh",
        "ކ": "k",
        "އ": "a",
        "ވ": "v",
        "މ": "m",
        "ފ": "f",
        "ދ": "dh",
        "ތ": "th",
        "ލ": "l",
        "ގ": "g",
        "ޏ": "y",
        "ސ": "s",
        "ޑ": "d",
        "ޒ": "z",
        "ޓ": "t",
        "ޔ": "y",
        "ޕ": "p",
        "ޖ": "j",
        "ޗ": "ch",
        "ޙ‎": "h",
        "ޚ‎": "kh",
        "ޛ‎": "z",
        "ޜ‎": "z",
        "ޝ‎": "sh",
        "ޝ": "sh"
    };

    //var _punctuations = "][\\\'،./÷}{|:\"><؟)(".split('');
    var _punctuations = "asd".split('');

    var invert = function(obj) {
        var new_obj = {};
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                new_obj[obj[prop]] = prop;
            }
        }
        return new_obj;
    };

    /* _consonants = invert(_consonants);
    _vowels = invert(_vowels);
    _alif_compounds = invert(_alif_compounds);*/


    function transliterate(input) {
        // replace zero width non joiners
        input = input.replace(/[\u200B-\u200D\uFEFF]/g, '');


        var v = '';

        // replace words ending in shaviyani with 'ah'
        input = input.replace((/(އަށް)\B/ig), 'ah');
        input = input.replace((/(ށް)\B/ig), 'h');

        // replace thaa sukun with 'i'
        input = input.replace((/(ތް)\B/ig), 'i');

        // replace words ending in alif sukun with 'eh'
        input = input.replace((/(އެއް)\B/ig), 'eh');
        input = input.replace((/(ެއް)\B/ig), 'eh');
        input = input.replace((/(ިއް)\B/ig), 'ih');


        // replace alif compounds first so they don't get in the way
        for (var k in _alif_compounds) {
            if (!_alif_compounds.hasOwnProperty(k)) continue;
            v = _alif_compounds[k];
            input = input.replace(new RegExp(k, 'ig'), v);
        }

        // replace words ending in alif sukun with 'ah'
        input = input.replace((/(ައް)\B/ig), 'ah');

        // replace words ending ai bai fili
        input = input.replace((/(ައި)\B/ig), 'ai');

        // remaining consonants
        for (var k in _consonants) {
            if (!_consonants.hasOwnProperty(k)) continue;

            v = _consonants[k];
            input = input.replace(new RegExp(k, 'g'), v);
        }

        // vowels
        for (var k in _vowels) {
            if (!_vowels.hasOwnProperty(k)) continue;

            v = _vowels[k];

            input = input.replace(new RegExp(k, 'g'), v);
        }

        // capitalize first letter of sentence
        input = input.replace(/(^\s*\w|[\.\!\?]\s*\w)/g, function(c) {
            return c.toUpperCase();
        });

        for (var p in _punctuations) {
            console.log(_punctuations[p]);
        }

        return input;
    }

    // ______ get the keys of an object literal
    function _getKeys(o) {
        var keys = [];
        for (var k in o) {
            if (o.hasOwnProperty(k)) {
                keys.push(k);
            }
        }

        return keys;
    }

    // _____ construct
    return transliterate(input);
};