// Get reference to the paragraph element where student ID will be displayed
const myStudentId = document.getElementById("myStudentId");
const myStudentIdButton = document.getElementById("myStudentIdButton");

// Get reference to the video container div
let videoContainer = document.getElementById('vid');

const title = document.getElementById("title");

// API key for accessing YouTube Data API
const apiKey = 'AIzaSyDma9pRUYp_-wEwW3curtSuzOVoWC2xmfI';

//https://youtu.be/K9G3Yc0pw9g - Help with inital setup
//https://developers.google.com/youtube/v3/getting-started - API documentation & setup

async function showVideos() {
    // Fetch video data from YouTube API using the provided playlist ID and API key
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=8&playlistId=UUmifxkTvlJdgwHXb2Uov6Pw&key=${apiKey}`);
    const data = await response.json(); // Convert response to JSON format

    const channelTitle = data.items[0].snippet.channelTitle; // Extract channel title
    title.textContent = channelTitle + "'s Latest Videos"; // Set the title element to the channel title

    // Loop through the fetched video items
    for (let i = 0; i < data.items.length; i++) {
        const vidTitle = data.items[i].snippet.title; // Extract video title
        const vidId = data.items[i].snippet.resourceId.videoId; // Extract video ID
        const vidUrl = `https://www.youtube.com/watch?v=${vidId}`; // Construct direct YouTube link
        const vidPublishedAt = data.items[i].snippet.publishedAt; // Extract video publish date
        const vidThumbnail = data.items[i].snippet.thumbnails.maxres.url; // Extract video thumbnail URL

        // Create a div container for each video
        let videoDiv = document.createElement("div");
        videoDiv.classList.add("video"); // Add CSS class for styling

        // Create a link element for video title
        let videoLink = document.createElement("a");
        videoLink.classList.add("video-link");
        videoLink.href = vidUrl; // Set the link to the YouTube video
        videoLink.textContent = vidTitle; // Set the text as the video title

        // Create an iframe to embed the video
        let videoplayer = document.createElement("iframe");
        videoplayer.classList.add("video-frame");
        videoplayer.src = `https://www.youtube.com/embed/${vidId}`; // Embed YouTube video
        videoplayer.allowFullscreen = true; // Allow fullscreen mode

        let videoPublishedAt = document.createElement("p");
        videoPublishedAt.classList.add("video-published-at");
        videoPublishedAt.textContent = "Published on: " + vidPublishedAt; // Display publish date

        let videoThumbnail = document.createElement("img");
        videoThumbnail.classList.add("video-thumbnail");
        videoThumbnail.src = vidThumbnail; // Set thumbnail image source
        videoThumbnail.alt = "Video Thumbnail"; // Set alt text for thumbnail
        videoThumbnail.title = "Click for Fullscreen view" // Set title attribute for thumbnail
    
        // Create a container div for the link and published date
        let videoInfo = document.createElement("div");
        videoInfo.classList.add("video-info");

        // Append the link and published date to the container
        videoInfo.appendChild(videoLink);
        videoInfo.appendChild(videoPublishedAt);

        // Append the container to the main video div
        videoDiv.appendChild(videoInfo);
        videoDiv.appendChild(videoplayer);
        videoDiv.appendChild(videoThumbnail);
        
        // Append the video container to the main video section in HTML
        videoContainer.appendChild(videoDiv);
    }
}

function showID() {
	// Set the student ID text content
    myStudentIdButton.textContent = "Student ID - Showing at top!";
	myStudentId.textContent = "Allie Pinnell - 1268163";
}

document.addEventListener("DOMContentLoaded", showVideos);
myStudentIdButton.addEventListener("click", showID);