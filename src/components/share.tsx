const ShareSection = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Share this page</h2>
      <div className="flex gap-4">
        <a
          href="https://twitter.com/intent/tweet?text=Check%20out%20this%20amazing%20page!"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Share on Twitter
        </a>
        <a
          href="https://www.facebook.com/sharer/sharer.php?u=https://example.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-700 text-white px-4 py-2 rounded"
        >
          Share on Facebook
        </a>
      </div>
    </div>
  );
};

export default ShareSection;
