// 该文件主要用于集中管理api接口
import request from './request'


// 获取推荐歌单
export const RecommendSongListApi=()=>request.get("/recommend/resource")
// 获取精品歌单
export const BoutiqueSongsListApi=()=>request.get("/top/playlist/highquality")
// 获取热门歌单
export const HotSongsListApi=()=>request.get("/top/playlist")
// 获取歌单歌曲详情
export const SongsListDetailApi=(params)=>request.get("/playlist/detail",{params})
// 获取歌曲详情
export const SongDetailApi=(params)=>request.get("/song/detail",{params})
// 获取最新音乐
export const LatestMusicApi=(params)=>request.get("/top/song",{params})
// 获取歌词
export const GetLyricApi=(params)=>request.get("/lyric",{params})
// 获取歌手榜
export const SingerRankingListApi=(params)=>request.get("/toplist/artist",{params})
// 获取歌手简介
export const SingerIntroducyionApi=(params)=>request.get("/artist/detail",{params})
// 获取歌手全部歌曲
export const SingerAllSongsApi=(params)=>request.get("/artist/songs",{params})
// 获取歌手专辑
export const SingerAlbumApi=(params)=>request.get("/artist/album",{params})
// 获取专辑内容
export const AlbumContentApi=(params)=>request.get("/album",{params})
// 获取歌手信息及50首热门歌曲
export const PerInfoAndHotSongsApi=(params)=>request.get("/artists",{params})