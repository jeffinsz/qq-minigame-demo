import {
  pButton,
  pText,
  pLine,
  pImg,
  pGoBackBtn
} from "../../../libs/component/index";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const title = pText(PIXI, {
    content: "显示消息提示框",
    fontSize: 36 * PIXI.ratio,
    fill: 0x353535,
    y: 52 * Math.ceil(PIXI.ratio) + 22 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const apiName = pText(PIXI, {
    content: "showToast",
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

  // 点击弹出默认toast“按钮” 开始
  const toast1Tap = pButton(PIXI, {
    width: 300 * PIXI.ratio,
    height: 120 * PIXI.ratio,
    color: 0xeeeeee,
    y: underline.y + underline.height + 100 * PIXI.ratio
  });
  toast1Tap.addChild(
    pText(PIXI, {
      content: "点击弹出默认\ntoast",
      fontSize: 30 * PIXI.ratio,
      fill: 0x1aad19,
      fontWeight: "bold",
      align: "center",
      lineHeight: 45 * PIXI.ratio,
      vertical_center_correction_value: 13 * PIXI.ratio,
      relative_middle: {
        containerWidth: toast1Tap.width,
        containerHeight: toast1Tap.height
      }
    })
  );
  toast1Tap.onClickFn(() => {
    callBack({
      status: "toast1Tap"
    });
  });
  // 点击弹出默认toast“按钮” 结束

  // 点击弹出设置duration的toast“按钮” 开始
  const toast2Tap = pButton(PIXI, {
    width: 300 * PIXI.ratio,
    height: 120 * PIXI.ratio,
    color: 0xeeeeee,
    y: toast1Tap.y + toast1Tap.height + 20 * PIXI.ratio
  });
  toast2Tap.addChild(
    pText(PIXI, {
      content: "点击弹出设置\nduration的toast",
      fontSize: 30 * PIXI.ratio,
      fill: 0x1aad19,
      fontWeight: "bold",
      align: "center",
      lineHeight: 45 * PIXI.ratio,
      vertical_center_correction_value: 10 * PIXI.ratio,
      relative_middle: {
        containerWidth: toast2Tap.width,
        containerHeight: toast2Tap.height
      }
    })
  );
  toast2Tap.onClickFn(() => {
    callBack({
      status: "toast2Tap"
    });
  });
  // 点击弹出设置duration的toast“按钮” 结束

  // 点击弹出显示loading的toast“按钮” 开始
  const toast3Tap = pButton(PIXI, {
    width: 300 * PIXI.ratio,
    height: 120 * PIXI.ratio,
    color: 0xeeeeee,
    y: toast2Tap.y + toast2Tap.height + 20 * PIXI.ratio
  });
  toast3Tap.addChild(
    pText(PIXI, {
      content: "点击弹出设置\nloading的toast",
      fontSize: 30 * PIXI.ratio,
      fill: 0x1aad19,
      fontWeight: "bold",
      align: "center",
      lineHeight: 45 * PIXI.ratio,
      vertical_center_correction_value: 10 * PIXI.ratio,
      relative_middle: {
        containerWidth: toast3Tap.width,
        containerHeight: toast3Tap.height
      }
    })
  );
  toast3Tap.onClickFn(() => {
    callBack({
      status: "toast3Tap"
    });
  });
  // 点击弹出显示loading的toast“按钮” 结束

  // 点击隐藏toast“按钮” 开始
  const hideToast = pButton(PIXI, {
    width: 300 * PIXI.ratio,
    height: 80 * PIXI.ratio,
    color: 0xeeeeee,
    y: toast3Tap.y + toast3Tap.height + 20 * PIXI.ratio
  });
  hideToast.addChild(
    pText(PIXI, {
      content: "点击隐藏toast",
      fontSize: 30 * PIXI.ratio,
      fill: 0x1aad19,
      fontWeight: "bold",
      relative_middle: {
        containerWidth: hideToast.width,
        containerHeight: hideToast.height
      }
    })
  );
  hideToast.onClickFn(() => {
    callBack({
      status: "hideToast"
    });
  });
  // 点击隐藏toast“按钮” 结束

  const goBack = pGoBackBtn(PIXI, "delPage", () => {
    qq.hideToast();
  });
  container.addChild(
    goBack,
    title,
    apiName,
    underline,
    toast1Tap,
    toast2Tap,
    toast3Tap,
    hideToast,
    logo,
    logoName
  );
  container.visible = false;
  app.stage.addChild(container);

  return container;
};
