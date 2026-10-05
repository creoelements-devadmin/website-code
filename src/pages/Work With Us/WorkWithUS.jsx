import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { OPEN_ROLES } from '../../data/Role';
import { RoleItem } from './RoleItem';

const API_URL = 'https://creo-elements.com/blogs/wp-json/custom/v1/application-submit';

const SEO_TITLE = 'Work With Us | Creo Elements LLP';
const SEO_DESCRIPTION =
    'Creo Elements LLP is hiring interns in Mumbai for e-commerce, graphic design and website development. See open roles and apply.';
const SEO_IMAGE = 'https://creo-elements.com/images/work-with-us-banner.webp';
const SEO_URL = 'https://creo-elements.com/work-with-us';

const inputClass =
    'w-full bg-transparent border-b border-btnPrimary/15 focus:border-primary outline-none font-primary text-sm text-btnPrimary py-2 placeholder:text-btnPrimary/30 transition-colors';

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
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState(INITIAL_FORM);
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

        // Phone: digits only, max 10. Other fields: no limit, just no leading spaces.
        const cleaned =
            name === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value.replace(/^\s+/, '');

        setFormData((prev) => ({ ...prev, [name]: cleaned }));
    };

    const handleFileChange = (e) =>
        setFormData((prev) => ({ ...prev, cv: e.target.files[0] || null }));

    const toggleRole = (role) => setOpenRole((prev) => (prev === role.id ? null : role.id));

    const applyForRole = (role) => {
        setFormData((prev) => ({ ...prev, role: role.name }));
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        if (!formData.role) {
            alert('Please pick a role first.');
            setShowForm(false);
            return;
        }

        setLoading(true);

        const body = new FormData();
        Object.entries(formData).forEach(([key, value]) => body.append(key, value));

        try {
            const response = await fetch(API_URL, { method: 'POST', body });
            const result = await response.json();

            if (response.ok) {
                alert('Application sent. We will get back to you soon.');
                form.reset(); // clears the uncontrolled file input
                setFormData(INITIAL_FORM);
                setOpenRole(null);
                setShowForm(false);
            } else {
                alert('Something went wrong: ' + (result?.message || 'please try again.'));
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('There was an error sending your application. Please try again.');
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
                            Creo Elements is a collaborative creative and digital agency based in Mumbai. We are
                            building a team of designers, developers, strategists and creators who care about
                            thoughtful ideas, strong execution and work that creates genuine value.
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
                            <div className="flex items-center justify-between mb-6">
                                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-primary text-xs px-3 py-1.5 rounded-full">
                                    Applying as {formData.role}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="font-primary text-xs text-btnPrimary/50 hover:text-primary cursor-pointer"
                                >
                                    Close ✕
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <Field label="Your name">
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Full name"
                                        className={inputClass}
                                    />
                                </Field>

                                <Field label="Email">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="you@example.com"
                                        className={inputClass}
                                    />
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
                                        required
                                        placeholder="9876543210"
                                        className={inputClass}
                                    />
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
                                            required
                                            className="hidden"
                                        />
                                        <span className="font-primary text-xs text-primary shrink-0 ml-3">Browse</span>
                                    </label>
                                    <p className="font-primary text-xs text-btnPrimary/50 mt-2 ml-2">
                                        CV must be in PDF format
                                    </p>
                                </div>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input type="checkbox" required className="mt-1 accent-primary w-4 h-4" />
                                    <span className="font-primary text-xs text-btnPrimary/60">
                                        I'm currently based in Mumbai
                                    </span>
                                </label>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-primary cursor-pointer text-secondary font-primary text-sm rounded-full py-4 mt-2 transition-opacity hover:opacity-90 disabled:opacity-60"
                                >
                                    {loading ? 'Sending…' : 'Send application'}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};