import './css/footer.css'
const Footer = () => {
    return (
        <>
            <footer class="padding_4x">
                <div class="flex">
                    <section class="flex-content padding_1x">
                        <h3>Top Products</h3>
                        <a href="javascript:void(0);">Speakers</a>
                        <a href="javascript:void(0);">Head Phones</a>
                        <a href="javascript:void(0);"> Mobile & laptops</a>
                        <a href="javascript:void(0);">Women & mens Cloths</a>                        
                    </section>
                    <section class="flex-content padding_1x">
                        <h3>Quick Links</h3>
                        <a href="javascript:void(0);">Jobs</a>
                        <a href="javascript:void(0);">Brand Assets</a>
                        <a href="javascript:void(0);">Investor Relations</a>
                        <a href="javascript:void(0);">Terms of Service</a>
                    </section>
                    <section class="flex-content padding_1x">
                        <h3>Features</h3>
                        <a href="javascript:void(0);">Jobs</a>
                        <a href="javascript:void(0);">Brand Assets</a>
                        <a href="javascript:void(0);">Investor Relations</a>
                        <a href="javascript:void(0);">Terms of Service</a>
                    </section>
                    <section class="flex-content padding_1x">
                        <h3>Resources</h3>
                        <a href="javascript:void(0);">Guides</a>
                        <a href="javascript:void(0);">Research</a>
                        <a href="javascript:void(0);">Experts</a>
                        <a href="javascript:void(0);">Agencies</a>
                    </section>
                    {/* <section class="flex-content padding_1x">
                        <h3>Newsletter</h3>
                        <p>You can trust us. we only send promo offers,</p>
                        <fieldset class="fixed_flex">
                            <input type="email" name="newsletter" placeholder="Your Email Address"/>
                                <button class="btn btn_2">Subscribe</button>
                        </fieldset>
                    </section> */}
                </div>
                <div class="flex">
                    <section class="flex-content padding_1x">
                        <p>Copyright ©2023 All rights reserved || www.emart.com</p>
                    </section>
                    <section class="flex-content padding_1x">
                        <a href="https://www.facebook.com/profile.php?id=100023208543125" target='_blank'><i className="fa-brands fa-facebook fafax"></i></a>
                        <a href="https://github.com/Developer-AmitMandal" target='_blank'><i className="fa-brands fa-github fafax"></i></a>
                        <a href="https://www.instagram.com/amit_mandal_94/" target='_blank'><i className="fa-brands fa-instagram fafax"></i></a>
                        <a href="https://www.youtube.com/channel/UC6jOY18s_95s1zf2RThbyug" target='_blank'><i className="fa-brands fa-youtube fafax"></i></a>
                    </section>
                </div>
            </footer>
        </>
    );
}

export default Footer;