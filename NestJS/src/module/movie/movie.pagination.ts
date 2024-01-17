import { TableName } from '../../common/constants/app.constants';
import { MoviePaginationExtDto } from './dto/movie-pagination.dto';

export class MoviePagination {
  static async getOrders(context: MoviePaginationExtDto): Promise<any> {
    return new Promise((resolve, reject) => {
      let requiredColumns = ['id', 'title', 'publishingYear', 'poster'];
      requiredColumns = requiredColumns.map((item) => (item = `o.${item}`));
      let required_column_query = requiredColumns.join(',');

      try {
        let query = `Select ${required_column_query} `;

        let total_count_query = `SELECT COUNT(o.id) as total `;

        let query_builder = ` from ${TableName.Table_Movie} o `;

        query += query_builder;

        total_count_query += query_builder;

        query += ` order by o.createdAt desc`;
        console.log("Query : ", query);
        console.log("total_count_query : ", total_count_query);
        let query_limit;
        if (context.pagination == 'yes') {
          const limit = context.limit > 0 ? context.limit : 10;
          query_limit = ` LIMIT ${limit}`;
          if (context.page) {
            const PAGE = context.page;
            const OFFSET = (PAGE - 1) * limit;
            query_limit += ` OFFSET ${OFFSET}`;
          }
          query_limit += `;`;
        } else {
          query_limit = `;`;
        }

        query += query_limit;

        const pagination_query = {
          name: `paginationQuery`,
          type: `SELECT`,
          query: query,
        };

        const count_query = {
          name: `countQuery`,
          type: `SELECT_ONE`,
          query: total_count_query,
        };
        resolve({ pagination_query, count_query });
      } catch (e) {
        console.log(`============e==============`);
        console.log(e);
        console.log(`============e==============`);
        reject(e);
      }
    });
  }
}
