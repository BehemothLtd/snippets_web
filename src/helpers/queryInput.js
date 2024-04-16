import { get } from "lodash";

// -----------------SNIPPETS-----------------

export class SnippetsQuery {
  constructor(args) {
    this.titleCont = get(args, "titleCont", "");
    this.snippetTypeEq = get(args, "snippetTypeEq", "public");
  }
}

export class PagyInput {
  constructor(args) {
    this.page = get(args, "page", 1);
    this.perPage = get(args, "perPage", 10);
  }
}
