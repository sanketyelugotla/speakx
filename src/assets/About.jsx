import "./About.css";
import { FaGithub } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { FaHackerrank } from "react-icons/fa";
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
          <h2>Profiles</h2>
          <div className="social">
            <p className="social-icon">
              <a href="https://github.com/sanketyelugotla" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
            </p>
            <p className="social-icon">
              <a href="https://www.linkedin.com/in/sanketyelugotla/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            </p>
            <p className="social-icon">
              <a href="https://leetcode.com/u/sanketyelugotla/" target="_blank" rel="noopener noreferrer">
                <SiLeetcode />
              </a>
            </p>
            <p className="social-icon">
              <a href="https://www.hackerrank.com/profile/sanketyelugotla1" target="_blank" rel="noopener noreferrer">
                <FaHackerrank />
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="line"></div>
      <div className="copyRights">
        <p>© 2025 Question Bank. All Rights Reserved</p>
      </div>
    </footer>
  );
}
