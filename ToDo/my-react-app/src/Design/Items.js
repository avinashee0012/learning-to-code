import './Items.css';
import Modifier from './Modifier.js';
import Checkbox from './Checkbox.js';
import { useState, useEffect } from "react";

function Items(props) {

    const [visibility, setvisibility] = useState("hidden");

    return (
        <div className='items' onMouseEnter={() => setvisibility("visible")} onMouseLeave={() => setvisibility("hidden")}>
            <Checkbox />
            <h4>{props.item.name}</h4>
            <Modifier x={visibility} />
        </div>
    );
}

export default Items;





