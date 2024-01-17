export class FilterService {
  /**
   * SearchBy
   * @param {string} queryParams
   * @param {array} searchable
   * @returns {string}
   */

  static SearchBy(queryParams: string, searchable: any): any {
    let alias = searchable.Alias.Default;
    let [column, search] = queryParams.split(':');

    // Field Name not specified
    if (!search) {
      search = column;
      column = 'Name';
    } else {
      if (!searchable.Columns.includes(column)) {
        throw 'Invalid search column';
      }

      // Get Alias
      Object.entries(searchable.Alias).forEach((entry) => {
        const [key, value] = entry;

        if (key === column) {
          alias = value;
        }
      });

      // if (column !== "Name") {
      if (alias !== searchable.Alias.Default) {
        // Replace Column with Actual Database Tabel Column
        let actualColumn: any;
        Object.entries(searchable.ActualColumn).forEach((entry) => {
          const [key, value] = entry;
          if (key === column) {
            actualColumn = value;
          }
        });

        column = actualColumn;
      }
    }

    return { column: alias + '.' + column, q: search };
  }

  /**
   * SortBy
   * @param {string} queryParams
   * @param {array} sortableColumns
   * @returns {string}
   */

  static SortBy(queryParams: string, sortableColumns: string[]): any {
    // eslint-disable-next-line prefer-const
    let [column, order] = queryParams.split(':');

    if (!sortableColumns.includes(column)) {
      throw 'Invalid sort column';
    }

    if (order === undefined) {
      order = 'ASC';
    }

    if (
      order !== 'asc' &&
      order !== 'desc' &&
      order !== 'ASC' &&
      order !== 'DESC' &&
      order !== 'Asc' &&
      order !== 'Desc'
    ) {
      throw 'Invalid sort order';
    }

    // const sort_query = ` ORDER BY ${column} ${order}`;
    return { column: column, order: order };
  }
}
