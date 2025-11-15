import React, { useState, useEffect, useRef } from 'react';
import { Grids } from '../../components/Grids';
import WavyText from '../../components/elements/WavyText';
import './BlogList.css';
import { Helmet } from 'react-helmet-async';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';


import { Pagination } from 'swiper/modules';


export const BlogList = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 825);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 825);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            <Helmet>
                <title>Our Blogs | Creo Elements LLP</title>
                <meta
                    name="description"
                    content="Explore our blog series covering essential topics like digital marketing, branding, websites, and more. Gain insights to grow your business online."
                />
                <meta property="og:title" content="Our Blogs | Creo Elements LLP" />
                <meta
                    property="og:description"
                    content="Explore our blog series covering essential topics like digital marketing, branding, websites, and more. Gain insights to grow your business online."
                />
                <meta property="og:image" content="https://creo-elements.com/images/blog-banner.webp" />
                <meta property="og:url" content="https://creo-elements.com/blogs" />
                <meta name="twitter:card" content="summary_large_image" />
                <link rel="canonical" href="https://creo-elements.com/blog" />
            </Helmet>

            <div className='blog-page'>
                <Grids className='grid-1' />

                <div className='blog-page-wrapper z-2'>
                    <div className="page-title">
                        {isMobile ? <WavyText fontSize="3rem" text="Our Blogs" /> : <WavyText fontSize="8rem">Our Blogs</WavyText>}
                    </div>

                    <div className="blog-category">
                        <h2>➖ Going Online 101</h2>
                        <a href="https://creo-elements.com/blogs/going-online-101">
                            <div className="blog-item">
                                <img src="https://creo-elements.com/blogs/wp-content/uploads/2025/02/Going-Online-101.png" alt="Going Online 101" />
                                <p>Going Online 101: Why and How Your Business Needs to Step Into the Digital World</p>
                            </div>
                        </a>
                        <Swiper
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                1024: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                            }}
                            pagination={true}
                            modules={[Pagination]}
                            className="sub-blogs">
                            <SwiperSlide>
                                <a href="https://creo-elements.com/blogs/selling-online-advanced-strategies-for-e-commerce-growth/" class="sub-blog">
                                    <div className="blog-item">
                                        <img src="https://creo-elements.com/blogs/wp-content/uploads/2025/03/Selling-Online.png" alt="Going Online 101" />
                                        <p>Selling Online: Advanced E-commerce Strategies</p>
                                    </div>
                                </a>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    
                    
                    <div className="blog-category">
                        <h2>➖ Digital Marketing 101</h2>
                        <a href="https://creo-elements.com/blogs/digital-marketing-101">
                            <div className="blog-item">
                                <img src="https://creo-elements.com/blogs/wp-content/uploads/2025/02/Digital-Marketing-101.png" alt="Digital Marketing 101" />
                                <p>Digital Marketing 101: A Beginner’s Guide to Online Success</p>
                            </div>
                        </a>
                        <Swiper
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                1024: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                            }}
                            pagination={true}
                            modules={[Pagination]}
                            className="sub-blogs">
                            <SwiperSlide>
                                <a href="https://creo-elements.com/blogs/ultimate-digital-marketing-strategy/" class="sub-blog">
                                    <div className="blog-item">
                                        <img src="https://creo-elements.com/blogs/wp-content/uploads/2025/03/Ultimate-Digital-Marketing-Strategy.png" alt="Ultimate Digital Marketing Strategy" />
                                        <p>Ultimate Digital Marketing Strategy: Moving Beyond the ‘What’ to the Critical ‘How’</p>
                                    </div>
                                </a>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    
                    <div className="blog-category">
                        <h2>➖ Branding 101</h2>
                        <a href="https://creo-elements.com/blogs/branding-101">
                            <div className="blog-item">
                                <img src="https://creo-elements.com/blogs/wp-content/uploads/2025/02/Branding-101.png" alt="Branding 101" />
                                <p>Branding 101: A Business Owner’s Guide to Building a Powerful Brand</p>
                            </div>
                        </a>
                    </div>


                    <div className="blog-category">
                        <h2>➖ Website 101</h2>
                        <a href="https://creo-elements.com/blogs/websites-101">
                            <div className="blog-item">
                                <img src="https://creo-elements.com/blogs/wp-content/uploads/2025/02/Websites-101.png" alt="Websites 101" />
                                <p>Websites 101: Plan, Build, & Launch Your Dream Website</p>
                            </div>
                        </a>
                    </div>


                    <div className="blog-category">
                        <h2>➖ Social Media 101</h2>
                        <a href="https://creo-elements.com/blogs/social-media-101">
                            <div className="blog-item">
                                <img src="https://creo-elements.com/blogs/wp-content/uploads/2025/02/Social-Media-101.png" alt="Social Media 101" />
                                <p>Social Media 101: Decoding the Digital Landscape for Business Growth</p>
                            </div>
                        </a>
                    </div>

                    <div className="blog-category">
                        <h2>➖ Photography 101</h2>
                        <a href="https://creo-elements.com/blogs/photography-101">
                            <div className="blog-item">
                                <img src="https://creo-elements.com/blogs/wp-content/uploads/2025/02/Photography-101.png" alt="Photography 101" />
                                <p>Photography 101: The Power of Visuals in Business</p>
                            </div>
                        </a>
                    </div>


                </div>
            </div>
        </div>
    );
};
