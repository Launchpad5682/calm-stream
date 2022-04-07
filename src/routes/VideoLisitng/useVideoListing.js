import { useDataProvider } from "../../context/data-context";

export function useVideoListing() {
  const { videos, modal, categories, filterCategory, searchTerm, loading } =
    useDataProvider();

  const searchVideos = (videos, searchTerm) => {
    return videos.filter((video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filterVideos = (videos, filterCategory) => {
    if (filterCategory === "" || filterCategory === "all") return videos;
    return videos.filter((video) => video.categoryName === filterCategory);
  };
  const searchedVideos = searchVideos(videos, searchTerm);
  const filteredVideos = filterVideos(searchedVideos, filterCategory);

  return { modal, categories, loading, filteredVideos };
}
