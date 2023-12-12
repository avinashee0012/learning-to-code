import './App.css';
import data from './Content/data.js';
import AddTasks from './Design/AddTasks.js';
import AlertBox from './Design/AlertBox.js';
import Items from './Design/Items.js';

function App() {


  return (
    <div className="App">
      <AddTasks />
      <AlertBox />
      <div className='list'>
        {data.map((item) => <Items key={item.id} item={item} />)}
      </div>
    </div>
  );
};


export default App;
