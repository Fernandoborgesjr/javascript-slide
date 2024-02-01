export class Slide {
  constructor({ slide, wrapper }) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.distance = {
      finalPosition: 0,
      startX: 0,
      movement: 0,
    };

    this.init();
  }

  init() {
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }

  /**
   * @param {MouseEvent} event
   */
  onStart(event) {
    event.preventDefault();
    this.distance.startX = event.clientX;
    this.wrapper.addEventListener("mousemove", this.onMove);
  }

  /**
   * @param {MouseEvent} event
   */
  onEnd(event) {
    this.wrapper.removeEventListener("mousemove", this.onMove);
    this.distance.finalPosition = this.distance.movePosition;
  }

  /**
   * @param {MouseEvent} event
   */
  onMove({ clientX }) {
    const finalPosition = this.updatePosition(clientX);
    this.moveSlide(finalPosition);
  }

  updatePosition(clientX) {
    this.distance.movement = (this.distance.startX - clientX) * 1.5;
    return this.distance.finalPosition - this.distance.movement;
  }

  moveSlide(distX) {
    this.distance.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  addSlideEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }
}
