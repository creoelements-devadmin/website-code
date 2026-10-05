import { Helmet } from 'react-helmet-async';
import { Banner } from './Banner';
import { About } from './About';
import { Services } from './Services';
import { Testimonials } from './Testimonials';
import { Clients } from './Clients';
import { Partners } from './Partners';
import { Process } from './Process';
import { Careers } from './Careers';
import Projects from './Projects';

function Home() {
 


  return (
    <div className=' '>

      <Helmet>
        {/* This is For SEO Head Tag Content */}


        {/* On Page SEO */}
        <title>Creo Elements LLP - Digital Marketing Agency | SEO, Branding & Growth</title>
        <meta name="description" content="Creo Elements LLP is a full-service digital marketing agency offering SEO, branding, performance marketing, social media management, and website development for growing businesses." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://creo-elements.com" />
        <meta property="og:title" content="Creo Elements LLP – Digital Marketing & Branding Agency" />
        <meta property="og:description" content="Full-service digital marketing agency specializing in SEO, branding, performance marketing, social media management, and web development." />
        <meta property="og:image" content="https://creo-elements.com/images/logo.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://creo-elements.com" />
        <meta name="twitter:title" content="Creo Elements LLP – Digital Marketing Agency" />
        <meta name="twitter:description" content="SEO, branding, performance marketing, social media management, and website development by Creo Elements LLP." />
        <meta property="twitter:logo" content="/images/logo.png" />



        {/* Technical SEO */}
        <link rel="canonical" href="https://creo-elements.com" />
        <script type="application/ld+json">
          {`
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://creo-elements.com",
  "name": "Creo Elements",
  "url": "https://creo-elements.com",
  "image": "https://creo-elements.com/images/logo.png",
  "telephone": "+919892360639",
  "priceRange": "$$",

  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Mulchand Mansion, 1st Floor, Office No. 10, Old Hanuman Lane, Princess Street",
    "addressLocality": "Kalbadevi, Mumbai",
    "addressRegion": "MH",
    "postalCode": "400002",
    "addressCountry": "IN"
  },

  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 18.9482,
    "longitude": 72.8296
  },

  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "10:30",
    "closes": "18:30"
  },

  "sameAs": [
    "https://www.facebook.com/creoelements",
    "https://www.instagram.com/creoelements",
    "https://www.linkedin.com/company/creoelementsllp/"
  ],

  "description": "Creo Elements is a leading 360-degree digital marketing and branding agency based in Kalbadevi, Mumbai. Specialists in SEO, Performance Marketing, and Web Development."
}
        `}
        </script>



      </Helmet>
      <div className=" ">

        <Banner />
         <About />
        <Projects />
        <Services />
        <Process />
        <Clients />
        <Partners />
        <Testimonials />
        <Careers />
       </div>
    </div>
  );
}

export default Home;
