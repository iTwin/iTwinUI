/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import '@itwin/itwinui-css/css/table.css';
import { IconButton, Button, DropdownButton } from '../Buttons';
import { ProgressRadial } from '../ProgressIndicators';
import { MenuItem } from '../Menu';
import {
  CommonProps,
  getBoundedValue,
  useTheme,
  useOverflow,
  useContainerWidth,
  SvgChevronLeft,
  SvgChevronRight,
} from '../utils';
import { TablePaginatorRendererProps } from './Table';

const defaultLocalization = {
  pageSizeLabel: (size: number) => `${size} per page`,
  rangeLabel: (
    startIndex: number,
    endIndex: number,
    totalRows: number,
    isLoading: boolean,
  ) =>
    isLoading
      ? `${startIndex}-${endIndex}…`
      : `${startIndex}-${endIndex} of ${totalRows}`,
  previousPage: 'Previous page',
  nextPage: 'Next page',
  goToPageLabel: (page: number) => `Go to page ${page}`,
  rowsPerPageLabel: 'Rows per page',
  rowsSelectedLabel: (totalSelectedRowsCount: number) =>
    `${totalSelectedRowsCount} ${
      totalSelectedRowsCount === 1 ? 'row' : 'rows'
    } selected`,
} as const;

export type TablePaginatorProps = {
  /**
   * Control whether focusing tabs (using arrow keys) should automatically select them.
   * Use 'manual' if tab panel content is not preloaded.
   * @default 'manual'
   */
  focusActivationMode?: 'auto' | 'manual';
  /**
   * Array of possible page size options. When provided then shows the range of rows within the current page and page size selection.
   * @example
   * <TablePaginator
   *   // ...
   *   pageSizeList={[10, 25, 50]}
   * />
   */
  pageSizeList?: number[];
  /**
   * Object of labels and functions used for pagination localization.
   */
  localization?: {
    /**
     * Function that returns a label for the page size selector.
     * @default (size: number) => `${size} per page`
     */
    pageSizeLabel?: (size: number) => string;
    /**
     * Function that returns a label for the range of rows within the current page and the length of the whole data.
     * @default
     *  (startIndex, endIndex, totalRows, isLoading) =>
     *    isLoading
     *      ? `${startIndex}-${endIndex}…`
     *      : `${startIndex}-${endIndex} of ${totalRows}`;
     */
    rangeLabel?: (
      startIndex: number,
      endIndex: number,
      totalRows: number,
      isLoading: boolean,
    ) => string;
    /**
     * A label for previous page button. Used for accessibility attribute.
     * @default 'Previous page'
     */
    previousPage?: string;
    /**
     * A label for next page button. Used for accessibility attribute.
     * @default 'Next page'
     */
    nextPage?: string;
    /**
     * Function that returns a label for page selector buttons. Used for accessibility attribute.
     * @default (page: number) => `Go to page ${page}`
     */
    goToPageLabel?: (page: number) => string;
    /**
     * A label shown next to the page size selector. Use `null` to hide.
     * @default 'Rows per page'
     */
    rowsPerPageLabel?: string | null;
    /**
     * Function that returns a label shown in the bottom left to notify how many rows are selected.
     * Only used if multi-selection mode is enabled.
     * @default (totalSelectedRowsCount: number) => `${totalSelectedRowsCount} ${totalSelectedRowsCount === 1 ? 'row' : 'rows'} selected`;
     */
    rowsSelectedLabel?: (totalSelectedRowsCount: number) => string;
  };
} & TablePaginatorRendererProps &
  Omit<CommonProps, 'title'>;

/**
 * Table paginator component. Recommended to pass to the `Table` as `paginatorRenderer` prop.
 * Passing `props` from `paginatorRenderer` handles all state management and is enough for basic use-cases.
 * @example
 * <Table
 *   // ...
 *   paginatorRenderer={(props) => <TablePaginator {...props} />}
 * />
 */
