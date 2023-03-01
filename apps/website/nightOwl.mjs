const nightOwl = await fetch(
  `https://raw.githubusercontent.com/sdras/night-owl-vscode-theme/master/themes/Night%20Owl-color-theme.json`
).then((res) => res.json());

export default nightOwl;
