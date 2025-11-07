const Loading = () => {
  return (
    <div className="flex flex-col items-center mt-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-500 border-solid"></div>
      <p className="mt-4 text-lg text-gray-700">読み込み中...</p>
    </div>
  );
};

export default Loading;
