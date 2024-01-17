export interface DBQuery {
    name: string,
    type: "SELECT" | "SELECT_ONE" | "INSERT" | "UPDATE" | "DELETE" | "MULTI",
    query: string
}