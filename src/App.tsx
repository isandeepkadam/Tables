import './App.css';
import TableComponent from './components/TableComponent';
import data from './data.json';

export type headersType = {
  heading: string;
  value: 'person' | 'city' | 'email' | 'joiningDate' | 'role';
  sort?: boolean;
};

function App() {
  const tableZeroHeaders: headersType[] = [
    { heading: 'Name', value: 'person', sort: true },
    { heading: 'City', value: 'city', sort: true },
    { heading: 'Email', value: 'email', sort: true },
    { heading: 'Joining Date', value: 'joiningDate', sort: true },
    { heading: 'Role', value: 'role', sort: true },
  ];

  const tableOneHeaders: headersType[] = [
    { heading: 'Name', value: 'person', sort: true },
    { heading: 'Email', value: 'email' },
    { heading: 'Role', value: 'role' },
  ];

  const tableTwoHeaders: headersType[] = [
    { heading: 'Email', value: 'email' },
    { heading: 'Joining Date', value: 'joiningDate', sort: true },
    { heading: 'Role', value: 'role', sort: true },
  ];

  const tableThreeHeaders: headersType[] = [
    { heading: 'Name', value: 'person' },
    { heading: 'City', value: 'city', sort: true },
    { heading: 'Joining Date', value: 'joiningDate' },
    { heading: 'Role', value: 'role', sort: true },
  ];

  return (
    <div className="app">
      <TableComponent tableData={data} tableHeaders={tableZeroHeaders} />
      <TableComponent tableData={data} tableHeaders={tableOneHeaders} />
      <TableComponent tableData={data} tableHeaders={tableTwoHeaders} />
      <TableComponent tableData={data} tableHeaders={tableThreeHeaders} />
    </div>
  );
}

export default App;
