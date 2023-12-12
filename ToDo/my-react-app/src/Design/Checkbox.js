import './Checkbox.css';

function Checkbox() {

    const checkboxFun = () => {
        console.log("Checkbox Checked");
    }

    return (
        <>
            <input className="checkbox" type='checkbox' onChange={checkboxFun} />
        </>
    );
}

export default Checkbox;






            
            
