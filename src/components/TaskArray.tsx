"use client";

import { PromptDataSchemaType } from "@/lib/schemas/validationSchema";
import { Control, FieldErrors, FieldValues, UseFormGetValues, UseFormRegister, UseFormUnregister, useFieldArray, useForm } from "react-hook-form";
import TrashBinIcon from "../../public/svgs/trash_bin.svg";
import Image from "next/image";
import clsx from "clsx";
import { useState } from "react";

export default function TaskArray({ register, unregister, errors, control, getValues }: {
    register: UseFormRegister<PromptDataSchemaType>,
    unregister: UseFormUnregister<PromptDataSchemaType>,
    errors: FieldErrors<PromptDataSchemaType>,
    control: Control<PromptDataSchemaType>,
    getValues: UseFormGetValues<PromptDataSchemaType>
}) {
    // const { control, register, formState: {errors} } = useForm();
    const { fields, append, remove } = useFieldArray({ control, name: "taskSet" });
    const [examplePosList, setExamplePosList] = useState<Array<number>>([])

    return (
        <>


            {!!fields.length && fields.map((task, index) => (
                <div className="form-field col-span-2 mt-6" key={task.id.toString()}>
                    <label>Tarea #{index + 1}</label>
                    <textarea {...register(`taskSet.${index}.content` as const)} className={`${clsx("py-1 px-2 form-control", {
                        "form-control-error": !!errors.taskSet && !!errors.taskSet[index],
                        "form-control-success": !!!errors.taskSet || !!!errors.taskSet[index]
                    })}`} cols={30} rows={10}></textarea>
                    {/* <Image priority src={} className="self-end" alt="Eliminar" onClick={()=>remove(index)} /> */}
                    <TrashBinIcon className="mt-3 transition-colors self-end cursor-pointer &_path:fill-white hover:&_rect:fill-red-500" alt="Eliminar" onClick={(event: any) => {
                        const updatedExamplePosList = examplePosList.filter((taskPos: number) => taskPos !== index)
                            .map((taskPos) => {
                                if (taskPos > index)
                                    return taskPos - 1
                                return taskPos
                            })

                        const path = `taskSet.${index}.example`;
                        unregister(path as any)
                        const exampleBox = document.getElementById('example-' + index)
                        exampleBox?.remove()
                        setExamplePosList(updatedExamplePosList)
                        remove(index)
                    }} />
                    {errors.taskSet && <div className="">{errors.taskSet.message?.toString()}</div>}

                </div>
            ))}


            <button className="w-fit border-green-600 border-solid border-2 text-green-600 hover:bg-green-600 hover:text-white transition-colors ease-out rounded-md px-3 py-1 mt-6" onClick={() => {
                append({ content: "", example: "" });
            }}>Añadir tarea</button>

            <select name="" id="" className="mt-4 mb-2" defaultValue={-1} onChange={(event) => {
                const selectedTaskExample = event.target.value
                event.target.value = "-1"
                setExamplePosList(examplePosList.concat([Number(selectedTaskExample)]).sort((a, b) => a - b))

            }}>
                <option disabled value="-1"></option>
                {!!fields.length && fields.map((task, index) => {
                    const foundExample = examplePosList.find((taskPos: number): any => taskPos === index)
                    if (foundExample === undefined) return (
                        <option key={task.id} value={index}>Tarea #{index + 1}</option>
                    )
                }
                )}
            </select>

            {examplePosList.map((taskPos: number, index: number) => (
                <div className="form-field mt-6" key={"example-field-" + `${taskPos}`} id={"example-" + `${taskPos}`} >
                    <label>Ejemplo de Tarea #{taskPos + 1}</label>
                    <textarea name="" id="" className={`${clsx("py-1 px-2 form-control")}`}></textarea>
                    <TrashBinIcon className="mt-3 transition-colors self-end cursor-pointer &_path:fill-white hover:&_rect:fill-red-500" alt="Eliminar" onClick={(event: any) => {
                        const exampleBox = document.getElementById('example-' + taskPos)
                        setExamplePosList(examplePosList.filter((innerTaskPos: number) => innerTaskPos !== taskPos))
                        unregister(`taskSet.${taskPos}.example`)
                        exampleBox?.remove()

                    }} />
                </div>

            ))}
        </>
    );
}