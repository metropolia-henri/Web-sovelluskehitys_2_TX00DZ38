// function to get image from wikipedia
import WikiImage from '../interfaces/WikiImage';

const imageFromWikipedia = async (speciesName: string): Promise<string> => {
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=original&origin=*&titles=${speciesName}`;
  const response = await fetch(url);
  const wikiImage = (await response.json()) as WikiImage;
  const image =
    wikiImage.query.pages[Object.keys(wikiImage.query.pages)[0]].original
      .source;
  return image;
};

export default imageFromWikipedia;
