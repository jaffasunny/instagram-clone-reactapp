import { Avatar } from "@mui/material";
import React from "react";
import "./post.css";

function Post({ username, caption, imageUrl }) {
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
