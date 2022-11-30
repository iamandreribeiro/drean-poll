import Joi from "joi";

export const postChoiceSchema = Joi.object({    
    title: Joi.string().required()
});