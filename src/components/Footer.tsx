import { Link } from "./base/link/link";

const navList = [
	{
		title: "Links",
		items: [
			{ label: "Home", href: "/" },
			{ label: "About", href: "#" },
		],
	},
];

export const Footer = () => {
	return (
		<footer className="bg-brand-section py-12 md:pt-16 mt-auto">
			<div className="mx-auto max-w-container px-4 md:px-8">
				<div className="flex flex-col gap-12 md:gap-16 xl:flex-row">
					<nav className="flex flex-1 flex-col-reverse gap-12 md:flex-row md:gap-8">
						<ul className="grid w-full grid-cols-2 gap-8 md:max-w-xs">
							{navList.map((category) => (
								<li key={category.title}>
									<h4 className="text-sm font-semibold text-quaternary_on-brand">{category.title}</h4>
									<ul className="mt-4 flex flex-col gap-3">
										{category.items.map((item) => (
											<li key={item.label} className="flex">
												<Link
													className="max-h-5 gap-1 text-footer-button-fg hover:text-footer-button-fg_hover"
													to={item.href}
												>
													{item.label}
												</Link>
											</li>
										))}
									</ul>
								</li>
							))}
						</ul>
					</nav>
				</div>
				<div className="mt-12 flex flex-col-reverse justify-between gap-4 border-t border-brand_alt pt-8 md:mt-16 md:flex-row md:gap-6">
					<p className="text-sm text-quaternary_on-brand">© 2026 WhatSaidSaid.</p>
				</div>
			</div>
		</footer>
	);
};
