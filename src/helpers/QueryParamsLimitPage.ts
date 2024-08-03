export const queryParamsLimitPage = (
    limit: number,
    page: number,
    EntityArray: any,
  ) => {
    if (!limit) {
      limit = 5;
    }
    if (!page) {
      page = 1;
    }
    const start = (page - 1) * limit;
    const end = start + limit;
    EntityArray = EntityArray.slice(start, end);
    return EntityArray;
  }