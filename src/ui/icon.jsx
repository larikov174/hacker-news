import styled from 'styled-components';

export const Icon = styled.span`
	display: block;
	background-image: url(${(props) => props.image});
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	width: ${(props) => (props.primary ? '30px' : '15px')};
	height: ${(props) => (props.primary ? '30px' : '15px')};
	margin: ${(props) => (props.margin ? '0 5px' : '')};
	grid-area: ${(props) => props.area || ''};
`;
