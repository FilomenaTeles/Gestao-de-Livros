import React from "react";
import "./card.css"
import {BiEdit} from "react-icons/bi";
import {RiDeleteBinLine} from "react-icons/ri";
import {AiOutlineEye} from "react-icons/ai";

export function Card(props:any){
    
    return(
        <div className="container">
            <div className="card">
                {props.img != null && props.img !="" ?(//se tiver imagens renderiza a mesma
                    <img src={props.img} className="card-img-top" alt="..."/>
                ):(//verificar se está a ser chamado por um livro ou um autor
                    props.isBook == true ? (//renderiza a imagens default para o livro
                        <img className="card-img-top" src="https://img.freepik.com/free-psd/book-cover-mockup_125540-572.jpg?w=1800&t=st=1672932698~exp=1672933298~hmac=bdc8eae41fef67335117a889073dba54c5652aaceb7fc0c7d96ecbdad0bd57dd" alt="..."/>
                    ):(//renderiza a imagem default para o autor
                        <img className="card-img-top" src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=1380&t=st=1673428568~exp=1673429168~hmac=188b7c7e4a5f15ce100e5d68eb643e054a5004a407e6de67a9cc02a09a405d4f" alt="..."/>
                    )
                ) }

                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                  
                    {props.isBook == true ? (//texto relativo ao livro
                        <p className="card-text">
                            Autor: {props.author} <br />
                            Price: {props.price}€
                        </p>
                        ):(//texto relativo ao autor
                        <p className="card-text">
                            País: {props.country} <br />
                            Livros: {props.books.length==0? "Sem livros": props.books }
                        </p>
                    )}
                    <div className="card-btn">
                        {props.isBook == true ? (//os livros têm botão de ver detailhes
                            <button id='btn-cancel' className='btn' onClick={props.detail}><AiOutlineEye size={25}/></button>
                        ):(//os autores têm botão de editar
                            <button id='btn-cancel' className='btn' onClick={props.edit}><BiEdit size={25}/></button>
                        )}
                        <button id='btn-cancel' className='btn' onClick={props.delete}><RiDeleteBinLine size={25}/></button>
                    </div>
                    

                </div>
            </div>

        </div>
    )
}


