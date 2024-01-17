export class CommonQuery {
  selectTable() {
    return {
      name: `selectTable`,
      type: `Select`,
      syntax: (data: any[]) => {
        try {
          let sql = `SHOW COLUMNS FROM Error;`;
          return sql;
        } catch (error) {

          throw error;
        }
      },
    };
  }
}
