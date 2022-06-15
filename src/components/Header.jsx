import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetPostsQuery } from '../app/features/api/api';
import logoIcon from '../assets/logo.svg';
import { useActions } from '../hooks/useActions';
import { Button } from '../ui/button';
import { Icon } from '../ui/icon';
import { StyledTitle } from '../ui/text';
import { LIST_LIMIT_LENGTH } from '../utils/const';

const Container = styled.header`
	grid-area: header;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 10px;
	background-color: #ff6600;
	border-radius: 5px;
	@media screen and (max-width: 1200px) {
		border-radius: 0px;
	}
`;

const Header = () => {
	const navigate = useNavigate();
	const location = useLocation().pathname;
	const { clearSelectedStories, clearComments } = useActions();
	const { refetch } = useGetPostsQuery(LIST_LIMIT_LENGTH);

	const handleBackHome = () => {
		clearSelectedStories();
		clearComments();
		navigate('/');
	};
	const handleUpdate = () => refetch();

	useEffect(() => {
		if(location === '/'){
			clearSelectedStories();
			clearComments();
		}
	}, [location, clearSelectedStories, clearComments]);

	return (
		<Container>
			<Icon primary image={logoIcon} />
			<StyledTitle primary margin='0 10px'>Hacker news</StyledTitle>
			{location === '/story' ? (
				<Button primary onClick={handleBackHome}>
					home
				</Button>
			) : (
				<Button primary onClick={handleUpdate}>
					update
				</Button>
			)}
		</Container>
	);
};

export default Header;
