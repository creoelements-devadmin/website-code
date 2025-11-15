import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import WavyText from '../../components/elements/WavyText';
import { Grids } from '../../components/Grids';
import './Service.css';
// import { Link } from 'react-router-dom';

// import { CreoLogo } from '../../components/elements/CreoLogo';
import { Link } from 'react-router-dom';

const servicesData = [
    {
        name: "Web Design/<br>Development",
        mobilename: "Web Design/<br>Development",
        slug: "web-development",
        meta_description: "Create a stunning and functional website with expert web design and development services. We focus on user experience, visual design, and responsive layout, combined with powerful back-end solutions for seamless performance and security. At CREO Elements, we ensure every website reflects your brand's DNA, providing an unforgettable user experience across all devices.",
        description: "<p><em>Your website is your digital handshake.</em></p>\r\n<p>In today&rsquo;s online world, it&rsquo;s the first impression you make on potential customers. We go beyond just creating virtual storefronts at CREO Elements. We craft websites that embody your brand&rsquo;s DNA, reflecting your values and dedication to quality. Unforgettable user experiences are our specialty. We&rsquo;ll bring your digital vision to life, ensuring every visitor leaves with a positive impression.</p>\r\n<p>Web design is the process of creating the look and feel of a website, but it goes beyond just aesthetics. It&rsquo;s about crafting an enjoyable and user-friendly experience for visitors. Here&rsquo;s a breakdown of key aspects:</p>\r\n<ul>\r\n<li><em>User Experience (UX):</em>&nbsp;This is the core of web design. It focuses on how users interact with the website, ensuring it&rsquo;s easy to navigate, find information, and complete tasks.</li>\r\n<li><em>Visual Design:</em>&nbsp;This encompasses the website&rsquo;s overall look, including layout, colors, fonts, and images. It should be visually appealing and reflect the brand identity.</li>\r\n<li><em>Information Architecture:</em>&nbsp;This involves organizing website content in a logical and hierarchical structure, making it easy for users to find what they&rsquo;re looking for.</li>\r\n<li><em>Responsiveness:</em>&nbsp;Websites should adapt to different screen sizes, from desktops to tablets and smartphones. Responsive design ensures a seamless user experience across all devices.</li>\r\n</ul>\r\n<p>Website design and development are two sides of the same coin, working together to create a successful website. Here&rsquo;s a breakdown of each:</p>\r\n<p><strong>Web Design: The Art of the User Experience</strong></p>\r\n<ul>\r\n<li><em>Focus:</em>&nbsp;Creating the visual identity and user experience (UX) of a website.</li>\r\n<li><em>Key elements:</em>\r\n<ul>\r\n<li><em>Information architecture:</em>&nbsp;Structuring content for easy navigation.</li>\r\n<li><em>Visual design</em>: Layout, colours, fonts, and images that reflect brand identity and are aesthetically pleasing.</li>\r\n<li><em>Usability:</em>&nbsp;Ensuring users can find what they need and complete tasks intuitively.</li>\r\n<li><em>Responsiveness:</em>&nbsp;Ensuring the website is mobile-friendly and providing a seamless experience across different devices and screen sizes using responsive design.</li>\r\n</ul>\r\n</li>\r\n</ul>\r\n<p><strong>Web Development: The Technical Backbone</strong></p>\r\n<ul>\r\n<li><em>Focus:</em>&nbsp;Building the website&rsquo;s underlying structure and functionality to bring the design to life.</li>\r\n<li><em>Key elements:</em>\r\n<ul>\r\n<li><em>Front-end development:</em>&nbsp;Creating the user-facing elements using modern web standards like HTML5, CSS3, JavaScript, GSAP, Bootstrap etc.</li>\r\n<li><em>Back-end development:</em>&nbsp;Building server-side functionality with robust and scalable technologies.</li>\r\n<li><em>Content Management System (CMS):</em>&nbsp;Using flexible and powerful platforms like WordPress, Shopify, Wix etc.</li>\r\n<li><em>Database Management:</em>&nbsp;Storing and organizing website data efficiently.</li>\r\n<li><em>Website Security:</em>&nbsp;Implementing security measures using practices and tools like HTTPS, JWT, OAuth, and security-focused frameworks to protect user data and website functionality.</li>\r\n<li><em>Performance Optimization:</em>&nbsp;Enhancing website speed and performance through practices and techniques like image optimization, caching, optimizing CSS and JS etc.</li>\r\n</ul>\r\n</li>\r\n</ul>\r\n<p><em>Why they work together:</em></p>\r\n<p>An exceptional website design can falter without proper development. The most beautiful design needs a functional core to deliver a good user experience.<br />Conversely, a well-developed website might struggle to attract users if the design is confusing or unappealing.</p>\r\n<p><em>Analogy:</em>&nbsp;Think of web design as the architect who creates the blueprint for a house. The web developer is the builder who translates that plan into a functional and beautiful structure.</p>",
        icon: "/images/web-design.webp",
        // extraComponent: (
        //     <div className="websites-section">
        //         <h3>Websites We Made</h3>
        //         <ul>
        //             <li><a href="https://example1.com">Example 1</a></li>
        //             <li><a href="https://example2.com">Example 2</a></li>
        //             <li><a href="https://example3.com">Example 3</a></li>
        //         </ul>
        //     </div>
        // ),
    },
    {
        name: "Social Media",
        mobilename: "Social Media",
        slug: "social-media",
        meta_description: "Boost your brand's online presence with expert social media management. Our agency helps you create and execute winning strategies, from content creation to advertising, ensuring measurable results and maximum engagement. Partner with us today to elevate your social media presence and drive brand growth.",
        description: "<p>In today's digitally connected world, social media stands as a powerful tool for brands to connect with customers, build brand awareness, and drive sales. Managing a successful social media presence demands more than just occasional posts. This is precisely where social media services for brands excel. <br><br>Managing social media in-house is time-consuming. Agencies empower your team to concentrate on other core business activities. Thus partnering with a social media agency is a strategic move for your brand, as they boast a team of seasoned social media professionals who are always current with the latest trends and algorithms. & taking care of strategy development to content creation and social media advertising, they excel in all areas.<br><br>Investing in a social media agency will revolutionise your brand's online presence. We as a agency will help you create and execute a winning social media strategy that delivers measurable results.<br><br>Let's discuss your brand's social media goals. Contact us today to get a quote for our social media service</p>",
        icon: "/images/social-media.webp",
    },
    {
        name: "Search Engine <br> Optimization <br>(SEO)",
        mobilename: "SEO",
        slug: "seo",
        meta_description: "Boost your brand's online visibility with expert SEO services. Improve your search engine rankings, drive targeted traffic, and increase conversions with a cost-effective, long-term strategy. Partner with our agency today to dominate search results and grow your brand.",
        description: "<p>Search Engine Optimization (SEO): The Key to Unlocking Online Visibility for Your Brand</p>\r\n<p>In today&rsquo;s digital age, if your brand isn&rsquo;t ranking high in search engine results, it&rsquo;s like having a storefront on a deserted street. Potential customers simply won&rsquo;t find you. That&rsquo;s where SEO comes in.</p>\r\n<p><em>What is SEO?</em></p>\r\n<p>SEO stands for Search Engine Optimization. It&rsquo;s the ongoing process of optimizing your website and online presence to improve its visibility in search engine results pages (SERPs) for relevant keywords. The higher you rank, the more likely potential customers are to discover your brand.</p>\r\n<p><em>Why is SEO Important for Brands?</em></p>\r\n<ul>\r\n<li><em>Increased Website Traffic:</em>&nbsp;Effective SEO drives qualified traffic to your website from people actively searching for products or services like yours.</li>\r\n<li><em>Improved Brand Awareness:</em>&nbsp;High search engine rankings boost brand visibility and establish you as a thought leader in your industry.</li>\r\n<li><em>More Leads and Conversions:</em>&nbsp;Organic traffic from SEO is often more targeted than other channels, leading to higher conversion rates (turning visitors into customers).</li>\r\n<li><em>Cost-Effective Marketing</em>: SEO delivers long-term results and offers a significant return on investment compared to some paid advertising options.</li>\r\n</ul>\r\n<p><em>Don&rsquo;t Let Your Competitors Outrank You!</em></p>\r\n<p>Investing in a reputable SEO agency is an investment in your brand&rsquo;s future. Partner with a team of experts who can help you dominate search engine results pages and achieve your online marketing goals.</p>\r\n<p>Ready to take control of your brand&rsquo;s online visibility? Contact us today for a free SEO consultation and learn how our agency can help your brand rise to the top of search results!</p>",
        icon: "/images/seo.webp",
    },
    {
        name: "Digital <br>Marketing",
        mobilename: "Digital <br>Marketing",
        slug: "digital-marketing",
        meta_description: "Unlock the power of digital marketing with a winning strategy. Boost your brand’s online presence through SEO, content marketing, social media, paid ads, and email marketing. Partner with our agency today to reach your target audience, improve conversions, and stay ahead of the competition.",
        description: "<p>The Digital Age Demands a Digital Edge: Why Your Brand Needs a Winning Digital Marketing Strategy<br>Imagine a world where potential customers can't find your brand online. In today's digital landscape, that's a harsh reality for businesses without a strong digital marketing strategy.<p><em>What is Digital Marketing?<br></em>Digital marketing encompasses all your online efforts to reach your target audience, promote your brand, and drive conversions. It's a vast toolbox filled with strategies like:<p>Search Engine Optimization (SEO): Improving your website's ranking in search results for relevant keywords.<br>Content Marketing: Creating valuable and engaging content (blogs, articles, videos) to attract and educate your audience.<br>Social Media Marketing: Building a strong online presence and engaging with your audience on social media platforms.<br>Paid Advertising: Utilizing platforms like Google Ads and social media advertising to reach a wider audience with targeted campaigns.<br>Email Marketing: Nurturing relationships with potential and existing customers through email campaigns.<p>Why is Digital Marketing Crucial for Brands?<p>The benefits of a well-crafted digital marketing strategy are undeniable:<br>Increased Brand Awareness: Reach a wider audience online and establish your brand as a leader in your industry.<br>Targeted Audience Engagement: Connect with potential customers who are actively searching for products or services like yours.<br>Measurable Results: Track the success of your campaigns and make data-driven decisions to optimize your strategy for maximum impact.<br>Improved Conversion Rates: Turn website visitors into paying customers with targeted marketing efforts.<br>Competitive Edge: Stay ahead of the curve and outshine your competitors in the digital space.<p>Don't Go It Alone in the Digital World<p>Building a winning digital marketing strategy requires dedication and expertise. Partnering with a reputable digital marketing agency gives your brand the edge it needs to thrive online.<p>Ready to unlock the power of digital marketing for your brand? Contact us today for a free consultation and learn how our agency can craft a strategy that delivers real results!",
        icon: "/images/digital-marketing.webp",
    },
    {
        name: "Branding",
        mobilename: "Branding",
        slug: "branding",
        meta_description: "Your brand is more than just a logo – it's your identity. A strong brand builds trust, differentiates you from competitors, and drives customer loyalty. Let our branding experts craft a strategy that resonates with your audience and fuels business growth. Contact us for a free consultation!",
        description: "<p><strong>Your Brand: More Than Just a Logo</strong><p>In today's competitive marketplace, your brand is your identity. It's the essence of what makes your company unique and the emotional connection you forge with your customers. But branding is more than just a catchy slogan or a cool logo. It's a comprehensive strategy that encompasses everything from your visual identity to your messaging and customer experience.<p><strong>Why is a Strong Brand Essential?</strong><p><strong>• Builds Trust and Credibility:</strong> A well-defined brand establishes you as a trustworthy and reliable player in your industry.<br><strong>• Differentiates You from the Competition:</strong> A strong brand sets you apart from the crowd and helps you resonate with your target audience.<br><strong>• Drives Customer Loyalty:</strong> A brand that evokes positive emotions fosters customer loyalty and encourages repeat business.<br><strong>• Boosts Brand Awareness:</strong> A cohesive brand identity makes you recognizable and memorable, increasing brand awareness across all touch points.<br><strong>• Empowers Your Marketing Efforts:</strong> A strong brand provides a foundation for all your marketing activities, ensuring consistency and maximizing impact.<p><strong>Don't Leave Your Brand to Chance<br></strong><br>Building a strong brand is an ongoing process, but it's an investment that pays off in the long run. Partnering with a branding agency gives you access to a team of experts who can help you create a brand identity that resonates with your audience and fuels your business growth.<p><strong>Ready to unlock the power of branding for your business? Contact us today for a free consultation and learn how our branding agency can help you craft a brand that stands out, inspires, and drives success!</strong>",
        icon: "/images/branding.webp",
    },
    {
        name: "Performance <br>Marketing",
        mobilename: "Performance <br>Marketing",
        slug: "performance-marketing",
        meta_description: "Maximize your ROI with performance marketing strategies that deliver measurable results. From SEM to affiliate marketing and email campaigns, our agency can help you optimize your marketing spend for real growth. Contact us for a free consultation and boost your marketing efficiency!",
        description: "<p>In today's data-driven marketing landscape, every penny counts. Performance marketing is all about maximizing your return on investment (ROI) by focusing on marketing activities that deliver measurable results.<p><strong>What is Performance Marketing?</strong><p>Performance marketing encompasses a range of strategies where you only pay for specific actions, such as clicks, leads, or sales. Here are some key examples:<ul><li><strong>Search Engine Marketing (SEM):</strong>Pay-per-click (PPC) advertising on search engines like Google, where you only pay when someone clicks on your ad.<li><strong>Social Media Advertising:</strong>Targeted advertising campaigns on platforms like Facebook and Instagram, allowing you to reach a specific audience and pay based on clicks, engagements, or conversions.<li><strong>Affiliate Marketing:</strong>Partnering with other websites or influencers to promote your products or services and paying them a commission for each sale generated.<li><strong>Content Marketing:</strong>Creating valuable content that attracts potential customers and drives conversions, such as blog posts, info graphics, or videos.<li><strong>Email Marketing:</strong>Targeted email campaigns to nurture leads and drive sales.</ul><p><strong>Why is Performance Marketing Important for Brands?</strong><ul><li><strong>Measurable ROI:</strong>Track the effectiveness of your campaigns in real-time and see exactly how your marketing spend translates into sales.<li><strong>Targeted Audience:</strong>Reach the right people at the right time with laser-focused campaigns that resonate with their needs and interests.<li><strong>Increased Efficiency:</strong>Allocate your marketing budget effectively by focusing on strategies that deliver tangible results.<li><strong>Scalability:</strong>Easily adjust and optimize your campaigns based on performance data, maximizing your return on investment.<li><strong>Flexibility:</strong>Choose from a variety of performance marketing channels to tailor your strategy to your specific goals and target audience.</ul><p><strong>Don't Let Your Marketing Budget Go to Waste</strong><p>Performance marketing allows you to focus your efforts on strategies that deliver a measurable return on investment. Partnering with a performance marketing agency gives you access to a team of experts who can maximize your marketing ROI and drive real business growth.<p><strong>Ready to see the power of performance marketing for your brand? Contact us today for a free consultation and learn how our agency can craft a data-driven strategy that delivers the results you crave!</strong>",
        icon: "/images/target-marketing.webp",
    },
    {
        name: "Packaging",
        mobilename: "Packaging",
        slug: "packaging",
        meta_description: "Your packaging is a silent salesperson and a key element in customer experience. CREO Elements offers creative, functional, and eco-friendly packaging solutions, from design to prototyping. Protect your products, enhance brand appeal, and drive sales with customized packaging that stands out. Contact us today for a consultation!",
        description: "<p><strong>Your packaging is more than just a box.</strong><p>It's a silent salesperson, a brand ambassador on every shelf, and a crucial element in the customer experience. At CREO Elements, we understand the power of packaging and offer a complete suite of solutions to bring your brand vision to life.<br><strong><br>From concept to creation, we'll guide you through every step:</strong><br><strong>• Packaging Design:</strong> Our team of experienced designers will collaborate with you to develop creative and functional packaging solutions that perfectly align with your brand identity and target audience. We consider factors like:<ul><li><ul><li><strong>Target Market:</strong> Who are you trying to reach? We'll design packaging that resonates with their preferences.<li><strong>Product Protection:</strong> Your packaging needs to keep your product safe during transport and storage.<li><strong>Sustainability:</strong> We also offer eco-friendly materials and printing options to minimize environmental impact.<li><strong>Shelf Appeal:</strong> Your packaging needs to stand out from the competition and grab attention on store shelves.</ul><li><strong>Prototyping & Mock-ups:</strong> Before committing to a final design, we'll create physical prototypes and mock-ups so you can visualize the packaging in 3D and make fine-tune adjustments.<li><strong> Structural Design:</strong> We offer a variety of packaging options to suit your needs, including boxes, bags, pouches, tubes, and more. Our structural engineers will ensure your packaging is both visually appealing and functionally sound.<li><strong>Printing Solutions:</strong> We leverage cutting-edge printing technology and high-quality materials to deliver exceptional print results. Whether you need vibrant colours, intricate details, or specialty finishes, we have the expertise to make your packaging stand out.</ul><p><strong>Benefits of Partnering with Us:</strong><br><strong>• One-Stop Shop:</strong> We handle the entire packaging process, saving you time and resources.<br><strong>• Experienced Team:</strong> Our team of designers, printing specialists are passionate about creating exceptional packaging solutions.<br><strong>• Customizable Solutions:</strong> We don't offer a one-size-fits-all approach. We tailor our solutions to your specific brand and product needs.<br><strong>• Sustainability Focus:</strong> We offer eco-friendly materials and printing options to support your sustainability goals.<br><strong>• Competitive Pricing:</strong> Get the best value without compromising on quality.<br><strong>Invest in Packaging that Makes a Statement.<br></strong><br>Contact us today to discuss your packaging needs and discover how we can help you create packaging that elevates your brand, protects your products, and drives sales.",
        icon: "/images/seo.webp",
    },
    {
        name: "Gifting Solutions",
        mobilename: "Gifting <br>Solutions",
        slug: "gifting-solutions",
        meta_description: "CREO Elements takes the stress out of corporate gifting with a wide selection of personalized gifts, gift baskets, and subscription boxes. Strengthen relationships with employees, clients, and partners through thoughtful, expertly curated gifts. Contact us today to create lasting impressions with your gifting solutions!",
        description: "<p>Crafting the perfect corporate gift can be time-consuming and stressful.<p>CREO Elements takes the guesswork out of gifting with our Corporate Gifting Service. We handle everything, from selecting thoughtful gifts that align with your brand to personalized messaging and seamless delivery. Let us create lasting impressions and strengthen your relationships with employees, clients, and partners.<p><strong>Why Choose CREO Elements</strong><ul><li><strong>Unparalleled Selection:</strong> We offer an extensive range of gifts, catering to diverse tastes and preferences. From personalised keepsakes to gourmet gift baskets, our selection is carefully curated to ensure there’s something for everyone.<li><strong>Personalisation:</strong> Make your gift truly special with our personalised options. Add a name, date, or heartfelt message to create a one-of-a-kind present that will be cherished forever.<li><strong>Convenience:</strong> Say goodbye to the hassle of hunting for the perfect gift. Our user-friendly website allows you to browse, choose, and order from the comfort of your home.<li><strong>Expert Curation:</strong> Our team of gift experts stays updated on the latest trends and timeless classics. Rest assured, every item in our collection has been handpicked for its quality and appeal.<li><strong>Prompt Delivery:</strong> We understand the importance of timely gifting. With our efficient delivery system, your gift will arrive exactly when you want it to, ensuring that your surprise is well-timed and memorable.</ul><p><strong>Our Gifting Solutions</strong><ul><li><strong>Personalised Gifts:</strong><br>Make your loved ones feel truly special with personalised gifts that reflect their personality and interests. From engraved jewellery to custom photo frames, our selection lets you add a personal touch to every present.<li><strong>Gift Baskets:</strong><br>Indulge the senses with our gourmet gift baskets filled with delectable treats, wines, and more. Perfect for corporate gifting, celebrations, or simply showing appreciation.<li><strong>Occasion-specific Gifts:</strong><br>We’ve categorised our gifts to match every occasion. Whether it’s a wedding, baby shower, or retirement party, our thoughtfully curated options ensure you find the ideal gift.<li><strong>Subscription Boxes:</strong><br>Surprise your loved ones with the gift that keeps on giving. Our subscription boxes offer a delightful experience with carefully selected items delivered straight to their doorstep.</ul><p>Join Us in Celebrating Every Moment<p>Gifting is an art, and at CREO Elements, we’re here to help you master it. Whether you’re celebrating a milestone, expressing gratitude, or simply brightening someone’s day, our gifting solutions ensure that your message of love and care shines through.",
        icon: "/images/gifting-solutions.webp",
    },
    {
        name: "Print Solutions",
        mobilename: "Print <br>Solutions",
        slug: "print-solutions",
        meta_description: "Make a lasting impression with high-quality print solutions from CREO Elements. We offer everything from business essentials to vibrant marketing materials and custom packaging. Whether you need brochures, promotional products, or unique print jobs, we deliver exceptional quality and fast turnaround. Get in touch today for a free consultation!",
        description: "<p>Make a lasting impression across all touch points with our one-stop shop for premium printing solutions.<p>We cater to all your branding needs, from classic essentials to eye-catching promotional materials.<p><strong>Our comprehensive services include:</strong><br><strong>• Business Essentials:</strong> Create a professional first impression with high-quality business cards, letterheads, and envelopes. We offer a variety of paper stocks, finishes, and customization options to reflect your unique brand identity.<br><strong>• Marketing Materials:</strong> Capture attention and drive brand awareness with vibrant brochures, flyers, posters, and banners. Our printing experts will ensure your message stands out with exceptional colour accuracy and durability.<br><strong>• Promotional Products:</strong> Generate excitement and brand loyalty with customizable t-shirts, mugs, tote bags, and more. We offer a wide range of apparel and product options to suit your campaign or event.<br><strong>• Packaging Solutions:</strong> Make your products shine with eye-catching custom packaging. We offer a variety of materials and printing techniques to create packaging that's both functional and visually stunning. It's a powerful marketing tool right on your product shelf!<br><strong>• Calendar Printing:</strong> Stay top-of-mind year-round with branded calendars featuring your logo, images, and important dates. Choose from a variety of sizes and styles to fit your needs.<br><strong>• Custom Printing:</strong> We don't stop there! Have a unique printing need? Our team is here to help. We offer custom printing services for a wide range of materials and products.<p>Benefits of Partnering with Us:<p><strong>• Exceptional Quality:</strong> We use state-of-the-art printing technology and premium materials to ensure your printed materials look their absolute best.<br><strong>• Expert Guidance:</strong> Our experienced team will work closely with you to understand your brand vision and recommend the perfect printing solutions to meet your goals.<br><strong>• Seamless Ordering:</strong> Enjoy a user-friendly online platform for easy ordering and design collaboration.<br><strong>• Fast Turnaround Times:</strong> We understand your deadlines, so we offer quick turnaround times without compromising on quality.<br><strong>• Competitive Pricing:</strong> Get the best value for your budget with our competitive pricing and bulk order discounts.<br><strong><br>Grow your brand and make a lasting impression. Contact us today for a free consultation and discover how our printing solutions can help you achieve your marketing goals!</strong>",
        icon: "/images/print-solutions.webp",
    },
    {
        name: "Photography",
        mobilename: "Photography",
        slug: "photography",
        meta_description: "Capture attention and elevate your brand with high-quality photography and video solutions from CREO Elements. From professional product photos to dynamic video shoots, our experienced team delivers stunning visuals that resonate with your target audience. Contact us today for custom photography and video solutions that tell your brand's story!",
        description: "<p>Visuals are powerful storytellers.<br>In today's digital age, high-quality photos and videos are essential for capturing attention, building brand identity, and driving sales. CREO Elements offers a comprehensive suite of photography and video solutions designed to bring your brand to life.<p><strong>From concept to completion, we handle it all:</strong><br>• <strong>Product Photography:</strong> Showcase your products in their best light with professional product photo-shoots. Our experienced photographers use high-end equipment and lighting techniques to create crisp, clear, and engaging product images.<br>•<strong> Lifestyle Product Photography:</strong> Go beyond basic product shots. We create captivating lifestyle images that showcase your products in real-world settings, helping customers connect with how they can use and enjoy your offerings.<br><strong>• Product Video Shoots:</strong> Take your product presentations to the next level with dynamic product video shoots. We'll create engaging videos that highlight key features, benefits, and the emotional connection your products evoke.<br>• <strong>Video Editing:</strong> Our skilled video editors will transform your raw footage into polished and impactful videos. We offer a range of editing services, including colour correction, motion graphics, and sound design.<br>• <strong>Content Strategy & Development:</strong> We don't just capture visuals – we help you develop a winning content strategy. Our team will work with you to understand your target audience and brand goals to create a cohesive visual content strategy that delivers results.<p>Why Choose Us?<br>• <strong>Experienced Photographers & Videographers:</strong> Our team boasts a wealth of experience and expertise in various photography and videography styles.<br>• <strong>Creative Collaboration:</strong> We work closely with you to understand your vision and bring your brand story to life through stunning visuals.<br>• <strong>High-End Equipment & Techniques:</strong> We utilize top-of-the-line equipment and industry-leading techniques to ensure exceptional quality in every project.<br>• <strong>Full-Service Production:</strong> From concept development to post-production, we handle all aspects of your photography and video project, saving you time and resources.<br>• <strong>Measurable Results:</strong> We track key metrics to ensure your visual content is driving brand awareness and engagement.<br><strong><br>Invest in Visual Storytelling that Connects with Your Audience.<br></strong><br>Contact us today to discuss your photography and video needs. We'll create a custom solution that helps you achieve your marketing goals and build a strong visual presence for your brand.",
        icon: "/images/photography.webp",
    },
    {
        name: "Public Relations <br>(PR)",
        mobilename: "Public Relations <br>(PR)",
        slug: "pr",
        meta_description: "Build a strong reputation and drive brand success with CREO Elements' PR services. From media relations to crisis communication, influencer partnerships, and thought leadership campaigns, we help shape your brand's narrative. Let us help you cultivate, protect, and amplify your brand’s reputation. Contact us today to start your PR journey!",
        description: "<p><strong>Building a good reputation for your business is important!</strong> Public Relations (PR) can help you with that.<p>PR is like building a positive reputation for a company or person. It involves crafting messages that get people to trust and recognize the brand. PR uses various tools to spread awareness and shape how the public sees the company, ultimately helping it grow.<p><strong>Our PR Services</strong><ul><li><strong>Media Relations:<br></strong>Our PR experts excel in building and nurturing relationships with key media outlets to secure positive coverage, interviews, and features that tell your brand’s story.</ul><ul><li><strong>Brand Messaging:<br></strong>Crafting a compelling brand narrative is at the heart of effective PR. We work closely with you to develop and refine your brand’s messaging to resonate with your target audience.</ul><ul><li><strong>Crisis Communication:<br></strong>When challenges arise, our crisis communication team steps in to manage the situation swiftly and effectively, minimizing damage and safeguarding your reputation.</ul><ul><li><strong>Influencer Partnerships:<br></strong>Leverage the power of influencers to authentically connect with your audience. We identify and collaborate with influencers who align with your brand’s values and objectives.</ul><ul><li><strong>Thought Leadership:<br></strong>Establish your brand as an industry authority with thought leadership campaigns. We position your experts as go-to sources in your field, enhancing your credibility.</ul><p><strong>Let’s Shape Your Narrative Together</strong><p>Your brand’s reputation is one of your most valuable assets. At Creo Elements, we’re passionate about helping you cultivate, protect, and amplify it through strategic PR initiatives. Join us in harnessing the power of PR to tell your story, build trust, and drive success.<div> </div>",
        icon: "/images/pr.webp",
    },
    // Add more services as needed
];

