"use client";

import { PromptDataSchemaType } from "@/lib/schemas/validationSchema";
import { triggerAsyncId } from "async_hooks";
import { NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER } from "next/dist/lib/constants";
import { useState } from "react"
import { UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormTrigger } from "react-hook-form";

export default function PromptTextField(
    { setValue, getValues, register, trigger }: {
        setValue: UseFormSetValue<PromptDataSchemaType>,
        getValues: UseFormGetValues<PromptDataSchemaType>,
        register: UseFormRegister<PromptDataSchemaType>,
        trigger: UseFormTrigger<PromptDataSchemaType>,
    }
) {

    const copyToClipboard = async () => {
        console.log(window)
        if (typeof window !== "undefined") {
            console.log("HELLO IM WORKING")
            await navigator.clipboard.writeText(getValues("promptText") || "Something has been copied")
        }
    }

    return (
        <>
            <div className="form-field col-span-2">
                <button className="form-button hover:bg-blue-600 hover:text-white border-blue-600 text-blue-600 w-auto h-auto self-start inline-block px-4 py-2 rounded-md" onClick={async () => {
                    const isValid = await trigger();
                    if (true) {
                        const formValues = getValues();
                        const taskArrayValues = getValues("taskSet.0.content");
                        console.log("TASK ARRAY=>" + JSON.stringify(taskArrayValues));
                        console.log("FormVALUES=> " + JSON.stringify(formValues));
                        const text = `
                            Quiero que actúes como un ${formValues.role}${(formValues.specialityField) ? ` especializado en: ${formValues.specialityField}` : ""}.
                            Por favor responde totalmente en el lenguaje Español siguiendo las instrucciones a continuación:
                            Contexto: "${formValues.context}"
                            ${formValues.taskSet.map((task, index) => `${(index === 0) ? "\n" : ""}Tarea #${index + 1}:\n${task.content}\nFin Tarea#${index + 1}`).join("\n")}
                            Utiliza un tono de comunicación: ${formValues.communicationTone}
                            Presenta las tareas en formato: ${formValues.responseFormat}
                            Utiliza un estilo de redacción: ${formValues.writingStyle}
                        `.replace(/^[\s\t]+/mg, '');
                        setValue("promptText", text);
                    }

                }}>Compilar</button>
                <label htmlFor="prompt-text">Prompt</label>
                <textarea id="prompt-text" className="resize-none form-control" cols={30} rows={10} disabled {...register("promptText")}></textarea>
                <button className="form-button self-end hover:bg-green-700 hover:text-white px-4 py-2 inline-block w-auto h-auto rounded-md text-green-700 border-green-700" onClick={copyToClipboard}>Copiar</button>
            </div>

        </>
    );
}