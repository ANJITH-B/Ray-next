import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import BorderLessInput from "../../CommonComponents/FormInputs/BorderLessInput";
import { Card, Button } from "antd";

const componentLibrary = [
  {
    id: "company-header",
    type: "company-header",
    label: "Company Header",
    icon: "🏢",
    defaultProps: {
      companyName: "Company Name",
      businessType: "Business Type",
      address: "Company Address",
      logo: null,
    },
  },
  {
    id: "invoice-title",
    type: "invoice-title",
    label: "Invoice Title",
    icon: "📄",
    defaultProps: {
      title: "Invoice",
      submissionDate: "Submitted on DD/MM/YYYY",
    },
  },
  {
    id: "invoice-details",
    type: "invoice-details",
    label: "Invoice Details Grid",
    icon: "📋",
    defaultProps: {
      invoiceFor: {
        label: "Invoice for",
        value: "Client Name",
        address: "Client Address"
      },
      payableTo: {
        label: "Payable to",
        value: "Company Name"
      },
      invoiceNumber: {
        label: "Invoice #",
        value: "000000"
      },
      project: {
        label: "Project",
        value: "Project Name"
      },
      dueDate: {
        label: "Due date",
        value: "DD/MM/YYYY"
      }
    },
  },
  {
    id: "items-table",
    type: "items-table",
    label: "Items Table",
    icon: "🗃️",
    defaultProps: {
      columns: [
        { id: "description", label: "Description", width: "40%" },
        { id: "qty", label: "Qty", width: "15%" },
        { id: "unitPrice", label: "Unit price", width: "20%" },
        { id: "totalPrice", label: "Total price", width: "25%" },
      ],
      items: [{ description: "", qty: 1, unitPrice: 0, totalPrice: 0 }],
    },
  },
  {
    id: "account-details",
    type: "account-details",
    label: "Account Details",
    icon: "🏦",
    defaultProps: {
      accountNumber: "",
      bankName: "",
      ifscCode: "",
      paymentQR: null,
      paymentMethods: []
    },
  },
  {
    id: "total-section",
    type: "total-section",
    label: "Total Section",
    icon: "💰",
    defaultProps: {
      subtotal: 0,
      total: 0,
    },
  },
];

