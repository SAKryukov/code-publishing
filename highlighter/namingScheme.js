"use strict";

/**
 * Syntax highlighter
 *
 * @author Sergey A Kryukov, https://www.SAKryukov.org
*/

const namingScheme = (() => {

    const scheme = {
        //non-rule constants: 
        highlighter: 0,
        span: 0,
        //rule names:
        //////////////////////////////////
        property: 0,
        operator: 0,
        unit: 0, // CSS unit of measurement
        keyword: 0,
        literal: {
            keyword: 0, // like null, nil, true, false, NaN, Infinity
            string: 0,
            quote: 0,
            escape: 0,
        },
        type: {
            keyword: 0, // like char, int, uint...
        },
        comment: {
            text: 0,
            block: 0,
        },
        xml: {
            tag: 0,
            value: 0,
        },
        constant: {
            value: {
                numeric: 0,
                character: 0,
            },
        },
        source: { // HTML
            css: 0,
            php: 0,
            js: 0,
        },
        magic: { //JavaScript
            strict: 0,
        }
    }; //scheme

    const combineName = (previousName, key) =>
        previousName == null ? key : `${previousName}.${key}`;
    const assign = (previousName, object) => {
        for (let key in object)
            if (object[key] && (object[key].constructor == Object))
                assign(combineName(previousName, key), object[key]);
            else
                object[key] = combineName(previousName, key);
    }; // recurse
    assign(null, scheme);
    return scheme;

})();
