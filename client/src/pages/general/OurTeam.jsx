import React from 'react';
import Team from '../../images/faq-team/teams.png';
import Rov from '../../images/faq-team/babay.png';
import cha from '../../images/faq-team/cha.png';
import marvs from '../../images/faq-team/marvs.png';
import momsh from '../../images/faq-team/momsh.png'
import Footer from '../../components/Footer';


const OurTeam = () => {
  return (
    <div>
      {/* Background Section */}
      <div className="flex flex-col justify-center items-center px-5 bg-[#EB9721]">
        <div
          className="flex justify-between items-end p-9 mt-0 overflow-hidden"
          style={{
            backgroundImage: `url(${Team})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '300px',
            opacity: '100px',
          }}
          alt="About Us Image"
        >
          <h2
  className="text-[#181C14] text-[5rem] font-semibold"
  style={{
    WebkitTextStroke: '1px #EB9721', // Stroke width and color
    WebkitTextFillColor: '#181C14', // Fills the text color
  }}
>
  Our Team
</h2>
        </div>


        {/* Team Description */}
        <div className="text-center py-10 px-5 w-full bg-[#FBE7CF]">
          <h2 className="text-[1.2rem] font-medium text-[#5B3A29]">
            We are a collaborative team committed to creating a user-focused system through teamwork and innovation.
          </h2>
        </div>


        {/* Team Members Section */}
        <div className="w-full bg-[#FBE7CF] py-10">
          <div className="relative flex justify-center gap-x-12 gap-y-11">
            {[
              { 
                img: momsh, 
                name: "Raynalyn Salonoy", 
                role: "Project Manager" 
              },
              { 
                img: Rov, 
                name: "Rovelyn Paradero", 
                role: "Frontend Developer" 
              },
              { 
                img: marvs, 
                name: "Marvin Tenebroso", 
                role: "Backend Developer" 
              },
              { 
                img: cha, 
                name: "Ma. Charity Pediri", 
                role: "UI/UX Designer" 
              }
            ].map((member, index) => (
              <div
                key={index}
                className="relative bg-white shadow-lg rounded-xl p-8 w-72 transform hover:scale-105 transition-all duration-200"
                style={{
                  marginTop: `${index * 20}px`, // Stagger effect
                  boxShadow: '2px 2px 9px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* Profile Image */}
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-[#FAEFE2]">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Name and Location */}
                <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600 text-center mb-4">
                  {member.location}
                </p>
                {/* Role Button */}
                <div className="mt-4 flex justify-center">
                  <span className="block bg-orange-400 text-white text-sm font-semibold py-2 px-6 rounded-full shadow-md">
                    {member.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Footer */}
      <Footer />
    </div>
  );
};


export default OurTeam;
