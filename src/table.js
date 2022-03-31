import React from "react";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { fetchData } from "./api";

const tableHead = {
  id: "#ID",
  joke: "Joke Content",
};

const Table = () => {
  const [value, setValue] = React.useState("");
  const [total, setTotal] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [collection, setCollection] = React.useState([]);

  const setData = ({ current_page, results, total_jokes }) => {
    setCurrentPage(current_page);
    setCollection(results);
    setTotal(total_jokes);
  };

  const searchData = async ({ page, search }) => {
    const data = await fetchData({
      page,
      search,
    });
    setData(data);
  };

  React.useEffect(() => {
    if (!value) {
      updatePage(1);
    } else {
      searchData({ page: 1, search: value });
    }
  }, [value]);

  React.useEffect(() => {
    searchData({ page: currentPage, search: "" });
  }, []);

  const updatePage = (p) => {
    searchData({ page: p, search: value });
  };

  const tableRows = (rowData) => {
    const { key, index } = rowData;
    const tableCell = Object.keys(tableHead);
    const columnData = tableCell.map((keyD, i) => {
      return <td key={i}>{key[keyD]}</td>;
    });

    return <tr key={index}>{columnData}</tr>;
  };

  const tableData = React.useMemo(() => {
    return collection.map((key, index) => tableRows({ key, index }));
  }, [collection]);

  const headRow = () => {
    return Object.values(tableHead).map((title, index) => (
      <td key={index}>{title}</td>
    ));
  };

  return (
    <>
      <div className="search">
        <input
          placeholder="Search Joke"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>{headRow()}</tr>
        </thead>
        <tbody className="trhover">{tableData}</tbody>
      </table>
      <Pagination
        pageSize={10}
        onChange={updatePage}
        current={currentPage}
        total={total}
      />
    </>
  );
};
export default Table;
