import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  move,
  mergeWith,
  url,
  template
} from "@angular-devkit/schematics";
import { normalize, strings } from "@angular-devkit/core";
import { SchemaOptions } from "./schema";

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function createFromTemplate(_options: SchemaOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const sourceFiles = url("./files");
    const transformedSourceFiles = apply(sourceFiles, [
      template({ ..._options, filename: _options.folder, ...strings }),
      move(normalize(_options.folder))
    ]);

    return mergeWith(transformedSourceFiles)(tree, _context);
  };
}
