import React, { useState } from 'react';
import Footer from '../../components/Footer';
import girl from '../../images/faq-team/girl.png'
import boy from '../../images/faq-team/boy.png'

const FAQs = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const handleQuestionClick = (questionId) => {
    if (activeQuestion === questionId) {
      setActiveQuestion(null);
    } else {
      setActiveQuestion(questionId);
    }
  };

  const faqData = [
    {
      section: "General Overview",
      questions: [
        {
          question: "What is EarlyLearners Hub?",
          answer: "EarlyLearners Hub is a game-based learning platform for preschool and kindergarten students. It focuses on improving literacy and numeracy skills through engaging, interactive games."
        },
        {
          question: "Why is EarlyLearners Hub important for early childhood education?",
          answer: "It addresses the challenges of traditional teaching methods by providing an innovative and engaging platform that enhances foundational skills while supporting teachers in tracking student progress."
        }
      ]
    },
    {
      section: "For Students",
      questions: [
        {
          question: "How does EarlyLearners Hub help young learners?",
          answer: "The platform engages students through fun, interactive games, helping them develop essential skills like letter recognition, phonics, and basic arithmetic while keeping them motivated."
        },
        {
          question: "What skills does EarlyLearners Hub focus on?",
          answer: "The platform focuses on foundational literacy and numeracy skills, including letter recognition, phonics, and arithmetic."
        },
        {
          question: "How does EarlyLearners Hub sustain children's attention?",
          answer: "By incorporating colorful visuals, interactive games, and immediate feedback through scores, the platform keeps young learners focused and engaged during learning sessions."
        },
        {
          question: "Is EarlyLearners Hub easy for young children to use?",
          answer: "Yes, the platform is designed with a child-friendly interface, making it simple and intuitive for young learners to navigate and enjoy."
        }
      ]
    },
    {
      section: "For Teachers/Administrators",
      questions: [
        {
          question: "How does the platform track student progress?",
          answer: "The platform tracks students' scores during gameplay, providing teachers and administrators with valuable insights into each child's learning progress."
        },
        {
          question: "Can teachers customize content on the platform?",
          answer: "Yes, teachers and administrators can upload educational videos and tailor activities to suit the specific needs of their students."
        },
        {
          question: "How does EarlyLearners Hub benefit teachers and administrators?",
          answer: "The platform simplifies the teaching process by providing tools to monitor student progress and adapt learning materials, enabling a more personalized teaching approach."
        }
      ]
    },
    {
      section: "Platform Features",
      questions: [
        {
          question: "What makes EarlyLearners Hub different from traditional teaching methods?",
          answer: "Unlike traditional methods, the platform uses interactive, game-based learning to engage students effectively and improve foundational skills in an enjoyable way."
        }
      ]
    },
    {
      section: "Getting Started",
      questions: [
        {
          question: "How can I get started with EarlyLearners Hub?",
          answer: "Teachers or administrators can facilitate student use by signing into the platform, uploading content if needed, and guiding students as they engage with interactive games and trackable activities."
        }
      ]
    }
  ];

  return (
    <div className="bg-[#EB9721] w-full px-5 h-auto">
      <div className="bg-[#F0BC78] w-full h-[50vh] flex justify-between items-center">
        <img 
          src={boy} 
          alt="boy" 
          className="w-1/4 h-full object-contain object-bottom" 
        />
        <div className="w-1/2 h-[20vh] flex justify-center items-center flex-col">
          <h1 className="text-white text-4xl font-bold">FAQ'S</h1>
          <h1 className="text-white text-4xl font-bold">Frequently Asked Questions</h1>
        </div>
        <img src={girl} alt="girl" className="w-1/4" />
      </div>
      <div
        className="bg-[#EBCEA8] h-auto py-10 mt-[-15.5vh] px-5 pt-24"
        style={{
          clipPath: 'polygon(39% 0, 61% 0, 79% 2%, 91% 4%, 100% 7%, 100% 100%, 0 100%, 0 6%, 12% 3%, 21% 2%)',
        }}
      >
        {faqData.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-8">
            <h2 className="text-2xl border border-[#EB9721] w-[40%] p-4 rounded-2xl mb-4">
              {section.section}
            </h2>
            <div className="w-full h-auto mt-3 border-[#EB9721] border rounded-2xl p-4">
              {section.questions.map((faq, index) => (
                <div key={index} className="mb-4">
                  <h2 
                    className="text-2xl cursor-pointer hover:text-[#EB9721] transition-colors"
                    onClick={() => handleQuestionClick(`${sectionIndex}-${index}`)}
                  >
                    {faq.question}
                  </h2>
                  {activeQuestion === `${sectionIndex}-${index}` && (
                    <p className="text-md mt-2 transition-all duration-300 ease-in-out">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default FAQs;
