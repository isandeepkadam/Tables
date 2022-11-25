import { MouseEventHandler, useCallback, useState } from 'react';
import { headersType } from '../App';
import data from '../data.json';
import './tableComponent.css';

type tableDataType = typeof data;
type SortKeys = 'person' | 'city' | 'email' | 'joiningDate' | 'role';
type SortType = 'ASC' | 'DSC';

const TableComponent: React.FunctionComponent<{
  tableData: tableDataType;
  tableHeaders: headersType[];
}> = ({ tableData, tableHeaders }) => {
  const [order, setOrder] = useState<SortType>('ASC');
  const [sortKey, setSortKey] = useState<SortKeys>('person');

  const sortedData = useCallback(
    () => sortData({ dataTable: tableData, sortKey }),
    [order, sortKey, setOrder]
  );

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

                //split values if item value is nested
                if (header.value.includes('.')) {
                  const itemSplit: string[] = header.value.split('.'); // ['person', 'name']
                  return (
                    <td
                      key={index}
                    >{`${item}.${itemSplit[0]}.${itemSplit[1]}`}</td>
                  );
                }
                //return header Value
                return <td key={index}>{item[`${header.value}`]}</td>;
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
}: {
  dataTable: tableDataType;
  sortKey: SortKeys;
}) {
  if (!sortKey) return dataTable;

  const sortedData = data.sort((a, b) => {
    if (sortKey === 'joiningDate') {
      let aa = a.joiningDate.split('/').reverse().join(),
        bb = b.joiningDate.split('/').reverse().join();
      return aa < bb ? -1 : aa > bb ? 1 : 0;
    }

    if (sortKey === 'person') {
      return a[sortKey].name > b[sortKey].name ? 1 : -1;
    }
    return a[sortKey] > b[sortKey] ? 1 : -1;
  });

  return sortedData;
}

export default TableComponent;
