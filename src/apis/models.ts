export interface Pagination {
  /**
   * Set the number of rows in one page.
   * If some of the rows have children (for instance in the tree data), this number represents the amount of top level rows wanted on each page.
   * @default 100
   */
  pageSize: number

  /**
   * The zero-based index of the current page.
   * @default 0
   */
  page: number
}

export interface IPageParameters extends Pagination {
  sortBy?: string | null
  totalRows: number
}

export interface PagedDto<T> extends IPageParameters {
  items: T[]
}
