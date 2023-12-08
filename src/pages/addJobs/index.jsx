import "./style.scss";
import { statusOpt, typeOpt } from "./../../constants/index";
import AddButton from "../../components/addButton";
import { v4 } from "uuid";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createJob,
  setError,
  setJobs,
  setLoading,
} from "../../app/slices/jobSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

const AddJobs = () => {
  const state = useSelector((store) => store.jobSlice);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading());
    axios
      .get("http://localhost:4000/jobs")
      .then((res) => dispatch(setJobs(res.data)))
      .catch(() => dispatch(setError()));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.id = v4();
    data.date = new Date().toLocaleDateString();
    axios.post("  http://localhost:4000/jobs", data).then(() => {
      navigate("/");
      dispatch(createJob(data));
      toast.success("Ekleme işlemi başarılı");

    });
    e.target.reset()
  };

  return (
    <div className="add-page">
      <section className="add-sec">
        <h2>Yeni İş Ekle</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Pozisyon</label>
            <input list="positions" name="position" type="text" required />
            <datalist id="positions">
              {state.jobs.map((i) => (
                <option key={i.id} value={i.position} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Şirket</label>
            <input list="company" name="company" type="text" required />
            <datalist id="company">
              {state.jobs.map((i) => (
                <option key={i.id} value={i.company} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Lokasyon</label>
            <input list="location" name="location" type="text" required />
            <datalist id="location">
              {state.jobs.map((i) => (
                <option key={i.id} value={i.location} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Durum</label>
            <select name="status" required>
              <option hidden value={""}>
                Seçiniz
              </option>
              {statusOpt.map((opt, i) => (
                <option key={i}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Tür</label>
            <select name="type" required>
              <option hidden value={""}>
                Seçiniz
              </option>
              {typeOpt.map((opt, i) => (
                <option key={i}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <AddButton name={"Oluştur"} type={"submit"} />
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJobs;
