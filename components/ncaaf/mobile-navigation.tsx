"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { CgMenuLeftAlt } from "react-icons/cg";
import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "@/components/ncaaf/logo";

export function MobileNav() {
	const [open, setOpen] = React.useState(false);

	return (
		<Sheet
			open={open}
			onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					variant='ghost'
					className={cn(
						buttonVariants({
							variant: "ghost",
						}),
						"px-2"
					)}>
					<CgMenuLeftAlt className='size-8 md:size-6' />
					<span className='sr-only'>Toggle Menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent
				side='right'
				className='pr-0'>
				<MobileLink
					href='/'
					className='flex items-center'
					onOpenChange={setOpen}>
					<Logo className='mr-2 h-4 w-4' />
					<span className='font-bold'>{siteConfig.name}</span>
				</MobileLink>
				<ScrollArea className='my-4 h-[calc(100vh-8rem)] pb-10 pl-6'>
					<div className='flex flex-col space-y-3'>
						{siteConfig.pages?.map(
							(item) =>
								item.href && (
									<MobileLink
										className='hover:underline'
										key={item.href}
										href={item.href}
										onOpenChange={setOpen}>
										{item.title}
									</MobileLink>
								)
						)}
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}

interface MobileLinkProps extends LinkProps {
	onOpenChange?: (open: boolean) => void;
	children: React.ReactNode;
	className?: string;
}

function MobileLink({ href, onOpenChange, className, children, ...props }: MobileLinkProps) {
	const router = useRouter();
	return (
		<Link
			href={href}
			onClick={() => {
				router.push(href.toString());
				onOpenChange?.(false);
			}}
			className={cn(className)}
			{...props}>
			{children}
		</Link>
	);
}
