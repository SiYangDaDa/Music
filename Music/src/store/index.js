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
            // if(state.type==musicInfo.type){
            //     if()
            // }
            if(state.ListType==="recommend"){// 当歌曲列表类型位推荐音乐的类型的时候
                if(musicInfo.songId==state.songId){
                    if(state.isPlay){
                        state.isPlay=false
                    }else{
                        state.isPlay=true
                    } 
                }else{
                    state.isPlay=false
                    state.songUrl="https://music.163.com/song/media/outer/url?"+"id="+musicInfo.songId+".mp3 "
                    state.index=musicInfo.index
                    let songNow=state.songsList[musicInfo.index]
                    state.imgUrl=songNow.songs[0].al.picUrl
                    state.singerId=songNow.songs[0].ar[0].id
                    state.singer=songNow.songs[0].ar[0].name
                    state.songId=songNow.songs[0].id
                    state.songName=songNow.songs[0].name
                    
                    state.isPlay=true
                }
            }
        },

        // 控制音乐的播放状态
        controlPlay(state,isPlay){
            state.isPlay=isPlay
        },

        // 解析下一首音乐
        analyzeNext(state){
            if(state.type==="recommend"){
               let s= state.songsList.find(s=>s.songs[0].id==state.songId)
               if(s){
                    if(state.index==(state.songsList.length-1)){
                        let songNow=state.songsList[0]
                        state.songUrl="https://music.163.com/song/media/outer/url?"+"id="+songNow.songs[0].id+".mp3 "
                        state.index=0
                        state.imgUrl=songNow.songs[0].al.picUrl
                        state.singerId=songNow.songs[0].ar[0].id
                        state.singer=songNow.songs[0].ar[0].name
                        state.songId=songNow.songs[0].id
                        state.songName=songNow.songs[0].name

                        state.isPlay=true
                    }else{
                        let songNow=state.songsList[state.index+1]
                        state.songUrl="https://music.163.com/song/media/outer/url?"+"id="+songNow.songs[0].id+".mp3 "
                        state.index=0
                        state.imgUrl=songNow.songs[0].al.picUrl
                        state.singerId=songNow.songs[0].ar[0].id
                        state.singer=songNow.songs[0].ar[0].name
                        state.songId=songNow.songs[0].id
                        state.songName=songNow.songs[0].name

                        state.isPlay=true
                    }
               }else{
                    console.log("不属于该类型个歌单")
               }
            }
        }
    },
    
})


