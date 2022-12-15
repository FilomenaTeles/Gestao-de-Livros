import React from "react";
import "./card.css"
import {BiEdit} from "react-icons/bi";
import {RiDeleteBinLine} from "react-icons/ri";
import { Link } from "react-router-dom";

export class BookCard extends React.Component<{name:string; author: string; price:number; isbn:number;}>{

    render() {
        return(
            <div className="container">
                <div className="card">
                    
                    <div className="card-body">
                        <h5 className="card-title">{this.props.name}</h5>
                        <p className="card-text">
                            Autor: {this.props.author} <br />
                            ISBN: {this.props.isbn} <br />
                            Price: {this.props.price}€
                        </p>
                        <Link to="" className="btn"><BiEdit size={25}/></Link> 
                        <Link to="" className="btn"><RiDeleteBinLine size={25}/></Link> 
                    </div>
                </div>

            </div>
        );
        
    }

}

