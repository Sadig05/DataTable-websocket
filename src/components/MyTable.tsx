import { Space, Table, Tag } from "antd";
import React, { useState, useEffect, useRef } from "react";
import type { ColumnsType } from "antd/lib/table";
import { IUser } from "../models/User";
import Moment from "react-moment";
import moment from "moment";

const columns: ColumnsType<IUser> = [
  {
    title: "avatar",
    dataIndex: "avatar",
    key: "avatar",
    render: (url) => (
      <>
        <img src={url} />{" "}
      </>
    ),
  },
  {
    title: "id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "birthdate",
    dataIndex: "birthdate",
    key: "birthdate",
    render: (date) => <p>{moment(date).format("DD-MM-YYYY")}</p>,
  },
];

const MyTable = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const [data, setData] = useState<IUser[]>([]);

  const handleClick = (): void => {
    setChecked(!checked);
  };

  useEffect(() => {
    const socket = new WebSocket("ws://simple-realtime-server.herokuapp.com/");

    socket.onopen = () => {
      console.log("opening...");
    };

    socket.onmessage = (e: any) => {
      if (checked) return;
      console.log("My data: ", e.data);
      console.log(JSON.parse(e.data));
      setData((prev) => [JSON.parse(e?.data), ...prev]);
    };

    return () => {
      socket.close();
    };
  }, [checked]);

  return (
    <>
      <input onChange={handleClick} checked={checked} type="checkbox" />
      <Table columns={columns} dataSource={data} />;
    </>
  );
};

export default MyTable;