export const TablePaginator = (props: TablePaginatorProps) => {
  const {
    currentPage,
    totalRowsCount,
    pageSize,
    onPageChange,
    totalSelectedRowsCount = 0,
    focusActivationMode = 'manual',
    isLoading = false,
    size = 'default',
    pageSizeList,
    onPageSizeChange,
    localization: userLocalization,
    className,
    ...rest
  } = props;

  useTheme();

  const localization = React.useMemo(
    () => ({ ...defaultLocalization, ...userLocalization }),
    [userLocalization],
  );

  const pageListRef = React.useRef<HTMLDivElement | null>(null);

  const [focusedIndex, setFocusedIndex] = React.useState<number>(currentPage);
  React.useEffect(() => {
    setFocusedIndex(currentPage);
  }, [currentPage]);

  const needFocus = React.useRef(false);
  const isMounted = React.useRef(false);
  React.useEffect(() => {
    // Checking `isMounted.current` prevents from focusing on initial load.
    // Checking `needFocus.current` prevents from focusing page when clicked on previous/next page.
    if (isMounted.current && needFocus.current) {
      const buttonToFocus = Array.from(
        pageListRef.current?.querySelectorAll(
          '.iui-table-paginator-page-button',
        ) ?? [],
      ).find((el) => el.textContent?.trim() === (focusedIndex + 1).toString());
      (buttonToFocus as HTMLButtonElement | undefined)?.focus();
      needFocus.current = false;
    }
    isMounted.current = true;
  }, [focusedIndex]);

  const buttonSize = size != 'default' ? 'small' : undefined;

  const pageButton = React.useCallback(
    (index: number, tabIndex = index === focusedIndex ? 0 : -1) => (
      <button
        key={index}
        className={cx('iui-table-paginator-page-button', {
          'iui-table-paginator-page-button-small': buttonSize === 'small',
        })}
        data-iui-active={index === currentPage}
        onClick={() => onPageChange(index)}
        aria-current={index === currentPage}
        aria-label={localization.goToPageLabel(index + 1)}
        tabIndex={tabIndex}
      >
        {index + 1}
      </button>
    ),
    [focusedIndex, currentPage, localization, buttonSize, onPageChange],
  );

  const totalPagesCount = Math.ceil(totalRowsCount / pageSize);
  const pageList = React.useMemo(
    () =>
      new Array(totalPagesCount)
        .fill(null)
        .map((_, index) => pageButton(index)),
    [pageButton, totalPagesCount],
  );
  const [overflowRef, visibleCount] = useOverflow(pageList);

  const [paginatorResizeRef, paginatorWidth] = useContainerWidth();

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // alt + arrow keys are used by browser/assistive technologies
    if (event.altKey) {
      return;
    }

    const focusPage = (delta: number) => {
      const newFocusedIndex = getBoundedValue(
        focusedIndex + delta,
        0,
        totalPagesCount - 1,
      );

      needFocus.current = true;
      if (focusActivationMode === 'auto') {
        onPageChange(newFocusedIndex);
      } else {
        setFocusedIndex(newFocusedIndex);
      }
    };

    switch (event.key) {
      case 'ArrowRight': {
        focusPage(+1);
        event.preventDefault();
        break;
      }
      case 'ArrowLeft': {
        focusPage(-1);
        event.preventDefault();
        break;
      }
      case 'Enter':
      case ' ':
      case 'Spacebar': {
        if (focusActivationMode === 'manual') {
          onPageChange(focusedIndex);
        }
        break;
      }
      default:
        break;
    }
  };

  const halfVisibleCount = Math.floor(visibleCount / 2);
  let startPage = focusedIndex - halfVisibleCount;
  let endPage = focusedIndex + halfVisibleCount + 1;
  if (startPage < 0) {
    endPage = Math.min(totalPagesCount, endPage + Math.abs(startPage)); // If no room at the beginning, show extra pages at the end
    startPage = 0;
  }
  if (endPage > totalPagesCount) {
    startPage = Math.max(0, startPage - (endPage - totalPagesCount)); // If no room at the end, show extra pages at the beginning
    endPage = totalPagesCount;
  }

  const hasNoRows = totalPagesCount === 0;
  const showPagesList = totalPagesCount > 1 || isLoading;
  const showPageSizeList =
    pageSizeList && !!onPageSizeChange && !!totalRowsCount;

  const ellipsis = (
    <span
      className={cx('iui-table-paginator-ellipsis', {
        'iui-table-paginator-ellipsis-small': size === 'small',
      })}
    >
      …
    </span>
  );

  const noRowsContent = (
    <>
      {isLoading ? (
        <ProgressRadial indeterminate size='small' />
      ) : (
        <Button styleType='borderless' disabled size={buttonSize}>
          1
        </Button>
      )}
    </>
  );

  if (!showPagesList && !showPageSizeList) {
    return null;
  }

  return (
    <div
      className={cx('iui-table-paginator', className)}
      ref={paginatorResizeRef}
      {...rest}
    >
      <div className='iui-left'>
        {totalSelectedRowsCount > 0 && (
          <span>{localization.rowsSelectedLabel(totalSelectedRowsCount)}</span>
        )}
      </div>
      {showPagesList && (
        <div className='iui-center' ref={overflowRef}>
          <IconButton
            styleType='borderless'
            disabled={currentPage === 0}
            onClick={() => onPageChange(currentPage - 1)}
            size={buttonSize}
            aria-label={localization.previousPage}
          >
            <SvgChevronLeft />
          </IconButton>
          <span
            className='iui-table-paginator-pages-group'
            onKeyDown={onKeyDown}
            ref={pageListRef}
          >
            {(() => {
              if (hasNoRows) {
                return noRowsContent;
              }
              if (visibleCount === 1) {
                return pageButton(focusedIndex);
              }
              return (
                <>
                  {startPage !== 0 && (
                    <>
                      {pageButton(0, 0)}
                      {ellipsis}
                    </>
                  )}
                  {pageList.slice(startPage, endPage)}
                  {endPage !== totalPagesCount && !isLoading && (
                    <>
                      {ellipsis}
                      {pageButton(totalPagesCount - 1, 0)}
                    </>
                  )}
                  {isLoading && (
                    <>
                      {ellipsis}
                      <ProgressRadial indeterminate size='small' />
                    </>
                  )}
                </>
              );
            })()}
          </span>
          <IconButton
            styleType='borderless'
            disabled={currentPage === totalPagesCount - 1 || hasNoRows}
            onClick={() => onPageChange(currentPage + 1)}
            size={buttonSize}
            aria-label={localization.nextPage}
          >
            <SvgChevronRight />
          </IconButton>
        </div>
      )}
      <div className='iui-right'>
        {showPageSizeList && (
          <>
            {localization.rowsPerPageLabel !== null &&
              paginatorWidth >= 1024 && (
                <span className='iui-table-paginator-page-size-label'>
                  {localization.rowsPerPageLabel}
                </span>
              )}
            <DropdownButton
              styleType='borderless'
              size={buttonSize}
              menuItems={(close) =>
                pageSizeList.map((size) => (
                  <MenuItem
                    key={size}
                    isSelected={size === pageSize}
                    onClick={() => {
                      close();
                      onPageSizeChange(size);
                    }}
                  >
                    {localization.pageSizeLabel(size)}
                  </MenuItem>
                ))
              }
            >
              {localization.rangeLabel(
                currentPage * pageSize + 1,
                Math.min(totalRowsCount, (currentPage + 1) * pageSize),
                totalRowsCount,
                isLoading,
              )}
            </DropdownButton>
          </>
        )}
      </div>
    </div>
  );
};

export default TablePaginator;
