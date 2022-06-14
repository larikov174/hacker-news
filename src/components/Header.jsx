import { useNavigate, useLocation } from 'react-router-dom';
import { useActions } from '../hooks/useActions'
import styled from 'styled-components';
import logo from '../assets/logo.svg';

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

const Logo = styled.div`
	background-image: url(${logo});
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	width: 30px;
	height: 30px;
`;

const Title = styled.h1`
	font-size: 20px;
	margin: 0 10px;
`;

const Button = styled.button`
	width: 80px;
	height: 30px;
	background-color: transparent;
	margin-left: 20px;
	border: 1px solid #000000;
	border-radius: 5px;
	&:hover {
		cursor: pointer;
		opacity: 0.7;
		will-change: opacity;
		transition: opacity 0.3s;
	}
	&:active {
		opacity: 0.4;
		transition: opacity 0.25s;
	}
`;

const Header = ({ updateOnClick }) => {
	const navigate = useNavigate();
	const location = useLocation().pathname;
	const {clearSelected} = useActions();
	const handleBackHome = () => {
		clearSelected();
		navigate('/')
	};
	const handleUpdate = () => updateOnClick();

	return (
		<Container>
			<Logo />
			<Title>Hacker news</Title>
			<Button onClick={handleUpdate}>update</Button>
			{location === '/story' && <Button onClick={handleBackHome}>home</Button>}
		</Container>
	);
};

export default Header;
