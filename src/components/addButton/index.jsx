import { useDispatch } from "react-redux";
import "./style.scss";
import { clearFilters } from "../../app/slices/jobSlice";
const AddButton = ({ name, type }) => {

  const dispatch = useDispatch()
  return (
    <button onClick={()=>dispatch(clearFilters())} className="addButton" type={type}>
      {name}
    </button>
  );
};

export default AddButton;
