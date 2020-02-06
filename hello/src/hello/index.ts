import { apply, move, Rule, SchematicContext, Tree, url, template, mergeWith, chain } from '@angular-devkit/schematics';
import { normalize, strings } from "@angular-devkit/core";
import { HelloSchemaOptions } from './schema';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function hello(_options: HelloSchemaOptions): Rule {
    return (tree: Tree, _context: SchematicContext) => {

        const ruleArr = [];

        _context.logger.info(JSON.stringify(_options));

        if (_options["no-list"] === "false") {
            // this is the path where the created files will be moved
            const movePathForList = (_options.path) ?
                normalize(`${_options.path}/${strings.dasherize(_options.name)}/${strings.dasherize(_options.name)}-list`) :
                normalize(`/modules/${strings.dasherize(_options.name)}/${strings.dasherize(_options.name)}-list`);


            // create files using Schematics
            const templateSourceForList = apply(url('./files/list'), [
                template({
                    ...strings,
                    ..._options,
                }),
                move(movePathForList)
            ]);

            ruleArr.push(mergeWith(templateSourceForList));
        }


        const movePathForModule = normalize(`${_options.path || '/modules'}/${strings.dasherize(_options.name)}`)


        const templateSourceForModule = apply(url('./files/module'), [
            template({
                ...strings,
                ..._options,
            }),
            move(movePathForModule)
        ]);

        // apply the staged changes to the tree with Rule
        ruleArr.push(mergeWith(templateSourceForModule));

        return chain(ruleArr);
        
    };
}
