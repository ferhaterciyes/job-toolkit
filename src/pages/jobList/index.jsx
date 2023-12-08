import { useEffect } from "react";
import "./style.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setJobs, setError, setLoading } from "../../app/slices/jobSlice";
import Loader from "./../../components/loader/index";
import Cart from "../../components/cart";
import RefreshButton from "../../components/refreshButton";
import Filter from "../../components/FilterForm";

const JobList = () => {
  const state = useSelector((store) => store.jobSlice);
  const dispatch = useDispatch();

  const fetchData = () => {
    dispatch(setLoading());
    axios
      .get("http://localhost:4000/jobs")
      .then((res) => dispatch(setJobs(res.data)))
      .catch(() => dispatch(setError()));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="list-page">
      <Filter jobs={state.jobs} />
      {state.isLoading ? (
        <Loader />
      ) : state.isError ? (
        <div className="error">
          <p>Üzgünüz, verilere erişirken bir hata oluştu !</p>
          <RefreshButton fetchData={fetchData} />
        </div>
      ) : (
        <div className="job-list">
          {state?.jobs.map((job, i) => (
            <Cart key={i} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
