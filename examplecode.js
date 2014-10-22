var fs = require('fs');

// Functions source code store
var sources = {};

exports.handlers = {

    /**
     * Event for find and store functions code
     * @param e
     */
    newDoclet: function(e) {
        if (e.doclet.undocumented === true || e.doclet.kind !== 'function') {
            return;
        }

        var meta = e.doclet.meta;
        var fileContent = fs.readFileSync(meta.path + '/' + meta.filename).toString();

        // Fine default values
        var params = e.doclet.params || [];
        var sourceDefaults = '';
        for (var i = 0, l = params.length; i < l; i++) {
            if (params[i].defaultvalue) {
                sourceDefaults += 'var ' + params[i].name + ' = ' + params[i].defaultvalue + ';\n';
            }
        }

        // Skip lines
        fileContent = fileContent.split('\n').slice(meta.lineno - 1).join('\n');

        if (fileContent.substr(0, 3) === '/**') {
            fileContent = fileContent.substr(fileContent.indexOf('*/'));
        }

        // Skip function header
        fileContent = fileContent.substr(fileContent.indexOf('{'));

        // Find end of function
        var level = 0;
        for (var i = 0, l = fileContent.length; i < l; i++) {
            var char = fileContent[i];
            switch (char) {
                case '{':
                    level++;
                    break;

                case '}':
                    level--;
                    break;

                case "'":
                case '"':
                    i = fileContent.indexOf(char, i) + 1;
                    break;
            }

            if (level === 0) {
                // Add source
                var source = fileContent.substr(1, i - 1).trim();

                // Clear tabs or spaces
                var matches = /(\n(\t| )+).*$/.exec(source);
                if (matches !== null) {
                    source = source.replace(new RegExp(matches[1], 'g'), '\n');
                }

                sources[e.doclet.longname] = (sourceDefaults ? sourceDefaults + '\n' : '') + source;
                break;
            }
        }
    },

    /**
     * Find additional tags `examplecode` and replace it to @example tag with function source code.
     * @param e
     */
    parseComplete: function(e) {
        e.doclets.forEach(function(doc) {
            var tags = doc.tags || [];
            tags.forEach(function(tag) {
                if (tag.originalTitle !== 'examplecode') {
                    return;
                }

                doc.examples = doc.examples || [];
                if (sources[tag.value]) {
                    doc.examples.push(sources[tag.value]);
                } else {
                    console.error('Not found example `%s`.', tag.value);
                }
            });
        });
    }
};