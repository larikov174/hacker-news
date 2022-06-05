import './App.css';
import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';

const MainContainer = styled.div`
	display: grid;
	justify-items: center;
	grid-template-columns: 1fr;
	grid-template-rows: 40px 1fr 40px;
	grid-template-areas:
	'header'
	'news'
	'footer';
	width: min(100%, 1200px);
	margin: 0 auto;
`;

function App() {
	return (
		<MainContainer>
			<Header />
			<Footer />
		</MainContainer>
	);
}

export default App;
