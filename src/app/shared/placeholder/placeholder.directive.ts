import { Directive, ViewContainerRef } from "@angular/core";

@Directive({ selector: "[appPlaceholder]" })
export class PlaceholderDirective {
  // ViewContainerRef: this will allow you to get information about the place where you use the directive.
  // Helping for creating a component, in that place where it sits.
  constructor(public viewContainerRef: ViewContainerRef) {}
}
