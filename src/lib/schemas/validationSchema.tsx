import { string, z } from "zod";

const taskSchema = z.object({
    content: z.string().min(1, "Debes especificar la tarea")
})
export const PromptDataSchema = z.object({
    role: z.string().min(1, "Debes definir el rol de la IA"),
    specialityField: z.string(),
    preferredLanguage: z.string(),
    taskSet: z.array(taskSchema).min(1, "Debes asignar al menos una tarea"),
    context: z.string().min(1, "Debes contextualizar tu asignación de tarea"),
    communicationTone: string(),
    writingStyle: string(),
    responseFormat: string(),
    promptText: string().default(""),
});

export type PromptDataSchemaType = z.infer<typeof PromptDataSchema>;
