import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
	<div>
		<BrowserRouter>
			<Routes>

				<Route path="/" element={<h1>this is home page</h1>}/>
				<Route path="login" element={<h1>this is login page</h1>}/>
				<Route path="signup" element={<h1>this is signup page</h1>}/>
				<Route path="*" element={<h1>this is 404 page</h1>}/>


			</Routes>
		</BrowserRouter>
	</div>
  )
}