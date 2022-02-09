import { Button, Input, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import "./App.css";
import ImageUpload from "./components/ImageUpload";
import Post from "./components/Post";
import { auth, db } from "./firebase";

function App() {
	const [posts, setPosts] = useState([]);
	const [open, setOpen] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [user, setUser] = useState(null);
	const [openSignIn, setOpenSignIn] = useState(false);

	// FrontEnd Listener
	useEffect(() => {
		// BackEnd Listener
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				// User has logged in
				console.log(authUser);
				setUser(authUser);
			} else {
				// user has logged out
				setUser(null);
			}
		});
		return () => {
			// perform some cleanup function
			unsubscribe();
		};
	}, [user, username]);

	useEffect(() => {
		db.collection("posts")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) => {
				setPosts(
					snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
				);
			});
	}, []);

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "#fff",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	};

	const signUp = (e) => {
		e.preventDefault();

		auth
			.createUserWithEmailAndPassword(email, password)
			.catch((err) => alert(err.message))
			.then((authUser) => {
				return authUser.user.updateProfile({
					displayName: username,
				});
			});
		setOpen(false);
	};

	const signIn = (e) => {
		e.preventDefault();

		auth.signInWithEmailAndPassword(email, password).catch((err) => {
			alert(err.message);
		});
		setOpenSignIn(false);
	};

	return (
		<div className="app">
			{/* BEM CSS Convention using ***___*** */}

			<div>
				<Modal
					open={open}
					onClose={() => setOpen(false)}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description">
					<Box sx={style}>
						<form className="app__signup">
							<img
								className="app__headerImage"
								src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
								alt="Instagram Logo"
							/>
							<center>
								<Input
									placeholder="username"
									type="text"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
								<Input
									placeholder="email"
									type="text"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<Input
									placeholder="password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<Button type="submit" onClick={signUp}>
									Sign Up
								</Button>
							</center>
						</form>
					</Box>
				</Modal>

				<Modal
					open={openSignIn}
					onClose={() => setOpenSignIn(false)}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description">
					<Box sx={style}>
						<form className="app__signup">
							<img
								className="app__headerImage"
								src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
								alt="Instagram Logo"
							/>
							<center>
								<Input
									placeholder="email"
									type="text"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<Input
									placeholder="password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<Button type="submit" onClick={signIn}>
									Sign In
								</Button>
							</center>
						</form>
					</Box>
				</Modal>
			</div>

			<div className="app__header">
				<img
					className="app__headerImage"
					src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
					alt="Instagram Logo"
				/>
			</div>

			<h1>HELLO JAFFA HERE Let's build instagram clone with react!</h1>
			{user ? (
				<Button onClick={() => auth.signOut()}>Logout</Button>
			) : (
				<div className="app__loginContainer">
					<Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
					<Button onClick={() => setOpen(true)}>Sign Up</Button>
				</div>
			)}

			{posts.map(({ id, post }) => {
				return (
					<Post
						key={id}
						username={post.username}
						caption={post.caption}
						imageUrl={post.imageUrl}
					/>
				);
			})}

			{/* user ending with ? means if user is not present then don't break */}
			{user?.displayName ? (
				<ImageUpload username={user.displayName} />
			) : (
				<h3>Sorry you need to login to upload</h3>
			)}
		</div>
	);
}

export default App;
