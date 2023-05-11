import React, { useMemo, useState } from 'react';

import { EditingMode, ITableProps, kaReducer, Table } from 'ka-table';
import { Column } from 'ka-table/models';
import { DispatchFunc } from 'ka-table/types';

const columns: Column[] = [
  {
    key: 'column1',
    width: 200,
    title: 'CIR,NO',
  },
  {
    key: 'column2',
    width: 200,
    title: 'AMPS.',
  },
  {
    key: 'column3',
    width: 200,
    title: 'Pole.',
  },
  {
    key: 'column4',
    width: 200,
    title: 'Lites.',
  },
  {
    key: 'column5',
    width: 200,
    title: 'Recept.',
  },
  {
    key: 'column6',
    width: 200,
    title: 'Other',
  },
  {
    key: 'column7',
    width: 200,
    title: 'A',
  },
  {
    key: 'column8',
    width: 200,
    title: 'B',
  },
  {
    key: 'column9',
    width: 200,
    title: 'Notes',
  },
];

const dataArray = Array(30)
  .fill(undefined)
  .map((_, index) =>
    columns.reduce(
      (previousValue: any, column) => ({
        ...previousValue,
        [column.key]: 0,
      }),
      { id: index + 1 }
    )
  );

const tablePropsInit: ITableProps = {
  columns,
  data: dataArray,
  rowKeyField: 'id',
  editingMode: EditingMode.Cell,
  groupedColumns: [
    {
      key: 'grouped.column1',
      title: 'panel board schedule',
      columnsKeys: [
        'column1',
        'grouped.column2',
        'grouped.column3',
        'grouped.column4',
        'column9',
      ],
    },
    {
      key: 'grouped.column2',
      title: 'CIR,BRKR',
      columnsKeys: ['column2', 'column3'],
    },
    {
      key: 'grouped.column3',
      title: 'Outlets',
      columnsKeys: ['column4', 'column5', 'column6'],
    },
    {
      key: 'grouped.column4',
      title: 'Load - Watts',
      columnsKeys: ['column7', 'column8'],
    },
  ],
};

const GroupedColumnsDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  const totalA = useMemo(() => {
    return tableProps?.data.reduce(
      (partialSum, { column7 }) => partialSum + +column7,
      0
    );
  }, [tableProps?.data]);
  const totalB = useMemo(() => {
    return tableProps?.data.reduce(
      (partialSum, { column8 }) => partialSum + +column8,
      0
    );
  }, [tableProps?.data]);

  return (
    <div className="py-12">
      <div className="min-h-full flex flex-col justify-center px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Analytics
        </h2>
        <div className="group-header-column-demo mt-3">
          <Table
            {...tableProps}
            dispatch={dispatch}
            childComponents={{
              summaryCell: {
                content: ({ column, data }) => {
                  switch (column.key) {
                    case 'column7':
                      return (
                        <b>
                          Total A:{' '}
                          {data.reduce(
                            (partialSum, { column7 }) => partialSum + +column7,
                            0
                          )}
                        </b>
                      );
                    case 'column8':
                      return (
                        <b>
                          Total B:{' '}
                          {data.reduce(
                            (partialSum, { column8 }) => partialSum + +column8,
                            0
                          )}
                        </b>
                      );
                  }
                },
              },
            }}
          />
        </div>
        <div className="bg-white">
          <div className="flex items-center justify-end p-3">
            Total Load: {totalA + totalB}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupedColumnsDemo;
