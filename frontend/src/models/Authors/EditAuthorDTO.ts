import Joi from "joi";

export class EditAuthorDTO{
    id:number = 0;
    name:string = "";
    country:string = "";
    image:string = "";
    books:[] = [];
}

export const EditAuthorDTOSchema = Joi.object({
    name: Joi.string().min(0).messages({"string":"Nome do autor deve ser preenchido"}),
    country: Joi.string().min(0).messages({"string":"País do autor deve ser preenchido"})
})