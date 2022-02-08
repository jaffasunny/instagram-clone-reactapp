import "./App.css";
import Post from "./components/Post";

function App() {
	return (
		<div className="app">
			{/* BEM CSS Convention using ***___*** */}
			<div className="app__header">
				<img
					className="app__headerImage"
					src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
					alt="Instagram Logo"
				/>
			</div>
			<h1>HELLO JAFFA HERE Let's build instagram clone with react!</h1>
			<Post
				username="jaffaisreal"
				caption="WOW it works"
				imageUrl="https://reactjs.org/logo-og.png"
			/>
			<Post />
			<Post />

			{/* POSTS */}
			{/* POSTS */}
		</div>
	);
}

export default App;