export const Service = () => {
    const { serviceSlug } = useParams();
    const service = servicesData.find((service) => service.slug === serviceSlug);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!service) {
        return <h2>Service not found</h2>;
    }

    return (
        <div className="service-page">
            {/* Helmet for SEO */}
            <Helmet>
                <title>{service.name.replace(/<br\s*\/?>/g, ' ')} | Creo Elements LLP</title>
                <meta name="description" content={service.meta_description.replace(/<\/?p>/g, '').replace(/<br\s*\/?>/g, ' ')} />
                <meta property="og:title" content={service.name.replace(/<br\s*\/?>/g, ' ')} />
                <meta property="og:description" content={service.meta_description.replace(/<\/?p>/g, '').replace(/<br\s*\/?>/g, ' ')} />
                <meta property="og:image" content={service.icon} />
                <meta property="og:url" content={`https://creo-elements.com/services/${service.slug}`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={service.name.replace(/<br\s*\/?>/g, ' ')} />
                <meta name="twitter:description" content={service.meta_description.replace(/<\/?p>/g, '').replace(/<br\s*\/?>/g, ' ')} />
                <meta name="twitter:image" content={service.icon} />
                <link rel="canonical" href={`https://creo-elements.com/services/${service.slug}`} />



                {/* Structured Data (JSON-LD) */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": service.name,
                        "description": service.description.replace(/<\/?p>/g, ''),
                        "image": `https://creo-elements.com${service.icon}`,
                        "provider": {
                            "@type": "Organization",
                            "name": "Creo Elements LLP",
                            "url": "https://creo-elements.com"
                        }
                    })}
                </script>
            </Helmet>

            <Grids className="grid-1" />
            <div>
                <div className="service-header z-2">
                    <div className="service-heading">
                        {isMobile ? (
                            <h1><WavyText fontSize="2.5rem">{service.mobilename}</WavyText></h1>
                        ) : (
                            <h1><WavyText fontSize="6rem">{service.name}</WavyText></h1>
                        )}
                    </div>
                    <div className="service-image">
                        <img src={service.icon} alt={service.name} />
                    </div>
                </div>
                <div className="service-description z-2" dangerouslySetInnerHTML={{ __html: service.description }} />
                <div className="service-callback z-2">
                    <div className="callback-button clickable">
                        <Link to="/contact-us" className="clickable">Contact Us</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};