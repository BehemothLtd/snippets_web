export class SwalOptions {
  constructor({
    title = "Warning",
    icon = SwalIconOptions.Warning,
    html,
    text = "You won't be able to revert this!",
    showCancelButton = true,
    confirmButtonText = "Yes",
    cancelButtonText = "Cancel",
  }) {
    this.title = title;
    this.icon = icon;
    this.html = html;
    this.text = text;
    this.showCancelButton = showCancelButton;
    this.confirmButtonText = confirmButtonText;
    this.cancelButtonText = cancelButtonText;
  }
}

export const SwalIconOptions = {
  Warning: "warning",
  Question: "question",
  Success: "success",
  Error: "error",
  Info: "info",
};
