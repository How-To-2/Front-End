import React, { useState, useEffect } from "react";
import axiosWithAuth from "../../utils/axiosWithAuth";
import HowToShort from "../HowToShort";

const TopRated = props => {

    const [topRated, setTopRated] = useState([]);

    useEffect(() => {
        axiosWithAuth()
            .get('api/topentries?limit=10')
            .then(response => {
                console.log(response);
                setTopRated(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    return (

        <div>
            <h2>Highest Rated:</h2>
            <div>
                {topRated.map(a => (
                    <HowToShort article={a} />
                ))}
            </div>
        </div>

    )

}

export default TopRated;