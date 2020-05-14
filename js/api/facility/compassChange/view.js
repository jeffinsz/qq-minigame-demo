import {
  pText,
  pLine,
  pButton,
  pBox,
  pImg,
  pGoBackBtn
} from "../../../libs/component/index";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const goBack = pGoBackBtn(
    PIXI,
    qq.offCompassChange ? "delPage" : "navigateBack",
    () => {
      switch_button_state(
        { button: stopListening, boolead: false, color: 0xe9e9e9 },
        { button: startListening, boolead: true, color: 0x353535 }
      );
      callBack({
        status: "offCompassChange"
      });
    }
  );
  const title = pText(PIXI, {
    content: "监听罗盘数据",
    fontSize: 36 * PIXI.ratio,
    fill: 0x353535,
    y: 52 * Math.ceil(PIXI.ratio) + 22 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const apiName = pText(PIXI, {
    content: "on/off/CompassChange",
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
    content: `旋转手机即可获取方位信息`,
    fontSize: 32 * PIXI.ratio,
    fill: 0xb2b2b2,
    y: underline.y + underline.height + 66.5 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const img_container = pBox(PIXI, {
    width: 540 * PIXI.ratio,
    height: 540 * PIXI.ratio,
    background: { alpha: 0 },
    y: prompt.y + prompt.height + 66.5 * PIXI.ratio
  });
  const img = pImg(PIXI, {
    width: img_container.width,
    src: "images/Group 3.png",
    x: img_container.width / 2,
    y: img_container.height / 2
  });
  const text = pText(PIXI, {
    content: "0",
    fontSize: 160 * PIXI.ratio,
    fill: 0x353535,
    relative_middle: {
      containerWidth: img.width,
      containerHeight: img.height
    }
  });
  const unit = pText(PIXI, {
    content: "°",
    fontSize: 160 * PIXI.ratio,
    fill: 0x353535,
    x: text.x + text.width,
    relative_middle: { containerHeight: img.height }
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

  img.setAnchor(0.5);
  img_container.addChild(
    img,
    pBox(PIXI, {
      width: 6 * PIXI.ratio,
      height: 56 * PIXI.ratio,
      background: { color: 0x1aad19 },
      radius: 3 * PIXI.ratio,
      y: -16 * PIXI.ratio,
      parentWidth: img_container.width
    }),
    text,
    unit
  );

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
    y: img_container.height + img_container.y + 142 * PIXI.ratio
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
        status: "onCompassChange",
        drawFn(res) {
          img.setRotation((~~res.direction * Math.PI) / 180);
          text.turnText(`${res.direction | 0}`);
          unit.setPositionFn({ x: text.x + text.width });
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
      status: "offCompassChange"
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

  if (qq.offCompassChange) {
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
    img_container,
    startListening,
    stopListening,
    logo,
    logoName
  );
  app.stage.addChild(container);

  return container;
};
