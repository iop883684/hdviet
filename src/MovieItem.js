import React, { Component } from 'react';
import './MovieItem.css';

export default class MovieItem extends Component{

    render(){
        const {item, onClick} = this.props
        return(
            <div onClick={onClick} className="MovieItem"> 
                <img src={item.Backdrop} className="thumb" alt={item.MovieName} height="106" width="189" style={{margin:10}}/>
                <div style={{}}>
                    <p>ID: {item.MovieID}</p>
                    <p>{item.KnownAs}</p>
                    <p>[English] {item.MovieName}</p>
                </div>
                
            </div>
        )
    }

}
