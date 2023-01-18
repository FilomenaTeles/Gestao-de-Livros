import Joi from "joi";

export class EditAuthorDTO{
    id:number = 0;
    name:string = "";
    country:string = "";
    image:string = "";
    books:[] = [];
}

export const EditAuthorDTOSchema = Joi.object({
    name: Joi.string().messages({"string.empty":"Nome do autor deve ser preenchido"}),
    country: Joi.string().messages({"string.empty":"País do autor deve ser preenchido"})
})