// interface for WikiImage
interface ApiResponse {
  batchcomplete: string;
  query: {
    pages: {
      [key: string]: {
        pageid: number;
        ns: number;
        title: string;
        original: {
          source: string;
          width: number;
          height: number;
        };
      };
    };
  };
}

export default ApiResponse;
