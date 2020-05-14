import {
  pText,
  pLine,
  pBox,
  pImg,
  pGoBackBtn
} from "../../../libs/component/index";

module.exports = function(PIXI, app, obj, callBack) {
  const container = new PIXI.Container();
  const goBack = pGoBackBtn(PIXI, "delPage");
  const title = pText(PIXI, {
    content: "上传文件",
    fontSize: 36 * PIXI.ratio,
    fill: 0x353535,
    y: 52 * Math.ceil(PIXI.ratio) + 22 * PIXI.ratio,
    relative_middle: { containerWidth: obj.width }
  });
  const apiName = pText(PIXI, {
    content: "uploadFile",
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
    y: underline.y + underline.height + 150 * PIXI.ratio,
    height: obj.width / 2,
    border: {
      width: PIXI.ratio | 0,
      color: 0x999999
    }
  });
  const box_child = new PIXI.Container();
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
  let sprite = null;

  box_child.y = -20 * PIXI.ratio;
  box_child.addChild(
    pLine(
      PIXI,
      {
        width: 4 * PIXI.ratio,
        color: 0x999999
      },
      [(obj.width - obj.width / 8) / 2, box.height / 2],
      [obj.width / 8, 0]
    ),
    pLine(
      PIXI,
      {
        width: 4 * PIXI.ratio,
        color: 0x999999
      },
      [obj.width / 2, (box.height - obj.width / 8) / 2],
      [0, obj.width / 8]
    ),
    pText(PIXI, {
      content: "选择图片",
      fontSize: 28 * PIXI.ratio,
      fill: 0x999999,
      y: box.height - obj.width / 6,
      relative_middle: { containerWidth: box.width }
    })
  );

  box.addChild(box_child);
  box.onClickFn(() => {
    box.interactive = false;
    qq.chooseImage({
      count: 1,
      sizeType: ["compressed"],
      sourceType: ["album"],
      success(res) {
        console.log("chooseImage success, temp path is", res.tempFilePaths[0]);
        const imageSrc = res.tempFilePaths[0];
        callBack(imageSrc, bool => {
          if (bool) {
            PIXI.loader.add(imageSrc).load(() => {
              let width = void 0;
              let height = void 0;
              sprite = pImg(PIXI, {
                src: imageSrc,
                is_PIXI_loader: true
              });
              if (sprite.width > sprite.height) {
                width = box.width;
                height = (width * sprite.height) / sprite.width;
                if (box.height / height < 1) {
                  width = (box.height * width) / height;
                  height = box.height;
                }
              } else {
                width = (box.height * sprite.width) / sprite.height;
                height = box.height;
              }
              sprite.width = width;
              sprite.height = height;
              sprite.setPositionFn({
                relative_middle: {
                  containerWidth: box.width,
                  containerHeight: box.height
                }
              });
              box_child.visible = false;
              box.addChild(sprite);
            });
            return;
          }
          box.interactive = true;
        });
      },
      fail({ errMsg }) {
        box.interactive = true;
        console.log("chooseImage fail, err is", errMsg);
      }
    });
  });

  container.addChild(goBack, title, apiName, underline, box, logo, logoName);

  app.stage.addChild(container);

  return container;
};
