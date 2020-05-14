import { pText, pLine, pImg, pGoBackBtn } from "../../../libs/component/index";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const goBack = pGoBackBtn(PIXI, "delPage", () => {
    callBack({
      status: "destroy"
    });
  });
  const title = pText(PIXI, {
    content: "视频",
    fontSize: 36 * PIXI.ratio,
    fill: 0x353535,
    y: 52 * Math.ceil(PIXI.ratio) + 22 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const apiName = pText(PIXI, {
    content: "video",
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

  // 创建视频 开始
  callBack({
    status: "createVideo",
    data: {
      x: (75 * obj.width) / (375 * 2 * obj.pixelRatio),
      y:
        ((underline.y + underline.height + 83 * PIXI.ratio) * 750) /
        (375 * 2 * obj.pixelRatio),
      width: (300 * obj.width) / (375 * obj.pixelRatio),
      height: (225 * obj.width) / (375 * obj.pixelRatio)
    }
  });
  // 创建视频 结束

  container.addChild(goBack, title, apiName, underline, logo, logoName);

  app.stage.addChild(container);

  return container;
};
