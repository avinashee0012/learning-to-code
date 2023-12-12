import './Modifier.css';

function Modifier(props) {

    const moveUp = () => {
        console.log("Moving Up");
    }

    const moveDown = () => {
        console.log("Moving Down");
    }

    const editItem = () => {
        console.log("Editing Item");
    }

    const deleteItem = () => {
        console.log("Deleting Item");
    }

    return (
        <div className='modifier' style={{visibility: props.x}}>
            <i className="fa fa-arrow-circle-o-up" onClick={moveUp}></i>
            <i className="fa fa-arrow-circle-o-down" onClick={moveDown}></i>
            <i className="fa fa-edit" onClick={editItem}></i>
            <i className="fa fa-trash-o" onClick={deleteItem}></i>
        </div>
    );
}

export default Modifier;