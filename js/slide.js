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
   * @param {MouseEvent|TouchEvent} event
   */
  onStart(event) {
    let movetype;
    if (event.type === "mousedown") {
      event.preventDefault();
      this.distance.startX = event.clientX;
      movetype = "mousemove";
    } else {
      this.distance.startX = event.changedTouches[0].clientX;
      movetype = "touchmove";
    }

    this.wrapper.addEventListener(movetype, this.onMove);
  }

  /**
   * @param {MouseEvent|TouchEvent} event
   */
  onEnd(event) {
    const movetype = event.type === "mouseup" ? "mousemove" : "touchmove";
    this.wrapper.removeEventListener(movetype, this.onMove);
    this.distance.finalPosition = this.distance.movePosition;
  }

  /**
   * @param {MouseEvent|TouchEvent} event
   */
  onMove(event) {
    const pointerPosition =
      event.type === "mousemove"
        ? event.clientX
        : event.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
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
    ["mousedown", "touchstart"].forEach((event) =>
      this.wrapper.addEventListener(event, this.onStart)
    );
    ["mouseup", "touchend"].forEach((event) =>
      this.wrapper.addEventListener(event, this.onEnd)
    );
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }
}
