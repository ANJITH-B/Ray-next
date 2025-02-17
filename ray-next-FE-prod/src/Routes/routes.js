import AccountPage from "../Pages/AccountPage/AccountPage";
import AccountBookPage from "../Pages/AccountPage/AccountSubPage/AccountsBook/AccountBook";
import ChartOfAccPage from "../Pages/AccountPage/AccountSubPage/ChartOFAccountPage/ChartOfAccountPage";
import AccCustomerPage from "../Pages/AccountPage/AccountSubPage/CustomerPage/CustomerPage";
import Dashboard from "../Pages/DashboardPage/Dashboard";
import HomePage from "../Pages/HomePage/HomePage";
import InventoryPage from "../Pages/InventoryPage/InventoryPage";
import TemplateEditor from "../Pages/InvoiceGenerator/TemplateEditor";
import LoginPage from "../Pages/LoginPage/LoginPage";
import PurchasePage from "../Pages/PurchasePage/PurchasePage";
import LPOPage from "../Pages/PurchasePage/PurchaseSubPages/LPOPage/LPOPage";
import PurchaseBillPage from "../Pages/PurchasePage/PurchaseSubPages/PurchaseBillPage/PurchaseBillPage";
import PurchaseHistory from "../Pages/PurchasePage/PurchaseSubPages/PurchaseHistory/PurchaseHistory";
import PurchaseReturnPage from "../Pages/PurchasePage/PurchaseSubPages/PurchaseReturnPage/PurchaseReturnPage";
import SupplierPage from "../Pages/PurchasePage/PurchaseSubPages/SupplierPage/SupplierPage";
import FinancialReportPage from "../Pages/ReportPage/ReportSubPages/FinancialReports/FinancialReportPage";
import SalesPage from "../Pages/SalesPage/SalesPage";
import CustomerPage from "../Pages/SalesPage/SalesSubPages/CustomerPage/CustomerPage";
import SalesHistory from "../Pages/SalesPage/SalesSubPages/SalesHistory/SalesHistory";
import SalesInvoicePage from "../Pages/SalesPage/SalesSubPages/SalesInvoicePage/SalesInvoicePage";
import SalesOrderPage from "../Pages/SalesPage/SalesSubPages/SalesOrderPage/SalesOrderPage";
import SalesQuotation from "../Pages/SalesPage/SalesSubPages/SalesQuotation/SalesQuotation";
import SalesReturnPage from "../Pages/SalesPage/SalesSubPages/SalesReturnPage/SalesReturnPage";
import AccountType from "../Pages/SignUpPage/SignUpComponents/AccountType";
import OtpVarification from "../Pages/SignUpPage/SignUpComponents/OtpVarification";
import SerialNumberVerify from "../Pages/SignUpPage/SignUpComponents/SerialNumberVerify";
import SignUpForm from "../Pages/SignUpPage/SignUpComponents/SignUpForm";
import SignUpPage from "../Pages/SignUpPage/SignUpPage";
import ItemArchive from "../Pages/InventoryPage/InventorySubPages/ItemArchivePage/ItemArchive";
import WarehousePage from "../Pages/InventoryPage/InventorySubPages/WarehousePage/WarehousePage";
import StockSummary from "../Pages/InventoryPage/InventorySubPages/StockSummaryPage/StockSummary";
import MoveInventory from "../Pages/InventoryPage/InventorySubPages/MoveInventoryPage/MoveInventory";
export const routes = [
  {
    path: "login",
    component: LoginPage,
    IsPrivet: false,
  },
  {
    path: "/",
    component: SignUpPage,
    IsPrivet: false,
    subRoute: [
      {
        path: "/signup",
        component: SignUpForm,
      },
      {
        path: "/signup/type",
        component: AccountType,
      },
      {
        path: "/signup/verification",
        component: OtpVarification,
      },
      {
        path: "/signup/serial-verification",
        component: SerialNumberVerify,
      },
    ],
  },
  {
    path: "/",
    component: HomePage,
    IsPrivet: true,
  },
  {
    path: "/home",
    component: Dashboard,
    IsPrivet: true,
  },
  {
    path: "/invoice-generator",
    component: TemplateEditor,
    IsPrivet: true,
  },
  {
    path: "/sales/invoice",
    component: SalesInvoicePage,
    IsPrivet: true,
  },
  {
    path: "/sales/return",
    component: SalesReturnPage,
    IsPrivet: true,
  },
  {
    path: "/sales/quotation",
    component: SalesQuotation,
    IsPrivet: true,
  },
  {
    path: "/sales/history",
    component: SalesHistory,
    IsPrivet: true,
  },
  {
    path: "/sales/sales-order",
    component: SalesOrderPage,
    IsPrivet: true,
  },
  {
    path: "/sales/customer",
    component: CustomerPage,
    IsPrivet: true,
  },
  {
    path: "/sales",
    component: SalesPage,
    IsPrivet: true,
    isSubRoute: true,
    
  },
  {
    path: "/purchase",
    component: PurchasePage,
    IsPrivet: true,
    isSubRoute: true,
    
  },
  {
    path: "/purchase/history",
    component: PurchaseHistory,
    IsPrivet: true,
    isSubRoute: true,
    
  },
  {
    path: "/purchase/supplier",
    component: SupplierPage,
    IsPrivet: true,
    isSubRoute: true,
    
  },
  {
    path: "/purchase/bill",
    component: PurchaseBillPage,
    IsPrivet: true,
    isSubRoute: true,
    
  },
  {
    path: "/purchase/return",
    component: PurchaseReturnPage,
    IsPrivet: true,
    isSubRoute: true,
    
  },
  {
    path: "/purchase/LPO",
    component: LPOPage,
    IsPrivet: true,
    isSubRoute: true,
    
  },
  {
    path: "/account",
    component: AccountPage,
    IsPrivet: true,
    isSubRoute: true,
    
  },
  {
    path: "/account/customer",
    component: AccCustomerPage,
    IsPrivet: true,
    isSubRoute: true,
    
  },
  {
    path: "/account/chart-of-account",
    component: ChartOfAccPage,
    IsPrivet: true,
    isSubRoute: true,
    
  },

  {
    path: "/account/account-book",
    component: AccountBookPage,
    IsPrivet: true,
    isSubRoute: true,
    
  },

  {
    path: "/inventory",
    component: InventoryPage,
    IsPrivet: true,
    isSubRoute: true,
    
  },
  {
    path: "/inventory/item-archive",
    component: ItemArchive,
    IsPrivet: true,
    isSubRoute: true,
    
  },
  {
    path: "/inventory/warehouse",
    component: WarehousePage,
    IsPrivet: true,
    isSubRoute: true,
    
  },
  {
    path: "/inventory/move-inventory",
    component: MoveInventory,
    IsPrivet: true,
    isSubRoute: true,
    
  },
  {
    path: "/inventory/stock-summary",
    component: StockSummary,
    IsPrivet: true,
    isSubRoute: true,
    
  },
  {
    path: "/reports",
    component: InventoryPage,
    IsPrivet: true,
    isSubRoute: true,
    
  },
  {
    path: "/reports/financial-reports",
    component: FinancialReportPage,
    IsPrivet: true,
    isSubRoute: true,
    
  },
  {
    path: "/reports",
    component: InventoryPage,
    IsPrivet: true,
    isSubRoute: true,
    
  },
];
