import { useCallback, useState } from 'react';
import { headersType } from '../App';
import './tableComponent.css';
import data from '../data.json';

type tableDataType = typeof data;
type SortKeys = 'person' | 'city' | 'email' | 'joiningDate' | 'role';
type SortType = 'ASC' | 'DSC';

const TableComponent: React.FunctionComponent<{
  tableData: tableDataType;
  tableHeaders: headersType[];
}> = ({ tableData, tableHeaders }) => {
  const [order, setOrder] = useState<SortType>('ASC');
  const [sortKey, setSortKey] = useState<SortKeys>('person');

  const sortedData = useCallback(() => {
    const result = sortData({ dataTable: tableData, sortKey, sortType: order });
    return result;
  }, [order, sortKey, order]);

  const changeSort = (key: SortKeys) => {
    setOrder(order === 'ASC' ? 'DSC' : 'ASC');
    setSortKey(key);
  };

  return (
    <>
      <table style={{ border: '1px solid black' }}>
        <thead>
          <tr>
            {tableHeaders.map((item, index) => {
              if (item.sort) {
                return (
                  <th key={index}>
                    {item.heading}
                    <button
                      className="sort-button"
                      onClick={() => changeSort(item.value)}
                    >
                      &#x21f5;
                    </button>
                  </th>
                );
              }

              return <th key={index}>{item.heading}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {sortedData().map((item, index) => (
            <tr key={index}>
              {tableHeaders.map((header, index) => {
                //add avatar if header is 'Name'
                if (header.heading === 'Name') {
                  return (
                    <td key={index}>
                      <div style={{ display: 'flex' }}>
                        <img
                          src={`./${item.person.avatar}`}
                          style={{ marginRight: '5px' }}
                        ></img>
                        {item.person.name}
                      </div>
                    </td>
                  );
                }

                //Make it a link if header is 'Email'
                if (header.heading === 'Email') {
                  return (
                    <td key={index}>
                      <a href={`mailto:${item.email}`}>{item.email}</a>
                    </td>
                  );
                }

                //return header Value
                return <td key={index}>{item[header.value] as string}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

function sortData({
  dataTable,
  sortKey,
  sortType,
}: {
  dataTable: tableDataType;
  sortKey: SortKeys;
  sortType: SortType;
}) {
  if (!sortKey) return dataTable;

  const sortedData = data.sort((a, b) => {
    if (sortKey === 'joiningDate') {
      const aa = a.joiningDate.split('/').reverse().join(),
        bb = b.joiningDate.split('/').reverse().join();
      const dateA = new Date(aa),
        dateB = new Date(bb);

      if (sortType === 'ASC') {
        if (dateA > dateB) return 1;
        else return -1;
      } else {
        if (dateA < dateB) return 1;
        else return -1;
      }
    }

    if (sortKey === 'person') {
      const order =
        sortType === 'ASC'
          ? a[sortKey].name < b[sortKey].name
          : a[sortKey].name > b[sortKey].name;
      return order ? 1 : -1;
    }

    const order =
      sortType === 'ASC' ? a[sortKey] < b[sortKey] : a[sortKey] > b[sortKey];
    return order ? 1 : -1;
  });

  return sortedData;
}

export default TableComponent;
