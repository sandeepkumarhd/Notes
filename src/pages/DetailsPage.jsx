import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axiosInstance from "../apiConfig";
import { Button, Input, message } from "antd";
const DetailsPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [data, setData] = useState("");
  const [analyzeValue, setAnalyzeValue] = useState("");
  useEffect(() => {
    axiosInstance
      .get(`/notes/${id}`)
      .then((res) => {
        console.log(res);
        setData(res.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  console.log(data);
  const analyzeHandler = () => {
    if (analyzeValue.trim() === "") {
      message.warning("Please enter analyze pattern.");
    } else {
      axiosInstance
        .post(`notes/${id}/analyze`, { pattern: analyzeValue })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          message.warning(err.response?.data);
        });
    }
  };
  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px" }}>Details Page</h1>
      {data ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            margin: "50px auto auto auto",
          }}
        >
          <label>Completion Time : {data.completionTime}</label>
          <label>Delegation User : {data.delegationUser}</label>
          <label>name : {data.name}</label>
          <label> Test : {data.text?.slice(0, 150)}</label>
          <label>status : {data.status}</label>
        </div>
      ) : (
        <h3 style={{ textAlign: "center", margin: "20px" }}>Please wait....</h3>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          margin: "50px auto",
        }}
      >
        <Input
          onChange={(e) => setAnalyzeValue(e.target.value)}
          style={{ margin: "10px auto" }}
          placeholder="Enter analyze value"
        />
        <Button
          style={{
            display: "flex",
            flexDirection: "column",
            width: "20%",
            margin: "10px 0px",
          }}
          onClick={analyzeHandler}
        >
          Analyze
        </Button>
      </div>
    </div>
  );
};
export default DetailsPage;
