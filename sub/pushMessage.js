import Layout from "./engine";

export function interactive(data, selfData) {
  const buttonList = Layout.getElementsByClassName("itemButton");
  buttonList.forEach((item, index) => {
    item.on("click", () => {
      if ((selfData, data[index].nickname === selfData.nickname)) return;
      qq.modifyFriendInteractiveStorage({
        key: "1", // 需要修改的数据的 key，目前可以为 '1' - '50'
        opNum: 1, // 需要修改的数值，目前只能为 1
        operation: "add", // 修改类型,目前只能是add
        // 这个参数与微信小程序的api不同。
        friendInfo: {
          avatarUrl: data[index].avatarUrl,
          nickname: data[index].nickname,
          openid: data[index].openid
        },
        title: "送你 1 个金币，赶快打开游戏看看吧",
        imageUrl: "images/miniGame.png",
        success: () => {
          console.log("success");
        },
        fail: e => {
          console.log(e);
        }
      });
    });
  });
}

export function directional(data) {
  const buttonList = Layout.getElementsByClassName("listItemOther");
  buttonList.forEach((item, index) => {
    item.on("click", () => {
      qq.shareMessageToFriend({
        // 这个参数与微信小程序的api不同。
        friendInfo: {
          avatarUrl: data[index].avatarUrl,
          nickname: data[index].nickname,
          openid: data[index].openid
        },
        title: "小游戏示例",
        imageUrl: "images/miniGame.png",
        success: r => {
          console.log("success", r);
        },
        fail: e => {
          console.log(e);
        }
      });
    });
  });
}

export function refreshDirected(fn) {
  const button = Layout.getElementsByClassName("captionRight")[0];

  button.on("click", () => {
    fn && fn();
  });
}
