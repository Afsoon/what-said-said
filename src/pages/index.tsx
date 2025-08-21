import type { PageProps } from "@parcel/rsc";
import { Nav } from "../components/Nav";
import "../page.css";
// import '../client';

export default function Index({ pages, currentPage }: PageProps) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>What Said Said</title>
			</head>
			<body>
				<header>
					<h1>What Said Said</h1>
				</header>
				<h2>Blog Posts</h2>
				<Nav
					pages={pages
						.filter((page) => page.url.startsWith("/blog"))
						.slice(0, 5)}
					currentPage={currentPage}
				/>
				<h2>TIL</h2>
				<Nav
					pages={pages
						.filter((page) => page.url.startsWith("/til"))
						.slice(0, 5)}
					currentPage={currentPage}
				/>
			</body>
		</html>
	);
}
