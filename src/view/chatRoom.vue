<template>
  <div>
    <!-- <button @click="chat">开始聊天</button>
    <beautiful-chat
      :participants="participants"
      :titleImageUrl="titleImageUrl"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :close="closeChat"
      :open="openChat"
      :showEmoji="true"
      :showFile="true"
      :showTypingIndicator="showTypingIndicator"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :messageStyling="messageStyling"
      @onType="handleOnType" /> -->
      <el-alert
        v-show="systemMessage"
        :title="systemMessage"
        type="success">
  </el-alert>
      <ul>
        <li v-for="(item, index) in messageList" :key="index"  :style="{color: item.author === user.name?'black': 'red'}">
          <span>{{item.author}}</span>: <span>{{item.message}}</span>
        </li>
      </ul>

      <div style="position:fixed; bottom:0;width:100%" >
        <el-input v-model="input" placeholder="请输入内容" style="width:75%"></el-input>
        <el-button @click="sendMessage">发送消息</el-button>
      </div>

  </div>
</template>
<script>
import socket from "socket.io-client";
export default {
  name: "chat",
  data() {
    return {
      input:'',
      socket: null,
      systemMessage: "",
      participants: [], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      titleImageUrl:
        "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
      messageList: [], // the list of the messages to show, can be paginated and adjusted dynamically
      newMessagesCount: 0,
      isChatOpen: false, // to determine whether the chat window should be open or closed
      showTypingIndicator: "", // when set to a value matching the participant.id it shows the typing indicator for the specific user
      colors: {
        header: {
          bg: "#0470ba",
          text: "#ffffff"
        },
        launcher: {
          bg: "#0470ba"
        },
        messageList: {
          bg: "#ffffff"
        },
        sentMessage: {
          bg: "#0470ba",
          text: "#ffffff"
        },
        receivedMessage: {
          bg: "#eaeaea",
          text: "#222222"
        },
        userInput: {
          bg: "#f4f7f9",
          text: "#565867"
        }
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
    };
  },
  computed: {
    user() {
      return Object.keys(this.$store.state.chat.currentUser).length
        ? this.$store.state.chat.currentUser
        : JSON.parse(localStorage.getItem("login"));
    }
  },
  mounted() {
    var self = this;
    // 建立连接
    this.socket = socket("localhost:5000");
    // 告诉服务器 我登陆了
    this.socket.emit("login", this.user);

    //监听服务器发来的别人登陆的信息
    this.socket.on("someone login", function(data) {
      debugger;
      self.participants = data.users;
      self.systemMessage = data.currentUser.name !== self.user.name ? `${data.currentUser.name} 进入聊天室` : `当前在线：${self.user.name}`
      console.log(data.currentUser.name + "登陆");
    });


    //监听离线
    this.socket.on("someone loginout", function(data){
      self.participants = data.users;
      if(data.name !== self.user.name) self.systemMessage = `${data.currentUser.name} 退出聊天室`
      console.log(data.currentUser.name + "离线")
    })

    // 监听别人发过来的消息
    this.socket.on("message", function(data){
      self.messageList.push(data)
    })
  },
  methods: {
    sendMessage(){
      let message = {
        author: this.user.name,
        message: this.input
      }
      this.messageList.push(message);
      this.socket.emit("sendMessage", message);
      this.input = ""
    },
    chat() {
      if (this.participants.length === 1) alert(`聊天室无人`);
      else this.openChat();
    },
    // sendMessage(text) {
    //   if (text.length > 0) {
    //     this.newMessagesCount = this.isChatOpen
    //       ? this.newMessagesCount
    //       : this.newMessagesCount + 1;
    //     this.onMessageWasSent({
    //       author: "support",
    //       type: "text",
    //       data: { text }
    //     });
    //   }
    // },
    onMessageWasSent(message) {
      // called when the user sends a message
      this.messageList = [...this.messageList, message];
      this.socket.emit("chat messsage", {
        ...message,
        author: location.search.split("=")[1]
      });
      // 存到数据库
    },
    openChat() {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true;
      this.newMessagesCount = 0;
    },
    closeChat() {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false;
    },
    handleScrollToTop() {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
    },
    handleOnType() {
      console.log("Emit typing event");
    }
  },
  beforeRouteLeave (to, from, next) {
    let isLeave =  window.confirm('确定要离开聊天室？')
    if(isLeave){
      this.socket.emit("loginout", this.user);
      next();
    }else{
      next(false)
    }
    
  }
};
</script>