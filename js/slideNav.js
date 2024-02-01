import { Slide } from "./slide.js";

export class SlideNav extends Slide {
  constructor(...args) {
    super(...args);
    this.bindControlEvents();
  }

  addArrow(prev, next) {
    /** @type {HTMLElement} */
    this.prevElement = document.querySelector(prev);
    /** @type {HTMLElement} */
    this.nextElement = document.querySelector(next);
    this.addArrowEvent();
  }

  addArrowEvent() {
    this.prevElement?.addEventListener("click", this.activePrevSlide);
    this.nextElement?.addEventListener("click", this.activeNextSlide);
  }

  createControl() {
    const control = document.createElement("ul");
    control.dataset.control = "slide";
    this.slides.forEach((item, index) => {
      control.innerHTML += `<li><a href="#slide${index}">${index}</a></li>`;
    });
    this.wrapper.appendChild(control);
    return control;
  }

  activeControlItem() {
    this.controlItems.forEach((item) =>
      item.classList.remove(this.activeClass)
    );
    this.controlItems[this.index.active].classList.add(this.activeClass);
  }

  eventControl(item, index) {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      this.changeSlide(index);
    });
    this.wrapper.addEventListener('slideChange', this.activeControlItem)
  }

  addControl(customControl) {
    this.control =
      document.querySelector(customControl) || this.createControl();
    this.controlItems = [...this.control.children];
    this.activeControlItem()
    this.controlItems.forEach(this.eventControl);
  }

  bindControlEvents() {
    this.eventControl = this.eventControl.bind(this);
    this.activeControlItem = this.activeControlItem.bind(this)
  }
}
