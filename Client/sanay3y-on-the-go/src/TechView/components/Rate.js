
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles";

const Rate = ({rating}) => {
    const currrate=rating;
    return (
        <div>
         <Container>
             {[...Array(5)].map((item, index) => {
                 return (
                     <label>
                         <Rating>
                             <FaStar
                             fill = {index<currrate? "#daa520" : "black"}
                             />
                         </Rating>
                     </label>
                 );
             })}
         </Container>
        </div>
    );
};
 
export default Rate;