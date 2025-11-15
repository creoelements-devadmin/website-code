import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Link } from 'react-router-dom';
import membersData from '../../data/membersData'; // Import the data
import './Ourteam.css';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export const Ourteam = () => {
  const membersRef = useRef([]);

  useEffect(() => {
    membersRef.current.forEach((member, index) => {
      gsap.fromTo(
        member,
        {
          opacity: 0,
          y: 0,
        },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: member,
            start: "top 75%",
            end: "top 50%",
            scrub: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className='our-team z-2'>
      <div className="ourteam-wrapper">
        <div className="ourteam-header">
          <h2>Our team</h2>
        </div>
        <div className='ourteam-content'>
          <div className="ourteam-members">
            {membersData.map((member, index) => (
              <div className='member'
                ref={el => (membersRef.current[index] = el)}>
                <div className='member-image'>
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="member-name-detail">
                  <div className='member-name clickable'>
                  <Link 
                to={`/team/${member.slug}`} // Link to the member's single page
                key={index}
                className='clickable'
              >
                    {member.name}
                    </Link>
                  </div>
                  <div className='designation'>
                    {member.designation}
                  </div>
                </div>
                <div className='member-description'>
                  {member.description}
                </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
