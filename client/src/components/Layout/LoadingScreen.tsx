export default function LoadingScreen() {
  const words = "Loading...".split("");
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <img
          src="/logo/zemonie_icon.webp"
          alt="Zemonie Icon"
          className="w-auto h-10 md:h-14 lg:h-20"
        />
        <div className="flex space-x-1 justify-center items-center py-10">
          {words.map((letter, index) => (
            <span
              key={index}
              className="text-xl font-bold animate-bounce"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
