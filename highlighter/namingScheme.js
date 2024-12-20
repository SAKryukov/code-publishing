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
        annotation: 0,
        assignment: 0,
        selector: 0, 
        name: {
            function: 0,
            class: 0,
            namespace: 0,
        },
        literal: {
            keyword: 0, // like null, nil, true, false, NaN, Infinity
            string: 0,
            quote: 0,
            escape: 0,
            numeric: 0,
        },
        type: {
            keyword: 0, // like char, int, uint...
        },
        storage: {
            modifier: 0,
        },
        preprocessor: {
            signature: 0,
            keyword: 0,
            value: 0,
        },
        comment: {
            text: 0,
            block: 0,
            pascal: 0,
        },
        pascal: { part: 0, },
        constant: {
            value: {
                numeric: 0,
                character: 0,
            },
        },
        magic: { //JavaScript
            strict: 0,
        },
        source: { // HTML
            css: 0,
            php: 0,
            javascript: 0,
        },
        xmltag: {
            all: 0, //support.tag
            name: 0, //support.tag-name
            script: 0, //entity.tag.script
            style: {
                tag: 0, //entity.tag.style?
                open: 0, //support.tag.style
                name: 0, //entity.tag.style, "style"
                attribite: 0, //'entity.tag.style.attribute'
                close: 0, //'support.tag.style'
            }, 
            script: {
                tag: 0, //entity.tag.script?
                open: 0, //support.tag.script
                name: 0, //entity.tag.script, "script"
                attribite: 0, //'entity.tag.script.attribute'
                close: 0, //'support.tag.script'
            }, 
            open: 0, //support.tag.open
            close: 0, //support.tag.close
            special: 0, //support.tag.special
            php: 0, //variable.language.php-tag
            attribute: 0, //'support.attribute'
            operator: 0, //'support.operator'
            value: 0,
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
