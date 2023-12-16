
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles";

const Rate = (props) => {
    // const [rate, setRate] = useState(0);
    const currrate=props.rating;
    return (
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
    );
};
 
export default Rate;