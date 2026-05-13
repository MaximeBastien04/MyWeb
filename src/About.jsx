import { assetPath } from "./utils/paths.js";
import { useEffect, useRef } from "react";

function About() {

    const initialized = useRef(false);

    useEffect(() => {

        if (initialized.current) return;

        initialized.current = true;

        class TxtType {

            constructor(el, toRotate, period) {
                this.toRotate = toRotate;
                this.el = el;
                this.loopNum = 0;
                this.period = parseInt(period, 10) || 2000;
                this.txt = "";
                this.isDeleting = false;

                this.tick();
            }

            tick() {

                const i = this.loopNum % this.toRotate.length;
                const fullTxt = this.toRotate[i];

                if (this.isDeleting) {
                    this.txt = fullTxt.substring(0, this.txt.length - 1);
                } else {
                    this.txt = fullTxt.substring(0, this.txt.length + 1);
                }

                this.el.innerHTML =
                    '<span class="wrap">' + this.txt + '</span>';

                let delta = 120;

                if (this.isDeleting) delta /= 2;

                if (!this.isDeleting && this.txt === fullTxt) {

                    delta = this.period;
                    this.isDeleting = true;

                } else if (this.isDeleting && this.txt === "") {

                    this.isDeleting = false;
                    this.loopNum++;
                    delta = 500;
                }

                setTimeout(() => {
                    this.tick();
                }, delta);
            }
        }

        const elements = document.getElementsByClassName("typewrite");

        for (let i = 0; i < elements.length; i++) {

            const toRotate = elements[i].getAttribute("data-type");
            const period = elements[i].getAttribute("data-period");

            if (toRotate) {

                new TxtType(
                    elements[i],
                    JSON.parse(toRotate),
                    period
                );
            }
        }

    }, []);

    return (
        <>
            <section id="about-container">
                <section>
                    <h1>About me</h1>
                    <div>
                        <p>Hi! I'm Maxime Bastien. I'm a
                            <span className="typewrite" data-period="2000" data-type='[" Game Developer", " Creative Designer", " Web Developer"]'>
                                <span className="wrap"></span>
                            </span>. <br />
                            I'm passionate about creating meaningful and engaging experiences through game development, design, and web technologies. I enjoy combining creativity with technical problem-solving to build projects that not only look good, but also leave an impact on the people interacting with them.</p>
                        <p>In my free time, I spend a lot of time working on personal projects to improve my skills and gain experience. I'm always looking for new ways to learn, experiment, and grow as a developer and designer.</p>
                        <p>My passion for creating started with video games. They've been a major part of my life for as long as I can remember and inspired me to start building experiences of my own. I'm especially interested in projects that tell meaningful stories, create strong emotions, or leave a big impact on people.</p>
                        <p>Beyond development and design, I also enjoy reading, fitness, and bouldering. I mainly read manga and enjoy playing D&D, both of which often inspire my creativity and artistic direction. Fitness and bouldering have taught me discipline, patience, and persistence, while also pushing me to constantly improve myself both mentally and physically.</p>
                        <p>I'm trilingual and speak French, Dutch, and English. I'm open-minded, hard-working, and always willing to put in extra effort to create work I can truly be proud of.</p>
                    </div>
                </section>
                <aside>
                    <img src={assetPath("images/photos/aboutMe_img1.jpg")} alt="About me 1" />
                    <img src={assetPath("images/photos/aboutMe_img2.jpg")} alt="About me 2" />
                    <img src={assetPath("images/photos/aboutMe_img3.jpg")} alt="About me 3" />
                    <img src={assetPath("images/photos/aboutMe_img4.jpg")} alt="About me 4" />
                </aside>

                <section id="skills">
                    <h2>Skills</h2>
                    <hr />
                    <div>
                        <article><img src={assetPath("images/icons/unity.png")}/><h3>Unity</h3></article>
                        <article><img src={assetPath("images/icons/html.png")}/><h3>HTML</h3></article>
                        <article><img src={assetPath("images/icons/css.png")}/><h3>CSS</h3></article>
                        <article><img src={assetPath("images/icons/javascript.png")}/><h3>JavaScript</h3></article>
                        <article><img src={assetPath("images/icons/react.png")}/><h3>React</h3></article>
                        <article><img src={assetPath("images/icons/mongodb.png")}/><h3>MongoDB</h3></article>
                        <article><img src={assetPath("images/icons/figma.png")}/><h3>Figma</h3></article>
                        <article><img src={assetPath("images/icons/photoshop.png")}/><h3>Photoshop</h3></article>
                        <article><img src={assetPath("images/icons/illustrator.png")}/><h3>Illustrator</h3></article>
                        <article><img src={assetPath("images/icons/indesign.png")}/><h3>Indesign</h3></article>
                        <article><img src={assetPath("images/icons/premiere_pro.png")}/><h3>Premiere Pro</h3></article>
                        <article><img src={assetPath("images/icons/after_effects.png")}/><h3>After Effects</h3></article>
                        <article><img src={assetPath("images/icons/xd.png")}/><h3>XD</h3></article>
                        <article><img src={assetPath("images/icons/sn_csa.png")}/><h3>SN CSA</h3></article>
                    </div>
                </section>
            </section>
        </>
    );
}

export default About;