import Image from "next/image";
import { useForm } from "react-hook-form" 
import PromptForm from "@/components/PromptForm";
import promptGeneratorHeadingImage from "../../public/svgs/prompt_generator_heading.svg";


export default function PromptGenerator() {
  
  
  return (
    <div className="flex flex-col">
      <div className="w-full">
        <Image className="object-cover" src={promptGeneratorHeadingImage} alt="Imagen de encabezado del generador de prompts" />
      </div>
      <div className="py-4 px-3 -mt-3 bg-white rounded-md shadow-[0px_-5px_24px_0px_rgba(0,0,0,0.22)]">
        <div className="legend-box flex flex-row items-center justify-center gap-x-[35px] mb-[43px]">
          <div className="legend flex flex-row items-center">
            <span className="legend-circle bg-red-500"></span>
            Obligatorio
          </div>
          <div className="legend flex flex-row items-center">
            <span className="legend-circle bg-green-500"></span>
            Opcional
          </div>
        </div>
        <PromptForm />
      </div>
    </div>
    
  );
}
