export class Slide {
  constructor({ slide, wrapper }) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.init();
  }

  init() {
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }

  onStart(event) {
    event.preventDefault();
    this.wrapper.addEventListener("mousemove", this.onStart);
  }

  onEnd(event) {
    this.wrapper.removeEventListener("mouseup", this.onMove);
  }

  onMove(event) {}

  addSlideEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }
}
