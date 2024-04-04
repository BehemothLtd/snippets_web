import { get, pick } from "lodash";

// -----------------TAGS-----------------
export class SnippetFormInput {
  constructor(args) {
    this.title = get(args, "title");
    this.content = get(args, "content");
    this.snippetType = get(args, "snippetType");
    this.passkey = get(args, "passkey");
    this.lockVersion = get(args, "lockVersion");
  }
}
