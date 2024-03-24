import React, { useState } from 'react';
import './DownloadButton.css';

const DownloadButton = ({ auth }) => {
  const [downloaded, setDownloaded] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const url = 'http://youtubedownloaderbackend-env.eba-c9vmji4h.us-east-1.elasticbeanstalk.com'
  const handleUrlChange = (event) => {
    setVideoUrl(event.target.value);
  };

  // const handleDownloadClick = async () => {
  //   const user = auth.currentUser;
  //   console.log(user)
  //   if (user) {
  //     const idToken = await user.getIdToken();
  //     const response = await fetch('http://increaseram-env.eba-gr5fympg.us-east-1.elasticbeanstalk.com/download', {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer ${idToken}`,
  //       },
  //     });
  //     // Handle the response as needed
  //   } else {
  //     // User is not signed in
  //     console.error('User is not signed in');
  //   }
  // };
  const downloadOnServer = async () => {

    const user = auth.currentUser;
    
    try {
      if (!user) return;
      if (isDownloading) return;
      setIsDownloading(true);
  
      const idToken = await user.getIdToken();

      const response = await fetch(`${url}/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`, // Include the ID token in the Authorization header
        },
        body: JSON.stringify({ url: videoUrl }),
      });
      if (response.ok) {
        setDownloaded(true);
      } else {
        throw new Error('Download failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    } finally {
      setIsDownloading(false);
    }
  };
  

  return (
    <div className="centered-layout">
      <input type="text" value={videoUrl} onChange={handleUrlChange} placeholder="Enter YouTube video URL" />
      <button onClick={downloadOnServer} disabled={downloaded || isDownloading}>Download MP3</button>
      {downloaded && <a href={`${url}/download-file`}>Download File</a>}
    </div>
  );
};

export default DownloadButton;
