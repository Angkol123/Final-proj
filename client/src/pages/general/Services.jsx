import React from 'react'
import service from '../../images/img5.jpg'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import list from '../../images/list.png'
import lets from '../../images/lets.png'

const Services = () => {
  return (
    <div>
    <div className='flex flex-col justify-center items-center px-5 bg-[#EB9721]'>
  
      <div
      
        className='flex justify-between items-end p-9 mt-0 overflow-hidden '
        
        style={{
          backgroundImage: `url(${service})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '500px',
          opacity: '50px',
          marginTop: '',
        }}
        alt="About Us Image"
        
      >
          <div className=" absolute  bg-white bg-opacity-50  h-[20vh]"></div>
        
        <h1
          className='text-[#181C14] text-[5rem] font-semibold'
        >
          Services
        </h1>
        <div className='w-[30vw] h-[10vh] flex gap-16 justify-center items-center'>
          <Link to='/about' className='underline font-bold text-[1.3rem]'>About Us</Link>
          <Link to='/services' className='underline font-bold text-[1.3rem]'>Services</Link>
        </div>
      </div>

      <div className='bg-[#EBCEA8] w-[100%] h-auto p-9'>
        <div className='flex w-full h-[25vh] p-5 gap-9'>
          <img src={list} alt="list" />
          <div className='w-[85%] h-full p-5'>
            <p >Why Choose Us</p>
            <h1 className='text-center text-[1.5rem] text-[#5B3A29]'>We offer a unique educational experience tailored to young learners</h1>
            <p className='text-center mx-auto mt-4 w-[35vw]'>At EarlyLearners Hub Tutorial Services, we are dedicated to providing an exceptional learning environment that nurtures your child's growth and potential. Here’s why you should choose us</p>
          </div>
        </div>
        <div className='grid grid-cols-3 grid-rows-2 gap-9 p-5'>
          <div className='h-[25vh]'>
            <p className='font-bold'>Personalized Learning Approach</p>
            <div className='bg-[#EDC285] p-9 h-[80%] mt-5 rounded-lg'>
              <p className='text-center'>We customize our teaching methods to match each child's unique learning style and pace, ensuring they receive the attention and support they need.</p>
            </div>
          </div>
          <div>
            <p className='font-bold'>Interactive and Engaging Sessions</p>
            <div className='bg-[#EDC285] p-9 h-[80%] mt-5 rounded-lg flex items-center'>
              <p className='text-center'>Our team consists of experienced and passionate educators who are committed to guiding and inspiring your child through their educational journey.</p>
            </div>
          </div>
          <div>
            <p className='font-bold'>Comprehensive Programs</p>
            <div className='bg-[#EDC285] p-9 h-[80%] mt-5 rounded-lg flex items-center'>
              <p className='text-center'>From early reading programs to writing fundamentals, we offer a range of comprehensive courses to build essential skills in young learners.</p>
            </div>
          </div>
          <div>
            <p className='font-bold'>Flexible Tutoring Options</p>
            <div className='bg-[#EDC285] p-9 h-[80%] mt-5 rounded-lg flex items-center'>
              <p className='text-center'>Whether you prefer one-on-one sessions or group classes, we offer flexible options to suit your child’s needs and your schedule.</p>
            </div>
          </div>
          <div>
            <p className='font-bold'>Focus on Confidence Building</p>
            <div className='bg-[#EDC285] p-9 h-[80%] mt-5 rounded-lg flex items-center'>
              <p className='text-center'>Our supportive environment encourages children to build self-confidence, empowering them to take on new challenges with enthusiasm.</p>
            </div>
          </div>
          <div>
            <p className='font-bold'>Expert Educators</p>
            <div className='bg-[#EDC285] p-9 h-[80%] mt-5 rounded-lg flex items-center'>
              <p className='text-center'>Our team consists of experienced and passionate educators who are committed to guiding and inspiring your child through their educational journey.</p>
            </div>
          </div>
        </div>
        <div className='w-full h-[25vh] flex gap-9 px-[30vh] justify-center'>
          <div className='w-[50%]'>
            <p className='font-bold'>Holistic Development</p>
            <div className='bg-[#EDC285] p-9 h-[80%] mt-5 rounded-lg flex items-center'>
              <p className='text-center'>We promote social skills development, problem-solving abilities, and critical thinking, ensuring well-rounded growth for every child.</p>
            </div>
          </div>
          <div className='w-[50%]'>
            <p className='font-bold'>Parental Involvement</p>
            <div className='bg-[#EDC285] p-9 h-[80%] mt-5 rounded-lg flex items-center'>
              <p className='text-center'>We believe in collaborating with parents to create a holistic learning experience, ensuring alignment between home and school learning.</p>
            </div>
          </div>
        </div>
        <div className='w-full h-[20vh] flex gap-9 justify-center items-center mt-5'>
          <h1 className='w-[50vw] text-[1.8rem]'>Choose EarlyLearners Hub for an engaging, supportive, and effective learning journey that empowers your child to succeed!</h1>
          <img src={lets} alt="run"/>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  )
}

export default Services