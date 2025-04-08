import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
import { Monitor, Smartphone } from 'lucide-react';

interface PlatformTooltipProps {
	platform: { type: string; user_agent: string };
}

export const PlatformTooltip = ({ platform }: PlatformTooltipProps) => {
	const Icon = platform.type === 'mobile' ? Smartphone : Monitor;
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					{/* Display capitalized platform type */}
					<span>{platform.type.charAt(0).toUpperCase() + platform.type.slice(1)}</span>
				</TooltipTrigger>
				<TooltipContent>
					{/* Show user agent details */}
					<>{platform.user_agent}</>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
