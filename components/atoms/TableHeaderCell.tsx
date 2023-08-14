import { Popover } from '@headlessui/react';
import { Float } from '@headlessui-float/react';
import clsx from 'clsx';
import React, { Dispatch, useCallback, useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'usehooks-ts';

import { useI18n } from '../../i18n/useI18n';
import Checkbox from './Checkbox';
import { Input } from './Input';

export enum Sorting {
  'ASC' = 'ASC',
  'DESC' = 'DESC',
}

interface FilterModalItem {
  value: any;
  data: Record<string, any>;
}

export const FilterModal = ({
  title,
  filters = [],
  onUnselectAll,
  onSelectAll,
  items = [],
  ItemComponent = ({ label }) => <p>{label}</p>,
  searchFunction = (search) =>
    ({ label }: { label: string }) =>
      label.toLowerCase().indexOf(search.toLowerCase()) !== -1,
  onFilterChange,
  isLoading,
  onFirstOpen,
  overrideText,
}: {
  title: string;
  filters?: string[];
  onUnselectAll?: () => void;
  onSelectAll?: () => void;
  items?: FilterModalItem[];
  onFilterChange;
  ItemComponent?;
  isLoading?: boolean;
  searchFunction?: (searchField) => (data) => boolean;
  onFirstOpen?: () => void;
  overrideText?: boolean;
}) => {
  const { t } = useI18n();
  const [search, setSearch] = useState('');
  const searchDebounce = useDebounce(search, 300);

  const displayedItems = useMemo(
    () => items?.filter((i) => searchFunction(searchDebounce)(i.data)),
    [items, searchFunction, searchDebounce],
  );

  useEffect(() => {
    if (onFirstOpen) {
      onFirstOpen();
    }
  }, []);

  return (
    <div className="border-dark-4 mt-1 w-96 space-y-4 rounded-lg border bg-white p-4 drop-shadow-md">
      <div className="flex items-center gap-1">
        <div>
          <p className="text-dark-2 underline">
            {overrideText ? title : t('components.atoms.table.filterBy', { label: title })}
          </p>
        </div>
        {isLoading && (
          <div>
            <i className="icon icon-refresh animate bg-primary-90 block h-4 w-4" />
          </div>
        )}
      </div>

      <div>
        <Input
          placeholder={`${t('components.atoms.table.search')} ...`}
          suffixIcon="icon icon-search"
          value={search}
          onChange={(evt) => setSearch(evt?.target?.value || '')}
        />
      </div>

      {onUnselectAll && filters?.length > 0 && (
        <div
          onClick={() => onUnselectAll()}
          className={clsx(onUnselectAll ? 'cursor-pointer' : '', 'hover:opacity-50')}
        >
          <p className="text-dark-2 underline">{t('components.atoms.table.unselectAll')}</p>
        </div>
      )}

      {onSelectAll && filters?.length === 0 && (
        <div onClick={() => onSelectAll()} className={clsx(onSelectAll ? 'cursor-pointer' : '', 'hover:opacity-50')}>
          <p className="text-dark-2 underline">{t('components.atoms.table.selectAll')}</p>
        </div>
      )}

      <div
        className={clsx('border-dark-4 h-52 w-full overflow-auto rounded-b-lg border', isLoading ? 'bg-dark-5' : '')}
      >
        {displayedItems.map(({ value, data }) => (
          <div
            key={value}
            className={clsx(
              'hover:bg-dark-4 flex items-center gap-2 whitespace-nowrap p-2 px-4',
              !isLoading ? 'cursor-pointer' : '!cursor-default',
            )}
            onClick={() => (!isLoading ? onFilterChange(value) : undefined)}
          >
            <div>
              <Checkbox value={filters.indexOf(value) !== -1 ? true : false} className="h-4 w-4 !rounded-full" />
            </div>
            <div>
              <ItemComponent {...data} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const TableHeaderCell = ({
  title,
  sort,
  onSort,
  filters = [],
  onFilter,
  searchFunction,
  onUnselectAll,
  onSelectAll,
  query = () => {
    return [undefined, {}];
  },
  queryVariables,
  queryOnSuccess,
  items,
  ItemComponent,
  overrideText,
}: {
  title: string;
  sort?: Sorting;
  onSort?: (sorting: Sorting) => void;
  filters?: any[];
  onFilter?: (filter: any[]) => void;
  onUnselectAll?: () => void;
  onSelectAll?: (items?) => void;
  searchFunction?: (searchField) => (data) => boolean;
  query?;
  queryVariables?;
  queryOnSuccess?: (setItems: Dispatch<FilterModalItem[]>) => (data) => void;
  items?: FilterModalItem[];
  ItemComponent?;
  overrideText?: boolean;
}) => {
  const [displayedItems, setDisplayedItems] = useState<FilterModalItem[]>(items ? items : undefined);
  const [triggerFetch, { loading }] = query({
    onCompleted: (data) => {
      queryOnSuccess && queryOnSuccess(setDisplayedItems)(data);
    },
  });

  const onChangeSorting = () => {
    switch (sort) {
      case Sorting.ASC:
        onSort(Sorting.DESC);
        break;
      case Sorting.DESC:
        onSort(undefined);
        break;

      default:
        onSort(Sorting.ASC);
        break;
    }
  };

  const onFirstOpen = useCallback(() => {
    if (displayedItems === undefined) {
      triggerFetch({
        ...queryVariables,
      });
    }
  }, [displayedItems]);

  const onSelectAllCallback = useCallback(() => {
    onSelectAll(displayedItems?.reduce((acc, { value }) => [...acc, value], []));
  }, [displayedItems, onSelectAll]);

  return (
    <div className="flex items-center gap-2 pl-2 pb-1">
      {onSort ? (
        <div className="cursor-pointer" onClick={() => onChangeSorting()}>
          <p className="text-gray-70 text-2xs text-left uppercase">{title}</p>
        </div>
      ) : (
        <div>
          <p className="text-gray-70 text-2xs text-left uppercase">{title}</p>
        </div>
      )}

      {onSort && (
        <div className="cursor-pointer" onClick={() => onChangeSorting()}>
          <div className="flex flex-col">
            <div>
              <i
                className={clsx(
                  'icon icon-arrow-up -mb-1 block h-4 w-4',
                  sort === Sorting.ASC ? 'bg-primary' : 'bg-dark-3',
                )}
              />
            </div>
            <div>
              <i
                className={clsx(
                  'icon icon-arrow-down -mt-1 -mb-1 block h-4 w-4',
                  sort === Sorting.DESC ? 'bg-primary' : 'bg-dark-3',
                )}
              />
            </div>
          </div>
        </div>
      )}
      {onFilter && (
        <Popover className="relative">
          {() => (
            <>
              <Float
                placement="bottom"
                portal
                enter="transition ease-out duration-100"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Button>
                  <div className="flex cursor-pointer items-center gap-2 pt-2">
                    <i
                      className={clsx(
                        'icon icon-filter-3-fill block h-5 w-5',
                        filters?.length > 0 ? 'bg-primary' : 'bg-dark-3',
                      )}
                    />
                    <div></div>
                    {filters?.length > 0 && (
                      <div>
                        <div>
                          <p className="h-5 rounded-full px-2 text-center text-black">{filters?.length.toString()}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </Popover.Button>
                <Popover.Panel>
                  <FilterModal
                    title={title}
                    overrideText={overrideText}
                    isLoading={loading}
                    filters={filters}
                    onUnselectAll={onUnselectAll}
                    onSelectAll={onSelectAllCallback}
                    onFilterChange={(value) => {
                      if (filters.indexOf(value) !== -1) {
                        onFilter(filters?.filter((v) => v !== value));
                      } else {
                        onFilter([...filters, value]);
                      }
                    }}
                    items={displayedItems}
                    searchFunction={searchFunction}
                    onFirstOpen={onFirstOpen}
                    ItemComponent={ItemComponent}
                  />
                </Popover.Panel>
              </Float>
            </>
          )}
        </Popover>
      )}
    </div>
  );
};
