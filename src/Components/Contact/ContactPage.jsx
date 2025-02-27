import React, { useState } from "react";
import "./ContactPage.css";

const ContactPage = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setmessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Thank You ${name} for Contacting Us. We will Get Back to You Soon.\n\nYour Mail Id - ${email}.\nYour Message is - ${message}`
    );
    setname("");
    setEmail("");
    setmessage("");
  };

  return (
    <>
      <div className="contactSection">
        <h2>Contact Us</h2>
        {/* <div className="contactMap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49206.16593395236!2d2.5776979486328124!3d39.57346430000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x129793280de39c05%3A0x85d5f5ea839d6c2a!2sUOMO!5e0!3m2!1sen!2sin!4v1708798894132!5m2!1sen!2sin"
            width="800"
            height="600"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="uomomap"
          ></iframe>
        </div> */}
        <div className="contactInfo">
          <div className="contactAddress">
            <div className="address">
              <h3>Store in Nepal</h3>
              <p>
                NewRoad Kathmandu
                <br /> Nepal
              </p>
              <p>
                stationery@gmail.com
                <br />
                9802365451
              </p>
            </div>
            <div className="address">
              <h3>Store in Nepal</h3>
              <p>
                Banasthali,Kathmandu
                <br /> Nepal
              </p>
              <p>
                banasthali@gmail.com
                <br />
                9856236451
              </p>
            </div>
          </div>
          <div className="contactForm">
            <h3>Get In Touch</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                placeholder="Name *"
                onChange={(e) => setname(e.target.value)}
                required
              />
              <input
                type="email"
                value={email}
                placeholder="Email address *"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <textarea
                rows={10}
                cols={40}
                placeholder="Your Message"
                value={message}
                onChange={(e) => setmessage(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
