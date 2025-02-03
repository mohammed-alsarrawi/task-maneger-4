import React from 'react'
import whatIsTask from '../image/whatistasks.png'
import abood from "../image/abood.jpg"
import Footer from '../components/Footer'
import task from "../image/tasks.png"
import avatar from "../image/avatar.png"
import ab from '../image/ab.png'

export default function About() {
  return (
    <>

      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">About Us</h1>
            <p className="font-normal text-base leading-6 text-gray-600 ">Feeling overwhelmed with too many tasks? Tasks Manager is here to help!
This app allows you to organize your tasks, set priorities, and ensure you never miss a deadline—whether you're working solo or with a team.
Managing daily tasks can be overwhelming, especially when juggling multiple responsibilities. Tasks Manager is designed to simplify your workflow, helping you stay organized, prioritize effectively, and meet deadlines without stress. Whether you’re an individual looking to boost personal productivity or a team leader aiming to streamline collaboration, our app provides all the essential tools to keep you on track.

</p>
          </div>
          <div className="lg:w-8/12">
            <img className="w-2xl"  src={whatIsTask} alt="A group of People" />
          </div>
        </div>








        <div className="flex flex-col lg:flex-row justify-between gap-8">

          <div className=" lg:w-8/12 mt-5">
            <img className="w-150 rounded-lg"  src={task} alt="A group of People" />
          </div>

          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">Key Features</h1>
            <p className="font-normal text-base leading-6 text-gray-600 ">
🔹 Quick Task Creation – Add new tasks in seconds.<><br /></>
🔹 Priority Management – Sort tasks by importance for better .<br></br>
🔹 Reminders & Notifications – Never miss a deadline with smart alerts.
🔹 Categories & Filters – Easily find tasks using advanced filters.<br></br>
🔹 Team Collaboration – Share tasks and boost team productivity.</p>
          </div>

        </div>



        <div className="flex flex-col lg:flex-row justify-between gap-8">


<div className="w-full lg:w-5/12 flex flex-col justify-center">
  <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">Why Use Tasks Manager?</h1>
  <p className="font-normal text-base leading-6 text-gray-600 ">With Tasks Manager, you can:<br></br>
✅ Increase your productivity by organizing tasks smartly.<br></br>
✅ Save time by efficiently managing your priorities.<br></br>
✅ Reduce stress by never forgetting important tasks.<br></br>
✅ Collaborate effortlessly with your team to complete projects.</p>
</div>

<div className=" lg:w-8/12">
  <img className="w-150 mt-5 rounded-lg"  src={ab} alt="A group of People" />
</div>
</div>












        <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
          <div className="w-full lg:w-8/ lg:pt-8">
            <div className="grid md:grid-cols-5 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <img className="md:block hidden w-2xl rounded-lg " src={avatar} alt="Alexa featured Img" />
                <p className="font-medium text-xl leading-5 text-gray-800 mt-4">SM.Ahmad Najar</p>
              </div>
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <img className="md:block hidden w-2xl rounded-lg " src={avatar} alt="Alexa featured Img" />
                <p className="font-medium text-xl leading-5 text-gray-8 mt-4">PO.Abdullah Ghawanmeh</p>
              </div>
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <img className="md:block hidden w-2xl rounded-lg " src={avatar} alt="Alexa featured Img" />
                <p className="font-medium text-xl leading-5 text-gray-800 mt-4">QA.Mohammed Sarrawi</p>
              </div>
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <img className="md:block hidden w-2xl rounded-lg " src={avatar} alt="Alexa featured Img" />
                <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Hasan Mansour</p>
              </div>
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <img className="md:block hidden w-2xl rounded-lg " src={avatar} alt="Alexa featured Img" />
                <p className="font-medium text-xl leading-5 text-gray-800 mt-4">Mohammed Abudayyeh</p>
              </div>
            </div>
          </div>

          <div className="w- lg:w-5/12 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">Our Team</h1>
            <p className="font-normal text-base leading-6 text-gray-600 ">We are a passionate team of developers who believe in the power of planning and organization. Our mission is to provide users with a powerful yet simple tool to help them achieve their goals efficiently. Stay connected with us on social media for updates and insights</p>
          </div>

        </div>


        <br></br><br></br>
        📩 Have a question or suggestion? Reach us at support@tasksmanager.com<br></br>
        📱 Follow us on social media to stay updated on new features and enhancements!

        

        
      </div>
    </>

  )
}
