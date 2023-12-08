import { useDispatch } from "react-redux";
import { sortOpt, statusOpt, typeOpt } from "../../constants";
import AddButton from "../addButton";
import "./style.scss";
import { clearFilters, filterBySearch, sortJobs } from "../../app/slices/jobSlice";
import { useEffect, useState } from "react";

const Filter = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    /* debounce çözüm */
    const timer = setTimeout(() => {
      dispatch(filterBySearch({ field: "company", text }));
    }, 500);

    return () => clearTimeout(timer);
  }, [text]);

  return (
    <section className="filter-sec">
      <h2>Filtreleme Formu</h2>
      <form>
        <div>
          <label>Şirket İsmine Göre Ara</label>
          <input
            onChange={(e) => setText(e.target.value)}
            name="position" // Burada "position" olması gerekiyor
            type="text"
          />

        </div>
        <div>
          <label>Durum</label>
          <select
            onChange={(e) =>
              dispatch(
                filterBySearch({ field: "status", text: e.target.value }),
              )
            }
            name="status"
          >
            <option hidden>Seçiniz</option>
            {statusOpt.map((opt, i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Tür</label>
          <select
            onChange={(e) =>
              dispatch(filterBySearch({ field: "type", text: e.target.value }))
            }
            name="type"
          >
            <option hidden>Seçiniz</option>
            {typeOpt.map((opt, i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Sırala</label>
          <select onChange={(e)=>dispatch(sortJobs(e.target.value))} name="type">
            <option hidden>Seçiniz</option>
            {sortOpt.map((opt, i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <AddButton dispatch={useDispatch()}  name={"Filtreleri Sıfırla"} type={"reset"} />
        </div>
      </form>
    </section>
  );
};

export default Filter;
