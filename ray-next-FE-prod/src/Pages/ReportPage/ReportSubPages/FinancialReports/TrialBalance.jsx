import React from 'react';
import { Table } from 'antd';
import 'antd/dist/reset.css'; // Make sure Ant Design styles are imported

const dataSource = [
  { key: '1', accountCode: 'SDS32766', name: 'Trade accounts receivable', openingDebit: '$484.00', openingCredit: '$367.10', transactionsDebit: '$718.10', transactionsCredit: '$157.10', closingDebit: '$54.00', closingCredit: '$112.00' },
  { key: '2', accountCode: 'HSD645SD', name: 'Cash Purchase', openingDebit: '$4454.00', openingCredit: '$852.10', transactionsDebit: '$48.10', transactionsCredit: '$33.00', closingDebit: '$12.00', closingCredit: '$90.00' },
  { key: '3', accountCode: 'HJ435745', name: 'Purchase A/c', openingDebit: '$12.00', openingCredit: '$906.10', transactionsDebit: '$419.10', transactionsCredit: '$23.00', closingDebit: '$99.00', closingCredit: '$30.00' },
  { key: '4', accountCode: '7GSGW7Q', name: 'Trade accounts receivable', openingDebit: '$7211.00', openingCredit: '$71.10', transactionsDebit: '$62.10', transactionsCredit: '$110.00', closingDebit: '$1200.00', closingCredit: '$998.00' },
  { key: '5', accountCode: 'A5655D67', name: 'Bank Accounts', openingDebit: '$4211.00', openingCredit: '$271.10', transactionsDebit: '$72.10', transactionsCredit: '$1180.00', closingDebit: '$200.00', closingCredit: '$88.00' },
  { key: '6', accountCode: 'UY832662', name: 'Total Trade accounts receivable', openingDebit: '$313.00', openingCredit: '$67.00', transactionsDebit: '$882.00', transactionsCredit: '$160.00', closingDebit: '$32.00', closingCredit: '$5.00' },
  { key: '7', accountCode: '77DH456V', name: 'Inventory', openingDebit: '$513.00', openingCredit: '$37.00', transactionsDebit: '$120.00', transactionsCredit: '$762.00', closingDebit: '$992.00', closingCredit: '$5.00' },
  { key: '8', accountCode: 'GH872892', name: 'General and administration expenses', openingDebit: '$81.00', openingCredit: '$15.00', transactionsDebit: '$729.00', transactionsCredit: '$62.00', closingDebit: '$22.00', closingCredit: '$51.00' },
];

const columns = [
  {
    title: 'Account Code',
    dataIndex: 'accountCode',
    key: 'accountCode',
    className: 'text-gray-500 font-medium',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    className: 'font-bold',
    // width: 400,
  },
  {
    title: 'Opening Balance',
    children: [
      {
        title: 'Debit',
        dataIndex: 'openingDebit',
        key: 'openingDebit',
      },
      {
        title: 'Credit',
        dataIndex: 'openingCredit',
        key: 'openingCredit',
      },
    ],
  },
  {
    title: 'Transactions',
    children: [
      {
        title: 'Debit',
        dataIndex: 'transactionsDebit',
        key: 'transactionsDebit',
      },
      {
        title: 'Credit',
        dataIndex: 'transactionsCredit',
        key: 'transactionsCredit',
      },
    ],
  },
  {
    title: 'Closing Balance',
    children: [
      {
        title: 'Debit',
        dataIndex: 'closingDebit',
        key: 'closingDebit',
        render: (text) => <span className="text-red-500">{text}</span>,
      },
      {
        title: 'Credit',
        dataIndex: 'closingCredit',
        key: 'closingCredit',
        render: (text) => <span className="text-green-500">{text}</span>,
      },
    ],
  },
];

const TrialBalance = () => {

  // const totalOpeningDebit = dataSource.reduce((sum, record) => sum + parseFloat(record.openingDebit), 0);
  // const totalOpeningCredit = dataSource.reduce((sum, record) => sum + parseFloat(record.openingCredit), 0);
  // const totalTransactionDebit = dataSource.reduce((sum, record) => sum + parseFloat(record.transactionDebit), 0);
  // const totalTransactionCredit = dataSource.reduce((sum, record) => sum + parseFloat(record.transactionCredit), 0);
  // const totalClosingDebit = dataSource.reduce((sum, record) => sum + parseFloat(record.closingDebit), 0);
  // const totalClosingCredit = dataSource.reduce((sum, record) => sum + parseFloat(record.closingCredit), 0);

  return (
    <div className="p-4">
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
        scroll={{ x: 'max-content', y: '40vh' }}
        footer={() => (
        <Table.Summary fixed>
          <Table.Summary.Row>
            {/* Merging "Account code" and "Name" columns */}
            {/* <Table.Summary.Cell colSpan={2}>
              <strong>Total</strong>
            </Table.Summary.Cell> */}
            {/* <Table.Summary.Cell className="text-center">
              <strong>${totalOpeningDebit.toFixed(2)}</strong>
            </Table.Summary.Cell>
            <Table.Summary.Cell className="text-center">
              <strong>${totalOpeningCredit.toFixed(2)}</strong>
            </Table.Summary.Cell>
            <Table.Summary.Cell className="text-center">
              <strong>${totalTransactionDebit.toFixed(2)}</strong>
            </Table.Summary.Cell>
            <Table.Summary.Cell className="text-center">
              <strong>${totalTransactionCredit.toFixed(2)}</strong>
            </Table.Summary.Cell>
            <Table.Summary.Cell className="text-center">
              <strong>${totalClosingDebit.toFixed(2)}</strong>
            </Table.Summary.Cell>
            <Table.Summary.Cell className="text-center">
              <strong>${totalClosingCredit.toFixed(2)}</strong>
            </Table.Summary.Cell> */}
          </Table.Summary.Row>
        </Table.Summary>
      )}
  
      className="text-center" />
    </div>
  );
};

export default TrialBalance
