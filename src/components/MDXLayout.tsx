import type { PageProps } from "@parcel/rsc";
import { cloneElement, type ReactNode } from "react";
import "../page.css";
// import '../client';
import { Graphviz } from "@hpcc-js/wasm-graphviz";
import treeSitter from "tree-sitter-highlight";

interface LayoutProps extends PageProps {
	children: ReactNode;
}

export default function Layout({ children, pages, currentPage }: LayoutProps) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>{currentPage.tableOfContents?.[0].title}</title>
				<meta name="description" content={currentPage?.exports?.description} />
				<meta
					property="og:title"
					content={currentPage.tableOfContents?.[0].title}
				/>
				<meta
					property="og:description"
					content={currentPage?.exports?.description}
				/>
				<meta
					property="og:url"
					content={`https://whatsaidsaid.com${currentPage.url}`}
				/>
			</head>
			<body>
				<header>
					<a href="/index.html">What Said Said</a>
				</header>
				<main>
					<article>
						{cloneElement(children as any, {
							components: {
								h1: (props: any) => (
									<>
										<h1 {...props} />
										<time dateTime={currentPage.exports?.date}>
											{new Date(
												currentPage.exports?.date + "T00:00",
											).toLocaleDateString()}
										</time>
									</>
								),
								CodeBlock: (props: any) => {
									if (props.lang === "dot") {
										return <Dot>{props.children}</Dot>;
									}

									return (
										<pre>
											{/* @ts-ignore */}
											<code
												dangerouslySetInnerHTML={{
													__html: treeSitter.highlight(
														props.children,
														treeSitter.Language[
															props.lang?.toUpperCase() || "JS"
														],
													),
												}}
											/>
										</pre>
									);
								},
							},
						})}
					</article>
				</main>
			</body>
		</html>
	);
}

async function Dot({ children }: { children: string }) {
	try {
		const graphviz = await Graphviz.load();
		const svg = graphviz.dot(`digraph {
bgcolor="transparent"
${children}
}`);
		return <div className="dot" dangerouslySetInnerHTML={{ __html: svg }} />;
	} catch (err: any) {
		return <pre>{err.stack}</pre>;
	}
}
