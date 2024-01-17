import { ApiProperty } from "@nestjs/swagger";

import { PageOptionsDto } from "./PageOptionsDto";

interface IPageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  totalItems: number;
  maxPages?: number;
}

export class PageMetaDto {
  @ApiProperty({
    description: "Total records",
  })
  readonly totalItems: number;

  @ApiProperty({
    description: "Current page number",
  })
  readonly currentPage: number;

  @ApiProperty({
    description: "limit / page record number",
  })
  readonly pageSize: number;

  @ApiProperty({
    description: "Total pages",
  })
  readonly totalPages: number;

  @ApiProperty({
    description: "Start page",
  })
  readonly startPage: number;

  @ApiProperty({
    description: "End page",
  })
  readonly endPage: number;

  @ApiProperty({
    description: "Record start index",
  })
  readonly startIndex: number;

  @ApiProperty({
    description: "Record end index",
  })
  readonly endIndex: number;

  @ApiProperty({
    description: "Array of page number",
  })
  readonly pages: any;

  constructor({
    pageOptionsDto,
    totalItems,
    maxPages = 10,
  }: IPageMetaDtoParameters) {
    const pageSize = pageOptionsDto.limit || 10;
    let currentPage = pageOptionsDto.page || 1;

    // calculate total pages

    const totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;

    if (totalPages <= maxPages) {
      // total pages less than max so show all pages
      startPage = 1;
      endPage = totalPages;
    } else {
      // total pages more than max so calculate start and end pages
      const maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
      const maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;

      if (currentPage <= maxPagesBeforeCurrentPage) {
        // current page near the start
        startPage = 1;
        endPage = maxPages;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        // current page near the end
        startPage = totalPages - maxPages + 1;
        endPage = totalPages;
      } else {
        // current page somewhere in the middle
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
      (i) => startPage + i
    );

    this.totalItems = totalItems;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.totalPages = totalPages;
    this.startPage = startPage;
    this.endPage = endPage;
    this.startIndex = startIndex > 0 ? startIndex : 0;
    this.endIndex = endIndex > 0 ? endIndex : 0;
    this.pages = pages;
  }
}
