import React, { useState, useEffect } from "react";
import axiosWithAuth from '../../utils/axiosWithAuth';


const HowTo = ({id}) => {

    useEffect(()=> {
        axiosWithAuth()
            .get()
    })

}