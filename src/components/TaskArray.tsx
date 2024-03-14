"use client";

import { PromptDataSchemaType } from "@/lib/schemas/validationSchema";
import { Control, FieldErrors, FieldValues, UseFormGetValues, UseFormRegister, useFieldArray, useForm } from "react-hook-form";
import trashBinIcon from "../../public/svgs/trash_bin.svg";
import Image from "next/image";

export default function TaskArray({register, errors, control, getValues}: {register: UseFormRegister<PromptDataSchemaType>, errors: FieldErrors<PromptDataSchemaType>, control: Control<PromptDataSchemaType>, getValues: UseFormGetValues<PromptDataSchemaType>}) {
    // const { control, register, formState: {errors} } = useForm();
    const { fields, append, remove } = useFieldArray({ control, name: "taskSet" });

    return (
        <>
            <button className="bg-yellow-500 h-[68px] w-[68px] col-span-2 rounded-[50%] relative lg:block lg:ml-auto lg:mr-auto" onClick={() => {
                append({ content: "" });
            }}>
                <span className="w-[32px] h-[6px] bg-black absolute block -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/2" ></span>
                <span className="w-[32px] h-[6px] bg-black absolute block -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/2 rotate-90" ></span>
            </button>
            {errors.taskSet && <div className="form-field-error">{errors.taskSet.message?.toString()}</div>}
            {!!fields.length && fields.map((task, index) => (
                <>
                    <div className="form-field col-span-2" key={task.id.toString()}>
                        <label>Tarea #{index+1}</label>
                        <textarea {...register(`taskSet.${index}.content` as const)} className="py-1 px-2 form-control" cols={30} rows={10}></textarea>
                        <Image priority src={trashBinIcon} className="self-end" alt="Eliminar" onClick={()=>remove(index)} />
                    </div>
                </>
            ))}
        </>
    );
}