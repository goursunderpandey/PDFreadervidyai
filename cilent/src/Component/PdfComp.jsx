import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { NavLink } from "react-router-dom";
import axios from "axios";

function PdfComp(props) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedPages, setSelectedPages] = useState([]);

  const handleCheckboxChange = (page, isChecked) => {
    console.log(page);
    if (isChecked) {
      setSelectedPages((prevSelectedPages) => [...prevSelectedPages, page]);
    } else {
      setSelectedPages((prevSelectedPages) =>
        prevSelectedPages.filter((selectedPage) => selectedPage !== page)
      );
    }
  };

  const countCheckedCheckboxes = () => {
    return selectedPages.length;
  };

  const extractPdf = async () => {
    const sourcePath = "./files/"+ props.sourcepath; 
    const outputPath = sourcePath; 
    const uploadedPdfId = props.uploadedPdfId; 

    try {
      const response = await axios.post("http://localhost:5000/extract-page", {

        uploadedPdfId,
        sourcePath,
        outputPath,
        pageNumber: selectedPages,
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error extracting PDF:", error);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="pdf-div">
      <div style={{ position: "relative" }}>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            padding: "5px",
            background: "rgba(255, 255, 255, 0.7)",
            borderRadius: "5px",
          }}
        >
          <NavLink className="btn btn-outline-success m-2" to="/Extracted" onClick={extractPdf}>
          {countCheckedCheckboxes()} Extract PDF
            </NavLink>
        </div>
      </div>
      <Document file={props.pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from({ length: numPages }, (_, index) => index + 1).map(
          (page) => (
            <div key={page}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedPages.includes(page-1)}
                  onChange={(e) => handleCheckboxChange(page-1, e.target.checked)}
                />
                Page {page}
              </label>
              <Page
                key={page}
                pageNumber={page}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </div>
          )
        )}
      </Document>
    </div>
  );
}

export default PdfComp;
