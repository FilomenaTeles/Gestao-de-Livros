import Joi from "joi";

export class CreateAuthorDTO{
    name:string = "";
    country:string = "";
    image:string = "";
    books:[] =[];
}

export const CreateAuthorDTOSchema = Joi.object({
    name: Joi.string().min(0).messages({"string":"Nome do autor deve ser preenchido"}),
    country: Joi.string().min(0).messages({"string":"País do autor deve ser preenchido"})
})