import { Button, Input, message, Modal, Select, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import axiosInstance from "../apiConfig";
import styles from "../styles/Home.module.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [IsLoding, setIsLoding] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskData, setTaskData] = useState({
    delegationUser: "",
    status: "Select",
  });
  const [IsEdit, setIsEdit] = useState(false);
  const [noteData, setNoteData] = useState({
    name: "",
    text: "",
    status: "Pending",
    delegationUser: "",
    completionTime: "",
    sharedUsers: [],
  });
  const validateData = (data) => {
    if (data.name.trim() === "") {
      message.warning("Please enter name.");
      return false;
    } else if (data.text.trim() === "") {
      message.warning("Please enter notes");
      return false;
    } else if (data.delegationUser.trim() === "") {
      message.warning("Please enter Delegation User.");
      return false;
    } else if (data.completionTime.trim() === "") {
      message.warning("Please select date.");
      return false;
    } else {
      return true;
    }
  };
  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      width: 50,
      resposnive: ["md"],
    },

    {
      title: "Notes",
      dataIndex: "text",
      width: "30%",
      resposnive: ["md"],
    },
    {
      title: "Name",
      dataIndex: "name",
      width: 160,
      resposnive: ["md"],
    },
    {
      title: "Delegation User",
      dataIndex: "delegationUser",
      width: 160,
      resposnive: ["md"],
    },
    {
      title: "Completion Time",
      dataIndex: "completionTime",
      width: 160,

      resposnive: ["md"],
    },
    {
      title: "Status",
      dataIndex: "status",
      resposnive: ["md"],
      width: 120,
      filters: [
        {
          text: "Completed",
          value: "Completed",
        },
        {
          text: "Pending",
          value: "Pending",
        },
      ],
      render: (value, record) => {
        return (
          <Tooltip title={value === "Pending" ? "Update status" : value}>
            <Button
              style={
                value === "Completed"
                  ? { background: "#28a745", color: "white" }
                  : { background: "#ffc107", color: "#212529" }
              }
              onClick={
                value !== "Completed"
                  ? () => {
                      setShowTaskModal(true);
                      setNoteData(record);
                    }
                  : null
              }
            >
              {value}
            </Button>
          </Tooltip>
        );
      },
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },

    {
      title: "Action",
      value: "value",
      width: 130,
      render: (value, record) => {
        return (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Tooltip placement="left" title={"Edit Notes"}>
                <Button
                  onClick={() => {
                    setNoteData(record);
                    setShowModal(true);
                    setIsEdit(true);
                  }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "auto 10px",
                  }}
                >
                  Edit
                </Button>
              </Tooltip>
              <Tooltip placement="left" title={"Delete notes"}>
                <Button
                  onClick={() => deleteNote(record?.id)}
                  style={{
                    width: "90%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "auto",
                  }}
                >
                  Delete
                </Button>
              </Tooltip>
            </div>
          </>
        );
      },
    },
  ];
  const getNotes = async () => {
    setIsLoding(true);
    axiosInstance
      .get("/notes")
      .then((res) => {
        const result = res?.data?.data?.map((ele, index) => ({
          key: index + 1,
          id: ele.id,
          text: ele.text,
          name: ele.name,
          delegationUser: ele.delegationUser,
          status: ele.status,
          completionTime: ele.completionTime,
        }));
        setData(result);
        setIsLoding(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoding(false);
      });
  };
  const deleteNote = async (noteId) => {
    axiosInstance
      .delete(`/notes/${noteId}`)
      .then((res) => {
        message.success(res.data?.message);
        getNotes();
      })
      .catch((err) => {
        console.log(err);
        message.warning(err.response?.data);
      });
  };
  const updateTaskStatus = async () => {
    if (taskData.delegationUser.trim() === "") {
      message.warning("Please enter Delegation User");
    } else if (taskData.status === "Select") {
      message.warning("Please select the Status");
    } else {
      axiosInstance
        .put(`/notes/${noteData.id}/status`, taskData)
        .then((res) => {
          message.success(res.data?.message);
          setShowTaskModal(false);
          getNotes();
          setTaskData({
            delegationUser: "",
            status: "Select",
          });
          setNoteData({
            name: "",
            text: "",
            status: "Pending",
            delegationUser: "",
            completionTime: "",
            sharedUsers: [],
          });
        })
        .catch((err) => {
          console.log(err);
          message.warning(err.response?.data?.error);
        });
    }
  };
  const createNote = async () => {
    if (validateData(noteData) && !IsEdit) {
      console.log("hev");
      axiosInstance
        .post("/notes", noteData)
        .then((res) => {
          setShowModal(false);
          getNotes();
          setNoteData({
            name: "",
            text: "",
            status: "Pending",
            delegationUser: "",
            completionTime: "",
            sharedUsers: [],
          });
          message.success(res.data.message);
        })
        .catch((err) => {
          console.log(err);
          message.warning("Something went wrong");
        });
    } else if (IsEdit) {
      axiosInstance
        .put(`/notes/${noteData.id}`, noteData)
        .then((res) => {
          setShowModal(false);
          getNotes();
          setNoteData({
            name: "",
            text: "",
            status: "Pending",
            delegationUser: "",
            completionTime: "",
            sharedUsers: [],
          });
          message.success(res.data.message);
        })
        .catch((err) => {
          console.log(err);
          message.warning(err.response?.data);
        });
    }
  };
  useEffect(() => {
    getNotes();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.createBtn}>
        <h1>All Notes</h1>
        <Button
          onClick={() => {
            setShowModal(true);
            setIsEdit(false);
            setNoteData({
              name: "",
              text: "",
              status: "Pending",
              delegationUser: "",
              completionTime: "",
              sharedUsers: [],
            });
          }}
        >
          Create New Note
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={IsLoding}
        style={{
          width: "100%",
          margin: `5px auto auto auto`,
        }}
        caption={true}
        size="small"
      />
      <Modal
        title={IsEdit ? "Update Note" : "Create New Note"}
        open={showModal}
        onOk={() => createNote()}
        onCancel={() => setShowModal(false)}
        okText={IsEdit ? "Update" : "Create"}
        cancelText="Cancel"
      >
        <Input
          onChange={(e) =>
            setNoteData((pre) => ({ ...noteData, text: e.target.value }))
          }
          className={styles.input}
          value={noteData.text}
          placeholder="Enter notes"
        />
        <Input
          onChange={(e) =>
            setNoteData((pre) => ({ ...noteData, name: e.target.value }))
          }
          placeholder="Enter name"
          value={noteData.name}
          className={styles.input}
        />
        <Input
          onChange={(e) =>
            setNoteData((pre) => ({
              ...noteData,
              delegationUser: e.target.value,
            }))
          }
          value={noteData.delegationUser}
          placeholder="Delegation User"
          className={styles.input}
        />
        <Input
          onChange={(e) =>
            setNoteData((pre) => ({
              ...noteData,
              completionTime: e.target.value,
            }))
          }
          value={noteData.completionTime}
          type="date"
          placeholder="Completion Time"
          className={styles.input}
        />
      </Modal>
      <Modal
        title={"Update task status"}
        open={showTaskModal}
        onOk={() => updateTaskStatus()}
        onCancel={() => setShowTaskModal(false)}
        okText={"Update"}
        cancelText="Cancel"
      >
        <Input
          onChange={(e) =>
            setTaskData((pre) => ({
              ...pre,
              delegationUser: e.target.value,
            }))
          }
          className={styles.input}
          value={taskData.delegationUser}
          placeholder="Delegation User"
        />
        <Select
          className={styles.input}
          style={{ width: "100%" }}
          placeholder="Select"
          onChange={(e) => {
            setTaskData((pre) => ({
              ...pre,
              status: e,
            }));
          }}
          value={taskData.status}
          options={[
            { value: "Pending", label: "Pending" },
            { value: "Completed", label: "Completed" },
          ]}
        />
      </Modal>
    </div>
  );
};
export default Home;
