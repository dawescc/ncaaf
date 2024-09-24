import * as React from "react";

import { cn } from "@/lib/utils";

const Container = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("bg-background text-foreground pt-20 pb-10 px-2 md:px-8", className)}
		{...props}
	/>
));
Container.displayName = "Container";

export { Container };
