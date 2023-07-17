import React from 'react'
import '../css/footer.css'

function Footer() {
  return (
    <div className='footer padding flex column vertical'>
        <div className="top-footer-container flex">
            <div className="footer-left flex">
                <ul className="footer-links flex column">
                    <li className="footer-link cursor">About Us</li>
                    <li className="footer-link cursor">Investors</li>
                    <li className="footer-link cursor">Shipping Policy</li>
                    <li className="footer-link cursor">T & Cs'</li>
                </ul>
                <ul className="footer-links flex column">
                    <li className="footer-link cursor">Account</li>
                    <li className="footer-link cursor">Orders</li>
                    <li className="footer-link cursor">Grievances</li>
                    <li className="footer-link cursor">Special Orders</li>
                </ul>
                <ul className="footer-links flex column">
                    <li className="footer-link cursor">Appointments</li>
                    <li className="footer-link cursor">Events</li>
                </ul>
            </div>
            <div className="footer-right">
                <div className="newsletter-box flex vertical column">
                    <div className="footer-text">Sign Up For Earhart Updates</div>
                    <input type="email" id="newsletter-email" />
                </div>
                <div className="copyright-text">

                </div>
            </div>
        </div>
        <div className="bottom-footer-container">
            <div className="footer-logo">Earhart</div>
        </div>
    </div>
  )
}

export default Footer