export interface Pagination {
    totalCount: number
    totalPages: number
    currentPage: number,
    hasNextPage: boolean
    hasPrevPage: boolean
}