const invoiceTemplates = [
  {
    id: "template1",
    name: "Classic Business",
    thumbnail: "/templates/classic.png",
    description: "A professional, clean layout suitable for business invoices",
    components: [
      {
        id: "company-header",
        type: "company-header",
        props: {
          companyName: "Acmeflare Technologies Pvt Ltd",
          businessType: "Website Development",
          address: "T C No. 66/1399 poonkulam, Vellayani PO, Thiruvananthapuram, Kerala, 695522",
          logo: "/logo.png",
        },
        style: {
          layout: "flex justify-between items-start p-6 border-b",
          textStyle: "text-gray-800",
        }
      },
      {
        id: "invoice-title",
        type: "invoice-title",
        props: {
          title: "Invoice",
          submissionDate: "Submitted on 13/01/2025"
        },
        style: {
          layout: "p-6",
          titleStyle: "text-4xl font-bold text-gray-800",
          dateStyle: "text-gray-600 mt-2"
        }
      },
      {
        id: "invoice-details",
        type: "invoice-details",
        props: {
          invoiceFor: {
            label: "Invoice for",
            value: "Province IT LLP",
            address: "74/585\nMaharshinagar\nPune -411037"
          },
          payableTo: {
            label: "Payable to",
            value: "ACMEFLARE"
          },
          invoiceNumber: {
            label: "Invoice #",
            value: "240233"
          },
          project: {
            label: "Project",
            value: "Website Development Services"
          },
          dueDate: {
            label: "Due date",
            value: "13/01/2025"
          }
        },
        style: {
          layout: "grid grid-cols-2 gap-8 p-6",
          labelStyle: "font-medium text-gray-600",
          valueStyle: "font-bold"
        }
      },
      {
        id: "items-table",
        type: "items-table",
        props: {
          columns: [
            { id: "description", label: "Description", width: "40%" },
            { id: "qty", label: "Qty", width: "15%" },
            { id: "unitPrice", label: "Unit price", width: "20%" },
            { id: "totalPrice", label: "Total price", width: "25%" },
          ],
          items: [
            { 
              description: "Advance Amount",
              qty: 1,
              unitPrice: 1500.00,
              totalPrice: 1500.00
            }
          ]
        },
        style: {
          layout: "p-6",
          tableStyle: "w-full border-collapse",
          headerStyle: "bg-gray-50 text-left p-3",
          cellStyle: "border-t p-3"
        }
      },
      {
        id: "total-section",
        type: "total-section",
        props: {
          subtotal: 1500.00,
          total: 1500.00
        },
        style: {
          layout: "p-6",
          totalStyle: "text-xl font-bold"
        }
      },
      {
        id: "account-details",
        type: "account-details",
        props: {
          accountNumber: "50200089431696",
          bankName: "HDFC",
          ifscCode: "HDFC0008628",
          paymentQR: "/qr-code.png",
          paymentMethods: [
            "/payment-icons/google-pay.png",
            "/payment-icons/paytm.png",
            "/payment-icons/amazon-pay.png",
            "/payment-icons/phonepe.png",
            "/payment-icons/mobikwik.png",
            "/payment-icons/bhim.png",
            "/payment-icons/upi.png"
          ]
        },
        style: {
          layout: "p-6 bg-gray-50 rounded-lg mt-6",
          titleStyle: "font-bold mb-4",
          detailsStyle: "grid grid-cols-2 gap-4"
        }
      }
    ]
  },
  {
    id: "template2",
    name: "Modern Minimal",
    thumbnail: "/templates/modern.png",
    description: "A minimalist design with focus on clarity",
    components: [
      {
        id: "company-header",
        type: "company-header",
        props: {
          companyName: "Acmeflare Technologies Pvt Ltd",
          logo: "/logo.png"
        },
        style: {
          layout: "flex justify-center items-center p-8 border-b",
          textStyle: "text-2xl font-light"
        }
      },
      // ... similar structure but with different styling and layout
    ]
  },
  {
    id: "template3",
    name: "Creative Agency",
    thumbnail: "/templates/creative.png",
    description: "Bold design for creative businesses",
    components: [
      {
        id: "company-header",
        type: "company-header",
        props: {
          companyName: "Acmeflare Technologies Pvt Ltd",
          logo: "/logo.png"
        },
        style: {
          layout: "bg-gradient-to-r from-blue-500 to-purple-500 p-10 text-white",
          textStyle: "text-3xl font-bold"
        }
      },
      // ... similar structure but with different styling and layout
    ]
  }
];

