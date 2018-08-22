// hard code this to 10
export default (page, totalPages) => {
  if (page <= 5 || totalPages <= 9) {
    return Array.from({ length: Math.min(totalPages, 9) }, (_, i) => i + 1);
  }

  if (page + 4 > totalPages) {
    const start = totalPages - 9 + 1;
    return Array.from({ length: 9}, (_, i) => i + start);
  }

  const start = page - 4;
  return Array.from({ length: 9 }, (_, i) => i + start);
};
