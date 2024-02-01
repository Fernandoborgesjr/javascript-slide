import { Slide } from "./slide.js";

export class SlideNav extends Slide {
  addArrow(prev, next) {
    /** @type {HTMLElement} */
    this.prevElement = document.querySelector(prev);
    /** @type {HTMLElement} */
    this.nextElement = document.querySelector(next);
    this.addArrowEvent()
  }

  addArrowEvent(){
    this.prevElement?.addEventListener('click', this.activePrevSlide)
    this.nextElement?.addEventListener('click', this.activeNextSlide)
  }
}