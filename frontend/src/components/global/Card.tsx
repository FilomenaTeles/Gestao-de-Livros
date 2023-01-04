import React from "react";
import "./card.css"
import {BiEdit} from "react-icons/bi";
import {RiDeleteBinLine} from "react-icons/ri";

export class BookCard extends React.Component<{edit:any,delete:any,name:string; author: string; price:number; isbn:number; id:number}>{
 

    render() {
        return(
            <div className="container">
                <div className="card">
                    
                    <div className="card-body">
                        <h5 className="card-title">{this.props.name}</h5>
                        <p className="card-text">
                            Autor: {this.props.author} <br />
                            ISBN: {this.props.isbn} <br />
                            Price: {this.props.price.toString().replace(".",",")}€
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

