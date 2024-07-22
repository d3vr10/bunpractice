"use client";

import { PromptDataSchemaType } from "@/lib/schemas/validationSchema";
import { Control, FieldErrors, UseFormGetValues, UseFormRegister, UseFormUnregister, useFieldArray } from "react-hook-form";
import TrashBinIcon from "../../public/svgs/trash_bin.svg";
import clsx from "clsx";
import { useState } from "react";

export default function TaskArray({ register, unregister, errors, control, getValues }: {
    register: UseFormRegister<PromptDataSchemaType>,
    unregister: UseFormUnregister<PromptDataSchemaType>,
    errors: FieldErrors<PromptDataSchemaType>,
    control: Control<PromptDataSchemaType>,
    getValues: UseFormGetValues<PromptDataSchemaType>
}) {
    const { fields, append, remove } = useFieldArray({ control, name: "taskSet" });
    const [examplePosList, setExamplePosList] = useState<Array<number>>([]);

    return (
        <>
            {!!fields.length && fields.map((task, index) => (
                <div className="form-field col-span-2 mt-6" key={task.id.toString()}>
                    <label>Tarea #{index + 1}</label>
                    <textarea {...register(`taskSet.${index}.content`)} className={`${clsx("py-1 px-2 form-control", {
                        "form-control-error": !!errors.taskSet && !!errors.taskSet[index],
                        "form-control-success": !errors.taskSet || !errors.taskSet[index]
                    })}`} cols={30} rows={10}></textarea>

                    <TrashBinIcon className="mt-3 transition-colors self-end cursor-pointer &_path:fill-white hover:&_rect:fill-red-500" alt="Eliminar" onClick={() => {
                        if (fields.length === 1) {
                            alert("No se puede eliminar este campo. Debe asignarle al menos una tarea a la inteligencia artificial.");
                            return;
                        }
                        unregister(`taskSet.${index}.example`);
                        remove(index);
                        setExamplePosList(examplePosList.filter(pos => pos !== index).map(pos => pos > index ? pos - 1 : pos));
                    }} />

                    {errors.taskSet && <div>{errors.taskSet.message?.toString()}</div>}
                </div>
            ))}

            <button className="w-fit border-green-600 border-solid border-2 text-green-600 hover:bg-green-600 hover:text-white transition-colors ease-out rounded-md px-3 py-1 mt-6" onClick={() => {
                append({ content: "", example: "" });
            }}>Añadir tarea</button>

            <select className="mt-4 mb-2" defaultValue={-1} onChange={(event) => {
                const selectedTaskExample = Number(event.target.value);
                event.target.value = "-1";
                if (!isNaN(selectedTaskExample)) {
                    setExamplePosList(prev => [...prev, selectedTaskExample].sort((a, b) => a - b));
                }
            }}>
                <option disabled value="-1"></option>
                {!!fields.length && fields.map((task, index) => (
                    !examplePosList.includes(index) && <option key={task.id} value={index}>Tarea #{index + 1}</option>
                ))}
            </select>

            {examplePosList.map((taskPos) => (
                <div className="form-field mt-6" key={"example-field-" + taskPos}>
                    <label>Ejemplo de Tarea #{taskPos + 1}</label>
                    <textarea className={`${clsx("py-1 px-2 form-control")}`}></textarea>

                    <TrashBinIcon className="mt-3 transition-colors self-end cursor-pointer &_path:fill-white hover:&_rect:fill-red-500" alt="Eliminar" onClick={() => {
                        setExamplePosList(prev => prev.filter(pos => pos !== taskPos).map(pos => pos > taskPos ? pos - 1 : pos));
                        unregister(`taskSet.${taskPos}.example`);
                    }} />
                </div>
            ))}
        </>
    );
}
