import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ToastShowService {
  isToastsChanged = new BehaviorSubject<boolean>(false);

  onShowToasts(value: boolean) {
    this.isToastsChanged.next(value);
  }
}
