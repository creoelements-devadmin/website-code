import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import Field from './InputField';
import { Button } from '../../components/Button';
import MapBox from './MapBox';

const API_URL = 'https://creo-elements.com/blogs/wp-json/custom/v1/forminator-submit';

// Starting values of the form (all empty)
const emptyForm = {
    name: '',
    brand: '',
    industry: '',
    help: '',
    budget: '',
    deadline: '',
    website: 'yes',
    website_url: '',
    email: '',
    phone: '',
};

// Remove HTML tags like <script> and extra spaces
const clean = (text) => text.replace(/<[^>]*>/g, '').trim();

const checkForm = (data) => {
    const errors = {};

    if (clean(data.name).length < 2) errors.name = 'Please enter your name.';
    if (clean(data.brand).length < 2) errors.brand = 'Please enter your brand name.';
    if (clean(data.industry).length < 2) errors.industry = 'Please enter your industry.';
    if (!clean(data.budget)) errors.budget = 'Please enter your budget.';
    if (clean(data.help).length < 10) errors.help = 'Please write at least 10 characters.';
    if (!clean(data.deadline)) errors.deadline = 'Please enter your timeline.';

    if (data.website === 'yes') {
        const looksLikeWebsite = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i;
        if (!looksLikeWebsite.test(clean(data.website_url))) {
            errors.website_url = 'Please enter a real website, like yourbrand.com';
        }
    }

    const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
    if (!looksLikeEmail.test(data.email.trim())) errors.email = 'Please enter a correct email.';
    if (!/^[6-9]\d{9}$/.test(data.phone)) errors.phone = 'Please enter a 10-digit mobile number.';

    return errors;
};

