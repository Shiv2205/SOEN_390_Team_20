import { useEffect, useRef } from 'react'

export default function UploadWidget({ setProfilePic, setThumbnail }) {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(() => {
        console.log("smth s,th: ", import.meta.env.CLOUDINARY_CLOUD_NAME);
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
            uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
        }, function(error, result) {
            let pictureInfo = result.info.files;
            if(!error && pictureInfo){
                setProfilePic(pictureInfo[0].uploadInfo.secure_url);
                setThumbnail(pictureInfo[0].uploadInfo.thumbnail_url);
            }
            console.log(error);
        });
    }, []);

    const handleClick = (event) => {
        event.preventDefault();
        widgetRef.current.open();
    }
    
  return (
    <button id="profilePicture" onClick={(e) => handleClick(e)}>Upload</button>
  )
}
