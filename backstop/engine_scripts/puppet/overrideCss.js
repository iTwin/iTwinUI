const disableAnimationsStyles = `
*,
*:hover,
*::before,
*::after {
  animation-delay: -0.0001ms !important;
  animation-duration: 0s !important;
  animation-play-state: paused !important;
  cursor: none !important;
  caret-color: transparent !important;
  transition: 0s !important;
}
`;

module.exports = async (page, scenario) => {
  await page.evaluate((disableAnimationsStyles) => {
    const style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    const styleNode = document.createTextNode(disableAnimationsStyles);
    style.appendChild(styleNode);
    document.head.appendChild(style);
  }, disableAnimationsStyles);
};
