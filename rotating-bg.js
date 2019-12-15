let angle = getComputedStyle(document.documentElement).getPropertyValue(
	"--angle"
);
function newFunction() {
	document.documentElement.style.setProperty("--angle", `${angle}deg`);
	angle++;
	if (angle >= 360) angle = angle - 360;
}

setInterval(newFunction, 50);
