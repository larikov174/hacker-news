import styled from 'styled-components';

export const StyledTitle = styled.h1`
	display: flex;
	align-items: center;
	font-size: ${(props) => (props.primary ? '20px' : '18px')};
	grid-area: ${(props) => props.area};
	margin: ${(props) => props.margin};
	text-transform: uppercase;
`;

export const StyledText = styled.p`
	display: flex;
	align-items: center;
	color: ${(props) => props.grey && '#7d7d7d'};
	grid-area: ${(props) => props.area};
	margin-top: ${(props) => props.marginTop + 'px'};
	margin-right: ${(props) => (props.borderLeft ? '' : '5px')};
	border-left: ${(props) => (props.borderLeft ? '2px solid #7d7d7d' : '')};
	padding: ${(props) => (props.borderLeft ? '0 5px' : '')};
	margin: ${(props) => props.margin};
	text-transform: ${(props) => (props.uppercase ? 'uppercase' : 'none')};
`;
