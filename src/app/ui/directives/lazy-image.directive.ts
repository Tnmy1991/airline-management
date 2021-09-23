import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appLazyImg]'
})
export class LazyImageDirective {

  constructor({ nativeElement }: ElementRef<HTMLImageElement>) {
    const supports = 'loading' in HTMLImageElement.prototype;

    if (supports) {
      nativeElement.setAttribute('loading', 'lazy');
    }
  }

}
