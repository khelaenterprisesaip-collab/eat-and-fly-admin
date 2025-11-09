import { useEffect, useState } from 'react';

const useInfiniteScroll = () => {
  const [isScrollBottom, setIsScrollBottom] = useState(false);
  const [pageData, setPageData] = useState(10);

  const nearBottom: any = (target: any, count: number) => {
    if (count > pageData) {
      const diff = Math.round(target.scrollHeight - target.scrollTop);
      return diff - 25 <= target.clientHeight;
    }
  };

  const fetchMoreData = () => {
    setPageData(pageData + 10);
  };
  useEffect(() => {
    if (isScrollBottom) {
      fetchMoreData();
    }
  }, [isScrollBottom]);

  return {
    pageData,
    setIsScrollBottom,
    nearBottom
  };
};

export default useInfiniteScroll;
