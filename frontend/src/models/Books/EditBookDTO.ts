import Joi from "joi";

export class EditBookDTO{
    id: number = 0;
    isbn: number = 0;
    name: string = "";
    authorId: number = 0;
    authorName: string ="";
    price: number = 0;
    image: string | null = null;
}

export const EditBookDTOSchema = Joi.object({
    isbn: Joi.number().min(0).required().messages({"number.base": "Isbn do livro deve ser preenchido", "number.min":"Isbn deve ser superior a 0"}),
    name: Joi.string().messages({"string.base":"Nome do livro deve ser preenchido"}),
    authorId: Joi.number().min(0).messages({"number.base":"Autor de ser selecionado"}),
    price: Joi.number().min(0).messages({"number.base":"Preço deve ser preenchido", "number.min":"Preço deve ser superior a 0"}),
    
})