// InfiniteScrollComponent.js
import { useState, useEffect, useRef, useCallback } from "react";
import { fetchData } from "../../mockApi";
import "./index.css";

const GridRow = ({ num }) => (
  <div id={`row-${num}`} className="cell">
    Cell: {num}
  </div>
);

export const InfiniteScrollComponent = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);
  const isMounted = useRef(null);

  const fetchGridData = useCallback(async (index = 0) => {
    setLoading(true);
    const res = await fetchData(index);
    setRows((prevRows) => [...prevRows, ...res]);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();

    const target = document.querySelector(".cell:last-child");
    const observerCallback = (entries) => {
      if (entries[0].isIntersecting && !loading && rows.length) {
        fetchGridData(rows.length, "observer");
      }
    };

    observerRef.current = new IntersectionObserver(observerCallback);
    if (target) observerRef.current.observe(target);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [fetchGridData, loading, rows.length]);

  useEffect(() => {
    if (isMounted.current) {
      fetchGridData();
    }
    isMounted.current = true;
  }, [fetchGridData]);

  return (
    <div id="app" className="App">
      <div id="grid" className="grid">
        {rows.map((num, index) => (
          <GridRow key={index} num={num} />
        ))}
      </div>
    </div>
  );
};
