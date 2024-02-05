export const formatLrc = (lyric: string) => {
  // 匹配 [ti:xxx] 格式的信息
  const titleRegex = /\[ti:(.*?)\]/;
  // 匹配 [ar:xxx] 格式的信息
  const artistRegex = /\[ar:(.*?)\]/;
  // 匹配 [al:xxx] 格式的信息
  const albumRegex = /\[al:(.*?)\]/;

  const titleMatch = lyric.match(titleRegex);
  const artistMatch = lyric.match(artistRegex);
  const albumMatch = lyric.match(albumRegex);

  const title = titleMatch ? titleMatch[1] : "";
  const artist = artistMatch ? artistMatch[1] : "";
  const album = albumMatch ? albumMatch[1] : "";

  // 去掉歌词中的时间标签信息
  const lyricText = lyric
    .replace(/\[[a-z]+.+\]\n/g, "")
    .replace(/\[\d{2}:\d{2}\.\d{2}\]/g, "");

  return { title, artist, album, lyricText };
};