const ContactUs = () => {
    const [formData, setFormData] = useState(emptyForm);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [message, setMessage] = useState('');

    // Runs every time the person types
    const handleChange = (e) => {
        const { name, value } = e.target;

        const newValue = ['phone', 'budget'].includes(name) ? value.replace(/\D/g, '') : value;

        setFormData({ ...formData, [name]: newValue });
        setErrors({ ...errors, [name]: '' }); // remove the old error
        setMessage('');
    };

    // Runs when the person presses "Send it over"
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Step 1: bot trap. Real people can't see this box, so it stays empty.
        if (e.target.company_site.value) {
            setSent(true); // pretend success, send nothing
            return;
        }

        // Step 2: check all fields
        const foundErrors = checkForm(formData);
        setErrors(foundErrors);

        if (Object.keys(foundErrors).length > 0) {
            setMessage('Please fill all required fields correctly.');
            return; // STOP. Nothing is sent.
        }

        // Step 3: clean every value, then send
        const safeData = {};
        Object.keys(formData).forEach((key) => {
            safeData[key] = clean(formData[key]);
        });

        setLoading(true);
        try {await axios.post(API_URL, safeData, { timeout: 15000 });
            setSent(true);
            setFormData(emptyForm);
        } catch (error) {
            setMessage('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Style for the Yes / Not yet buttons
    const choiceClass = (active) =>
        `text-sm font-medium px-4 py-2 rounded-full border transition-colors duration-200 ${
            active ? 'bg-btnPrimary text-secondary border-btnPrimary' : 'bg-white text-btnPrimary/50 border-btnPrimary/10'
        }`;

    return (
        <div className="w-full min-h-screen">
            <Helmet>
                <title>Contact Creo Elements LLP | Digital Marketing Agency in Mumbai</title>
                <meta
                    name="description"
                    content="Contact Creo Elements LLP, a Mumbai-based digital marketing agency, for SEO, web design, branding, and performance marketing solutions. Speak with our team and get a quick response."
                />
                <link rel="canonical" href="https://creo-elements.com/contact-us" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Contact Digital Marketing Agency in Mumbai | Creo Elements LLP" />
                <meta
                    property="og:description"
                    content="Get in touch with Creo Elements LLP, a Mumbai-based digital marketing agency, to discuss SEO, web design, branding, and performance marketing solutions."
                />
                <meta property="og:image" content="https://creo-elements.com/images/contact-us-banner.webp" />
                <meta property="og:url" content="https://creo-elements.com/contact-us" />
                <meta property="og:site_name" content="Creo Elements LLP" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Contact Digital Marketing Agency in Mumbai | Creo Elements LLP" />
                <meta
                    name="twitter:description"
                    content="Looking for a digital marketing agency in Mumbai? Contact Creo Elements LLP for SEO, branding, web design, and marketing solutions."
                />
                <meta name="twitter:image" content="https://creo-elements.com/images/contact-us-banner.webp" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'ProfessionalService',
                        name: 'Creo Elements LLP',
                        url: 'https://creo-elements.com/contact-us',
                        logo: 'https://creo-elements.com/images/logo.png',
                        image: 'https://creo-elements.com/images/contact-us-banner.webp',
                        description:
                            'Creo Elements LLP is a Mumbai-based digital marketing agency providing SEO, performance marketing, web design, branding, and eCommerce solutions.',
                        address: {
                            '@type': 'PostalAddress',
                            addressLocality: 'Mumbai',
                            addressRegion: 'MH',
                            addressCountry: 'IN',
                        },
                        areaServed: { '@type': 'AdministrativeArea', name: 'Mumbai, Maharashtra, India' },
                        contactPoint: {
                            '@type': 'ContactPoint',
                            contactType: 'customer service',
                            email: 'creoelementsllp@gmail.com',
                            telephone: '+91-9892360639',
                        },
                        sameAs: [
                            'https://www.instagram.com/creoelements/',
                            'https://www.linkedin.com/company/creoelementsllp/',
                        ],
                    })}
                </script>
            </Helmet>

            <div className="px-5 md:px-15 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* ---------------- LEFT SIDE ---------------- */}
                <div>
                    <h1 className="text-6xl sm:text-8xl md:leading-20 leading-15 text-btnPrimary mt-4 w-full">
                        Ready when <span className="text-primary italic">you are.</span>
                    </h1>

                    <p className="text-btnPrimary/60 text-base leading-relaxed text-justify mt-8">
                        Whether it is a brand identity that needs clarity, a website ready to scale or a complete digital strategy, tell us what you are working towards. We will help you identify the right next step.
                    </p>

                    <div className="bg-white rounded-4xl border border-btnPrimary/10 p-8 mt-10">
                        <p className="text-2xl text-btnPrimary">Rather skip typing?</p>
                        <p className="text-btnPrimary/55 text-sm mt-2 leading-relaxed">
                            Call, message, or email us directly — a real person picks up on the other end.
                        </p>
                        <div className="flex flex-wrap gap-3 mt-6">
                            <Button target="tel:+919892360639" name="Call +91 98923 60639" />
                            <Button target="mailto:creoelementsllp@gmail.com" name="Email the team" />
                        </div>
                    </div>

                    {/* Map for computer screens */}
                    <MapBox className="hidden md:block" />
                </div>

                {/* ---------------- RIGHT SIDE (FORM) ---------------- */}
                <div className="bg-white p-5 rounded-4xl border border-gray-200">
                    {sent ? (
                        <div className="py-10">
                            <p className="font-display text-4xl text-btnPrimary">Sent — thank you.</p>
                            <p className="text-btnPrimary/55 mt-3">We&apos;ll get back to you within a day. Talk soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                            {/* Bot trap: hidden from people, bots fill it */}
                            <input name="company_site" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

                            <div className="grid grid-cols-2 gap-4">
                                <Field name="name" label="Your name" placeholder="Client name" value={formData.name} onChange={handleChange} error={errors.name} />
                                <Field name="brand" label="Brand name" placeholder="Client brand name" value={formData.brand} onChange={handleChange} error={errors.brand} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Field name="industry" label="Industry" placeholder="B2C" value={formData.industry} onChange={handleChange} error={errors.industry} />
                                <Field name="budget" label="Budget (₹)" placeholder="Enter amount in rupees" inputMode="numeric" value={formData.budget} onChange={handleChange} error={errors.budget} />
                            </div>

                            <Field
                                as="textarea"
                                name="help"
                                label="What do you need help with?"
                                placeholder="A new website, better SEO, a brand refresh..."
                                value={formData.help}
                                onChange={handleChange}
                                error={errors.help}
                            />

                            <Field name="deadline" label="Ideal timeline" placeholder="6–8 weeks" value={formData.deadline} onChange={handleChange} error={errors.deadline} />

                            {/* Do you have a website? */}
                            <div>
                                <span className="text-xs text-btnPrimary/50 pl-1">
                                    Do you have a website? <span className="text-red-500">*</span>
                                </span>
                                <div className="flex items-center gap-2 mt-1.5">
                                    <button type="button" onClick={() => setFormData({ ...formData, website: 'yes' })} className={choiceClass(formData.website === 'yes')}>
                                        Yes
                                    </button>
                                    <button type="button" onClick={() => setFormData({ ...formData, website: 'no', website_url: '' })} className={choiceClass(formData.website === 'no')}>
                                        Not yet
                                    </button>
                                </div>

                                {formData.website === 'yes' && (
                                    <div className="pt-3">
                                        <Field name="website_url" label="Where's it live?" placeholder="yourbrand.com" value={formData.website_url} onChange={handleChange} error={errors.website_url} />
                                    </div>
                                )}
                            </div>
                    
                            <div className="grid grid-cols-2 gap-4">
                                <Field name="email" label="Email" type="email" placeholder="you@brand.com" value={formData.email} onChange={handleChange} error={errors.email} />
                                <Field name="phone" label="Phone" type="tel" inputMode="numeric" placeholder="98XXXXXXXX" value={formData.phone} onChange={handleChange} error={errors.phone} />
                            </div>

                            {message && <p className="text-sm text-red-500 pl-1">{message}</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-2 self-start hover:scale-105    bg-primary text-secondary text-sm font-medium px-8 py-4 rounded-full w-full disabled:opacity-60 transition-all ease-in-out duration-200 hover:bg-primary"
                            >
                                {loading ? 'Sending…' : 'Send it over'}
                            </button>
                        </form>
                    )}
                </div>

                 <MapBox className="md:hidden block" />
            </div>
        </div>
    );
};

export default ContactUs;