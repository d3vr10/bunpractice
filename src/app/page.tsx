import Image from "next/image";
import { useForm } from "react-hook-form" 
import PromptForm from "@/components/PromptForm";
import PromptGeneratorHeadingImage from "../../public/svgs/prompt_generator_heading.svg";



export default function PromptGenerator() {
  
  
  return (
    <div className="flex flex-col lg:w-1/2 w-full">
      <div className="w-full">
        <header className="h-[150px] mb-6 flex flex-col justify-center items-center">
          <Image src="/logo-mined.jpg" alt={"Logotipo MINED"} width={100} height={100} className="my-3" />
          <h1 className="text-center uppercase font-bold">generador de prompts educativos del CRESPF</h1>  
        </header>
        {/* <PromptGeneratorHeadingImage className="block w-full h-auto" /> */}
        {/* <Image className="object-cover" src={promptGeneratorHeadingImage} alt="Imagen de encabezado del generador de prompts" /> */}
      </div>
      <div className="py-4 px-3 -mt-3 bg-white rounded-md">
        <div className="legend-box flex flex-row items-center justify-center gap-x-[35px] mb-[43px]">
          <div className="legend flex flex-row items-center border-r border-slate-400 pr-6">
            <span className="rounded-full w-4 h-4 bg-red-500 mr-2"></span>
            Obligatorio
          </div>
          <div className="legend flex flex-row items-center">
            <span className="rounded-full w-4 h-4 bg-green-500 mr-2"></span>
            Opcional
          </div>
        </div>
        <PromptForm />
        <footer>
          <div className="p-3 border-t border-slate-200 fixed w-full bottom-0 left-0 backdrop-blur">
            <p className="justify-center text-center text-[12px] font-black uppercase">Celebrando nuestro XX Aniversario</p>
          </div>
        </footer>
      </div>
    </div>
    
  );
}
