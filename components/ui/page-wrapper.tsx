import * as React from "react";
import Balancer from "react-wrap-balancer";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import EspnNews from "@/components/espn-news";

const PageWrapper = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ className, children, ...props }, ref) => {
	return (
		<main
			ref={ref}
			className={cn("relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]", className)}
			{...props}>
			{children}
		</main>
	);
});
PageWrapper.displayName = "PageWrapper";

const PageContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("mx-auto w-full min-w-0", className)}
		{...props}>
		{children}
	</div>
));
PageContent.displayName = "PageContent";

const PageHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("space-y-2 mb-4", className)}
		{...props}>
		{children}
	</div>
));
PageHeader.displayName = "PageHeader";

const PageTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
	<h1
		ref={ref}
		className={cn("scroll-m-20 text-3xl font-bold tracking-tight", className)}
		{...props}
	/>
));
PageTitle.displayName = "PageTitle";

const PageDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, children, ...props }, ref) => (
	<p
		ref={ref}
		className={cn("text-base text-muted-foreground", className)}
		{...props}>
		<Balancer>{children}</Balancer>
	</p>
));
PageDescription.displayName = "PageDescription";

const PageDetail = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex items-center space-x-2 pt-4", className)}
		{...props}
	/>
));
PageDetail.displayName = "PageDetail";

const PageSide = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & { group?: number; team?: number; last?: boolean; limit?: number; noNews?: boolean }
>(({ className, group, team, last, limit, noNews, children, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("hidden text-sm xl:block", className)}
		{...props}>
		<div className='sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] pt-4'>
			<ScrollArea className='h-full pb-10'>
				<div className='space-y-2'>
					{!last && children}
					{!noNews && (
						<>
							<p className='font-medium'>Other Stories</p>
							<EspnNews
								groupId={group}
								teamId={team}
								limit={limit}
							/>
						</>
					)}
					{last && children}
				</div>
			</ScrollArea>
		</div>
	</div>
));
PageSide.displayName = "PageSide";

export { PageWrapper, PageContent, PageHeader, PageTitle, PageDescription, PageDetail, PageSide };
