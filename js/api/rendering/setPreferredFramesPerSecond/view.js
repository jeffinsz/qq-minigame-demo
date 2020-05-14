import {
  pText,
  pLine,
  pImg,
  pBox,
  pCircle,
  pGoBackBtn
} from "../../../libs/component/index";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const goBack = pGoBackBtn(PIXI, "delPage", () => {
    app.ticker.remove(rotatingFn);
    callBack({
      status: "setPreferredFramesPerSecond",
      value: 60
    });
  });
  const title = pText(PIXI, {
    content: "渲染帧率",
    fontSize: 36 * PIXI.ratio,
    fill: 0x353535,
    y: 52 * Math.ceil(PIXI.ratio) + 22 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const apiName = pText(PIXI, {
    content: "setPreferredFramesPerSecond",
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
  const box = pBox(PIXI, {
    height: 372 * PIXI.ratio,
    y: underline.y + underline.height + 23 * PIXI.ratio
  });
  const fpsText = pText(PIXI, {
    content: "当前帧率：60fps",
    fontSize: 30 * PIXI.ratio,
    fill: 0x353535,
    y: 307 * PIXI.ratio,
    relative_middle: { containerWidth: box.width }
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

  // 当前帧率
  let CurveFPS = 60;

  // 绘制三角形 start
  const circumscribedRadius =
    (((Math.sqrt(3) * box.width) / 6) *
      ((Math.sqrt(3) * box.width) / 6) *
      ((Math.sqrt(3) * box.width) / 6)) /
    (4 * (box.width / 4) * (Math.sqrt(3) * (box.width / 12)));

  const trilateral = new PIXI.Graphics();
  trilateral
    .beginFill(0x1aad19)
    .drawPolygon([
      -(Math.sqrt(3) * (box.width / 12)),
      box.width / 4 - circumscribedRadius,
      Math.sqrt(3) * (box.width / 12),
      box.width / 4 - circumscribedRadius,
      0,
      -circumscribedRadius
    ])
    .endFill();
  trilateral.position.set(box.width / 2, box.height / 2.5);
  trilateral.scale.set(0.9, 0.9);
  let rotatingFn = (() => {
    let angle = 0;
    return () => {
      angle > 360 && (angle -= 360);
      angle += 90 / CurveFPS;
      trilateral.rotation = (angle * Math.PI) / 180;
    };
  })();
  app.ticker.add(rotatingFn);
  // 绘制三角形 end

  box.addChild(
    trilateral,
    fpsText,
    pText(PIXI, {
      content: "设置渲染帧率",
      fontSize: 28 * PIXI.ratio,
      fill: 0x9f9f9f,
      x: 46 * PIXI.ratio,
      y: box.height + 36.6 * PIXI.ratio
    })
  );

  // 滑动调节FPS 开始
  const grayLine = pBox(PIXI, {
    width: 580 * PIXI.ratio,
    height: 4 * PIXI.ratio,
    radius: 2 * PIXI.ratio,
    background: { color: 0xb5b6b5 },
    y: box.y + box.height + 49 * PIXI.ratio
  });
  const greenLine = pBox(PIXI, {
    width: grayLine.width,
    height: grayLine.height,
    radius: 2 * PIXI.ratio,
    background: { color: 0x09bb07 },
    y: grayLine.y
  });
  const circle = pCircle(PIXI, {
    radius: 20 * PIXI.ratio,
    background: { color: 0x09bb07 },
    x: greenLine.x + greenLine.width,
    y: greenLine.y + greenLine.height / 2
  });
  circle.onTouchMoveFn(e => {
    if (
      e.data.global.x >= grayLine.x &&
      grayLine.x + grayLine.width >= e.data.global.x
    ) {
      circle.setPositionFn({ x: e.data.global.x });
      greenLine.width = e.data.global.x - greenLine.x;
      CurveFPS = 1 + Math.round(59 * (greenLine.width / grayLine.width));
      callBack({
        status: "setPreferredFramesPerSecond",
        value: CurveFPS
      });
      fpsText.turnText(`当前帧率：${CurveFPS}fps`);
    }
  });
  // 滑动调节FPS 结束

  container.addChild(
    pBox(PIXI, { height: obj.height, background: { alpha: 0 } }),
    goBack,
    title,
    apiName,
    underline,
    box,
    grayLine,
    greenLine,
    circle,
    pText(PIXI, {
      content: "1",
      fontSize: 30 * PIXI.ratio,
      y: grayLine.y + grayLine.height + 54 * PIXI.ratio,
      relative_middle: { point: grayLine.x }
    }),
    pText(PIXI, {
      content: "60",
      fontSize: 30 * PIXI.ratio,
      y: grayLine.y + grayLine.height + 54 * PIXI.ratio,
      relative_middle: { point: grayLine.x + grayLine.width }
    }),
    logo,
    logoName
  );
  container.interactive = true;
  container.touchend = () => {
    circle.touchmove = null;
  };

  app.stage.addChild(container);

  return container;
};
