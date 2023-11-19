import React, { useEffect, useState } from "react";
import Pdfview from "./Pdfview";
import axios from "axios";

const Extractedpdf = () => {
  const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/get-pdf");
      console.log(data.data);
      setAllImage(data.data);
    } catch (error) {
      console.error("Error fetching PDF data:", error);
    }
  };

  const showPdf = (pdf) => {
    setPdfFile(`http://localhost:5000/${pdf}`);
  };

  return (
    <div className="container mt-4">
      {allImage === null ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="row">
            {allImage.map((data) => (
              <div key={data._id} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title">ID: {data._id}</h6>
                    <button
                      className="btn btn-primary"
                      onClick={() => showPdf(data.extractedPdf)}
                    >
                      Show Pdf
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pdfview pdfFile={pdfFile} />
        </>
      )}
    </div>
  );
};

export default Extractedpdf;
