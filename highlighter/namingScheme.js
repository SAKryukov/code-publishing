"use strict";

/**
 * Syntax highlighter
 *
 * @author Sergey A Kryukov, https://www.SAKryukov.org
*/

const namingScheme = (() => {

    const scheme = {       
        string: {
            character: {
                escape: 0,
            },
            value: 0,
            quote: 0,
        },
        keyword: 0,
        xml: {
            tag: 0,
            value: 0,
        },
        constant: {
            keyword: 0,
            value: {
                numeric: 0,
                character: 0,
            },
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
