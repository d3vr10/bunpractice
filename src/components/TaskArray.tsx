"use client";

import { PromptDataSchemaType } from "@/lib/schemas/validationSchema";
import { Control, FieldErrors, FieldValues, UseFormGetValues, UseFormRegister, useFieldArray, useForm } from "react-hook-form";
import TrashBinIcon from "../../public/svgs/trash_bin.svg";
import Image from "next/image";
import clsx from "clsx";

export default function TaskArray({register, errors, control, getValues}: {register: UseFormRegister<PromptDataSchemaType>, errors: FieldErrors<PromptDataSchemaType>, control: Control<PromptDataSchemaType>, getValues: UseFormGetValues<PromptDataSchemaType>}) {
    // const { control, register, formState: {errors} } = useForm();
    const { fields, append, remove } = useFieldArray({ control, name: "taskSet" });

    return (
        <>
            
            
            {!!fields.length && fields.map((task, index) => (
                <>
                    <div className="form-field col-span-2 mt-6" key={task.id.toString()}>
                        <label>Tarea #{index+1}</label>
                        <textarea {...register(`taskSet.${index}.content` as const)} className={`${clsx("py-1 px-2 form-control", {
                            "form-control-error": !!errors.taskSet && !!errors.taskSet[index],
                            "form-control-success": !!!errors.taskSet || !!!errors.taskSet[index]
                        })}`} cols={30} rows={10}></textarea>
                        {/* <Image priority src={} className="self-end" alt="Eliminar" onClick={()=>remove(index)} /> */}
                        <TrashBinIcon className="mt-3 transition-colors self-end cursor-pointer &_path:fill-white hover:&_rect:fill-red-500" alt="Eliminar" onClick={()=>remove(index)} />
                        {errors.taskSet && <div className="">{errors.taskSet.message?.toString()}</div>}
                        
                        <label>Ejemplo</label>
                        <textarea {...register(`taskSet.${index}.example` as const)} className={`${clsx("py-1 px-2 form-control form-control-success")}`} cols={30} rows={10}></textarea>

                        
                    </div>
                </>
            ))}
            
            <button className="w-fit border-green-600 border-solid border-2 text-green-600 hover:bg-green-600 hover:text-white transition-colors ease-out rounded-md px-3 py-1 mt-6" onClick={() => {
                append({ content: "" });
            }}>Añadir tarea</button>
        </>
    );
}