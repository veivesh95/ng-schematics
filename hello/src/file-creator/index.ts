import { Rule, SchematicContext, Tree } from "@angular-devkit/schematics";
import { FileCreatorSchemaOptions } from "./schema";

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function fileCreator(_options: FileCreatorSchemaOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    tree.create(_options.path, "Hellowa");
    return tree;
  };
}
