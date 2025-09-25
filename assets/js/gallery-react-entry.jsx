// Plain React gallery for in-browser Babel usage
function BentoGrid({ children, className = "", ...props }) {
	return (
		<div
			className={
				"grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 " +
				(className || "")
			}
			{...props}
		>
			{children}
		</div>
	);
}

function BentoCard({ name, className, background, description, ...props }) {
	return (
		<div
			className={
				"group relative flex flex-col justify-between overflow-hidden rounded-xl bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] " +
				(className || "")
			}
			{...props}
		>
			<div>{background}</div>
			<div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
				<h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">{name}</h3>
				<p className="max-w-lg text-neutral-500 dark:text-neutral-400">{description}</p>
			</div>
			<div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
		</div>
	);
}

const furnitureGallery = [
	{
		name: "Modern Sofa",
		description: "A stylish modern sofa for your living room.",
		className: "lg:col-span-1",
		background: (
			<img
				src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80"
				alt="Modern Sofa"
				className="absolute inset-0 w-full h-full object-cover"
			/>
		),
	},
	{
		name: "Wooden Dining Table",
		description: "Elegant wooden dining table for family gatherings.",
		className: "lg:col-span-2",
		background: (
			<img
				src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
				alt="Wooden Dining Table"
				className="absolute inset-0 w-full h-full object-cover"
			/>
		),
	},
	{
		name: "Minimalist Chair",
		description: "Comfortable minimalist chair for any space.",
		className: "lg:col-span-1",
		background: (
			<img
				src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
				alt="Minimalist Chair"
				className="absolute inset-0 w-full h-full object-cover"
			/>
		),
	},
	{
		name: "Cozy Bed",
		description: "A cozy bed for restful nights.",
		className: "lg:col-span-2",
		background: (
			<img
				src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80"
				alt="Cozy Bed"
				className="absolute inset-0 w-full h-full object-cover"
			/>
		),
	},
];

function FurnitureGallery() {
	return (
		<div className="w-full p-4 sm:p-6 lg:p-8">
			<div className="max-w-7xl mx-auto">
				<BentoGrid>
					{furnitureGallery.map((item, idx) => (
						<BentoCard key={idx} {...item} />
					))}
				</BentoGrid>
			</div>
		</div>
	);
}

function GalleryEntry() {
	return <FurnitureGallery />;
}