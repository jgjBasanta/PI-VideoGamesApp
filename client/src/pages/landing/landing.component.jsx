import React from "react";
import { Link } from "react-router-dom";
import './landing.styles.css';

export default function LandingPage() {
    return(
        <div className="landing-container">
            <div className="landing-title-container">
                <h1 className="landing-title">Internet VideoGame Data Base</h1>
            </div>
            <div>
                <Link to="/home">
                    <button className="landing-button">START</button>
                </Link>
            </div>
            <div className="footer">
                <h3>created By: jgjBasanta</h3>
            </div>

        </div>
    )    
}