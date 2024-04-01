import { get } from "lodash";

export class PagyInput {
  constructor(args) {
    this.page = get(args, "page", 1);
    this.perPage = get(args, "perPage", 10);
  }
}

export class Metadata {
  constructor(args) {
    this.total = get(args, "total", 0);
    this.perPage = get(args, "perPage", 0);
    this.page = get(args, "page", 0);
    this.pages = get(args, "pages", 0);
    this.count = get(args, "count", 0);
    this.next = get(args, "next", null);
    this.prev = get(args, "prev", null);
    this.from = get(args, "from", null);
    this.to = get(args, "to", null);
  }
}
