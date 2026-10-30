import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { PageHeroBanner } from '../../components/Gsap/PageHeroBanner';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';

const blogSeriesData = [
  {
    category: 'Online Business',
    description:
      'Learn why having a strong online presence is essential and how your business can successfully enter the digital world.',
    title:
      'Going Online 101: Why Your Business Needs to Go Digital',
    url: 'https://creo-elements.com/blogs/going-online-101',
    image: '/images/servies image/dgm.png',
  },

  {
    category: 'E-commerce',
    description:
      'Discover advanced e-commerce strategies to attract customers, increase conversions, and grow your online sales.',
    title: 'Selling Online: Advanced E-commerce Strategies',
    url: 'https://creo-elements.com/blogs/selling-online-advanced-strategies-for-e-commerce-growth/',
    image:
      '/images/servies image/E-com.png',
  },

  {
    category: 'Digital Marketing',
    description:
      'Explore the basics of digital marketing and learn how online strategies can help your business reach and engage more customers.',
    title: 'Digital Marketing 101: A Beginner’s Guide to Online Success',
    url: 'https://creo-elements.com/blogs/digital-marketing-101',
    image:'/images/servies image/markting.png',
  },

  {
    category: 'Digital Marketing',
    description:
      'Go beyond the basics and discover the critical strategies, tactics, and execution needed to turn digital marketing into real business growth.',
    title: 'Beyond the ‘What’: The Critical ‘How’ of Digital Strategy',
    // title: 'Ultimate Digital Marketing Strategy: Moving Beyond the ‘What’ to the Critical ‘How’',
    url: 'https://creo-elements.com/blogs/ultimate-digital-marketing-strategy',
    image: '/images/servies image/markting.png',
  },

  {
    category: 'Branding',
    description:
      'Learn how to build a powerful and memorable brand that earns trust, stands out, and connects with your customers.',
    title:
      'Branding 101: A Business Owner’s Guide to Building a Powerful Brand',
    url: 'https://creo-elements.com/blogs/branding-101',
    image:
      '/images/servies image/brand.png',
  },

  {
    category: 'Web Development',
    description:
      'Discover how to plan, build, and launch a professional website that strengthens your brand and supports business growth.',
    title: 'Websites 101: Plan, Build, & Launch Your Dream Website',
    url: 'https://creo-elements.com/blogs/websites-101',
    image:
      '/images/service Banner/web1.png',
  },

  {
    category: 'Social Media',
    description:
      'Understand social media fundamentals and learn how to use digital platforms to build engagement and grow your business.',
    title:
      'Social Media 101: Decoding the Digital Landscape for Business Growth',
    url: 'https://creo-elements.com/blogs/social-media-101',
    image:'/images/servies image/socal.png',
  },

  {
    category: 'Photography',
    description:
      'Discover how powerful visuals and professional photography can strengthen your brand and create a lasting impression.',
    title: 'Photography 101: The Power of Visuals in Business',
    url: 'https://creo-elements.com/blogs/photography-101',
    image:'/images/servies image/Photography.png',
  },
];

export const BlogList = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const gridRef = useRef(null);

  const categories = useMemo(
    () => ['All', ...new Set(blogSeriesData.map((item) => item.category))],
    []
  );

  const filteredPosts = useMemo(
    () =>
      activeCategory === 'All'
        ? blogSeriesData
        : blogSeriesData.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  // Re-run the reveal every time the filter changes, not just on first load.
  useLayoutEffect(() => {
    if (!gridRef.current) return undefined;

    const tiles = gridRef.current.querySelectorAll('.blog-tile');
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || !tiles.length) {
      gsap.set(tiles, { opacity: 1, y: 0 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        tiles,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power3.out',
          stagger: 0.06,
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <div className="w-full min-h-screen  ">
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
        <meta property="og:url" content="https://creo-elements.com/blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://creo-elements.com/blog" />
      </Helmet>

      <div className="w-full md:min-h-[75vh] flex items-center justify-center">
        <PageHeroBanner
          title="Ideas, Insights"
          highlightTitle="& Perspectives"
          description="Not trends, not theory. Just straight talk from the team that builds, tests, and refines brands."
        />
      </div>

      <div className="px-3 md:px-5 lg:px-10  pb-24 ">
        {/* Category filter pills */}
        <div className="flex gap-2  overflow-x-auto pb-4 mb-8     ">
          {categories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={isActive}
                className={`shrink-0 cursor-pointer hover:scale-95   ease-in-out whitespace-nowrap rounded-full md:px-4 md:py-4 p-5  text-xs sm:text-sm font-medium border transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary text-white  '
                    : 'bg-white text-neutral-600 border-gray-300 hover:border-primary hover:text-btnPrimary'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Blog grid */}
        {filteredPosts.length === 0 ? (
          <p className=" text-sm text-neutral-500 py-10">
            No posts in this category yet.
          </p>
        ) : (
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {filteredPosts.map((item) => (
              <a
                key={item.url}
                href={item.url}
                className="blog-tile group flex flex-col gap-6   bg-white rounded-4xl overflow-hidden border border-gray-200 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                

                <div className="flex flex-col gap-4 px-5 py-1 mt-5   ">
                  <span className=" text-[11px] font-semibold uppercase tracking-wider text-primary">
                    {item.category}
                  </span>
                  <h3 className="font-Instrument text-xl leading-snug text-[btnPrimary group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className=" text-xs text-neutral-500 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                  <span className=" text-xs font-medium text-btnPrimary mt-1 inline-flex items-center gap-1">
                    Read article
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                      <path
                        d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                 <div className="w-full h-62.5  overflow-hidden  rounded-bl-4xl rounded-br-4xl border border-white bg-[#ECEEED] ">
                  <img
                    className="w-full h-full object-center object-contain  transition-transform duration-500 ease-out group-hover:scale-105"
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};