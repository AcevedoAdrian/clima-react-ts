import { ChangeEvent, useState } from "react";
import { countries } from "../data/counties";
import styles from "./Form.module.css";
import type { SearchInterface } from "../interface";

export default function Form() {
  const [search, setSearch] = useState<SearchInterface>({
    city: "",
    country: "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setSearch({
      ...search,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <form className={styles.form}>
      <div className={styles.file}>
        <label htmlFor="city">Ciudad:</label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="Ciudad"
          value={search.city}
          onChange={handleChange}
        />
      </div>
      <div className={styles.file}>
        <label htmlFor="country">Pais:</label>
        <select
          name="country"
          id="country"
          value={search.country}
          onChange={handleChange}
        >
          <option value="">-- Seleccione un País --</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <input className={styles.submit} type="submit" value="Buscar Clima" />
    </form>
  );
}
