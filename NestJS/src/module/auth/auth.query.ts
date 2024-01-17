
export class AuthQuery {
  selectTable() {
    return {
      name: 'selectTable',
      type: 'Select',
      syntax: (data: any[]) => {
        try {
          let sql = `SHOW COLUMNS FROM Auth;`;
          return sql;
        } catch (error) {

          throw error;
        }
      },
    };
  }
}

