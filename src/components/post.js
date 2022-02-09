import { Avatar } from "@mui/material";
import { React, useEffect, useState } from "react";
import { db } from "../firebase";
import "./post.css";

function Post({ postId, username, caption, imageUrl }) {
	const [comments, setComments] = useState([]);

	useEffect(() => {
		let unsubscribe;
		if (postId) {
			unsubscribe = db
				.collection("posts")
				.doc(postId)
				.collection("comments")
				.onSnapshot((snapshot) => {
					setComments(snapshot.docs.map((doc) => doc.data()));
				});
		}

		return () => {
			unsubscribe();
		};
	}, [postId]);

	return (
		<div className="post">
			<div className="post__header">
				<Avatar
					className="post__avatar"
					alt={username}
					src="/static/images/avatar/1.jpg"
				/>
				<h3>{username}</h3>
			</div>
			<img className="post__image" src={imageUrl} alt="React logo" />
			<h4 className="post__text">
				<strong>{username}</strong>: {caption}
			</h4>
			{/* username + caption */}
		</div>
	);
}

export default Post;
