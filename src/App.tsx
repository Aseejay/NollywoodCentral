import React, { useState, useEffect } from "react";
import {
  Cast,
  Download,
  RotateCcw,
  Play,
  Plus,
  Flame,
  User,
  ArrowLeft,
  MapPinHouse,
} from "lucide-react";

interface Movie {
  title: string;
  image: string;
  detailImage: string;
  description: string;
  trailer: string;
}

const App: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const trending: Movie[] = [
    {
      title: "The Palace",
      image: "https://i.ytimg.com/vi/F8Lpjb-JIo8/hq720.jpg?",
      detailImage: "https://i.ytimg.com/vi/OQQaDqLCgKg/maxresdefault.jpg",
      description: "A royal drama full of love, betrayal, and power.",
      trailer: "https://www.youtube.com/embed/OQQaDqLCgKg",
    },
    {
      title: "Behind Closed Doors",
      image:
        "https://i.ytimg.com/vi/liG3peotII4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDuu2ZU437g3U9pBJv6E0qxhYnsvQ",
      detailImage: "https://i.ytimg.com/vi/48rYvA9H5Wc/maxresdefault.jpg",
      description: "When secrets surface, no one is truly innocent.",
      trailer: "https://www.youtube.com/embed/48rYvA9H5Wc",
    },
    {
      title: "Lagos Heat",
      image:
        "https://scontent-los2-1.xx.fbcdn.net/v/t39.30808-6/480556957_1197431708407143_9214993235330800371_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Hhm9WR_2BjcQ7kNvwHHuz9L&_nc_oc=AdmIlGgNJ_VNurHuQtMoMmCBRpDh7nP32YWx5g1BSRkNcp7N62WNfXXFHU19VnegB7I&_nc_zt=23&_nc_ht=scontent-los2-1.xx&_nc_gid=SEgpTrMZ3Bcgw4HAcxrr7Q&oh=00_Afc_q9j8DGttXc9HqznAjH2a2lABMrqHr77oxGzXFM333A&oe=69016EFC",
      detailImage: "https://i.ytimg.com/vi/EY2cmxPzzyY/maxresdefault.jpg",
      description: "A story of ambition, hustle, and redemption in Lagos.",
      trailer: "https://www.youtube.com/embed/EY2cmxPzzyY",
    },
    {
      title: "Love & Fame",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGqTNDReHumlL4hUnWyoNvdl9RiW0iSu-jqQ&s",
      detailImage: "https://i.ytimg.com/vi/fZ2olGAaF7I/maxresdefault.jpg",
      description: "Can love survive fame and envy?",
      trailer: "https://www.youtube.com/embed/fZ2olGAaF7I",
    },
  ];

  const mostViewed: Movie[] = [
    {
      title: "Riches and Regrets",
      image: "https://i.ytimg.com/vi/QwRDbMRAYh4/hq720.jpg?",
      detailImage: "https://i.ytimg.com/vi/FUu8m5tX6W4/maxresdefault.jpg",
      description: "A story of love, greed, and lessons learned the hard way.",
      trailer: "https://www.youtube.com/embed/QwRDbMRAYh4",
    },
    {
      title: "Echoes of the Past",
      image: "https://i.ytimg.com/vi/Y9XNidrxS88/maxresdefault.jpg",
      detailImage: "https://i.ytimg.com/vi/K4TOrB7at0Y/maxresdefault.jpg",
      description: "Old secrets return to haunt a young couple.",
      trailer: "https://www.youtube.com/embed/K4TOrB7at0Y",
    },
  ];

  const allMovies = [...trending, ...mostViewed];

  if (selectedMovie) {
    const similar = allMovies
      .filter((m) => m.title !== selectedMovie.title)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    return (
      <div className="flex flex-col items-center bg-gradient-to-b from-[#1a1a1a9a] via-[#0e0e0e] to-black text-white min-h-screen font-sans">
        <div className="relative w-full max-w-[420px] pb-24">
          <header
            className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] z-50 flex items-center justify-between px-5 pt-5 pb-4 transition-all duration-300 ${
              isScrolled
                ? "backdrop-blur-md bg-black/30 shadow-lg shadow-black/20"
                : "bg-transparent"
            }`}
          >
            <button
              onClick={() => setSelectedMovie(null)}
              className="flex items-center space-x-2 text-gray-300"
            >
              <ArrowLeft size={22} />
              <span className="text-sm">Back</span>
            </button>
            <h1 className="text-lg font-semibold truncate">
              {selectedMovie.title}
            </h1>
            <div className="w-6" />
          </header>

          <div className="pt-20 px-4">
            <iframe
              src={`${selectedMovie.trailer}?autoplay=1&mute=1&start=45&end=165&controls=1&modestbranding=1&rel=0`}
              title="YouTube preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-[230px] rounded-2xl"
            />

            <h2 className="text-2xl font-bold mt-5">{selectedMovie.title}</h2>
            <p className="text-gray-400 text-sm mt-2">
              {selectedMovie.description}
            </p>

            <div className="flex space-x-3 mt-5">
              <button
                onClick={() => {
                  const videoId = selectedMovie.trailer
                    .split("/embed/")[1]
                    .split("?")[0];

                  // Use the embed URL - this has the best chance of staying in browser
                  window.open(
                    `https://www.youtube.com/embed/${videoId}?autoplay=1`,
                    "_blank"
                  );
                }}
                className="inline-flex items-center justify-center space-x-2 bg-white text-black px-7 py-2 rounded-full font-semibold text-sm shadow-md hover:bg-gray-200 transition duration-200"
              >
                <Play size={27} fill="black" stroke="none" />
                <span>Play</span>
              </button>

              <button className="inline-flex items-center justify-center space-x-2 bg-[#2b2b2b]/50 backdrop-blur-md text-white px-7 py-2 rounded-full font-semibold text-sm border border-white/10 hover:bg-[#3a3a3a]/60 transition duration-200">
                <Plus size={27} />
                <span>My List</span>
              </button>
            </div>

            <div className="mt-10 mb-10">
              <h3 className="font-semibold text-lg mb-3">Similar Movies</h3>
              <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-2">
                {similar.map((movie, i) => (
                  <img
                    key={i}
                    src={movie.image}
                    alt={movie.title}
                    onClick={() => setSelectedMovie(movie)}
                    className="w-36 h-52 object-cover rounded-md flex-shrink-0 cursor-pointer hover:opacity-80 transition"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-[#1a1a1a] via-[#000000f4] to-[#000000ea] text-white min-h-screen font-sans">
      <div className="relative w-full max-w-[420px] pb-24">
        <header
          className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] z-50 flex items-center justify-between px-4 pt-5 pb-4 transition-all duration-300 ${
            isScrolled
              ? "backdrop-blur-md bg-black/30 shadow-lg shadow-black/20"
              : "bg-transparent"
          }`}
        >
          <h1 className="text-lg font-bold">For Samuel</h1>
          <div className="flex items-center space-x-6 text-white">
            <Cast size={25} strokeWidth={1.8} />
            <Download size={25} strokeWidth={1.8} />
            <RotateCcw size={25} strokeWidth={1.8} />
          </div>
        </header>

        <div className="pt-19 px-4">
          <div className="flex space-x-2 mt-1 mb-5">
            {[
              { label: "Shows" },
              { label: "Movies" },
              { label: "Categories" },
            ].map(({ label }) => (
              <button
                key={label}
                className="flex bg-[#1a1a1a] items-center space-x-2 border border-white/10 px-4 py-2 rounded-full text-md font-medium hover:bg-[#2b2b2b] transition"
              >
                <span>{label}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 relative">
            <div
              className={`absolute inset-0 flex justify-center transition-opacity duration-700 ${
                isHeroLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src="https://i.ytimg.com/vi/nNBISa5Znc0/hq720.jpg?"
                alt="background glow"
                className="w-[95%] h-[280px] object-cover blur-3xl opacity-40 rounded-xl scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent" />
            </div>

            <div className="relative rounded-xl overflow-hidden z-10">
              <img
                src="https://i.ytimg.com/vi/nNBISa5Znc0/hq720.jpg?"
                alt="Love In World 2"
                className={`w-full h-[240px] object-cover cursor-pointer transition-opacity duration-700 ${
                  isHeroLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setIsHeroLoaded(true)}
                onClick={() => setSelectedMovie(allMovies[0])}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#000000b3]" />
            </div>

            <div className="mt-4 px-4 relative z-20">
              <h2 className="text-2xl font-bold tracking-tight">Liquid Cash</h2>
              <p className="text-gray-400 text-sm mt-1">1h 23min • 2025</p>

              <div className="flex space-x-3 mt-5">
                <button
                  onClick={() => setSelectedMovie(allMovies[0])}
                  className="inline-flex items-center justify-center space-x-2 bg-white text-black px-7 py-2 rounded-full font-semibold text-sm shadow-md hover:bg-gray-200 transition duration-200"
                >
                  <Play size={27} fill="black" stroke="none" />
                  <span>Play Now</span>
                </button>

                <button className="inline-flex items-center justify-center space-x-2 backdrop-blur-md text-white px-7 py-2 rounded-full font-semibold text-sm border border-white/10 hover:bg-[#3a3a3a]/60 transition duration-200">
                  <Plus size={30} />
                  <span>My List</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 px-1">
            <h3 className="font-semibold text-lg mb-3">New Releases</h3>
            <div className="flex space-x-5 overflow-x-auto scrollbar-hide">
              {trending.map((movie, i) => (
                <img
                  key={i}
                  src={movie.image}
                  alt={movie.title}
                  onClick={() => setSelectedMovie(movie)}
                  className="w-70 h-40 object-cover rounded-md flex-shrink-0 cursor-pointer hover:opacity-80 transition"
                />
              ))}
            </div>
          </div>

          <div className="mt-10 mb-24 px-1">
            <h3 className="font-semibold text-lg mb-3">Most Viewed</h3>
            <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-2">
              {mostViewed.map((movie, i) => (
                <img
                  key={i}
                  src={movie.image}
                  alt={movie.title}
                  onClick={() => setSelectedMovie(movie)}
                  className="w-70 h-40 object-cover rounded-md flex-shrink-0 cursor-pointer hover:opacity-80 transition"
                />
              ))}
            </div>
          </div>
        </div>

        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-[#1a1a1a9a] backdrop-blur-md py-3 pb-7 flex justify-around text-center">
          {[
            { icon: MapPinHouse, label: "Home" },
            { icon: Flame, label: "New & Hot" },
            { icon: User, label: "My Netflix" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center text-white">
              <Icon size={22} strokeWidth={1.8} />
              <span className="text-xs mt-1">{label}</span>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default App;
