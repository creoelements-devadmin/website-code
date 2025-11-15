import React, { useState, useEffect } from 'react';
import { Grids } from '../../components/Grids';
import WavyText from '../../components/elements/WavyText';
import './ContactUs.css';
import { Helmet } from 'react-helmet-async';

export const ContactUS = () => {

    const [loading, setLoading] = useState(false);


    const [formData, setFormData] = useState({
        name: '',
        help: '',
        budget: '',
        deadline: '',
        brand: '',
        industry: '',
        website: 'yes',
        website_url: '',
        email: '',
        phone: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://creo-elements.com/blogs/wp-json/custom/v1/forminator-submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            if (response.ok) {
                alert('Form submitted successfully!');
            } else {
                alert('Failed to submit form: ' + result);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting the form. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    const [isMobile, setIsMobile] = useState(window.innerWidth < 825);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 825);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            <Helmet>
                <title>Contact Us | Creo Elements LLP</title>
                <meta
                    name="description"
                    content="Get in touch with Creo Elements LLP to discuss your next project. Whether you need web design, SEO, branding, or digital marketing services, we're here to help. Fill out the contact form and we’ll get back to you as soon as possible."
                />
                <meta property="og:title" content="Contact Us | Creo Elements LLP" />
                <meta
                    property="og:description"
                    content="Get in touch with Creo Elements LLP to discuss your next project. Whether you need web design, SEO, branding, or digital marketing services, we're here to help. Fill out the contact form and we’ll get back to you as soon as possible."
                />
                <meta property="og:image" content="https://creo-elements.com/images/contact-us-banner.webp" />
                <meta property="og:url" content="https://creo-elements.com/contact-us" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Contact Us | Creo Elements LLP" />
                <meta
                    name="twitter:description"
                    content="Get in touch with Creo Elements LLP to discuss your next project. Whether you need web design, SEO, branding, or digital marketing services, we're here to help. Fill out the contact form and we’ll get back to you as soon as possible."
                />
                <meta name="twitter:image" content="https://creo-elements.com/images/contact-us-banner.webp" />
                <link rel="canonical" href="https://creo-elements.com/contact-us" />

                {/* Structured Data (JSON-LD) */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Creo Elements LLP",
                        "url": "https://creo-elements.com",
                        "logo": "https://creo-elements.com/images/logo.png",
                        "description": "Get in touch with Creo Elements LLP to discuss your next project. Whether you need web design, SEO, branding, or digital marketing services, we're here to help. Fill out the contact form and we’ll get back to you as soon as possible.",
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "email": "creoelementsllp@gmail.com",
                            "contactType": "customer service"
                        }
                    })}
                </script>
            </Helmet>

            <div className='contact-page'>
                <Grids className='grid-1' />

                <div className='contact-page-wrapper z-2'>
                    <div className="page-title">

                        {isMobile ? <WavyText fontSize="3rem" text="Contact Us" /> : <WavyText fontSize="8rem">Contact Us</WavyText>}
                    </div>
                    <form onSubmit={handleSubmit} className="contact-form">
                        <label htmlFor="name">Hello my name is</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="help">I'm looking for help with </label>
                        <input
                            type="text"
                            name="help"
                            placeholder="Website, branding, social media"
                            value={formData.help}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="budget">My budget is </label>
                        <input
                            type="text"
                            name="budget"
                            placeholder="Your Budget"
                            value={formData.budget}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="deadline">And i need it by</label>
                        <input
                            type="text"
                            name="deadline"
                            placeholder="next month, 1 week"
                            value={formData.deadline}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="brand">My brand name is</label>
                        <input
                            type="text"
                            name="brand"
                            placeholder="Brand Name"
                            value={formData.brand}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="industry">which is into</label>
                        <input
                            type="text"
                            name="industry"
                            placeholder="the industry"
                            value={formData.industry}
                            onChange={handleChange}
                            required
                        />

                        <select
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            defaultValue="yes"
                        >
                            <option value="yes">
                                I have a website
                            </option>
                            <option value="no">
                                I don't have a website
                            </option>
                        </select>

                        {formData.website === 'yes' && (
                            <>
                                <label htmlFor="website_url">It's on</label>
                                <input
                                    type="url"
                                    name="website_url"
                                    placeholder="yourwebsite.com"
                                    value={formData.website_url}
                                    onChange={handleChange}
                                />
                            </>
                        )}

                        <label htmlFor="email">Please contact me at</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="phone">and</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                        <div className='submit-button'>
                            <button type="submit" className='callback-button clickable' disabled={loading}>
                                {loading ? (
                                    <div className="spinner" />
                                ) : (
                                    'Send Message'
                                )}
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

