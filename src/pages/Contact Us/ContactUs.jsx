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
                <title>
                    Contact Creo Elements LLP | Digital Marketing Agency in Mumbai
                </title>

                {/* Meta Description */}
                <meta
                    name="description"
                    content="Contact Creo Elements LLP, a Mumbai-based digital marketing agency, for SEO, web design, branding, and performance marketing solutions. Speak with our team and get a quick response."
                />

                {/* Canonical */}
                <link
                    rel="canonical"
                    href="https://creo-elements.com/contact-us"
                />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="Contact Digital Marketing Agency in Mumbai | Creo Elements LLP"
                />
                <meta
                    property="og:description"
                    content="Get in touch with Creo Elements LLP, a Mumbai-based digital marketing agency, to discuss SEO, web design, branding, and performance marketing solutions."
                />
                <meta
                    property="og:image"
                    content="https://creo-elements.com/images/contact-us-banner.webp"
                />
                <meta
                    property="og:url"
                    content="https://creo-elements.com/contact-us"
                />
                <meta property="og:site_name" content="Creo Elements LLP" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content="Contact Digital Marketing Agency in Mumbai | Creo Elements LLP"
                />
                <meta
                    name="twitter:description"
                    content="Looking for a digital marketing agency in Mumbai? Contact Creo Elements LLP for SEO, branding, web design, and marketing solutions."
                />
                <meta
                    name="twitter:image"
                    content="https://creo-elements.com/images/contact-us-banner.webp"
                />
                {/* Structured Data (JSON-LD) */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ProfessionalService",
                        "name": "Creo Elements LLP",
                        "url": "https://creo-elements.com/contact-us",
                        "logo": "https://creo-elements.com/images/logo.png",
                        "image": "https://creo-elements.com/images/contact-us-banner.webp",
                        "description":
                            "Creo Elements LLP is a Mumbai-based digital marketing agency providing SEO, performance marketing, web design, branding, and eCommerce solutions.",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Mumbai",
                            "addressRegion": "MH",
                            "addressCountry": "IN"
                        },
                        "areaServed": {
                            "@type": "AdministrativeArea",
                            "name": "Mumbai, Maharashtra, India"
                        },
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "contactType": "customer service",
                            "email": "creoelementsllp@gmail.com",
                            "telephone": "+91-9892360639"
                        },
                        "sameAs": [
                            "https://www.instagram.com/creoelements/",
                            "https://www.linkedin.com/company/creoelementsllp/"
                        ]
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
                        <div className="break"></div>
                        <label htmlFor="help"  >I'm looking for help with </label>
                        <input
                            type="text"
                            name="help"
                            placeholder="Website, branding, social media"
                            value={formData.help}
                            onChange={handleChange}
                            required
                        />
                        <div className="break"></div>
                        <label htmlFor="budget">My budget is </label>
                        <input
                            type="text"
                            name="budget"
                            placeholder="Your Budget"
                            value={formData.budget}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="deadline">and I need it by</label>
                        <input
                            type="text"
                            name="deadline"
                            placeholder="next month, 1 week"
                            value={formData.deadline}
                            onChange={handleChange}
                            required
                        />
                        <div className="break"></div>
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
                        <div className="break"></div>
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
                                <label htmlFor="website_url">&nbsp;It's on</label>
                                <input
                                    type="url"
                                    name="website_url"
                                    placeholder="yourwebsite.com"
                                    value={formData.website_url}
                                    onChange={handleChange}
                                />
                            </>
                        )}
                        <div className="break"></div>
                        <label htmlFor="email">Please contact me at </label>
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

