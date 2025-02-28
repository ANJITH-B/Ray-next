// import { Table } from "antd";
// import React from "react";
// import "./tableStyle.scss";
// import BorderdSelect from "../FormInputs/BorderdSelect";
// const BordedTable = ({ columns, data, ...rest }) => {
//   return (
//     <div className="h-auto rounded-[30px] overflow-hidden">
//       <div
//         style={{
//           height: "calc(100vh - 150px)",
//           overflow: "scroll",
//         }}
//         className="border-[.5px] max-h-[35rem]   border-[#E0E0E0] rounded-[30px] "
//       >
//         <Table
//           sticky={true}
//           scroll={{ y: `calc(100vh - 250px)`, x: 1000 }}
//           className="borderd-table"
//           columns={columns}
//           pagination={false}
//           dataSource={data}
//           {...rest}
//         />
//       </div>
//     </div>
//   );
// };

// export default BordedTable;


import { Table } from "antd";
import React,{useState} from "react";
import "./tableStyle.scss";
import editsvg from "../../Assets/CommonImages/edit.svg";
import trash from "../../Assets/CommonImages/trash.svg";
import { Popconfirm } from "antd";

const BordedTable = ({ columns, data, onEdit, onDelete, ...rest }) => {
  const [isEditHover, setIsEditHover] = useState(false);
  const okButtonStyle = {
    backgroundColor: isEditHover ? 'white' : 'white',
    color: isEditHover ? '#4a9ce8' : 'black',
    border: `1px solid ${isEditHover ? '#4a9ce8' : 'transparent'}`,
    transition: 'background-color 0.3s ease, color 0.3s ease, border 0.3s ease',
  };

  const updatedColumns = [
    ...columns,
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (record) => (
        <div className="flex justify-center items-center gap-3">
          <Popconfirm
            title="Are you sure to edit this value?"
            onConfirm={() => onEdit(record)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{
              style: okButtonStyle,
              onMouseEnter: () => setIsEditHover(true),
              onMouseLeave: () => setIsEditHover(false),
            }}
          >
            <img src={editsvg} alt="Edit" className="w-5 h-5" />
          </Popconfirm>
          <Popconfirm
            title="Are you sure to delete this value?"
            onConfirm={() => onDelete(record)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{
              style: okButtonStyle,
              onMouseEnter: () => setIsEditHover(true),
              onMouseLeave: () => setIsEditHover(false),
            }}
          >
            <img src={trash} alt="Delete" className="w-5 h-5" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return <Table columns={updatedColumns} dataSource={data} rowKey="_id" {...rest} />;
};

export default BordedTable;
