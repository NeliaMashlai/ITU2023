export const fixElementHeight = (element) => {
    if (element) {

        const computedStyle = window.getComputedStyle(element);
        element.style.height = computedStyle.height;

    }
}

export const fixElementWidth = (element) => {
    if (element) {

        const computedStyle = window.getComputedStyle(element);
        element.style.width = computedStyle.width;

    }
}
  