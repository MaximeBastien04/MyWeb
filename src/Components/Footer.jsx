function Footer() {
    return (
        <>
            <footer>
                <section class="footer-content">
                    <div class="socials">
                        <h3>socials</h3>
                        <p><a href="https://www.linkedin.com/in/maxime-bastien-729298236/" target="_blank">LinkedIn</a></p>
                        <p><a href="https://github.com/MaximeBastien04" target="_blank">GitHub</a></p>
                    </div>
                    <div class="question">
                        <h3>Get in touch!</h3>
                        <a href="mailto:maxbastien@hotmail.com"><button className="email-button"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <rect x="3" y="5" width="18" height="14" rx="2" />
                                <path d="M3 7l9 6 9-6" />
                            </svg> Email Me</button></a>
  
                    </div>
                </section>
                <aside>
                    <p>© Maxime Bastien, 2026</p>
                </aside>
            </footer>
        </>
    )
}

export default Footer;