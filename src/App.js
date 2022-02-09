import { useState, useEffect } from "react";
import "./App.css";
import Post from "./components/Post";
import { db } from "./firebase";
function App() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		db.collection("posts").onSnapshot((snapshot) => {
			setPosts(snapshot.docs.map((doc) => doc.data()));
		});
	}, []);

	return (
		<div className="app">
			{console.log(db)}
			{/* BEM CSS Convention using ***___*** */}
			<div className="app__header">
				<img
					className="app__headerImage"
					src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
					alt="Instagram Logo"
				/>
			</div>

			<h1>HELLO JAFFA HERE Let's build instagram clone with react!</h1>

			{posts.map((post) => {
				return (
					<Post
						username={post.username}
						caption={post.caption}
						imageUrl={post.imageUrl}
					/>
				);
			})}
			{/* <Post
				username="jaffaisreal"
				caption="WOW it works"
				imageUrl="https://reactjs.org/logo-og.png"
			/> */}
		</div>
	);
}

export default App;
