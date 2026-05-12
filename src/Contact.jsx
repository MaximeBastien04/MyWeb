function Contact() {

    const SendMail = (e) => {

        e.preventDefault();

        let parms = {
            name: document.getElementById("fname").value + " " + document.getElementById("lname").value,
            time: new Date(),
            message: document.getElementById("message").value,
            subject: document.getElementById("subject").value,
            email: document.getElementById("email").value
        };

        emailjs
            .send("service_lbhuvdr", "template_4vrjcg7", parms)
            .then(() => {
                alert("Email sent successfully!");
            })
            .catch((error) => {
                console.log(error);
                alert("Failed to send email.");
            });
    };

    return (
        <>
            <section id="contact">

                <h1>Contact me</h1>

                <article>

                    <aside>
                        <h3>maxbastien@hotmail.com</h3>
                        <h3>+32 487 59 12 77</h3>

                        <div>
                            <a href="https://www.linkedin.com/in/maxime-bastien-729298236/">
                                <img src="images/icons/linkedin_icon.png" alt="LinkedIn" />
                            </a>

                            <span></span>

                            <a href="https://github.com/MaximeBastien04">
                                <img src="images/icons/github_icon.png" alt="GitHub" />
                            </a>
                        </div>
                    </aside>

                    <form onSubmit={SendMail}>

                        <div>
                            <label htmlFor="fname">First Name<span>*</span></label>
                            <label htmlFor="lname">Last Name<span>*</span></label>

                            <input type="text" id="fname" required />
                            <input type="text" id="lname" required />
                        </div>

                        <label htmlFor="email">Email<span>*</span></label>
                        <input type="email" id="email" required />

                        <label htmlFor="subject">Subject<span>*</span></label>
                        <input type="text" id="subject" required />

                        <label htmlFor="message">Message<span>*</span></label>
                        <textarea id="message" required></textarea>

                        <button id="sendBtn" className="btnBlack" type="submit">Send</button>
                    </form>
                </article>
            </section>
        </>
    )
}

export default Contact;