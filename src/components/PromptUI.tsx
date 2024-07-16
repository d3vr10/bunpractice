"use client";

import { PromptDataSchemaType } from "@/lib/schemas/validationSchema";
import { triggerAsyncId } from "async_hooks";
import { NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER } from "next/dist/lib/constants";
import { useState } from "react"
import { UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';

export default function PromptTextField(
    { setValue, getValues, register, trigger }: {
        setValue: UseFormSetValue<PromptDataSchemaType>,
        getValues: UseFormGetValues<PromptDataSchemaType>,
        register: UseFormRegister<PromptDataSchemaType>,
        trigger: UseFormTrigger<PromptDataSchemaType>,
    }
) {

    const copyToClipboard = async () => {
        if (typeof window !== "undefined") {
            await navigator.clipboard.writeText(getValues("promptText"))
            toast("Copiado al portapapeles", { duration: 1500, icon: "✅" });
        }
    }

    return (
        <>


            <div className="form-field col-span-2">
                <nav className="flex justify-between items-center mb-2">
                    <label htmlFor="prompt-text" className="!text-xl uppercase !text-bold">Prompt</label>
                    <div className="flex gap-2">
                        <button className="!text-sm form-button hover:bg-blue-600 hover:text-white border-blue-600 text-blue-600 w-auto h-auto self-start inline-block px-2 py-1 rounded-md" onClick={async () => {
                            const isValid = await trigger();
                            if (isValid) {
                                const formValues = getValues();
                                const text = `
                                    Quiero que actúes como un ${formValues.role}${(formValues.specialityField) ? ` especializado en: ${formValues.specialityField}` : ""}.
                                    Se te asignara una serie de tareas a resolver. Cada una estara enumerada y puede o no presentar un ejemplo adjunto de referencia, precisando el resultado deseado. Las tareas se encuentran ordenadas de manera ascendente por orden de prioridad.
                                    Por favor responde en el lenguaje Español.
                                    Aqui tienes el contexto relacionado con las tareas que se te asignaran posteriormente. Contexto: 
                                    "${formValues.context}"
                                    A continuacion las tareas a resolver en cuestion:
                                    
                                    ${formValues.taskSet.map((task, index) => `Tarea #${index + 1}:\n${task.content}
                                    ${!!task.example && `Por ejemplo:\n${task.example}` }
                                    Fin Tarea#${index + 1}`).join("\n")}
                                    Utiliza un tono de comunicación: ${formValues.communicationTone}
                                    Presenta las tareas en formato: ${formValues.responseFormat}
                                    Utiliza un estilo de redacción: ${formValues.writingStyle}
                                `.replace(/^[\s\t]+/mg, '');
                                setValue("promptText", text);
                                toast("Compilado con exito", { duration: 1500, icon: "⚙️" })
                            } else toast("Error al compilar", { duration: 1500, icon: "❌" })
                        }}>Generar</button>
                        <button className="!text-sm form-button self-end hover:bg-green-700 hover:text-white px-2 py-1 inline-block w-auto h-auto rounded-md text-green-700 border-green-700" onClick={copyToClipboard}>Copiar</button>
                    </div>
                </nav>
                <textarea id="prompt-text" className="resize-none bg-transparent form-control px-2 py-1" cols={30} rows={10} disabled {...register("promptText")}></textarea>
                
                <Toaster />
            </div>

        </>
    );
}