const TemplateEditor = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    
    // Return if dropped outside any droppable
    if (!destination) return;

    console.log('Drag result:', {
      source: source.droppableId,
      destination: destination.droppableId,
      sourceIndex: source.index,
      destIndex: destination.index
    });

    // If dragging from component library to canvas
    if (source.droppableId === "component-library" && destination.droppableId === "canvas") {
      const componentToAdd = componentLibrary[source.index];
      const newElement = {
        id: `${componentToAdd.id}-${Date.now()}`,
        type: componentToAdd.type,
        props: { ...componentToAdd.defaultProps },
      };

      setElements(prevElements => {
        const newElements = [...prevElements];
        newElements.splice(destination.index, 0, newElement);
        return newElements;
      });
    }

    // If reordering within canvas
    if (source.droppableId === "canvas" && destination.droppableId === "canvas") {
      setElements(prevElements => {
        const newElements = [...prevElements];
        const [removed] = newElements.splice(source.index, 1);
        newElements.splice(destination.index, 0, removed);
        return newElements;
      });
    }
  };

  const renderElement = (element) => {
    switch (element.type) {
      case "company-header":
        return (
          <div className={element.style.layout}>
            <div>
              <h1 className={`text-2xl font-bold ${element.style.textStyle}`}>
                {element.props.companyName}
              </h1>
              <p className="text-gray-600">{element.props.businessType}</p>
              <p className="text-gray-600">{element.props.address}</p>
            </div>
            {element.props.logo && (
              <img src={element.props.logo} alt="Company Logo" className="h-16" />
            )}
          </div>
        );

      case "invoice-title":
        return (
          <div className={element.style.layout}>
            <h2 className={element.style.titleStyle}>{element.props.title}</h2>
            <p className={element.style.dateStyle}>{element.props.submissionDate}</p>
          </div>
        );

      case "invoice-details":
        return (
          <div className={element.style.layout}>
            <div>
              <h3 className={element.style.labelStyle}>{element.props.invoiceFor.label}</h3>
              <p className={element.style.valueStyle}>{element.props.invoiceFor.value}</p>
              <p className="text-gray-600">{element.props.invoiceFor.address}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className={element.style.labelStyle}>{element.props.payableTo.label}</h3>
                <p>{element.props.payableTo.value}</p>
              </div>
              <div>
                <h3 className={element.style.labelStyle}>{element.props.invoiceNumber.label}</h3>
                <p>{element.props.invoiceNumber.value}</p>
              </div>
              <div>
                <h3 className={element.style.labelStyle}>{element.props.project.label}</h3>
                <p>{element.props.project.value}</p>
              </div>
              <div>
                <h3 className={element.style.labelStyle}>{element.props.dueDate.label}</h3>
                <p>{element.props.dueDate.value}</p>
              </div>
            </div>
          </div>
        );

      case "items-table":
        return (
          <div className={element.style.layout}>
            <table className={element.style.tableStyle}>
              <thead>
                <tr>
                  {element.props.columns.map((col) => (
                    <th
                      key={col.id}
                      className={element.style.headerStyle}
                      style={{ width: col.width }}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {element.props.items.map((item, index) => (
                  <tr key={index}>
                    <td className={element.style.cellStyle}>
                      <BorderLessInput placeholder="Enter description" />
                    </td>
                    <td className={element.style.cellStyle}>
                      <BorderLessInput placeholder="0" type="number" />
                    </td>
                    <td className={element.style.cellStyle}>
                      <BorderLessInput placeholder="0.00" type="number" />
                    </td>
                    <td className={element.style.cellStyle}>
                      <BorderLessInput placeholder="0.00" type="number" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "account-details":
        return (
          <div className={element.style.layout}>
            <h3 className={element.style.titleStyle}>Account Details</h3>
            <div className={element.style.detailsStyle}>
              <div>
                <p>Account Number: {element.props.accountNumber}</p>
                <p>Bank: {element.props.bankName}</p>
                <p>IFSC: {element.props.ifscCode}</p>
              </div>
              {element.props.paymentQR && (
                <div className="flex justify-end">
                  <img
                    src={element.props.paymentQR}
                    alt="Payment QR"
                    className="h-24 w-24"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case "total-section":
        return (
          <div className={element.style.layout}>
            <div className="flex justify-end">
              <div className="w-64">
                <div className="flex justify-between py-2">
                  <span>Subtotal</span>
                  <span>₹{element.props.subtotal.toFixed(2)}</span>
                </div>
                <div className={element.style.totalStyle}>
                  <span>Total</span>
                  <span>₹{element.props.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex h-screen bg-gray-100">
        <h1>Template Editor</h1>
        {/* Canvas */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 min-h-[1000px] max-w-[800px] mx-auto">
            <Droppable droppableId="canvas" type="CANVAS_ITEM">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`space-y-4 min-h-[200px] ${
                    snapshot.isDraggingOver ? 'bg-blue-50' : ''
                  }`}
                >
                  {elements.map((element, index) => (
                    <Draggable
                      key={element.id}
                      draggableId={element.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`border-2 border-dashed rounded-lg ${
                            snapshot.isDragging
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-500'
                          }`}
                          onClick={() => setSelectedElement(element)}
                        >
                          {renderElement(element)}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>

        {/* Component Library */}
        <div className="w-80 bg-white border-l overflow-auto">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Components</h2>
            <Droppable droppableId="component-library" type="CANVAS_ITEM">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`space-y-2 ${
                    snapshot.isDraggingOver ? 'bg-gray-50' : ''
                  }`}
                >
                  {componentLibrary.map((component, index) => (
                    <Draggable
                      key={component.id}
                      draggableId={component.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`flex items-center p-3 rounded-lg cursor-move ${
                            snapshot.isDragging
                              ? 'bg-blue-50 shadow-lg'
                              : 'bg-gray-50 hover:bg-gray-100'
                          }`}
                        >
                          <span className="mr-3 text-xl">{component.icon}</span>
                          <span>{component.label}</span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default TemplateEditor; 