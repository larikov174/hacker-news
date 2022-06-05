import styled from 'styled-components';

const Container = styled.footer`
	grid-area: footer;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	padding: 10px;
	border-top: 2px solid #ff6600;
	border-radius: 5px;
	margin-top: 20px;
	@media screen and (max-width: 1200px) {
		border-radius: 0px;
	}
`;

const Credits = styled.p`
	color: #7d7d7d;
	text-transform: none;
`;

const Footer = () => {
	const currentDate = new Date();

	return (
		<Container>
			<Credits>&copy; {currentDate.getFullYear()} Андрей Лариков</Credits>
		</Container>
	);
};

export default Footer;
