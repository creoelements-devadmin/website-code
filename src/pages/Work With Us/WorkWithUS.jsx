import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { OPEN_ROLES } from '../../data/Role';
import { RoleItem } from './RoleItem';

const API_URL = 'https://creo-elements.com/blogs/wp-json/custom/v1/application-submit';
const SEO_TITLE = 'Work With Us | Creo Elements LLP';
const SEO_DESCRIPTION = 'Creo Elements LLP is hiring interns in Mumbai for e-commerce, graphic design and website development. See open roles and apply.';
const SEO_IMAGE = 'https://creo-elements.com/images/work-with-us-banner.webp';
const SEO_URL = 'https://creo-elements.com/work-with-us';

const inputClass = 'w-full bg-transparent border-b border-btnPrimary/15 focus:border-primary outline-none font-primary text-sm text-btnPrimary py-2 placeholder:text-btnPrimary/30 transition-colors';

const TEAM_DETAILS = [
    { title: 'Based in Mumbai', text: 'A studio you can walk into.' },
    { title: 'Design, dev, strategy, content', text: 'Work across the whole brief.' },
    { title: '100% in-office', text: 'Ideas move faster at one table.' },
];

const INITIAL_FORM = { name: '', email: '', phone: '', role: '', cv: null };

const Field = ({ label, children }) => (
    <div>
        <label className="font-primary text-xs text-btnPrimary/50 block mb-2">{label}</label>
        {children}
    </div>
);

