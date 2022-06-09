import StoryCard from "./StoryCard";

const Story = ({selectedStory, loading}) => {
	console.log(selectedStory);
	if (loading) return <div>Loading...</div>;

	return(
		<StoryCard story={selectedStory} />
	)
}

export default Story;