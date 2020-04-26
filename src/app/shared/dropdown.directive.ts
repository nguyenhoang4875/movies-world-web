import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from "@angular/core";

@Directive({
  selector: "[appDropdown]",
})
export class DropdownDirective {
  @HostBinding("class.show") isOpen = false;

  @HostListener("document:click", ["$event"]) toggleOpen(event: Event) {
    const children = this.elementRef.nativeElement.children;

    if (this.elementRef.nativeElement.contains(event.target)) {
      for (let i = 0; i < children.length; ++i) {
        const child = children[i];
        child.getAttribute("data-toggle") == this.elementRef.nativeElement.id
          ? child.classList.toggle("show")
          : null;
      }
    } else {
      for (let i = 0; i < children.length; ++i) {
        const child = children[i];
        child.getAttribute("data-toggle") == this.elementRef.nativeElement.id
          ? child.classList.remove("show")
          : null;
      }
    }
  }

  constructor(private elementRef: ElementRef) {}
}
