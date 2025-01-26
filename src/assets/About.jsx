import "./About.css"
import { FaFacebookF } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";


export default function About() {
    return (
        <footer>
            <div className="foot-sec">
                <span className="logo">Question Bank</span>
                <div>
                    <h2>Contact Me</h2>
                    <div>
                        <p>Mobile No: +91 9550572255</p>
                        <p>Email: sanketyelugotla123@gmail.com</p>
                    </div>
                </div>
                <div>
                    <h2>Social Media</h2>
                    <div className="social">
                        <p className="social-icon"><FaGithub /></p>
                        <p className="social-icon"><FaLinkedin /></p>
                        <p className="social-icon"><SiLeetcode /></p>
                        <p className="social-icon"><FaFacebookF /></p>
                    </div>
                </div>
            </div>
            <div className="line"></div>
            <div className="copyRights">
                <p>© 2025 Question Bank. All Rights Reserved</p>
            </div>
        </footer>
    )
}