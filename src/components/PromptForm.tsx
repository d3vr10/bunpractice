"use client";

import { Field, useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import * as zodSchemas from "@/lib/schemas/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import plusSignImage from "../../public/images/add_task.svg"
import trashBinImage from "../../public/images/trash_bin.svg"
import { Tiro_Devanagari_Sanskrit } from "next/font/google";
import TaskArray from "@/components/TaskArray";
import PromptTextField from "./PromptUI";
import clsx from "clsx";
import { useEffect } from "react";




export default function PromptForm() {
    const { register, handleSubmit, control, getValues, setValue, trigger, formState: { errors, touchedFields } } = useForm<zodSchemas.PromptDataSchemaType>({
        resolver: zodResolver(zodSchemas.PromptDataSchema),
        mode: "all",
        defaultValues: {
            taskSet: [{
                content: "",
                example: "",
            }]
        }
    });
    const onSubmit = (data: zodSchemas.PromptDataSchemaType) => {
        
    }

    useEffect(() => {
        trigger();
        return () => {
            
        }
    }, [])
    
    return (
        <form action="" onSubmit={handleSubmit(onSubmit)} noValidate={true} className="flex flex-col">
            
            <TaskArray getValues={getValues} register={register} control={control} errors={errors} />
            
            <div className="form-field col-span-2 mt-10">
                <label htmlFor="context">Contexto</label>
                <textarea className={clsx("form-control", {
                    "form-control-success": !!!errors.context,
                    "form-control-error": !!errors.context 
                })} id="context" cols={30} rows={10} {...register("context")}></textarea>
                {errors.context && touchedFields.context && <div className="form-error">{errors.context.message}</div>}
            </div>
            
            <div className="form-field">
                <label htmlFor="role">Rol</label>
                <input className={clsx("form-control", {
                    "form-control-success": !!!errors.role,
                    "form-control-error": !!errors.role
                })} type="text" id="role" {...register("role")} />
                {errors.role && touchedFields.role && <div className="form-error">{errors.role.message}</div>}
            </div>
            <div className="form-field">
                <label htmlFor="speciality-field">Especialidad</label>
                <input className={clsx("form-control", {
                    "form-control-success": !!!errors.specialityField,
                    "form-control-error": !!errors.specialityField 
                })} type="text" id="speciality-field" {...register("specialityField")} />
                {errors.specialityField && touchedFields.specialityField && <div className="form-error">{errors.specialityField.message}</div>}
            </div>
            <div className="form-field">
            <label htmlFor="preferred-language">Lenguaje</label>

                <select className={clsx("form-control", {
                    "form-control-success": !!!errors.preferredLanguage,
                    "form-control-error": !!errors.preferredLanguage 
                })} id="preferredLanguage" defaultValue={"spanish"} {...register("preferredLanguage")}>
                    <option value="spanish" >Español</option>
                    <option value="english">Inglés</option>
                    <option value="french">Francés</option>
                    <option value="deutsch">Alemán</option>
                    <option value="italian">Italiano</option>
                </select>
                {errors.preferredLanguage && touchedFields.preferredLanguage && <div className="form-error">{errors.preferredLanguage.message}</div>}

            </div>
            <div className="form-field">
                <label htmlFor="writing-style">Estilo de redacción</label>
                <select  className={clsx("form-control", {
                    "form-control-success": !!!errors.writingStyle,
                    "form-control-error": !!errors.writingStyle 
                })} id="writing-style" {...register("writingStyle")}>
                    <option value="normal">Normal</option>
                    <option value="academic">Académico</option>
                    <option value="literary">Literario</option>
                    <option value="instructive">Instructivo</option>
                    <option value="critic">Crítico</option>
                    <option value="formal">Formal</option>
                    <option value="informal">Informal</option>
                    <option value="emotional">Emocional</option>
                </select>
                {errors.writingStyle && touchedFields.writingStyle && <div className="form-error">{errors.writingStyle.message}</div>}
            </div>
            
            
            <div className="form-field">
                <label htmlFor="communication-tone">Tono de Comunicación</label>
                <select className={clsx("form-control", {
                    "form-control-success": !!!errors.communicationTone,
                    "form-control-error": !!errors.communicationTone 
                })} id="communication-tone" {...register("communicationTone")}>
                    <option value="normal">Normal</option>
                    <option value="formal">Formal</option>
                    <option value="informal">Informal</option>
                    <option value="demostrative">Demostrativo</option>
                    <option value="empathetic">Empático</option>
                    <option value="inspirational">Inspiracional</option>
                    <option value="explanatory">Explicativo</option>
                    <option value="emotional">Emocional</option>
                </select>
                {errors.communicationTone && touchedFields.communicationTone && <div className="form-error">{errors.communicationTone.message}</div>}

            </div>
            <div className="form-field">
                <label htmlFor="response-format">Formato de Respuesta</label>
                <select className={clsx("form-control", {
                    "form-control-success": !!!errors.responseFormat,
                    "form-control-error": !!errors.responseFormat 
                })} id="response-format" {...register("responseFormat")}>
                    <option value="normal-text">Texto Estándar</option>
                    <option value="table">Tabla(s)</option>
                    <option value="HTML">HTML</option>
                    <option value="instruction-manual">Manual de instrucciones</option>
                    <option value="syllabus">Temario</option>
                </select>
                {errors.responseFormat && touchedFields.responseFormat && <div className="form-error"> {errors.responseFormat.message}</div>}
            </div>
            
            

            
            <PromptTextField setValue={setValue} trigger={trigger} getValues={getValues} register={register} />
            
        </form>
    );
}