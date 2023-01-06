import React from "react";
import "./card.css"
import {BiEdit} from "react-icons/bi";
import {RiDeleteBinLine} from "react-icons/ri";

export class BookCard extends React.Component<{edit:any,delete:any,name:string; author: string; price:string; isbn:number; id:number; img:string}>{
 
    render() {
        return(
            <div className="container">
                <div className="card">
                    {this.props.img==null || this.props.img=="" ? (
                        <img className="card-img-top" src="https://img.freepik.com/free-psd/book-cover-mockup_125540-572.jpg?w=1800&t=st=1672932698~exp=1672933298~hmac=bdc8eae41fef67335117a889073dba54c5652aaceb7fc0c7d96ecbdad0bd57dd" alt="..."/>

                    ):(
                        <img src={this.props.img} className="card-img-top" alt="..."/>
                    )}
                
                    <div className="card-body">
                        <h5 className="card-title">{this.props.name}</h5>
                        <p className="card-text">
                            Autor: {this.props.author} <br />
                            ISBN: {this.props.isbn} <br />
                            Price: {(this.props.price)}€
                        </p>
                        <div className="card-btn">
                        <button id='btn-cancel' className='btn' onClick={this.props.edit}><BiEdit size={25}/></button>
                        <button id='btn-cancel' className='btn' onClick={this.props.delete}><RiDeleteBinLine size={25}/></button>
                        </div>
                        
                    </div>
                </div>

            </div>
        );
        
    }

}

