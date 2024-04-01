import { get } from "lodash";

// -----------------TAGS-----------------
export class TagsQuery {
  constructor(args) {
    this.nameCont = get(args, "nameCont", "");
  }
}
