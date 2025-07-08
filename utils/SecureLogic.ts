let longPressed = false;
let swiped = false;
let tapped = false;

export function resetCombo() {
  longPressed = false;
  swiped = false;
  tapped = false;
}

export function setLongPress() {
  longPressed = true;
}

export function setSwipe() {
  swiped = true;
}

export function setTap() {
  tapped = true;
}

export function isComboComplete(): boolean {
  return longPressed && swiped && tapped;
}
