import { css } from "styled-components";

export const sizes = {
  xl: 1599,
  lg: 1199,
  md: 1023,
  sm: 767,
  xs: 479
};

export const media = Object.keys(sizes).reduce((accumulator, label) => {
  accumulator[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});

export const mediaMin = Object.keys(sizes).reduce((accumulator, label) => {
  accumulator[label] = (...args) => css`
    @media (min-width: ${sizes[label] + 1}px) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});

let scrollPosition = 0;
export const toggleBodyScrollBar = isHideScrollBar => {
  const html = document.getElementsByTagName("html")[0];
  const hideScroll = "hide-scrollbar";

  if (isHideScrollBar) {
    scrollPosition = document.body.scrollTop || window.scrollY;
    html.classList.add(hideScroll);
  } else {
    html.classList.remove(hideScroll);
    window.scrollTo(0, scrollPosition);
  }
};

// Check if given color is dark or light. Accepts both 3-char and 6-char hex color
export const isColorDark = hexcolor => {
  if (hexcolor.substr(0, 1) !== "#") {
    return false;
  }
  let rgb = [];
  let hex = hexcolor.substr(1).split("");
  if (hex.length === 3) {
    hex = [hex[0], hex[0], hex[1], hex[1], hex[2], hex[2]];
  }
  if (hex.length === 6) {
    let i = 0;
    let x = 0;
    let hexStr;
    while (i < 3) {
      hexStr = hex[x] + hex[x + 1];
      rgb[i] = parseInt(hexStr, 16);
      i += 1;
      x = i * 2;
    }
  }
  for (let i = 0; i < rgb.length; i++) {
    rgb[i] = parseInt(rgb[i], 10);
  }
  return (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000 < 128;
};

export const isColorLight = hexcolor => {
  return !isColorDark(hexcolor);
};
