import GroupPlayerStats from "@/components/conference/conference-leaders-by-player";
import GroupTeamStats from "@/components/conference/conference-leaders-by-team";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
	group: number;
}

const GroupLeaders = ({ group }: Props) => {
	return (
		<Tabs
			defaultValue='team'
			className='w-full'>
			<TabsList className='grid w-full grid-cols-2'>
				<TabsTrigger value='team'>Teams</TabsTrigger>
				<TabsTrigger value='player'>Players</TabsTrigger>
			</TabsList>
			<TabsContent value='team'>
				<GroupTeamStats group={group} />
			</TabsContent>
			<TabsContent value='player'>
				<GroupPlayerStats group={group} />
			</TabsContent>
		</Tabs>
	);
};

export default GroupLeaders;
