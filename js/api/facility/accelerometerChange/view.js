import {
  pText,
  pLine,
  pButton,
  pCircle,
  pImg,
  pGoBackBtn
} from "../../../libs/component/index";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const goBack = pGoBackBtn(
    PIXI,
    qq.offAccelerometerChange ? "delPage" : "navigateBack",
    () => {
      switch_button_state(
        { button: stopListening, boolead: false, color: 0xe9e9e9 },
        { button: startListening, boolead: true, color: 0x353535 }
      );
      callBack({
        status: "offAccelerometerChange"
      });
    }
  );
  const title = pText(PIXI, {
    content: "重力感应",
    fontSize: 36 * PIXI.ratio,
    fill: 0x353535,
    y: 52 * Math.ceil(PIXI.ratio) + 22 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const apiName = pText(PIXI, {
    content: "on/off/AccelerometerChange",
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
  const prompt = pText(PIXI, {
    content: `倾斜手机即可移动下方小球`,
    fontSize: 32 * PIXI.ratio,
    fill: 0xb2b2b2,
    y: underline.y + underline.height + 66.5 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const circle = pCircle(PIXI, {
    radius: 270 * PIXI.ratio,
    x: obj.width / 2,
    y: prompt.y + prompt.height + 336.5 * PIXI.ratio
  });
  const child_circle = pCircle(PIXI, {
    radius: 18 * PIXI.ratio,
    background: { color: 0x1aad19 }
  });
  const text = {
    x: pText(PIXI, {
      content: `X：0`,
      fontSize: 36 * PIXI.ratio,
      fill: 0x353535,
      y: circle.height / 2 + circle.y + 50.5 * PIXI.ratio,
      relative_middle: { point: obj.width / 5 }
    })
  };
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

  circle.addChild(child_circle);

  text.y = pText(PIXI, {
    content: `Y：0`,
    fontSize: 36 * PIXI.ratio,
    fill: 0x353535,
    y: text.x.y,
    relative_middle: { point: obj.width / 2 }
  });
  text.z = pText(PIXI, {
    content: `Z：0`,
    fontSize: 36 * PIXI.ratio,
    fill: 0x353535,
    y: text.x.y,
    relative_middle: { point: (4 * obj.width) / 5 }
  });

  // 开始监听“按钮” 开始
  let startListening = pButton(PIXI, {
    width: 296 * PIXI.ratio,
    height: 66 * PIXI.ratio,
    border: {
      width: 2 * PIXI.ratio,
      color: 0x353535
    },
    radius: 10 * PIXI.ratio,
    alpha: 0,
    x: 63 * PIXI.ratio,
    y: circle.height / 2 + circle.y + 189 * PIXI.ratio
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
        status: "onAccelerometerChange",
        drawFn(res) {
          for (
            let i = 0, arr = Object.keys(res), len = arr.length;
            i < len;
            i++
          )
            text[arr[i]].turnText(
              `${arr[i].toLocaleUpperCase()}：${res[arr[i]].toFixed(2)}`
            );

          const x = child_circle.x + res.x * 20 * PIXI.ratio;
          const y = child_circle.y - res.y * 20 * PIXI.ratio;
          if (
            Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) <=
            (circle.width - child_circle.width) / 2
          )
            child_circle.setPositionFn({ x, y });
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
      status: "offAccelerometerChange"
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

  if (qq.offAccelerometerChange) {
    run();
  } else {
    run();
    setTimeout(() => {
      window.router.getNowPage(page => {
        page.reload = function() {
          logo.turnImg({ src: "images/logo.png" });
          run();
        };
      });
    }, 0);
  }

  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    prompt,
    circle,
    text.x,
    text.y,
    text.z,
    startListening,
    stopListening,
    logo,
    logoName
  );
  app.stage.addChild(container);

  return container;
};
