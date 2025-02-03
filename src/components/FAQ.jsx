
import Accordion from "./Accordion";

const FAQ = () => {
  return (
    <>
    <h1 className="text-4xl font-bold text-center mb-8"> FAQs </h1>
    <div className="p-6 bg-gray-200 rounded-lg mb-12">
  
      <Accordion
        title=" What is the main benefit of using this system?"
        answer="This task management system helps you organize your work efficiently by allowing you to create tasks, assign them to your team, set deadlines, and track progress. It enhances productivity and improves time management."/>
      <Accordion
        title="Can I assign tasks to my team members?"
        answer="Yes, you can easily assign tasks to team members. They can update task statuses, add comments, and collaborate with the team to ensure tasks are completed on time."
      />
       <Accordion
        title=" Can I upload files related to tasks?"
        answer="Yes, you can attach files and documents to each task, making it easier to share important information with your team and keep track of updates."
      />
            <Accordion 
        title="Can I log in using my Google account?"
        answer="Yes, the system supports Google login, allowing you to sign in quickly and securely without manually entering your registration details."
      />
      <Accordion title="Does the system support notifications and deadline reminders?ebase or Supabase?" answer="Absolutely! The system sends notifications to users about upcoming and due tasks, helping them stay on track and avoid delays." />
    </div>
    </>
  );
};

export default FAQ;
