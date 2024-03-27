import { get } from "lodash";

export class SnippetsQuery {
  constructor(args) {
    this.titleCont = get(args, "titleCont", "");
  }
}

export class PagyInput {
  constructor(args) {
    this.page = get(args, "page", 1);
    this.perPage = get(args, "perPage", 10);
  }
}
