import React, { useState } from "react";
import { Modal, Button } from "antd";
import BorderTableLessEditoption from "../../CommonComponents/Tables/BorderTableLessEditoption";
import Pagination from "../../CommonComponents/OtherComponent/Pagination";
import { useGetSystemLogs } from "../../Queries/LogBookQuery/LogBookQuery";
import dayjs from "dayjs";


const LogBookTable = ({ filter, setFilter }) => {
  const { data: logData, isLoading } = useGetSystemLogs(filter);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState([]);

  const showDescription = (desc) => {
    console.log('desc',desc);
    
    setSelectedDescription(desc);
    setIsModalVisible(true);
  };

  const logColumns = [
    {
      title: "Created Time",
      dataIndex: "createdAt",
      key: "createdAt",
      className: "text-base w-[10rem]",
      render: (time) => dayjs(time).format("DD-MMM-YYYY HH:mm:ss"),
    },
    // {
    //   title: "User ID",
    //   dataIndex: "user_id",
    //   key: "user_id",
    //   className: "text-base",
    // },
    {
      title: "User",
      dataIndex: "user_id",
      key: "user_id",
      className: "text-base",
      render: (user) => (
        <div>
          <strong>{user?.name}</strong> <br />
          <span className="text-xs text-gray-500">({user?._id})</span>
        </div>
      ),
    },
    {
      title: "Module Type",
      dataIndex: "module_type",
      key: "module_type",
      className: "text-base",
      render: (item) => (
        <span className="py-1 px-3 bg-blue-200 text-xs font-medium text-blue-800 rounded-xl">
          {item}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      className: "text-base",
    },
    {
      title: "Description",
      key: "description",
      render: (_, record) => (
        <Button type="link" onClick={() => showDescription(record.description)}>
          Show Details
        </Button>
      ),
    },
  ];

  // const logDataFormatted = logData?.data?.data?.map((log) => ({
  //   createdAt: log.createdAt,
  //   user_id: log.user_id,
  //   module_type: log.module_type,
  //   action: log.action,
  //   description: log.description,
  // }));

  const logDataFormatted = logData?.data?.data?.map((e, index, array) => {
    let openingBalance = 0;
    for (let i = index - 1; i >= 0; i--) {
      if (dayjs(array[i].date).isBefore(dayjs(e.date), 'day')) {
        openingBalance = array[i].balance;
        break;
      }
    }
    return {
      createdAt: e.createdAt,
      user_id: e.user_id,
      module_type: e.module_type,
      action: e.action,
      description: e.description,
    };
  });

  return (
    <div>
      <BorderTableLessEditoption loading={isLoading} columns={logColumns} data={logDataFormatted} />
      <div>
        <Pagination setFilter={setFilter} filter={filter} />
      </div>

      <Modal
  title="Log Description"
  open={isModalVisible}
  onCancel={() => setIsModalVisible(false)}
  footer={[
    <Button key="close" onClick={() => setIsModalVisible(false)}>
      Close
    </Button>,
  ]}
>
  <ul className="list-disc pl-4">
    {selectedDescription.map((item, index) => (
      <li key={index}>
        <strong>{item?.field}: </strong> 
        {typeof item?.oldValue === "object" && item?.oldValue !== null
          ? JSON.stringify(item?.oldValue, null, 2)
          : item?.oldValue} 
        ➝ 
        {typeof item?.newValue === "object" && item?.newValue !== null
          ? JSON.stringify(item?.newValue, null, 2)
          : item?.newValue}
      </li>
    ))}
  </ul>
</Modal>


      {/* <Modal
        title="Log Description"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        <ul className="list-disc pl-4">
          {selectedDescription.map((item, index) => (
            <li key={index}>
              <strong>{item?.field}: </strong> {item?.oldValue} ➝ {item?.newValue}
            </li>
          ))}
        </ul>
      </Modal> */}
    </div>
  );
};

export default LogBookTable;
