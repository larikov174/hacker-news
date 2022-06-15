import styled from 'styled-components';
import { StyledText } from '../ui/text';

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

const Footer = () => {
	const currentDate = new Date();

	return (
		<Container>
			<StyledText grey>&copy; {currentDate.getFullYear()} Андрей Лариков</StyledText>
		</Container>
	);
};

export default Footer;
