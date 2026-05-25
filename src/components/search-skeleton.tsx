// search-skeleton.tsx  — drop-in Suspense fallback
export function ArticlesSkeleton() {
	return (
		<section id="results" className="scroll-mt-24 section-bottom">
			<div className="h-8 w-36 bg-muted rounded animate-pulse mb-4" />
			<div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-3 gap-y-8">
				{Array.from({ length: 12 }).map((_, i) => (
					<div key={i} className="pr-3 border-r border-border space-y-2">
						<div className="w-full h-[230px] rounded-md bg-muted animate-pulse" />
						<div className="h-3 w-32 bg-muted rounded animate-pulse" />
						<div className="h-5 w-full bg-muted rounded animate-pulse" />
						<div className="h-5 w-3/4 bg-muted rounded animate-pulse" />
					</div>
				))}
			</div>
		</section>
	);
}
