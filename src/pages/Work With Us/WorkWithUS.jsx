import React, { useState, useEffect } from 'react';
import { Grids } from '../../components/Grids';
import WavyText from '../../components/elements/WavyText';
import './WorkWithUs.css';
import { Helmet } from 'react-helmet-async';

export const WorkWithUS = () => {


    const [loading, setLoading] = useState(false);


    const [formData, setFormData] = useState({
        name: '',
        help: '',
        budget: '',
        deadline: '',
        brand: '',
        industry: '',
        website: '',
        website_url: '',
        email: '',
        phone: '',
        cv: null, // Added to store the CV file
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            cv: e.target.files[0] // Store the file object
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loader

        const formDataObject = new FormData();
        formDataObject.append('name', formData.name);
        formDataObject.append('help', formData.help);
        formDataObject.append('budget', formData.budget);
        formDataObject.append('website', formData.website);
        formDataObject.append('cv', formData.cv);

        try {
            const response = await fetch('https://creo-elements.com/blogs/wp-json/custom/v1/application-submit', {
                method: 'POST',
                body: formDataObject,
            });

            const result = await response.json();
            if (response.ok) {
                alert('Form submitted successfully!');
                setFormData({
                    name: '',
                    help: '',
                    budget: '',
                    deadline: '',
                    brand: '',
                    industry: '',
                    website: '',
                    website_url: '',
                    email: '',
                    phone: '',
                    cv: null,
                }); // Reset form
            } else {
                alert('Failed to submit form: ' + result?.message || result);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting the form. Please try again.');
        } finally {
            setLoading(false); // Stop loader
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
                <title>Careers at Creo Elements LLP | Digital Marketing Agency in Mumbai</title>

                <meta name="description" content="Join Creo Elements LLP, a leading digital marketing agency in Mumbai. Build your career in SEO, web design, branding, social media management, and e-commerce development. Apply today and grow with our creative team." />

                <meta name="keywords" content="Digital marketing jobs in Mumbai, SEO jobs Mumbai, Web design careers Mumbai, Branding agency jobs, Social media marketing jobs, Creo Elements careers, Work at Creo Elements LLP" />

                <meta name="author" content="Creo Elements LLP" />
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                
                <link rel="canonical" href="https://creo-elements.com/work-with-us" />

                
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Careers at Creo Elements LLP | Digital Marketing Agency in Mumbai" />
                <meta property="og:description" content="Looking to grow your career in digital marketing? Join Creo Elements LLP in Mumbai and work on SEO, web development, branding, and performance marketing projects." />
                <meta property="og:url" content="https://creo-elements.com/work-with-us" />
                <meta property="og:image" content="https://creo-elements.com/images/work-with-us-banner.webp" />
                <meta property="og:site_name" content="Creo Elements LLP" />

                
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Careers at Creo Elements LLP | Digital Marketing Agency in Mumbai" />
                <meta name="twitter:description" content="Apply for SEO, web design, branding, and digital marketing roles at Creo Elements LLP, Mumbai." />
                <meta name="twitter:image" content="https://creo-elements.com/images/work-with-us-banner.webp" />

                {/* Structured Data (JSON-LD) */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Creo Elements LLP",
                        "url": "https://creo-elements.com",
                        "logo": "https://creo-elements.com/images/logo.png",
                        "description": "Join Creo Elements LLP and be part of a dynamic and innovative team. We are looking for passionate individuals to contribute to our digital marketing, web design, SEO, social media, and branding projects. Apply now to work with a team committed to achieving excellence in every project.",
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
                        {isMobile ? <WavyText fontSize="3rem" text="Work With <br>Us" /> : <WavyText fontSize="8rem">Work With Us</WavyText>}

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

                        <label htmlFor="help">My Email is</label>
                        <input
                            type="email"
                            name="help"
                            placeholder="your@emailaddress.com"
                            value={formData.help}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="budget">My Phone Number is</label>
                        <input
                            type="text"
                            name="budget"
                            placeholder="+91 1234567890"
                            value={formData.budget}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="industry">I want to work as a</label>
                        <select
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                        >
                            <option value="graphic designer">
                                Graphic Designer
                            </option>
                            <option value="operation manager">
                                Operations Manager
                            </option>
                            <option value="social media manager">
                                Social Media Manager
                            </option>
                            <option value="web designer">
                                Web Designer
                            </option>
                        </select>
                        <br />
                        <div className="file-upload-wrapper">
                            <label htmlFor="cv" className="file-upload-label">Upload your CV</label>
                            <input
                                type="file"
                                name="cv"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                required
                                className="file-upload-input"
                            />
                        </div>

                        <label className="custom-checkbox">
                            <input
                                type="checkbox"
                                name="terms"
                                required
                            />
                            I confirm that I am currently based in Mumbai
                        </label>


                        <div className='submit-button'>
                            <button type="submit" className='callback-button clickable' disabled={loading}>
                                {loading ? <span className="spinner" /> : 'Apply here'}

                            </button>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    );
};
