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
// 关键词搜索歌曲及歌手
export const SearchSingerAndSongs=(params)=>request.get("/search/suggest",{params})
// 获取Mv
export const GetMvApi=(params)=>request.get("/mv/all",{params})
// 获取mv的Url
export const GetMvUrlApi=(params)=>request.get("/mv/url",{params})
// 获取相似的mv(参数mvid)
export const SimilarMvApi=(params)=>request.get("/simi/mv",{params})
// 手机号获取验证码
export const GetIdCodeApi=(params)=>request.get("/captcha/sent",{params})
// 验证验证码
export const VerifyIdCode=(params)=>request.get("/captcha/verify",{params})