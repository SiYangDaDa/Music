import { createStore } from "vuex";


 export const store=createStore({
    state(){
        return{
            songsList:[],
            isPlay:false,
            imgUrl:null,
            singerId:null,
            singer:null,
            songName:null,
            songId:null,
            songUrl:null,
            index:null,
            type:null,
            ListType:null,
        }
    },
    mutations:{

        // 获取歌曲播放列表，以及列表类型
        getSongsList(state,songsListInfo){
            state.songsList=songsListInfo.songsList
            state.type=songsListInfo.type
            state.ListType=songsListInfo.type
            // console.log(songsListInfo)
        },
        
        // 解析歌曲信息
        analyzeSongInfo(state,musicInfo){
            if(musicInfo.songId==state.songId){
                if(state.isPlay===true){
                    state.isPlay=false
                }else{
                    state.isPlay=true
                }
            }else{
                if(state.ListType==="recommend"){// 当歌曲列表类型位推荐音乐的类型的时候
                    state.isPlay=false
                    state.songUrl="https://music.163.com/song/media/outer/url?"+"id="+musicInfo.songId+".mp3 "
                    state.index=musicInfo.index
                    let songNow=state.songsList[musicInfo.index]
                    state.imgUrl=songNow.songs[0].al.picUrl
                    state.singerId=songNow.songs[0].ar[0].id
                    state.singer=songNow.songs[0].ar[0].name
                    state.songId=songNow.songs[0].id
                    state.songName=songNow.songs[0].name
                    state.type=musicInfo.type
                    state.isPlay=true
                }else if(state.ListType==="latest"){
                    state.isPlay=false
                    let songNow=state.songsList[musicInfo.index]
                    state.songUrl="https://music.163.com/song/media/outer/url?"+"id="+musicInfo.songId+".mp3 "
                    state.index=musicInfo.index
                    state.imgUrl=songNow.album.picUrl
                    state.singerId=songNow.artists[0].id
                    state.singer=songNow.artists[0].name
                    state.songId=songNow.id
                    state.songName=songNow.name
                    state.type=musicInfo.type    
                    state.isPlay=true
                }else if(state.ListType=="singerHotSongs"){
                    state.isPlay=false
                    let songNow=state.songsList[musicInfo.index]
                    state.songUrl="https://music.163.com/song/media/outer/url?"+"id="+musicInfo.songId+".mp3 "
                    state.index=musicInfo.index
                    state.imgUrl=songNow.al.picUrl
                    state.singerId=songNow.ar[0].id
                    state.singer=songNow.ar[0].name
                    state.songId=songNow.id
                    state.songName=songNow.name
                    state.type=musicInfo.type    
                    state.isPlay=true
                    console.log(state.songId)
                    console.log(state.songUrl)
                }
            }
        },

        // 控制音乐的播放状态
        controlPlay(state,isPlay){
            state.isPlay=isPlay
        },
        // 顺序解析上一首歌曲
        analyzeLast(state){
            state.isPlay=false
            if(state.type==state.ListType){
                // 当播放列表为推荐歌单中的音乐时
                if(state.type==="recommend"){
                    if(state.index==0){
                        let songNow=state.songsList[state.songsList.length-1]
                        state.songUrl="https://music.163.com/song/media/outer/url?"+"id="+songNow.songs[0].id+".mp3 "
                        state.index=state.songsList.length-1
                        state.imgUrl=songNow.songs[0].al.picUrl
                        state.singerId=songNow.songs[0].ar[0].id
                        state.singer=songNow.songs[0].ar[0].name
                        state.songId=songNow.songs[0].id
                        state.songName=songNow.songs[0].name
                        state.type=state.ListType
                        state.isPlay=true
                    }else{
                        let songNow=state.songsList[state.index-1]
                        state.songUrl="https://music.163.com/song/media/outer/url?"+"id="+songNow.songs[0].id+".mp3 "
                        state.index=state.index-1
                        state.imgUrl=songNow.songs[0].al.picUrl
                        state.singerId=songNow.songs[0].ar[0].id
                        state.singer=songNow.songs[0].ar[0].name
                        state.songId=songNow.songs[0].id
                        state.songName=songNow.songs[0].name
                        state.type=state.ListType
                        state.isPlay=true
                    }
                // 当播放列表为最新音乐中的歌曲时
                }else if(state.type=="latest"){
                    if(state.index==0){
                        let songNow=state.songsList[state.songsList.length-1]
                        state.songUrl="https://music.163.com/song/media/outer/url?"+"id="+songNow.id+".mp3 "
                        state.index=state.songsList.length-1
                        state.imgUrl=songNow.album.picUrl
                        state.singerId=songNow.artists[0].id
                        state.singer=songNow.artists[0].name
                        state.songId=songNow.id
                        state.songName=songNow.name
                        state.type=state.ListType    
                        state.isPlay=true
                    }else{
                        let songNow=state.songsList[state.index-1]
                        state.songUrl="https://music.163.com/song/media/outer/url?"+"id="+songNow.id+".mp3 "
                        state.index=state.index-1
                        state.imgUrl=songNow.album.picUrl
                        state.singerId=songNow.artists[0].id
                        state.singer=songNow.artists[0].name
                        state.songId=songNow.id
                        state.songName=songNow.name
                        state.type=state.ListType    
                        state.isPlay=true
                    }
                }else if(state.type=="singerHotSongs"){
                    if(state.index==0){
                        let songNow=state.songsList[state.songsList.length-1]
                        state.songUrl="https://music.163.com/song/media/outer/url?"+"id="+songNow.al.id+".mp3 "
                        state.index=state.songsList.length-1
                        state.imgUrl=songNow.al.picUrl
                        state.singerId=songNow.ar[0].id
                        state.singer=songNow.ar[0].name
                        state.songId=songNow.id
                        state.songName=songNow.name
                        state.type=state.ListType    
                        state.isPlay=true
                    }else{
                        let songNow=state.songsList[state.index-1]
                        state.songUrl="https://music.163.com/song/media/outer/url?"+"id="+songNow.al.id+".mp3 "
                        state.index=state.index-1
                        state.imgUrl=songNow.al.picUrl
                        state.singerId=songNow.ar[0].id
                        state.singer=songNow.ar[0].name
                        state.songId=songNow.id
                        state.songName=songNow.name
                        state.type=state.ListType    
                        state.isPlay=true
                    }
                }
            }
        },
        // 按顺序解析下一首音乐（顺序播放）
        analyzeNext(state){
            state.isPlay=false
            if(state.type==state.ListType){
                // 当播放列表为推荐歌单中的音乐时
                if(state.type==="recommend"){
                    if(state.index==(state.songsList.length-1)){
                        let songNow=state.songsList[0]
                        state.songUrl="https://music.163.com/song/media/outer/url?"+"id="+songNow.songs[0].id+".mp3 "
                        state.index=0
                        state.imgUrl=songNow.songs[0].al.picUrl
                        state.singerId=songNow.songs[0].ar[0].id
                        state.singer=songNow.songs[0].ar[0].name
                        state.songId=songNow.songs[0].id
                        state.songName=songNow.songs[0].name
                        state.type=state.ListType
                        state.isPlay=true
                    }else{
                        let songNow=state.songsList[state.index+1]
                        state.songUrl="https://music.163.com/song/media/outer/url?"+"id="+songNow.songs[0].id+".mp3 "
                        state.index=state.index+1
                        state.imgUrl=songNow.songs[0].al.picUrl
                        state.singerId=songNow.songs[0].ar[0].id
                        state.singer=songNow.songs[0].ar[0].name
                        state.songId=songNow.songs[0].id
                        state.songName=songNow.songs[0].name
                        state.type=state.ListType
                        state.isPlay=true
                    }
                // 当播放列表为最新音乐中的歌曲时
                }else if(state.type=="latest"){
                    if(state.index==(state.songsList.length-1)){
                        let songNow=state.songsList[0]
                        state.songUrl="https://music.163.com/song/media/outer/url?"+"id="+songNow.id+".mp3 "
                        state.index=0
                        state.imgUrl=songNow.album.picUrl
                        state.singerId=songNow.artists[0].id
                        state.singer=songNow.artists[0].name
                        state.songId=songNow.id
                        state.songName=songNow.name
                        state.type=state.ListType    
                        state.isPlay=true
                    }else{
                        let songNow=state.songsList[state.index+1]
                        state.songUrl="https://music.163.com/song/media/outer/url?"+"id="+songNow.id+".mp3 "
                        state.index=state.index+1
                        state.imgUrl=songNow.album.picUrl
                        state.singerId=songNow.artists[0].id
                        state.singer=songNow.artists[0].name
                        state.songId=songNow.id
                        state.songName=songNow.name
                        state.type=state.ListType    
                        state.isPlay=true
                    }
                }else if(state.type=="singerHotSongs"){
                    if(state.index==(state.songsList.length-1)){
                        let songNow=state.songsList[0]
                        state.songUrl="https://music.163.com/song/media/outer/url?"+"id="+songNow.al.id+".mp3 "
                        state.index=0
                        state.imgUrl=songNow.al.picUrl
                        state.singerId=songNow.ar[0].id
                        state.singer=songNow.ar[0].name
                        state.songId=songNow.id
                        state.songName=songNow.name
                        state.type=state.ListType    
                        state.isPlay=true
                    }else{
                        let songNow=state.songsList[state.index+1]
                        state.songUrl="https://music.163.com/song/media/outer/url?"+"id="+songNow.al.id+".mp3 "
                        state.index=state.index+1
                        state.imgUrl=songNow.al.picUrl
                        state.singerId=songNow.ar[0].id
                        state.singer=songNow.ar[0].name
                        state.songId=songNow.id
                        state.songName=songNow.name
                        state.type=state.ListType    
                        state.isPlay=true
                    }
                }
            }
        }
    },
    
})


