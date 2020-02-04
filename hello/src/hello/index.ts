import { apply, filter, move, noop, Rule, SchematicContext, Tree, url, template, mergeWith, MergeStrategy, chain } from '@angular-devkit/schematics';
import { normalize, strings } from "@angular-devkit/core";
import { setupOptions } from "./helper";


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function hello(_options: any): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        if (_options.setupProject) {
            setupOptions(tree, _options);
        }

        // this is the path where the created files will be moved
        const movePath = (_options.flat) ?
            normalize(_options.path) :
            normalize(_options.path + '/' + strings.dasherize(_options.name));


        // create files using Schematics
        const templateSource = apply(url('./files/test'), [
            _options.spec ? filter(path => !path.endsWith('.spec.ts')) : noop(),
            template({
                ...strings,
                ..._options,
            }),
            move(movePath)
        ]);

        const rule = mergeWith(templateSource, MergeStrategy.Default);




        const movePath2 = normalize(_options.path + '/25Path/' + strings.dasherize(_options.name));

        const templateSource2 = apply(url('./files'), [
            _options.spec ? filter(path => !path.endsWith('.spec.ts')) : noop(),
            template({
                ...strings,
                ..._options,
            }),
            move(movePath2)
        ]);

        // apply the staged changes to the tree with Rule
        const rule2 = mergeWith(templateSource2, MergeStrategy.Default)

        const rules = chain([rule, rule2])(tree, _context);
        return rules
    };
}
