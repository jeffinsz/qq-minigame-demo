import {
  pButton,
  pText,
  pBox,
  pLine,
  pImg,
  pGoBackBtn
} from "../../../libs/component/index";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const goBack = pGoBackBtn(PIXI, "delPage");
  const title = pText(PIXI, {
    content: "横竖屏切换",
    fontSize: 36 * PIXI.ratio,
    fill: 0x353535,
    y: 52 * Math.ceil(PIXI.ratio) + 22 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const apiName = pText(PIXI, {
    content: "on/off/DeviceOrientationChange",
    fontSize: 32 * PIXI.ratio,
    fill: 0xbebebe,
    y: title.height + title.y + 78 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const underline = pLine(
    PIXI,
    {
      width: PIXI.ratio | 0,
      color: 0xd8d8d8
    },
    [
      (obj.width - 150 * PIXI.ratio) / 2,
      apiName.y + apiName.height + 23 * PIXI.ratio
    ],
    [150 * PIXI.ratio, 0]
  );
  const div = pBox(PIXI, {
    height: 404 * PIXI.ratio,
    y: underline.y + underline.height + 80 * PIXI.ratio
  });
  const text = pText(PIXI, {
    content: "切换屏事件未触发",
    fontSize: 42 * PIXI.ratio,
    fill: 0xcecece,
    y: 233 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const logo = pImg(PIXI, {
    width: 36 * PIXI.ratio,
    height: 36 * PIXI.ratio,
    x: 294 * PIXI.ratio,
    y: obj.height - 66 * PIXI.ratio,
    src: "images/logo.png"
  });
  const logoName = pText(PIXI, {
    content: "小游戏示例",
    fontSize: 26 * PIXI.ratio,
    fill: 0x576b95,
    y: (obj.height - 62 * PIXI.ratio) | 0,
    relative_middle: { point: 404 * PIXI.ratio }
  });

  div.addChild(
    pText(PIXI, {
      content: "请旋转屏幕",
      fontSize: 32 * PIXI.ratio,
      y: 61 * PIXI.ratio,
      fill: 0x353535,
      relative_middle: { containerWidth: div.width }
    }),
    text
  );

  // 开始监听“按钮” 开始
  const startListening = pButton(PIXI, {
    width: 296 * PIXI.ratio,
    height: 66 * PIXI.ratio,
    border: {
      width: 2 * PIXI.ratio,
      color: 0x353535
    },
    radius: 10 * PIXI.ratio,
    alpha: 0,
    x: 63 * PIXI.ratio,
    y: div.height + div.y + 314 * PIXI.ratio
  });
  startListening.myAddChildFn(
    pText(PIXI, {
      content: "开始监听",
      fontSize: 32 * PIXI.ratio,
      fill: 0x353535,
      relative_middle: {
        containerWidth: startListening.width,
        containerHeight: startListening.height
      }
    })
  );
  let run;
  startListening.onClickFn(
    (run = () => {
      switch_button_state(
        { button: startListening, boolead: false, color: 0xe9e9e9 },
        { button: stopListening, boolead: true, color: 0x353535 }
      );
      callBack({
        status: "onDeviceOrientationChange",
        drawFn() {
          text.turnText("切换屏事件已触发");
        }
      });
    })
  );
  // 开始监听“按钮” 结束

  // 停止监听“按钮” 开始
  let stopListening = pButton(PIXI, {
    width: 296 * PIXI.ratio,
    height: 66 * PIXI.ratio,
    border: {
      width: 2 * PIXI.ratio,
      color: 0xe9e9e9
    },
    radius: 10 * PIXI.ratio,
    alpha: 0,
    x: obj.width - 357 * PIXI.ratio,
    y: startListening.y
  });
  stopListening.myAddChildFn(
    pText(PIXI, {
      content: "停止监听",
      fontSize: 32 * PIXI.ratio,
      fill: 0xe9e9e9,
      relative_middle: {
        containerWidth: stopListening.width,
        containerHeight: stopListening.height
      }
    })
  );
  stopListening.onClickFn(() => {
    switch_button_state(
      { button: stopListening, boolead: false, color: 0xe9e9e9 },
      { button: startListening, boolead: true, color: 0x353535 }
    );
    callBack({
      status: "offDeviceOrientationChange"
    });
  });
  stopListening.isTouchable(false);
  // 停止监听“按钮” 结束

  // 切换“按钮”状态函数 开始
  function switch_button_state(...arr) {
    while (arr.length) {
      const item = arr.shift();
      item.button.isTouchable(item.boolead);
      item.button.turnColors({ border: { color: item.color } });
      item.button.children[0].children[0].turnColors(item.color);
    }
  }
  // 切换“按钮”状态函数 结束

  run();

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    div,
    startListening,
    stopListening,
    logo,
    logoName
  );
  app.stage.addChild(container);

  return container;
};