export const WorkWithUS = () => {
    const [openRole, setOpenRole] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const formRef = useRef(null);

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (showForm) formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, [showForm, formData.role]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const cleaned = name === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value.replace(/^\s+/, '');
        setFormData((prev) => ({ ...prev, [name]: cleaned }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
        setMessage('');
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, cv: e.target.files[0] || null }));
        setErrors((prev) => ({ ...prev, cv: '' }));
        setMessage('');
    };

    const toggleRole = (role) => setOpenRole((prev) => (prev === role.id ? null : role.id));

    const applyForRole = (role) => {
        setFormData({ ...INITIAL_FORM, role: role.name.trim() });
        setErrors({});
        setMessage('');
        setSent(false);
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const foundErrors = {};
        const role = formData.role.trim();

        if (!formData.name.trim()) foundErrors.name = 'Please enter your name.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            foundErrors.email = 'Please enter a correct email.';
        }
        if (!/^\d{10}$/.test(formData.phone)) foundErrors.phone = 'Please enter a 10-digit phone number.';
        if (!formData.cv) foundErrors.cv = 'Please upload your CV.';
        if (!form.elements.mumbai_based.checked) foundErrors.mumbai_based = 'Please confirm you are based in Mumbai.';
        if (!role) foundErrors.role = 'Please pick a role first.';

        setErrors(foundErrors);
        if (Object.keys(foundErrors).length > 0) {
            setMessage('Please fill all required fields correctly.');
            return;
        }

        setLoading(true);

        const body = new FormData();
        body.append('name', formData.name);
        body.append('email', formData.email);
        body.append('phone', formData.phone);
        body.append('website', role); // the PHP plugin reads the position from "website"
        body.append('cv', formData.cv);

        try {
            const response = await fetch(API_URL, { method: 'POST', body });
            const result = await response.json();

            if (response.ok) {
                form.reset(); // clears the uncontrolled file input
                setFormData(INITIAL_FORM);
                setSent(true);
                setOpenRole(null);
            } else {
                setMessage('Something went wrong: ' + (result?.message || 'please try again.'));
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            setMessage('There was an error sending your application. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const reveal = (delay) =>
        `transition-all duration-700 ${delay} ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`;

    return (
        <>
            <Helmet>
                <title>{SEO_TITLE}</title>
                <meta name="description" content={SEO_DESCRIPTION} />
                <meta property="og:title" content={SEO_TITLE} />
                <meta property="og:description" content={SEO_DESCRIPTION} />
                <meta property="og:image" content={SEO_IMAGE} />
                <meta property="og:url" content={SEO_URL} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={SEO_TITLE} />
                <meta name="twitter:description" content={SEO_DESCRIPTION} />
                <meta name="twitter:image" content={SEO_IMAGE} />
                <link rel="canonical" href={SEO_URL} />
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Organization',
                        name: 'Creo Elements LLP',
                        url: 'https://creo-elements.com',
                        logo: 'https://creo-elements.com/images/logo.png',
                        description: SEO_DESCRIPTION,
                        contactPoint: {
                            '@type': 'ContactPoint',
                            email: 'creoelementsllp@gmail.com',
                            contactType: 'customer service',
                        },
                    })}
                </script>
            </Helmet>

            <div className="w-full min-h-screen">
                <div className="mx-auto px-5 md:px-10 py-20 md:py-28">
                    {/* Hero */}
                    <div className="flex items-start flex-col justify-between lg:flex-row gap-6 md:gap-8">
                        <h1 className={`text-5xl md:text-7xl leading-[1.05] text-btnPrimary max-w-4xl ${reveal('delay-100')}`}>
                            Come make things
                            <span className="block text-primary italic">worth talking about.</span>
                        </h1>

                        <p className={`font-primary text-sm text-btnPrimary/60 lg:max-w-[30%] mt-8 leading-relaxed ${reveal('delay-200')}`}>
                            Creo Elements is a collaborative creative and digital agency based in Mumbai. We are building a team of designers, developers, strategists and creators who care about thoughtful ideas, strong execution and work that creates genuine value.
                        </p>
                    </div>

                    <ul aria-label="About our team" className={`mt-14 grid gap-8 md:grid-cols-3 ${reveal('delay-300')}`}>
                        {TEAM_DETAILS.map((d) => (
                            <li key={d.title} className="border-l-2 border-primary pl-5">
                                <p className="font-primary text-base text-btnPrimary">{d.title}</p>
                                <p className="font-primary text-sm text-btnPrimary/60 mt-1">{d.text}</p>
                            </li>
                        ))}
                    </ul>

                    {/* Roles */}
                    <section className="mt-24" aria-labelledby="open-roles">
                        <div className="flex items-end justify-between mb-8">
                            <h2 id="open-roles" className="text-3xl md:text-4xl text-btnPrimary font-bold">
                                Open job roles
                            </h2>
                            <p className="font-primary text-sm text-btnPrimary/50">{OPEN_ROLES.length} positions</p>
                        </div>

                        <div>
                            {OPEN_ROLES.map((role) => (
                                <RoleItem
                                    key={role.id}
                                    role={role}
                                    isOpen={openRole === role.id}
                                    onToggle={() => toggleRole(role)}
                                    onApply={applyForRole}
                                />
                            ))}
                        </div>
                    </section>

                    {/* Application form: shown only after "Apply for this role" */}
                    {showForm && (
                        <div
                            ref={formRef}
                            className="bg-secondary rounded-4xl border-gray-200 border p-8 md:p-10 mt-10 scroll-mt-10"
                        >
                            {!sent && (
                                <div className="flex items-center justify-end mb-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="font-primary text-xs text-btnPrimary/50 hover:text-primary cursor-pointer"
                                    >
                                        Close ✕
                                    </button>
                                </div>
                            )}

                            {sent ? (
                                <div className="py-10" role="status">
                                    <p className="font-display text-4xl text-btnPrimary">Application sent — thank you.</p>
                                    <p className="text-btnPrimary/55 mt-3">We&apos;ll get back to you soon.</p>
                                </div>
                            ) : (
                                <>
                                    <form onSubmit={handleSubmit} noValidate className="space-y-6">
                                        <Field label="Position">
                                            <input
                                                name="role"
                                                value={formData.role}
                                                readOnly
                                                className={`${inputClass} cursor-default`}
                                            />
                                        </Field>

                                        <Field label="Your name">
                                            <input
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Full name"
                                                aria-invalid={Boolean(errors.name)}
                                                className={`${inputClass} ${errors.name ? 'border-red-500' : ''}`}
                                            />
                                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                                        </Field>

                                        <Field label="Email">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="you@example.com"
                                                aria-invalid={Boolean(errors.email)}
                                                className={`${inputClass} ${errors.email ? 'border-red-500' : ''}`}
                                            />
                                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                                        </Field>

                                        <Field label="Phone">
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                inputMode="numeric"
                                                pattern="[0-9]{10}"
                                                maxLength={10}
                                                placeholder="9876543210"
                                                aria-invalid={Boolean(errors.phone)}
                                                className={`${inputClass} ${errors.phone ? 'border-red-500' : ''}`}
                                            />
                                            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                                        </Field>

                                        <div>
                                            <p className="font-primary text-xs text-btnPrimary/50 mb-2">CV</p>
                                            <label className="flex items-center justify-between border border-dashed border-btnPrimary/25 rounded-2xl px-4 py-3 cursor-pointer hover:border-primary transition-colors">
                                                <span className="font-primary text-sm text-btnPrimary/70 truncate">
                                                    {formData.cv ? formData.cv.name : 'Upload your CV'}
                                                </span>
                                                <input
                                                    type="file"
                                                    name="cv"
                                                    accept=".pdf,application/pdf"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                />
                                                <span className="font-primary text-xs text-primary shrink-0 ml-3">Browse</span>
                                            </label>
                                            <p className="font-primary text-xs text-btnPrimary/50 mt-2 ml-2">
                                                CV must be in PDF format
                                            </p>
                                            {errors.cv && <p className="text-xs text-red-500 mt-1">{errors.cv}</p>}
                                        </div>

                                        <label className="flex items-start gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="mumbai_based"
                                                onChange={() => {
                                                    setErrors((prev) => ({ ...prev, mumbai_based: '' }));
                                                    setMessage('');
                                                }}
                                                aria-invalid={Boolean(errors.mumbai_based)}
                                                className="mt-1 accent-primary w-4 h-4"
                                            />
                                            <span className="font-primary text-xs text-btnPrimary/60">
                                                I'm currently based in Mumbai
                                            </span>
                                        </label>
                                        {errors.mumbai_based && <p className="text-xs text-red-500 -mt-4">{errors.mumbai_based}</p>}

                                        {message && <p role="alert" className="text-sm text-red-500">{message}</p>}

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-primary cursor-pointer text-secondary font-primary text-sm rounded-full py-4 mt-2 transition-opacity hover:opacity-90 disabled:opacity-60"
                                        >
                                            {loading ? 'Sending…' : 'Send application'}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};