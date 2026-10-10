import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '../../components/Button';
import { servicesData } from '../../data/ServiceData';
import FAQ from '../FAQ';
import SEO from '../../components/SEO';
import { seo } from "../../data/SEOData";



export const Service = () => {
    const { serviceSlug } = useParams();
    const service = servicesData.find((s) => s.slug === serviceSlug);
    const currentIndex = servicesData.findIndex((s) => s.slug === serviceSlug);
    // const nextService = servicesData[(currentIndex + 3) % servicesData.length];
    const nextService = [1, 2, 3].map((i) => servicesData[(currentIndex + i) % servicesData.length])
    const seo = service?.seo || {};

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bggray">
                <h2 className="font-display text-4xl text-black">Service not found</h2>
            </div>
        );
    }

    const cleanText = (str = '') => str.replace(/<\/?p>/g, ' ').replace(/<br\s*\/?>/g, ' ').trim();

    return (
        <div className="service-page min-h-screen  font-primary">
            {/* SEO */}
           <SEO {...seo["/services/seo"]} path="/services/seo" />
          

            <div className="mx-auto   px-5 lg:px-10">

                <header className="pt-32 pb-10 md:pt-44 md:pb-14">
                    <span className="text-xs uppercase tracking-[0.18em] text-black/45"> {service.mobilename}</span>
                    <div className="mt-4 flex lg:flex-row flex-col lg:items-end ">
                        <h1 className="  leading-[0.92] tracking-tight lg:text-8xl py-10 lg:py-0 text-[10vw] font-display italic text-primary">
                            {service.name}{' '}
                         </h1>
                        <p className="max-w-lg text-sm leading-relaxed text-black/55 lg:pb-2">
                            {seo.metaDescription || cleanText(service.meta_description)}
                        </p>
                    </div>
                </header>

                <div className="mb-16 md:mb-24">
                    <div className="relative    lg:h-screen   bg-white md:bg-transparent lg:border-none rounded-4xl border border-gray-300   ">
                        <img
                            className="   w-full object-cover  rounded-4xl"
                            src={service.icon}
                            alt={seo.imageAlt || cleanText(service.name)}
                            loading="lazy"
                        />
                      
                    </div>
                </div>

                <div className="mb-20 grid grid-cols-1 items-start gap-10 md:mb-28 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.8fr)] lg:gap-20">
                    {/* Left sticky rail */}
                    <aside className="h-fit lg:sticky lg:top-24 lg:self-start">
                        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-primary">What we deliver</p>
                        <h2 className="mb-5 font-display text-4xl leading-tight text-black md:text-5xl">
                            {service.name}{' '}
                            <span className="italic text-primary">{service.higlight}</span>
                        </h2>
                        <p className="mb-8 max-w-sm text-sm leading-relaxed text-black/55">
                            {seo.homepageDescription || cleanText(service.meta_description)}
                        </p>
                        <Button name={seo.primaryCta || "Get in touch"} target="/contact-us" />

                        {service.capabilities?.length > 0 && (
                            <div className="mt-10 border-t border-black/10 pt-6">
                                <p className="mb-4 text-xs uppercase tracking-[0.16em] text-black/45">{service.category} services</p>
                                <ul className="space-y-3 text-sm text-black/65">
                                    {service.capabilities.map((capability) => (
                                        <li key={capability} className="flex gap-3">
                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                            <span>{capability}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </aside>

                    {/* Right — rich description */}
                    <div
                        className="service-description rounded-4xl border border-black/5 bg-white p-7 md:rounded-[2.5rem] md:p-12
                            text-black/60 leading-relaxed
                            [&_p]:mb-5 [&_p]:last:mb-0
                            [&_strong]:text-black [&_strong]:font-semibold
                            [&_em]:text-primary [&_em]:not-italic [&_em]:font-medium
                            [&_ul]:my-5 [&_ul]:space-y-3 [&_ul]:pl-1
                            [&_li]:relative [&_li]:pl-5
                            [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.55em]
                            [&_li]:before:h-1.5 [&_li]:before:w-1.5 [&_li]:before:rounded-full [&_li]:before:bg-primary"
                        dangerouslySetInnerHTML={{ __html: service.description }}
                    />
                </div>



                {/* ============ NEXT SERVICE ============ */}
                {/* ============ NEXT SERVICES ============ */}
                <div className="mb-10">
                    <div className="mb-8">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/40">
                            Explore more
                        </span>

                        <h2 className="mt-2 font-display text-4xl text-black md:text-5xl">
                           Creo other services
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {nextService.map((serviceItem, index) => (
                            <div key={serviceItem.slug}
                                className="group rounded-4xl border flex flex-col justify-between border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary"
                            >
                                {/* Number */}
                                <span className="text-xs uppercase tracking-[0.18em] text-black/35"> 0{index + 1} </span>

                                {/* Service Name */}
                                <h3 className=" font-display text-3xl leading-tight text-black md:text-4xl">
                                    {cleanText(serviceItem.name)}{' '}
                                    <span className="italic text-primary">
                                        {cleanText(serviceItem.higlight)}
                                    </span>
                                </h3>

                                {/* Description */}
                                <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-black/55">
                                    {serviceItem.seo?.metaDescription ||
                                        cleanText(serviceItem.meta_description)}
                                </p>

                                {/* Button */}
                                <div className="mt-8 w-full flex justify-center">
                                    <Button name="Explore service" target={`/services/${serviceItem.slug}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* <FAQ serviceSlug={service.slug} serviceName={service.name.trim()} /> */}
        </div>
    );
};