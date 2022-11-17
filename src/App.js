import React from "react";

import "./styles/global.css";

import Calendar from "./components/Calendar";

function App() {
	return (
		<div className='mx-auto h-screen flex items-center justify-center'>
			<Calendar />
		</div>
	);
}

export default App;
