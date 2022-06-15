import styled from 'styled-components';

export const Button = styled.button`
	width: 80px;
	height: ${(props) => (props.primary ? '30px' : 'auto')};
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
