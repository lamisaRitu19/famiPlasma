import React from "react";
import hearts from "../../assets/icons/hearts.svg";

const Footer = () => {
  return (
    <footer className="footer sm:flex justify-around py-10 bg-neutral text-neutral-content">
      <div className="gap-0">
        <a className="text-2xl font-bold mb-3">
          <img src={hearts} alt="hearts" className="inline tex" /> FamiPlasma
        </a>
        <p className="text-lg ml-8">Make a big difference,</p>
        <p className="text-lg ml-8">By giving a little</p>
      </div>
      <div className="gap-0">
        <span className="footer-title">Why use this platform?</span>
        <ul className="list-disc">
          <li>Connect with family</li>
          <li>Reach them easily during emergency</li>
          <li>Save yourself and others</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
