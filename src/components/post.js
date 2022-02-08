import { Avatar } from "@mui/material";
import React from "react";
import "./post.css";

function Post() {
	return (
		<div>
			<div className="post__header">
				<Avatar
					className="post__avatar"
					alt="Jaffer"
					src="/static/images/avatar/1.jpg"
				/>
				<h3>Username</h3>
			</div>

			<img
				className="post__image"
				src="https://reactjs.org/logo-og.png"
				alt="React logo"
			/>

			<h4 className="post__text">
				<strong>jaffaisreal</strong>: What's good!!! We here with a follow
				project.
			</h4>
			{/* username + caption */}
		</div>
	);
}

export default Post;
