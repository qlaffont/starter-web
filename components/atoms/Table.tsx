import { flexRender } from '@tanstack/react-table';
import clsx from 'clsx';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
  update?: VoidFunction;
  hasMore?: boolean;
  isLoading?: boolean;
  tableProps?: any;
  onSubRowCallback?: (id: string) => Promise<any[]>;
  emptyText?: string;
}

interface SubRows {
  row: any;
  data: any;
  loading?: boolean;
}
export const SubRows: React.FC<SubRows> = ({ row, data, loading }) => {
  if (loading || !data) {
    return (
      <tr>
        <td />
        <td>
          <div className="flex items-center justify-center py-8">
            <i className="icon icon-refresh animate bg-primary-90 block h-4 w-4" />
          </div>
        </td>
      </tr>
    );
  }
  return (
    <>
      {data.map((x, i) => {
        return (
          <tr key={'str' + row.original.id + i}>
            {row.cells.map((cell, index) => {
              return (
                <td key={cell.id} className={index === 1 ? 'px-3 pl-12 pt-3' : 'px-3 pt-3'}>
                  {cell.render(cell.column.SubCell ? 'SubCell' : 'Cell', {
                    value: cell.column.accessor && cell.column.accessor(x, i),
                    row: { ...row, original: x },
                  })}
                </td>
              );
            })}
          </tr>
        );
      })}
    </>
  );
};

interface SubRowAsync {
  onSubRowCallback: (id: string) => Promise<any[]>;
  row: any;
}

export const SubRowAsync: React.FC<SubRowAsync> = ({ onSubRowCallback, row }) => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      return onSubRowCallback(row.original.id);
    };
    fetchData()
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, [onSubRowCallback, row.original.id]);

  return <SubRows row={row} data={data} loading={loading} />;
};

function Table({ update, hasMore, tableProps, isLoading, onSubRowCallback, emptyText }: Props) {
  if (isEmpty(tableProps.getRowModel().rows)) {
    return (
      <div className="flex items-center justify-center text-gray-50">
        <p>{emptyText}</p>
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={tableProps.getRowModel().rows?.length || 0}
      next={update}
      scrollThreshold={0.8}
      hasMore={hasMore}
      scrollableTarget="scrollable"
      loader={
        isLoading && (
          <div className="mt-10 flex items-center justify-center py-6">
            <i className="icon icon-refresh animate bg-primary-90 block h-4 w-4" />
          </div>
        )
      }
    >
      <table className="w-full table-auto border-collapse">
        <thead className="z-10">
          {tableProps.getHeaderGroups().map((headerGroup, index) => (
            <tr key={index}>
              {headerGroup.headers.map((column) => {
                return (
                  <th className="p-0" key={column.id}>
                    {flexRender(column.column.columnDef.header, column.getContext())}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          {tableProps.getRowModel().rows.map((row) => {
            let first = false;
            return (
              <React.Fragment key={row.id}>
                {/* px-5 py-3 */}
                <tr className="">
                  {row.getVisibleCells().map((cell, index) => {
                    const isFirst = !first;
                    if (isFirst) {
                      first = true;
                    }
                    return (
                      <td key={cell.id} className={clsx('p-0')}>
                        <div
                          className={clsx(
                            ' mb-1 flex h-[46px] items-center bg-white p-3',
                            isFirst ? 'rounded-l-md' : '',
                            index === row.getVisibleCells()?.length - 1 ? 'rounded-r-md' : '',
                          )}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                      </td>
                    );
                  })}
                </tr>
                {row.getCanExpand() && <SubRowAsync row={row} onSubRowCallback={onSubRowCallback} />}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </InfiniteScroll>
  );
}

export default Table;
