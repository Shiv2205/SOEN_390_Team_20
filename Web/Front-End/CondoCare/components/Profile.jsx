import { useState } from "react";
import { useNavigate } from "react-router-dom";
import blank from "../src/assets/blank.webp"


function Profile( {userData} ) {
    const navigate = useNavigate();
    const [copyText, setCopyText] = useState('');

    const hardcodedCopyText = "aah123bxyhk123";
    const hardcodedCopyText2 = "jhijfg0934ljsd9";
    const reader = new FileReader();

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
    }
    //console.log(reader.readAsBinaryString(userData.profile_picture));

    return (
        <div className="profile-container">
            <button onClick={() => navigate("/propertyview")}></button>
            <h2> Profile </h2>
            <div className="profile-info">
                <img src={userData.profile_picture} alt='Profile' />
                <div className="information" style={{ marginTop: "-40px" }}>
                    <h2 style={{ borderBottomStyle: "None", fontSize: "40px" }}> {userData.fullname} </h2>
                    <h4 style={{ marginTop: "-40px" }}> <i>Property Manager</i> </h4>
                    <h3 style={{ marginTop: "0px" }}><u>Contact</u></h3>
                    <h3 ><i>Email:</i> <u>{userData.email}</u></h3>
                    <h3><i>Number:</i> <u>{userData.phone_number}</u></h3>
                </div>
            </div>
            <h2>Registration Keys</h2>

            <div className="registration-keys">
                <h3> Owner Key: </h3>
                <div className="info">
                    <h3 style={{ borderRadius: "10px", borderStyle: "solid", borderColor: "black", padding: "5px" }}> {hardcodedCopyText} <button onClick={() => handleCopy(hardcodedCopyText)}>Copy</button> </h3>
                </div>
            </div>

            <div className="registration-keys">
                <h3> Renter Key: </h3>
                <div className="info">
                    <h3 style={{ borderRadius: "10px", borderStyle: "solid", borderColor: "black", padding: "5px" }}> {hardcodedCopyText2} <button onClick={() => handleCopy(hardcodedCopyText2)}>Copy</button> </h3>
                </div>
            </div>
            <div>
                <button onClick={() => {navigate("/propertyview")}}>Property View</button>
                <button onClick={() => {navigate("/propertyregistration")}}>Add new property</button>
            </div>
        </div>
    );
}

export default Profile;