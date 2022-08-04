import axios from "axios";
import { useState, useEffect } from "react";

const Pagination = () => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(50);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/comments"
      );
      setComments(response.data);
    };
    fetchData();
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = comments?.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(comments.length / recordsPerPage);
  return (
    <div>
      <Records comments={currentRecords} />
      <Paginate
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Pagination;

const Records = (props) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th className="col">Id</th>
          <th className="col">Name</th>
          <th className="col">Email</th>
        </tr>
      </thead>
      <tbody>
        {props.comments?.map((comment) => {
          return (
            <tr key={comment.id}>
              <td>{comment.id}</td>
              <td>{comment.name}</td>
              <td>{comment.email}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const Paginate = ({ nPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);
  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <a className="page-link" onClick={prevPage}>
            Previous
          </a>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li
            key={pgNumber}
            className={`page-item ${currentPage == pgNumber ? "active" : ""} `}
          >
            <a onClick={() => setCurrentPage(pgNumber)} className="page-link">
              {pgNumber}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a className="page-link" onClick={nextPage}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};
