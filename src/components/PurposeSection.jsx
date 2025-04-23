import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import workflowImg from "../assets/Agentic_rag_Workflow.png"; // Assure-toi que le chemin est correct
const PurposeSection = () => {
  return (
    <section id="about" className="bg-gray-50 py-16">
      
      {/* Image plein écran */}
      <motion.div 
        variants={fadeIn('up', 0.2)}
        initial="hidden"
        whileInView="show"
        className="w-screen h-[70vh] overflow-hidden"
      >
        <img 
          src={workflowImg} 
          alt="Workflow illustration" 
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Titre en dessous de l'image */}
      <motion.div 
        variants={textVariant(0.3)}
        initial="hidden"
        whileInView="show"
        className="text-center mt-12 px-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          AI Agent Response Generation Workflow
        </h2>
      </motion.div>
    </section>
  );
};

export default PurposeSection;