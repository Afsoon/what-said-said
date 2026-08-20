import { themeIcons } from "seti-icons";

// Seti's dark-theme palette — the code panel header is always github-dark,
// regardless of the page theme (see CodeFrame in annotations.tsx).
const getDarkIcon = themeIcons({
	blue: "#519aba",
	grey: "#4d5a5e",
	"grey-light": "#6d8086",
	green: "#8dc149",
	orange: "#e37933",
	pink: "#f55385",
	purple: "#a074c4",
	red: "#cc3e44",
	white: "#d4d7d6",
	yellow: "#cbcb41",
	ignore: "#41535b",
});

export function FileIcon({ filename }: { filename: string }) {
	const { svg, color } = getDarkIcon(filename);
	const __html = svg.replace(/svg/, `svg fill='${color}'`);

	return (
		<span dangerouslySetInnerHTML={{ __html }} className="-my-2.5 -ml-2 inline-flex size-8.5 shrink-0" aria-hidden />
	);
}
