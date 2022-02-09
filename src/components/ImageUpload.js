import { Button } from "@mui/material";
import React, { useState } from "react";
import { storage, db } from "../firebase";
import firebase from "firebase";
import "./imageUpload.css";

function ImageUpload({ username }) {
	const [caption, setCaption] = useState("");
	const [image, setImage] = useState(null);
	const [progress, setProgress] = useState(0);

	const handleChange = (e) => {
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		}
	};

	const handleUpload = () => {
		// uploading the image file
		const uploadTask = storage.ref(`images/${image.name}`).put(image);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// progress function Visuals ..
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(progress);
			},
			(error) => {
				// Error Function
				console.log(error);
				alert(error.message);
			},
			() => {
				// Complete function...
				// getting the uploaded file downlaod link to use it
				storage
					.ref("images")
					.child(image.name)
					.getDownloadURL()
					.then((url) => {
						// post image inside of the db
						db.collection("posts").add({
							// timestamp sorts all the post according to timing
							timestamp: firebase.firestore.FieldValue.serverTimestamp(),
							caption: caption,
							imageUrl: url,
							username: username,
						});

						setProgress(0);
						setImage(null);
						setCaption("");
					});
			}
		);
	};

	return (
		<div className="imageUpload">
			<progress className="imageupload__progress" value={progress} max="100" />
			<input
				type="text"
				placeholder="Enter a caption..."
				onChange={(e) => setCaption(e.target.value)}
				value={caption}
			/>
			<input type="file" onChange={handleChange} />
			<Button onClick={handleUpload}>Upload</Button>
		</div>
	);
}

export default ImageUpload;
